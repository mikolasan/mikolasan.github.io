---
title: Fix RAID 0
subtitle: (technically it wasn’t broken)
date: 2025-08-26
published: 2025-08-26
lastModified: 2025-08-26
---
I have 4 SSD drives in RAID0 array that were created with DELL storage controller on a DELL server. One drive failed, and now the server doesn't boot.

## Backup data

So I connected all 4 drives to another server (HP), booted from Live USB (Ubuntu 22) and trying to restore the software RAID0 without losing data on the drives (I assume drives were fine, it was just a glitch in the controller on the DELL server).

First things first

```bash
lsblk
```

lsblk detects type as dmraid. Run `mdadm --examine` for all drives

```bash
sudo mdadm --examine /dev/sdX
```

It outputs some information about raid 0, name, how many devices in it, chunk size (128 sectors), UIDs. The Dell controller did in fact leave **dmraid-compatible metadata** on the disks (not mdadm-native). `mdadm` can see the superblock but won’t assemble it because it’s not its own format.

So the path forward is to use **`dmraid`**, not `mdadm`.

```bash
sudo dmraid -r
```

shows RAID sets found on the disks. You should also see a virtual block device representing the RAID0 set.

```bash
ls -l /dev/mapper/
sudo mount -o ro /dev/mapper/ddf1_four_reds /mnt
```

But `sudo mount` fails with an error `wrong fs type, bad option, bad superblock ...`

Let’s inspect the array device. Can we see a partition table?

```bash
sudo fdisk -l /dev/mapper/<raidname>
```

fdisk recognizes partitions and their types properly, but they do not exist in `/dev/mapper/`, so no way to mount that. But if `fdisk -l /dev/mapper/<raidname>` shows valid partitions with correct types/sizes, that means the partition devices aren’t being created automatically under `/dev/mapper/`.

Sometimes just notifying the kernel is enough

```bash
sudo partprobe /dev/mapper/<raidname>
```

It actually helped. So I mounted the partition and backed up the data. 

## Restore data

There were options at this point:
- try to update the metadata (three drives detected a failure of the fourth drive, but the fourth drive still thought that all four are fine) and trick the DELL controller that everything is fine,
- create a bootable drive outside of the RAID 0 that will understand this dmraid configuration and keep using the HP server,
- or move the data to a new install where RAID can be different (or even go with no RAID)

I did restore my backup on another single drive. It had the right partitioning already (GPT table with ESP FAT, ext4, and swap). Then I logged in a chroot environment to restore grub efi config.

```bash
mount -t proc /proc /proc
mount --rbind /sys /sys
mount --rbind /dev /dev
mount --rbind /run /run 
mount /dev/sdX1 /boot/efi
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=debian --recheck
update-grub
```

`bash: grub-install: command not found`

And if I look for `/usr/sbin` in `PATH`

```bash
echo $PATH
export PATH=/usr/sbin:$PATH
```

And don’t forget to update UUID-s in **/etc/fstab**