---
path: /blog/custom-linux
date: 2021-06-04
title: Custom Linux + Installer
published: 2021-10-14
lastModified: 2021-10-14
---

How to make an installer from one Linux system so that people can replicate it later on any machine without a hassle with extra work in configuration files or with package manager.


## Step 1 - Make a backup

```bash
nc -lp 1024 > stage-ubuntu18.04.tar.gz

sudo tar -cvpz \
    --exclude=/dev \
    --exclude="lost+found" \
    --exclude=/media \
    --exclude=/mnt \
    --exclude=/proc \
    --exclude=/run \
    --exclude=/sys \
    --exclude=/tmp \
    --exclude=/var/cache/apt/archives/* \
    --exclude=/var/lib/apt/lists/* \
    --exclude=/var/lib/dpkg/* \
    --exclude=/var/log/* \
    --exclude=/var/run/* \
    --exclude=/usr/share/doc/* \
    --exclude=/usr/share/man/* \
    --exclude=/usr/share/locale/* \
    --exclude=/usr/share/help/* \
    --exclude=/usr/src/* \
    / \
| nc -q 0 192.168.0.7 1024
```


## Step 2 - Clean up your system


How to list all installed packages ([ask ubuntu](https://askubuntu.com/questions/17823/how-to-list-all-installed-packages)):

```bash
apt list --installed
```

You will use apt a lot during this stage, so be comfortable with it, here is [APT Cheat Sheet](https://blog.packagecloud.io/eng/2015/03/30/apt-cheat-sheet/)

```bash
sudo apt-get --purge remove firefox
sudo apt-get --purge remove anydesk
sudo apt-get --purge remove teamviewer
sudo apt-get --purge remove autoconf automake cmake
sudo apt-get --purge remove autotools-dev
sudo apt-get --purge remove brltty
sudo apt-get --purge remove build-essential
sudo apt autoremove
sudo apt-get --purge remove gedit* gdb*
sudo apt-get --purge remove git gparted imagemagick make m4 meld
sudo apt-get --purge remove nautilus qtbase5-dev samba seahorse vim-gtk3
sudo apt-get --purge remove qttranslations5-l10n
sudo apt-get --purge remove samba-* sane*
sudo apt-get --purge remove update-manager update-notifier-common
sudo apt-get --purge remove fonts-noto-cjk
sudo apt-get --purge remove lib32stdc++-7-dev libx32stdc++-7-dev libx32gcc-7-dev lib32gcc-7-dev libstdc++-7-dev:amd64
sudo apt autoremove
sudo apt-get --purge remove gtkterm
sudo apt-get --purge remove syslinux
sudo apt-get install lightdm gir1.2-lightdm-1 python-gobject
sudo apt-get --purge remove gdm3
```
```
sudo nano /etc/lightdm/lightdm.conf
[LightDM]
logind-check-graphical=true
[SeatDefaults]
autologin-user=root
autologin-user-timeout=0
autologin-session=bspwm
user-session=bspwm
xserver-command=X -core
```
```
sudo apt-get --purge remove linux-headers-4.15.0-29 linux-headers-4.15.0-29-generic linux-image-4.15.0-29-generic linux-modules-4.15.0-29-generic linux-modules-extra-4.15.0-29-generic linux-generic linux-headers-generic linux-image-generic

sudo apt-get --purge remove cups gnome-getting-started-docs* gnome-user-docs* gnome-user-guide* lintian* ubuntu-docs* unattended-upgrades
sudo apt-get --purge remove gnome-software* cups-server-common*
sudo apt-get --purge remove whoopsie* gnome-control-center-data
sudo apt-get --purge remove aspell 
sudo apt-get --purge remove rpm
sudo apt-get --purge remove gvfs*
sudo apt-get --purge remove gedit* gdbserver

sudo systemctl disable cups
sudo systemctl disable cupsd
sudo systemctl disable cups-browsed

sudo chmod -x /usr/lib/evolution/evolution-calendar-factory
sudo chmod -x /usr/lib/evolution/evolution-source-registry
sudo chmod -x /usr/lib/evolution/evolution-addressbook-factory
systemctl disable avahi-daemon.socket avahi-daemon.service
systemctl mask avahi-daemon.socket avahi-daemon.service

systemctl stop apt-daily.timer apt-daily-upgrade.timer
systemctl disable apt-daily.timer apt-daily-upgrade.timer
systemctl mask apt-daily.service apt-daily-upgrade.service
systemd-run --property="After=apt-daily.service apt-daily-upgrade.service" --wait /bin/true

sudo apt autoremove --purge snapd gnome-software-plugin-snap
sudo rm -r /var/cache/snapd/
rm -rf ~/snap
sudo apt-mark hold snapd

sudo systemctl mask wpa_supplicant.service
```

Reference:

- https://prahladyeri.com/blog/2017/09/how-to-trim-your-new-ubuntu-installation-of-extra-fat-and-make-it-faster.html
- https://askubuntu.com/questions/480753/remove-evolution-calendar-factory-from-startup/816353#816353
- https://unix.stackexchange.com/questions/306276/make-systemd-stop-starting-unwanted-wpa-supplicant-service



### Super experimental approach:

```
sudo apt list --installed | grep -Eo ".+\-dev\/" | sed 's/\///' | tr '\n' ' '

sudo apt-get --purge remove comerr-dev libc6-dev libdrm-dev libelf-dev libffi-dev libfreetype6-dev libftgl-dev libgl1-mesa-dev libglew-dev libglu1-mesa-dev libglvnd-core-dev libglvnd-dev libgmp-dev libgnutls28-dev libice-dev libidn2-0-dev libidn2-dev libkrb5-dev libmirclient-dev libmircommon-dev libmircookie-dev libmircore-dev libogg-dev libp11-kit-dev libphonon4qt5-dev libpng-dev libpq-dev libprotobuf-dev libpthread-stubs0-dev libreadline-dev librtmp-dev libsm-dev libssl-dev libtasn1-6-dev libtheora-dev libtinfo-dev libudev-dev libusb-1.0-0-dev libva-amdgpu-emb-dev libvdpau-amdgpu-emb-dev libx11-dev libx11-xcb-dev libxau-dev libxcb-dri2-0-dev libxcb-dri3-dev libxcb-glx0-dev libxcb-present-dev libxcb-randr0-dev libxcb-render0-dev libxcb-shape0-dev libxcb-sync-dev libxcb-xfixes0-dev libxcb1-dev libxdamage-dev libxdmcp-dev libxext-dev libxfixes-dev libxkbcommon-dev libxshmfence-dev libxt-dev libxxf86vm-dev linux-libc-dev manpages-dev mesa-common-dev nettle-dev x11proto-core-dev x11proto-damage-dev x11proto-dev x11proto-dri2-dev x11proto-fixes-dev x11proto-gl-dev x11proto-xext-dev x11proto-xf86vidmode-dev xtrans-dev zlib1g-dev
```


### Snaps

```
nano remove_old_snaps.sh
#!/bin/bash
# Removes old revisions of snaps
# CLOSE ALL SNAPS BEFORE RUNNING THIS
set -eu

LANG=en_US.UTF-8 snap list --all | awk '/disabled/{print $1, $3}' |
    while read snapname revision; do
        snap remove "$snapname" --revision="$revision"
    done

chmod +x remove_old_snaps.sh
sudo ./remove_old_snaps.sh


snap list --all
sudo snap remove notepad-plus-plus
sudo snap remove wine-platform-5-stable
sudo snap remove wine-platform-runtime
sudo snap remove gnome-calculator
sudo snap remove gnome-system-monitor
```

https://www.kevin-custer.com/blog/disabling-snaps-in-ubuntu-20-04/


## Step 3 - The installer or Build your own Linux to make it small :)

Buildroot or https://bitbucket.org/EthoGames/game-installer/src/master/

```bash
make pc_x86_64_bios_defconfig
export LD_LIBRARY_PATH=""
make
```

Reference:

- http://nightly.buildroot.org/manual.html#_buildroot_quick_start
- https://stackoverflow.com/questions/43381612/buildroot-building-iso-image/54847720#54847720
- https://www.viatech.com/en/2015/06/buildroot/


## Step 4 - Test installer in VirtualBox

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

Reference:

- https://github.com/pengutronix/genimage
- https://askubuntu.com/questions/1023741/booting-dd-image-on-virtualbox
- https://docs.oracle.com/en/virtualization/virtualbox/6.0/user/vboxmanage-convertfromraw.html
- https://askubuntu.com/questions/19430/mount-a-virtualbox-drive-image-vdi
- Extend partition with fdisk -c=dos https://www.ibm.com/docs/en/cloud-pak-system-w3550/2.3.3?topic=images-extending-partition-file-system-sizes
- https://superuser.com/questions/352572/why-does-the-partition-start-on-sector-2048-instead-of-63

