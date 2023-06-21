---
title: Upgrade Android on Nvidia Shield
date: 2023-06-17
published: 2023-06-17
lastModified: 2023-06-17
---

## Backup

### Super critical data

Even if backups will work fine I have a list of things that I'd like to perform manually. 

- Transfer 2FA applications to another device
- Download photos and notes. And download "Downloads"

You can add your valuable items to the list by doing the following exercise. Look at every application and imagine that you delete it, then ask yourself: what will I lose when it's deleted? what if I never can open this app?

### Software backup

**adb** provides some backup functionality. I will use version 1.0.41 from SDK 34.0.3-10161052. You can download [Android SDK Platform Tools](https://developer.android.com/tools/adb) or, if you have Android Studio installed copy it from `C:\Users\<username>\AppData\Local\Android\Sdk\platform-tools`. I used **Minimal ADB and Fastboot** before but apparently it's an unofficial repack, so it can be sketchy depending on where you download it from.

No root required, only the developer mode, but it only copies installed APKs including system apps.

```powershell
adb backup -apk -shared -all -f C:\Users\neupo\shield_upgrade\backup_shield.ab
```

- `-apk` include APK, so when it restores the system it doesn't need to download it from the store. Especially I like to have identical version that I kept on the device and never updated. That happened with very good guitar tuner. It was simple functional and elegant. But after a few years they added a shit load of crap: many more tabs, subscription to pro version, advertisements. What was wrong in the previous version? Or Weather Underground. The forecast was so nicely represented on one screen that I fell in love with that app and weather forecasts. But then they completely re-wrote the app. It become absolutely unusable. Sometimes you just want to keep what you like.
- `-shared` to save SD card content
- `-all` nothing to do with other flags, this one means to include all packages (it's possible to specify packages for backup, but we do a full backup)
- `-system` include system applications too (I think NVIDIA stuff will go into this category)
- maybe you will want APK expansions with `-oob`


### Make recovery image

As mentioned in these answers [ [1](https://android.stackexchange.com/a/104856/392080) ] [ [2](https://android.stackexchange.com/a/159860/392080) ] one can do a full backup of

- boot
- system
- data (there is [a trick](https://forum.fairphone.com/t/how-to-backup-your-internal-storage-through-a-twrp-backup/64010) to include the Internal Storage)

by booting into TWRP and doing so called NANDroid backup (IDK, it's just a big "Backup" button on the main screen)

Once you [find a TWRP image](https://twrp.me/Devices/) for your device, [Nvidia Shield](https://twrp.me/nvidia/nvidiahshieldtablet.html). Download **TWRP** 3.7.0: `twrp-3.7.0_9-0-shieldtablet.img` from [TWRP website](https://eu.dl.twrp.me/shieldtablet/), rename it to **twrp.img**. After the process looks like this. 

```powershell
adb reboot bootloader

# when device at the booloader screen
fastboot flash recovery twrp.img

# be ready to press a key combo
fastboot reboot
```

Before the tablet/phone boots up hold **Volume Down + Power** buttons. This way we end up in the same bootloader, select **Recovery Mode** and it will load TWRP. 

For more details read [here](https://forum.fairphone.com/t/how-to-backup-your-internal-storage-through-a-twrp-backup/64010)

![enter image description here](./upgrade-android-on-shield-nandroid-backup.jpg)

I assume this is equivalent to connecting via ssh and `dd` every partition which I would do if I need to backup some very important system.


## Choose Android flavor

Choose android flavor:

- [LinageOS](https://wiki.lineageos.org/devices/shieldtablet/) ([build instructions](https://wiki.lineageos.org/devices/shieldtablet/build), [github](https://github.com/LineageOS/android_device_nvidia_shieldtablet))
- OASP, build from source

So I open VirtualBox and blow off dust from my Ubuntu 18 virtual machine. "Blowing" means I run `apt update && apt upgrade`. It's also possible to do everything in a docker container:

```bash
docker run -it --name lineage-build ubuntu:18.04 bash
```

Then prepare docker a bit

```bash
apt update && apt install sudo
update-alternatives --install /usr/bin/python python /usr/bin/python3.6 1
mkdir -p  ~/.local/bin
export PATH=~/.local/bin:${PATH}
git config --global user.email "do_not_send_me_spam@gmail.com"
git config --global user.name "Nikolay Neupokoev"
```

Then we follow the build instructions. The excerpt.

Install stuff

```bash
sudo apt install bc bison build-essential ccache curl flex g++-multilib gcc-multilib git git-lfs gnupg gperf imagemagick \
  lib32ncurses5-dev lib32readline-dev lib32z1-dev libelf-dev liblz4-tool libncurses5 libncurses5-dev \
  libsdl1.2-dev libssl-dev libxml2 libxml2-utils lzop pngcrush rsync \
  schedtool squashfs-tools xsltproc \
  zip zlib1g-dev \
  libwxgtk3.0-dev

curl https://storage.googleapis.com/git-repo-downloads/repo > ~/.local/bin/repo
chmod a+x ~/.local/bin/repo
```

Set some build tweaks

```bash
export USE_CCACHE=1
export CCACHE_EXEC=/usr/bin/ccache
ccache -M 50G
ccache -o compression=true
export ANDROID_JACK_VM_ARGS="-Dfile.encoding=UTF-8 -XX:+TieredCompilation -Xmx4G"
```

Get the repo. Note: you have to [use local directories](https://stackoverflow.com/questions/72547134/repo-init-fails-while-cloning-manifest) owned by your user and not ones mounted into virtual machine from the host that usually have `root:vboxsf` ownership.

```bash
mkdir ~/lineage
cd ~/lineage/
repo init -u https://github.com/LineageOS/android.git -b lineage-15.1 --git-lfs
source build/envsetup.sh
```


## Install

## Verify


## Resources


https://github.com/LineageOS/android_device_nvidia_shieldtablet

- [HOWTO: Unpack, Edit, and Re-Pack Boot Images](https://web.archive.org/web/20200128133443/http://android-dls.com:80/wiki/index.php?title=HOWTO:_Unpack,_Edit,_and_Re-Pack_Boot_Images)

- On [NVIDIA Open Source Resources](https://developer.nvidia.com/shield-open-source) you can find a stock image for Shield Tablet K1 and restore it (for example following [this video](https://www.youtube.com/watch?v=yp2eT-sE2fo)


### Websites

- [XDA](https://forum.xda-developers.com/)