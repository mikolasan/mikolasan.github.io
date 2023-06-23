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
# install all stuff in the container
# ...
# use it again next day
docker start -i lineage-build
# or save as image (very fat image though)
docker container ls -a -s # check size (72.7GB)
docker commit lineage-build lineagos:15.1
docker run --tty --detached --privileged --volume /dev/bus/usb:/dev/bus/usb --publish-all --name lineage-build-2 lineagos:15.1
docker ps -a
docker exec --tty --interactive d886b12741a8 bash
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
  libwxgtk3.0-dev \
  openjdk-8-jdk

curl -L -o platform-tools.zip https://dl.google.com/android/repository/platform-tools-latest-linux.zip
unzip platform-tools.zip -d ~

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
export PATH=/root/platform-tools:/root/.local/bin:$PATH
```

Get the repo. Note: you have to [use local directories](https://stackoverflow.com/questions/72547134/repo-init-fails-while-cloning-manifest) owned by your user and not ones mounted into virtual machine from the host that usually have `root:vboxsf` ownership.

```bash
mkdir ~/lineage
cd ~/lineage/
repo init -u https://github.com/LineageOS/android.git -b lineage-15.1 --git-lfs
source build/envsetup.sh

cd /lineage/device/nvidia/shieldtablet
```

Ooooo, it doesn't look good

```bash
============================================
[44/44] bootstrap /lineage/out/soong/.minibootstrap/build.ninja.in
[4/4] /lineage/out/soong/.bootstrap/bin/minibp /lineage/out/soong/.bootstrap/build.ninja
[878/879] glob vendor/qcom/opensource/interfaces/wifi/supplicant/1.0/Android.bp
[56/56] /lineage/out/soong/.bootstrap/bin/soong_build /lineage/out/soong/build.ninja
/lineage/out/build-lineage_shieldtablet.ninja is missing, regenerating...
[742/1072] including ./system/sepolicy/Android.mk ...
./system/sepolicy/Android.mk:99: warning: BOARD_SEPOLICY_VERS not specified, assuming current platform version
[1072/1072] including ./vendor/qcom/opensource/rcs-service/Android.mk ...
PRODUCT_COPY_FILES device/nvidia/shield-common/keylayout/Vendor_054c_Product_0268.kl:system/usr/keylayout/Vendor_054c_Product_0268.kl ignored.
[ 99% 1282/1283] glob vendor/qcom/opensource/interfaces/wifi/supplicant/1.0/Android.bp
ninja: error: 'vendor/nvidia/shieldtablet/proprietary/vendor/app/NvShieldTech/NvShieldTech.apk', needed by '/lineage/out/target/product/shieldtablet/obj/APPS/NvShieldTech_intermediates/package.apk', missing and no known rule to make it
22:44:36 ninja failed with: exit status 1

