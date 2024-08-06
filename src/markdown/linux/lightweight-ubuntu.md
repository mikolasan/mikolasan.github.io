---
date: 2021-06-04
title: Lightweight Ubuntu
published: 2021-10-14
lastModified: 2021-10-14
---

**Important!** Some steps in this tutorial might be dangerous for your system.


## Step 1 - Make a backup

We will send a backup over the network from one machine to another.

First, prepare the receiver (IP address here is `192.168.0.7`)

```bash
nc -lp 1024 > stage-ubuntu18.04.tar.gz
```

And then send all important files except things created by the kernel at runtime and (optional) skip some folders in `/var` and `/usr`

```bash
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


## Step 2 - Remove packages


How to list all installed packages ([ask ubuntu](https://askubuntu.com/questions/17823/how-to-list-all-installed-packages)):

```bash
apt list --installed
```

You will use apt a lot during this stage, so be comfortable with it, here is [APT Cheat Sheet](https://blog.packagecloud.io/eng/2015/03/30/apt-cheat-sheet/)

```bash
sudo apt-get --purge remove firefox
sudo apt-get --purge remove libreoffice*
sudo apt-get --purge remove transmission-*
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
sudo apt-get --purge remove linux-headers-4.15.0-29 linux-headers-4.15.0-29-generic linux-image-4.15.0-29-generic linux-modules-4.15.0-29-generic linux-modules-extra-4.15.0-29-generic linux-generic linux-headers-generic linux-image-generic

sudo apt-get --purge remove cups gnome-getting-started-docs* gnome-user-docs* gnome-user-guide* lintian* ubuntu-docs* unattended-upgrades
sudo apt-get --purge remove gnome-software* cups-server-common*
sudo apt-get --purge remove whoopsie* gnome-control-center-data
sudo apt-get --purge remove aspell 
sudo apt-get --purge remove rpm
sudo apt-get --purge remove gvfs*
sudo apt-get --purge remove gedit* gdbserver
sudo apt-get --purge remove xdg-desktop-portal-*
```


## Step 3 - Stop services

```bash
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
- https://www.reddit.com/r/Ubuntu/comments/clu0lj/short_guide_to_improve_slow_boot_on_ubuntu_1804/

## Step 4 - Remove snaps

```bash
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

Source: https://www.kevin-custer.com/blog/disabling-snaps-in-ubuntu-20-10-and-20-04-lts/


## Step 5 - Use `bspwm`

```bash
sudo apt update
sudo apt-get install bspwm

grep -rn pam_secure /etc/pam.d
/etc/pam.d/login:32:auth [success=ok new_authtok_reqd=ok ignore=ignore user_unknown=bad default=die] pam_securetty.so
# comment out that line
sudo nano /etc/pam.d/login

sudo apt install plymouth-themes
```

**/etc/lightdm/lightdm.conf**

```
[LightDM]
logind-check-graphical=true
[SeatDefaults]
autologin-user=root
autologin-user-timeout=0
autologin-session=bspwm
user-session=bspwm
xserver-command=X -core
```

Reference:

- https://www.digitalocean.com/community/tutorials/how-to-use-pam-to-configure-authentication-on-an-ubuntu-12-04-vps


## Step 6 - Remove development packages

**Important!** This is super experimental approach

```bash
sudo apt list --installed | grep -Eo ".+\-dev\/" | sed 's/\///' | tr '\n' ' '

sudo apt-get --purge remove comerr-dev libc6-dev libdrm-dev libelf-dev libffi-dev libfreetype6-dev libftgl-dev libgl1-mesa-dev libglew-dev libglu1-mesa-dev libglvnd-core-dev libglvnd-dev libgmp-dev libgnutls28-dev libice-dev libidn2-0-dev libidn2-dev libkrb5-dev libmirclient-dev libmircommon-dev libmircookie-dev libmircore-dev libogg-dev libp11-kit-dev libphonon4qt5-dev libpng-dev libpq-dev libprotobuf-dev libpthread-stubs0-dev libreadline-dev librtmp-dev libsm-dev libssl-dev libtasn1-6-dev libtheora-dev libtinfo-dev libudev-dev libusb-1.0-0-dev libva-amdgpu-emb-dev libvdpau-amdgpu-emb-dev libx11-dev libx11-xcb-dev libxau-dev libxcb-dri2-0-dev libxcb-dri3-dev libxcb-glx0-dev libxcb-present-dev libxcb-randr0-dev libxcb-render0-dev libxcb-shape0-dev libxcb-sync-dev libxcb-xfixes0-dev libxcb1-dev libxdamage-dev libxdmcp-dev libxext-dev libxfixes-dev libxkbcommon-dev libxshmfence-dev libxt-dev libxxf86vm-dev linux-libc-dev manpages-dev mesa-common-dev nettle-dev x11proto-core-dev x11proto-damage-dev x11proto-dev x11proto-dri2-dev x11proto-fixes-dev x11proto-gl-dev x11proto-xext-dev x11proto-xf86vidmode-dev xtrans-dev zlib1g-dev
```

## Step 7 (optional) - Change Linux kernel


In Ubuntu the kernel comes in a group of several packages. You can list them like this

```bash
apt list | grep 5.15.0.*generic
```

But there is a script that helps to see what kernel versions are available for your Ubuntu version

```bash
wget https://raw.githubusercontent.com/pimlie/ubuntu-mainline-kernel.sh/master/ubuntu-mainline-kernel.sh
chmod +x ubuntu-mainline-kernel.sh
sudo mv ubuntu-mainline-kernel.sh /usr/local/bin/
ubuntu-mainline-kernel.sh -c # what's the latest
ubuntu-mainline-kernel.sh -r # list all
sudo ubuntu-mainline-kernel.sh -i v5.15.133 # install specific
```

## Clean

Check with `ncdu` (it's `du` with **ncurses**) and also

```bash
apt clean
# clear journalctl
sudo journalctl --rotate
sudo journalctl --vacuum-time=1s
```


## Final step

With clean and improved Ubuntu it's time to repeat step 1 and make another snapshot of our work.

At this point Ubuntu should shrink from 6GB down to 1GB. We did this long procedure to create something mobile that can be used as an installer or OS for embedded system but still be compatible with Ubuntu package repositories.

There are rumors that Ubuntu Core already achieved the smallest size and targeted embedded devices, so you don't need to remove anything from it, but I haven't tried it yet.


## Bash-fu

```bash

cat /proc/modules | cut -f 1 -d " " | while read module; do  echo "Module: $module";  if [ -d "/sys/module/$module/parameters" ]; then   ls /sys/module/$module/parameters/ | while read parameter; do    echo -n "Parameter: $parameter --> ";    sudo cat /sys/module/$module/parameters/$parameter;   done;  fi;  echo; done | less

sudo grep 'menuentry \|submenu ' /boot/grub/grub.cfg | cut -f2 -d "'"
sudo nano /etc/default/grub
GRUB_DEFAULT='Advanced options for Ubuntu>Ubuntu, with Linux 6.1.61-amd'
sudo update-grub
```