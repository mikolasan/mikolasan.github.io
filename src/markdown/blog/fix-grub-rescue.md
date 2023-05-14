---
title: Fix Grub rescue
date: 2023-01-31
---

The following answer by [Ivan Bartsov](https://unix.stackexchange.com/a/193778/78773) is copied from [Unix&Linux Stack Exchange](https://unix.stackexchange.com/questions/114429/short-read-while-trying-to-open-partition/193778#193778) 

----

*Ext* filesystems store backups of the superblock -- for an occasion just like this one.

First, determine the locations of the backups (**make sure you have the -n option!** otherwise this will wipe the file system with a new one):

```
mke2fs -n /dev/sdxx
```

This is a test run (i.e. no write) of FS creation routine. It will let you know the offsets of where it *would* put superblock backups if it were creating a filesystem. If you know your FS block size to be something other than 4096, you must also specify the parameter `-b {blocksize}` to get the right numbers.

For 4096-sized blocks, first backup superblock will be at `32768`. If the following operations fail with the same error message about bad superblock/short read, try the next superblock backup from the list `mke2fs` gave you.

Next, you can either mount the filesystem using the backup superblock like this

```
mount -o sb=32768 /dev/sdxx /mnt/sdxx
```

then explore the FS from your file manager, copy undamaged files etc.

Or, to actually fix the FS, you can run `fsck` with backup superblock like this

```
e2fsck -fy -b 32768 /dev/sdxx
```

Here `-f` makes it scan the disk even if it's not dirty and `-y` answers yes to all enquiries about fixing stuff. The `-b` option, aside from specifying the backup superblock, will make it update the original superblock with info from backup.

After this, you should have your filesystem back.

**If e2fsck fails to write the main superblock**
If the superblock got corrupted because it's on a bad sector `e2fsck` will finish the run, attempt to update the superblock, and give you the following error message:

    Error writing block 1 (Attempt to write block from filesystem resulted in short write)
Obviously, the main superblock isn't updated and the whole `e2fsck` run is in vain.

You need to hint the disk to remap that sector -- by writing zeroes to it. Thanks to @Keith for pointing this out: **the next command can make a lot of mess if mistyped**, so triple-check it before running. Here's the magic:

```
dd if=/dev/zero of=/dev/sdxx bs=4096 count=1 seek=0
```

This will write 1 4096-sized block of zeroes to *sdxx* at offset 0. Don't forget to account for different block size if that's the case for you.

After that you'll be able to write to superblock (which will be on a different physical sector transparently to you). Now, you run the `e2fsck` command above again and it should succeed writing the superblock allowing you to mount the FS normally.

**Goes without saying** Now you should backup the critical data to another *physical* drive and, if you still plan on using the filesystem, run

```
e2fsck -fccy /dev/sdxx
```

*PS* Kudos to @Nemo on this find: in case all of the backups of the superblock of your FS are corrupted, `mke2fs/mkfs` has the *-S* option that will re-create the superblock and group descriptors as if creating a new filesystem, without touching anything else. **But** you absolutely have to be sure your blocksize is right and the man page says you should run `e2fsck` after it and there are no guarantees about data being left for rescuing. [Read the man page][1] and throw a plus on [this answer][2].


  [1]: http://manpages.ubuntu.com/manpages/trusty/en/man8/mkfs.ext4.8.html
  [2]: https://askubuntu.com/questions/381518/recover-from-a-corrupted-filesystem-when-fsck-do-not-help/381759#381759