#### failed to build some targets (27 seconds) ####
```

```bash
root@d886b12741a8:/lineage/device/nvidia/shieldtablet# ./extract-files.sh
No device is online. Waiting for one...
Please connect USB and/or enable USB debugging
Device Found.
Cleaning output directory (./../../../vendor/nvidia/shieldtablet/proprietary)..
Extracting 160 files in ./proprietary-files.txt from adb:
  - /system/etc/hdcpsrm/hdcp1x.srm ..
  - /system/etc/hdcpsrm/hdcp2x.srm ..
  - /system/etc/hdcpsrm/hdcp2xtest.srm ..
  - /system/vendor/bin/downloader ..
    !! file not found in source
  - /system/vendor/bin/glgps_nvidiaTegra2android ..
    !! file not found in source
  - /system/vendor/bin/gps_select.sh ..
    !! file not found in source
  - /system/vendor/bin/icera-switcherd ..
    !! file not found in source
  - /system/vendor/bin/modemnic ..
    !! file not found in source
  - /system/vendor/bin/rm_ts_server ..
    !! file not found in source
  - /system/vendor/bin/run_ss_status.sh ..
    !! file not found in source
  - /system/vendor/bin/ss_status ..
    !! file not found in source
  - /system/vendor/bin/tlk_daemon ..
    !! file not found in source
  - /system/vendor/bin/ussrd ..
    !! file not found in source
  - /system/vendor/etc/model_frontal.xml ..
  - /system/vendor/etc/public.libraries.txt ..
  - /system/vendor/firmware/bcm43241.hcd ..
    !! file not found in source
  - /system/vendor/firmware/fw_bcmdhd.bin ..
  - /system/vendor/firmware/gk20a/NETB_img.bin ..
  - /system/vendor/firmware/gk20a/fecs.bin ..
  - /system/vendor/firmware/gk20a/gpccs.bin ..
  - /system/vendor/firmware/gk20a/gpmu_ucode.bin ..
  - /system/vendor/firmware/nvavp_aacdec_ucode.bin ..
  - /system/vendor/firmware/nvavp_aud_ucode.bin ..
  - /system/vendor/firmware/nvavp_mp3dec_ucode.bin ..
  - /system/vendor/firmware/nvavp_os_0ff00000.bin ..
  - /system/vendor/firmware/nvavp_os_8ff00000.bin ..
  - /system/vendor/firmware/nvavp_os_eff00000.bin ..
  - /system/vendor/firmware/nvavp_os_f7e00000.bin ..
  - /system/vendor/firmware/nvavp_vid_ucode_alt.bin ..
  - /system/vendor/firmware/nvram_43241.txt ..
    !! file not found in source
  - /system/vendor/firmware/tegra12x/nvhost_msenc031.fw ..
  - /system/vendor/firmware/tegra12x/nvhost_tsec.fw ..
    !! file not found in source
  - /system/vendor/firmware/tegra12x/vic03_ucode.bin ..
  - /system/vendor/firmware/tegra12x_xusb_firmware ..
    !! file not found in source
  - /system/vendor/firmware/tegra_xusb_firmware ..
    !! file not found in source
  - /system/vendor/lib/egl/libEGL_tegra.so ..
  - /system/vendor/lib/egl/libGLESv1_CM_tegra.so ..
  - /system/vendor/lib/egl/libGLESv2_tegra.so ..
  - /system/vendor/lib/hw/audio.primary.tegra.so ..
  - /system/vendor/lib/hw/camera.tegra.so ..
  - /system/vendor/lib/hw/gps.brcm.so ..
    !! file not found in source
  - /system/vendor/lib/hw/gralloc.tegra.so ..
  - /system/vendor/lib/hw/hwcomposer.tegra.so ..
  - /system/vendor/lib/hw/keystore.tegra.so ..
  - /system/vendor/lib/hw/memtrack.tegra.so ..
  - /system/vendor/lib/hw/sensors.default.api_v1.3.mpl520.nvs.so ..
    !! file not found in source
  - /system/vendor/lib/hw/ts.default.so ..
  - /system/vendor/lib/hw/vulkan.tegra.so ..
  - /system/vendor/lib/libaffinitydaemon.so ..
  - /system/vendor/lib/libcuda.so ..
  - /system/vendor/lib/libfirmwareupdate.so ..
  - /system/vendor/lib/libglcore.so ..
  - /system/vendor/lib/libgov_boot.so ..
  - /system/vendor/lib/libgov_camera.so ..
  - /system/vendor/lib/libgov_force.so ..
  - /system/vendor/lib/libgov_generic.so ..
  - /system/vendor/lib/libgov_gpucompute.so ..
  - /system/vendor/lib/libgov_graphics.so ..
  - /system/vendor/lib/libgov_il.so ..
  - /system/vendor/lib/libgov_spincircle.so ..
  - /system/vendor/lib/libgov_tbc.so ..
  - /system/vendor/lib/libgov_ui.so ..
  - /system/vendor/lib/libhidraw.so ..
  - /system/vendor/lib/liblota.so ..
  - /system/vendor/lib/libmllite.so ..
    !! file not found in source
  - /system/vendor/lib/libmplmpu.so ..
    !! file not found in source
  - /system/vendor/lib/libnvRSCompiler.so ..
  - /system/vendor/lib/libnvRSDriver.so ..
  - /system/vendor/lib/libnvaudiofx.so ..
  - /system/vendor/lib/libnvavp.so ..
  - /system/vendor/lib/libnvblit.so ..
  - /system/vendor/lib/libnvcam_imageencoder.so ..
  - /system/vendor/lib/libnvcamerahdr_v3.so ..
  - /system/vendor/lib/libnvcameranrr.so ..
  - /system/vendor/lib/libnvcamerautils.so ..
  - /system/vendor/lib/libnvcamlog.so ..
  - /system/vendor/lib/libnvcontrol_jni.so ..
  - /system/vendor/lib/libnvcpl.so ..
  - /system/vendor/lib/libnvcudautils.so ..
  - /system/vendor/lib/libnvddk_2d_v2.so ..
  - /system/vendor/lib/libnvddk_vic.so ..
  - /system/vendor/lib/libnvfnet.so ..
  - /system/vendor/lib/libnvfnetstoredefog.so ..
  - /system/vendor/lib/libnvfnetstorehdfx.so ..
  - /system/vendor/lib/libnvglsi.so ..
  - /system/vendor/lib/libnvgr.so ..
  - /system/vendor/lib/libnvhwc_service.so ..
  - /system/vendor/lib/libnvisp_v3.so ..
  - /system/vendor/lib/libnvmm.so ..
  - /system/vendor/lib/libnvmm_audio.so ..
  - /system/vendor/lib/libnvmm_camera_v3.so ..
  - /system/vendor/lib/libnvmm_contentpipe.so ..
  - /system/vendor/lib/libnvmm_msaudio.so ..
  - /system/vendor/lib/libnvmm_parser.so ..
  - /system/vendor/lib/libnvmm_utils.so ..
  - /system/vendor/lib/libnvmm_writer.so ..
  - /system/vendor/lib/libnvmmlite.so ..
  - /system/vendor/lib/libnvmmlite_audio.so ..
  - /system/vendor/lib/libnvmmlite_image.so ..
  - /system/vendor/lib/libnvmmlite_utils.so ..
  - /system/vendor/lib/libnvmmlite_video.so ..
  - /system/vendor/lib/libnvodm_imager.so ..
  - /system/vendor/lib/libnvoice.so ..
  - /system/vendor/lib/libnvomx.so ..
  - /system/vendor/lib/libnvomxadaptor.so ..
  - /system/vendor/lib/libnvomxilclient.so ..
  - /system/vendor/lib/libnvos.so ..
  - /system/vendor/lib/libnvparser.so ..
  - /system/vendor/lib/libnvrm.so ..
  - /system/vendor/lib/libnvrm_gpu.so ..
  - /system/vendor/lib/libnvrm_graphics.so ..
  - /system/vendor/lib/libnvrmapi_tegra.so ..
  - /system/vendor/lib/libnvtnr.so ..
  - /system/vendor/lib/libnvtvmr.so ..
  - /system/vendor/lib/libnvvicsi_v3.so ..
  - /system/vendor/lib/libnvwsi.so ..
  - /system/vendor/lib/liboemcrypto.so ..
  - /system/vendor/lib/libopencv24_tegra.so ..
    !! file not found in source
  - /system/vendor/lib/libphs.so ..
  - /system/vendor/lib/libprotobuf-cpp-lold.so ..
    !! file not found in source
  - /system/vendor/lib/libril-icera.so ..
    !! file not found in source
  - /system/vendor/lib/librm31080.so ..
  - /system/vendor/lib/librm_ts_service.so ..
  - /system/vendor/lib/libscf.so ..
  - /system/vendor/lib/libsensors.fusion.mpl520.nvs.so ..
    !! file not found in source
  - /system/vendor/lib/libsensors.hal-drivers.nvs.so ..
    !! file not found in source
  - /system/vendor/lib/libsensors.hal.nvs.so ..
    !! file not found in source
  - /system/vendor/lib/libsensors.prefusion.mpl520.nvs.so ..
    !! file not found in source
  - /system/vendor/lib/libshieldtech.so ..
  - /system/vendor/lib/libtbb.so ..
    !! file not found in source
  - /system/vendor/lib/libtlk_secure_hdcp_up.so ..
  - /system/vendor/lib/libtsec_wrapper.so ..
  - /system/vendor/lib/libtsechdcp.so ..
  - /system/vendor/lib/libussrd.so ..
  - /system/vendor/lib/libw.so ..
    !! file not found in source
  - /system/vendor/lib/mediadrm/libwvdrmengine.so ..
  - /system/vendor/lib/nvshieldtech.so ..
  - /system/vendor/lib/para_10_02_00_20.so ..
  - /system/vendor/lib/para_10_02_00_a0.so ..
  - /system/vendor/lib/para_10_02_00_b0.so ..
  - /system/vendor/lib/para_10_03_00_20.so ..
  - /system/vendor/lib/para_10_03_00_a0.so ..
  - /system/vendor/lib/para_10_03_00_b0.so ..
  - /system/vendor/lib/para_10_04_00_b0.so ..
  - /system/vendor/lib/para_10_04_00_c0.so ..
  - /system/vendor/lib/para_10_05_00_c0.so ..
  - /system/vendor/lib/para_10_06_00_b0.so ..
  - /system/vendor/lib/para_10_07_00_b0.so ..
  - /system/vendor/lib/para_10_08_00_20.so ..
  - /system/vendor/lib/para_10_08_00_a0.so ..
  - /system/vendor/lib/para_10_08_00_b0.so ..
  - /system/vendor/lib/para_10_09_00_c0.so ..
  - /system/vendor/lib/para_10_09_01_c0.so ..
  - /system/vendor/lib/para_10_09_02_c0.so ..
  - /system/vendor/lib/para_10_0a_00_b0.so ..
  - /system/vendor/lib/para_10_0b_00_a0.so ..
  - /system/vendor/lib/touch_para_10.so ..
    !! file not found in source
  - /system/vendor/app/ConsoleUI/ConsoleUI.apk ..
