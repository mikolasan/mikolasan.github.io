---
date: 2021-06-04
title: Custom Linux distro
published: 2021-10-14
lastModified: 2021-10-14
---


Build your own small Linux. Build your linux for kiosk or PXE or Live CD or security box where it is so unique that it is painful to use

Also it is a good way to understand how linux works, how to customize it and why nothing in linux is done right, but what they do to cover up all crutches.


## Buildroot

Buildroot [cheat sheet](https://neupokoev-n.gitbook.io/pxe-boot/install-pxe-server-on-raspberry-pi-4/buildroot-cheat-sheet)

```bash
export LD_LIBRARY_PATH=""
make distclean
make ghatanothoa_defconfig
make xconfig # if any additional changes
make savedefconfig # save these additional changes
make linux-xconfig # if any additional changes
# save linux config
cp output/build/linux-5.12.10/.config \
    board/<brand>/<board>/linux.config 
make HOSTCXX=g++-11 HOSTCC=gcc-11
```


Reference:

- http://nightly.buildroot.org/manual.html#_buildroot_quick_start
- https://stackoverflow.com/questions/43381612/buildroot-building-iso-image/54847720#54847720
- https://www.viatech.com/en/2015/06/buildroot/


### FAT 32

- https://wiki.gentoo.org/wiki/FAT
- https://unix.stackexchange.com/questions/172607/verify-linux-fat32-support


### UEFI version

kernel in buildroot should be adjusted, enable all:

```
CONFIG_FB_EFI=y
CONFIG_FRAMEBUFFER_CONSOLE=y
CONFIG_EFI=y
CONFIG_EFI_VARS=y
```

### M.2 and NVME

```
<*> NVM Express block device
[*] NVMe multipath support
[*] NVMe hardware monitoring
<M> NVM Express over Fabrics FC host driver
<M> NVM Express over Fabrics TCP host driver
<M> NVMe Target support
  [*]   NVMe Target Passthrough support
  <M>   NVMe loopback device support
  <M>   NVMe over Fabrics FC target driver
  < >     NVMe over Fabrics FC Transport Loopback Test driver (NEW)
  <M>   NVMe over Fabrics TCP target support
```

Source: https://wiki.gentoo.org/wiki/NVMe


## Autostart

- autologin [https://wiki.archlinux.org/title/getty#Automatic_login_to_virtual_console](https://wiki.archlinux.org/title/getty#Automatic_login_to_virtual_console)
- No need `wayland-backend.so` [https://bugs.freedesktop.org/show_bug.cgi?id=90562](https://bugs.freedesktop.org/show_bug.cgi?id=90562)
- add `--tty=1` (slides, page 77) [https://community.nxp.com/t5/i-MX-Graphics-Knowledge-Base/Weston-Introduction-for-I-MX/ta-p/1113692?attachment-id=8332](https://community.nxp.com/t5/i-MX-Graphics-Knowledge-Base/Weston-Introduction-for-I-MX/ta-p/1113692?attachment-id=8332)
- env variables [https://wiki.gentoo.org/wiki/Weston](https://wiki.gentoo.org/wiki/Weston)


## Weston settings

- `panel-location` is a lie. [http://manpages.ubuntu.com/manpages/bionic/man5/weston.ini.5.html](http://manpages.ubuntu.com/manpages/bionic/man5/weston.ini.5.html)
- use newer docs [http://manpages.ubuntu.com/manpages/impish/man5/weston.ini.5.html](http://manpages.ubuntu.com/manpages/impish/man5/weston.ini.5.html)
- use `panel-position` [https://stackoverflow.com/questions/30605949/is-it-possible-to-remove-weston-toolbar?noredirect=1&lq=1](https://stackoverflow.com/questions/30605949/is-it-possible-to-remove-weston-toolbar?noredirect=1&lq=1)
- keyboard [https://community.toradex.com/t/virtual-keyboard-in-weston/12774/3](https://community.toradex.com/t/virtual-keyboard-in-weston/12774/3)

## Weston autolaunch

- autostart doesn't work [https://specifications.freedesktop.org/autostart-spec/autostart-spec-latest.html](https://specifications.freedesktop.org/autostart-spec/autostart-spec-latest.html) this is a lie again
- still open issue [https://gitlab.freedesktop.org/wayland/weston/-/issues/171](https://gitlab.freedesktop.org/wayland/weston/-/issues/171) ([https://gitlab.freedesktop.org/wayland/weston/-/issues/456](https://gitlab.freedesktop.org/wayland/weston/-/issues/456))
- workaround using [https://developer.toradex.com/knowledge-base/how-to-autorun-application-at-the-start-up-in-linux](https://developer.toradex.com/knowledge-base/how-to-autorun-application-at-the-start-up-in-linux) and [https://wiki.parabola.nu/Wayland](https://wiki.parabola.nu/Wayland)
- systemd [https://archlinuxarm.org/forum/viewtopic.php?f=57&t=15209](https://archlinuxarm.org/forum/viewtopic.php?f=57&t=15209)


## Test image in VirtualBox

```
sudo dd if=/dev/zero of=azathoth.img bs=1M count=48000
48000+0 records in
48000+0 records out
50331648000 bytes (50 GB, 47 GiB) copied, 894.784 s, 56.3 MB/s

sudo mkfs -t ext4 azathoth.img
mke2fs 1.46.2 (28-Feb-2021)
Discarding device blocks: done
Creating filesystem with 12288000 4k blocks and 3072000 inodes
Filesystem UUID: d93f9155-4fd8-4f07-be0b-ee50719f5212
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
        4096000, 7962624, 11239424

Allocating group tables: done
Writing inode tables: done
Creating journal (65536 blocks): done
Writing superblocks and filesystem accounting information: done

mkdir mountpoint
sudo mount -t auto -o loop azathoth.img mountpoint/
mount | grep azathoth
azathoth.img on mountpoint type ext4 (rw,relatime)

sudo dd if=/dev/zero of=root.img bs=1M count=7200
sudo mkfs -t ext4 root.img
mkdir root
sudo mount -t auto -o loop root.img root/
sudo rsync -rav ../builroot/output/ root/
sudo umount root

yay -S genimage
cat genimage-bios.cfg
image azathoth.img {
  hdimage {
  }
  partition boot {
    in-partition-table = "no"
    image = "boot.img"
    offset = 0
    size = 512
  }
  partition grub {
    in-partition-table = "no"
    image = "grub.img"
    offset = 512
  }
  partition root {
    partition-type = 0x83
    image = "root.img"
  }
}

rm -r tmp
genimage --inputpath ./ --outputpath ./ --config genimage-bios.cfg
VBoxManage convertfromraw azathoth.img azathoth.vdi --format VDI

sudo pacman -S qemu
sudo modprobe nbd max_part=16
sudo qemu-nbd -c /dev/nbd0 azathoth.vdi
sudo mount /dev/nbd0p1 root
```

### Folder to image

Simplification

```
sudo dd if=/dev/zero of=root.img bs=1M count=7200
sudo mkfs -t ext4 root.img
mkdir root
sudo mount -t auto -o loop root.img root/
sudo rsync -rav ../builroot/output/ root/
sudo umount root
```

Just one command:

```
mkfs.ext4 -d ../builroot/output/ root.img 10G
```

### Bootable image

```
mkfs.ext4 -d new-root -r 1 -N 0 -m 5 -L "rootfs" -O ^64bit new-rootfs.ext4 "250M"
```

```
image shaurash.img {
  hdimage {
    gpt = true
  }

  partition root {
    image = "new-rootfs.ext4"
  }
}
```

Answer this : https://unix.stackexchange.com/questions/235145/

- how-to-boot-using-a-squashfs-image-as-rootfs
- https://stackoverflow.com/questions/27986063/mount-squashfs-as-root-in-initramfs-raspbian
- https://unix.stackexchange.com/questions/297690/predictable-partition-name-for-squashfs-partition-in-initramfs
- http://lists.busybox.net/pipermail/buildroot/2013-January/066156.html
- https://wiki.gentoo.org/wiki/Handbook:X86/Working/Initscripts


### VirtualBox default resolution

- https://forums.virtualbox.org/viewtopic.php?f=1&t=78757
- https://www.virtualbox.org/manual/ch03.html#efividmode

VBoxManage setextradata "Shaurash" VBoxInternal2/EfiGraphicsResolution 1920x1080



### Reference

- https://github.com/pengutronix/genimage
- https://github.com/pengutronix/genimage/blob/dcbb7954369bfca7cf66f2c7958283ebe02cd1f8/test/vfat.config
- https://askubuntu.com/questions/1023741/booting-dd-image-on-virtualbox
- https://docs.oracle.com/en/virtualization/virtualbox/6.0/user/vboxmanage-convertfromraw.html
- https://askubuntu.com/questions/19430/mount-a-virtualbox-drive-image-vdi
- Extend partition with fdisk -c=dos https://www.ibm.com/docs/en/cloud-pak-system-w3550/2.3.3?topic=images-extending-partition-file-system-sizes
- https://superuser.com/questions/352572/why-does-the-partition-start-on-sector-2048-instead-of-63
- https://askubuntu.com/questions/190030/formatting-a-drive-to-fat32-with-mkdosfs-need-some-info