Checking if system is odexed and locating boot.oats...
  - /system/vendor/app/NvCPLSvc/NvCPLSvc.apk ..
  - /system/vendor/app/NvShieldTech/NvShieldTech.apk ..
    !! file not found in source
root@d886b12741a8:/lineage/device/nvidia/shieldtablet# ls -l /lineage/vendor/nvidia
total 4
drwxr-xr-x 1 root root 4096 Jun 21 22:33 shieldtablet
root@d886b12741a8:/lineage/device/nvidia/shieldtablet# ls -l /lineage/vendor/nvidia/shieldtablet/
total 32
-rw-r--r-- 1 root root  1814 Jun 21 22:33 Android.mk
-rw-r--r-- 1 root root   716 Jun 21 22:33 BoardConfigVendor.mk
drwxr-xr-x 4 root root  4096 Jun 21 22:33 proprietary
-rw-r--r-- 1 root root 20163 Jun 21 22:33 shieldtablet-vendor.mk
root@d886b12741a8:/lineage/device/nvidia/shieldtablet# ls -l /lineage/vendor/nvidia/shieldtablet/proprietary/
total 8
drwxr-xr-x 3 root root 4096 Jun 21 22:33 etc
drwxr-xr-x 7 root root 4096 Jun 21 22:33 vendor
root@d886b12741a8:/lineage/device/nvidia/shieldtablet# ls -l /lineage/vendor/nvidia/shieldtablet/proprietary/vendor/
total 20
drwxr-xr-x 5 root root 4096 Jun 21 22:33 app
drwxr-xr-x 2 root root 4096 Jun 21 22:33 bin
drwxr-xr-x 2 root root 4096 Jun 21 22:33 etc
drwxr-xr-x 4 root root 4096 Jun 21 22:33 firmware
drwxr-xr-x 5 root root 4096 Jun 21 22:33 lib
root@d886b12741a8:/lineage/device/nvidia/shieldtablet# ls -l /lineage/vendor/nvidia/shieldtablet/proprietary/vendor/firmware/
total 680
-rw-r--r-- 1 root root 452189 Jun 21 22:33 fw_bcmdhd.bin
drwxr-xr-x 2 root root   4096 Jun 21 22:33 gk20a
-rw-r--r-- 1 root root  57804 Jun 21 22:33 nvavp_aacdec_ucode.bin
-rw-r--r-- 1 root root  12804 Jun 21 22:33 nvavp_aud_ucode.bin
-rw-r--r-- 1 root root  42460 Jun 21 22:33 nvavp_mp3dec_ucode.bin
-rw-r--r-- 1 root root  15916 Jun 21 22:33 nvavp_os_0ff00000.bin
-rw-r--r-- 1 root root  15916 Jun 21 22:33 nvavp_os_8ff00000.bin
-rw-r--r-- 1 root root  15916 Jun 21 22:33 nvavp_os_eff00000.bin
-rw-r--r-- 1 root root  15916 Jun 21 22:33 nvavp_os_f7e00000.bin
-rw-r--r-- 1 root root  41100 Jun 21 22:33 nvavp_vid_ucode_alt.bin
drwxr-xr-x 2 root root   4096 Jun 21 22:33 tegra12x
root@d886b12741a8:/lineage/device/nvidia/shieldtablet#
```

https://gitlab.com/LineageOS/issues/android/-/issues/1476


## Install

## Verify


## Resources


https://github.com/LineageOS/android_device_nvidia_shieldtablet

- [HOWTO: Unpack, Edit, and Re-Pack Boot Images](https://web.archive.org/web/20200128133443/http://android-dls.com:80/wiki/index.php?title=HOWTO:_Unpack,_Edit,_and_Re-Pack_Boot_Images)

- On [NVIDIA Open Source Resources](https://developer.nvidia.com/shield-open-source) you can find a stock image for Shield Tablet K1 and restore it (for example following [this video](https://www.youtube.com/watch?v=yp2eT-sE2fo)


### Websites

- [XDA](https://forum.xda-developers.com/)