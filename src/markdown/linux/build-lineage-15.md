---
title: Build Lineage 15
date: 2023-06-20
published: 2023-06-20
lastModified: 2023-06-24
---

## Setup Docker

So I open VirtualBox and blow off dust from my Ubuntu 18 virtual machine. "Blowing" means I run `apt update && apt upgrade`. It's also possible to do everything in a docker container:

```bash
docker run -it --name lineage-build ubuntu:18.04 bash
# install all stuff in the container
# ...
# use it again next day
docker start -i lineage-build
# or save as image (very fat image though)
docker container ls -a -s # check size (72GB after git clone, 126GB after build)
docker commit lineage-build lineagos:15.1
docker run --tty --detached --privileged --volume /dev/bus/usb:/dev/bus/usb --publish-all --name lineage-build-2 lineagos:15.1
docker ps -a
docker exec --tty --interactive d886b12741a8 bash
```

Then prepare docker a bit

```bash
apt update && apt install sudo
update-alternatives --install /usr/bin/python python /usr/bin/python3.6 1 # we will switch to Python 2 later
git config --global user.email "do_not_send_me_spam@gmail.com"
git config --global user.name "Nikolay Neupokoev"
sed "s/TLSv1, TLSv1.1, //" -i /etc/java-8-openjdk/security/java.security
export USER=nikolay # stupid script from Jack server needs it
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
  openjdk-8-jdk \
  python2.7 \
  lsof

curl -L -o platform-tools.zip https://dl.google.com/android/repository/platform-tools-latest-linux.zip
unzip platform-tools.zip -d ~

mkdir -p  ~/.local/bin
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/.local/bin/repo
chmod a+x ~/.local/bin/repo
```

Set environment variables to make it work and with some build tweaks

```bash
export PATH=/root/platform-tools:/root/.local/bin:$PATH

export USE_CCACHE=1
export CCACHE_EXEC=/usr/bin/ccache
ccache -M 50G
ccache -o compression=true
export ANDROID_JACK_VM_ARGS="-Dfile.encoding=UTF-8 -XX:+TieredCompilation -Xmx4G"
export ANDROID_JACK_EXTRA_ARGS="--verbose debug --sanity-checks on -D sched.runner=single-threaded"
```

Get the repo. Note: you have to [use local directories](https://stackoverflow.com/questions/72547134/repo-init-fails-while-cloning-manifest) owned by your user and not ones mounted into virtual machine from the host that usually have `root:vboxsf` ownership.

```bash
mkdir ~/lineage
cd ~/lineage/
repo init -u https://github.com/LineageOS/android.git -b lineage-15.1 --git-lfs

# switch to Python 2
update-alternatives --install /usr/bin/python python /usr/bin/python2.7 2
source build/envsetup.sh
breakfast shieldtablet

# be careful with this step, it's possible to approach it with 3 different sides
cd /lineage/device/nvidia/shieldtablet
./extract-files.sh

# change directory to build root
croot
# start multi-threaded make job for "shieldtablet" target
brunch shieldtablet
```

Hint: `taskset -c 0-3 bash` to restrict a shell to only 4 cores (0-3; adjust as you need), then `envsetup` and `brunch`.

## Extracting proprietary files

Ooooo, this doesn't look good

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

Which is caused most likely by errors from previous script (`extract-files.sh`)

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
```

Full output I saved in [a gist](https://gist.github.com/mikolasan/8681c615a4e5e7d321c1fd453cb932ca)

I did some investigation. 
Here is [an issue](https://gitlab.com/LineageOS/issues/android/-/issues/1476) with similar errors. 
Seems like I've missed one note on the wiki, saying that these files must be taken from a tablet where Lineage OS is already installed. 

> This step requires to have a device **already running the latest LineageOS**, based on the branch you wish to build for. If you don’t have access to such device, refer to [Extracting proprietary blobs from installable zip](https://wiki.lineageos.org/extracting_blobs_from_zips.html). 
>
> _LineageOS [build instructions]([build](https://wiki.lineageos.org/devices/shieldtablet/build))_

So I can retrieve it from installed Lineage OS, or zip file, or [proprietary_vendor_nvidia](https://github.com/TheMuppets/proprietary_vendor_nvidia/tree/lineage-15.1) repository (possible mirror or fork [on gitlab](https://gitlab.incom.co/CM-Shield/proprietary_vendor_nvidia/-/blob/lineage-15.1/shield/shieldtablet.mk)). 

I can see that I downloaded the same files to `/lineage/vendor/nvidia/shieldtablet/proprietary/vendor/firmware/` as in [shield/firmware/t124](https://github.com/TheMuppets/proprietary_vendor_nvidia/tree/lineage-15.1/shield/firmware/t124) but actually they have different hashes

If you extract blobs from [zip](https://androidfilehost.com/?w=files&flid=325335) (like **lineage-15.1-20211018-UNOFFICIAL-shieldtablet.zip**), then you need to read "Extracting proprietary blobs from block-based OTAs" [link](https://wiki.lineageos.org/extracting_blobs_from_zips#extracting-proprietary-blobs-from-block-based-otas). Check out [this howto](https://cyanogenmodroms.com/shieldtablet/#Extract_proprietary_blobs) too. And again they will have different hashes

Hierarchy is strange, so I manually moved missing files

```bash
mkdir -p /system_dump/system/vendor/app/ConsoleUI
cp -v /proprietary_vendor_nvidia/shield/app/ConsoleUI/ConsoleUI.apk /system_dump/system/vendor/app/ConsoleUI
cp -v /shieldtablet/shieldtablet.real.bak/proprietary/vendor/lib/libaffinitydaemon.so /system_dump/system/vendor/lib
cp -v /shieldtablet/shieldtablet.real.bak/proprietary/vendor/lib/libgov* /system_dump/system/vendor/lib
cp -v /shieldtablet/shieldtablet.real.bak/proprietary/vendor/lib/libshieldtech.so /system_dump/system/vendor/lib
cp -v /shieldtablet/shieldtablet.real.bak/proprietary/vendor/lib/libussrd.so /system_dump/system/vendor/lib
cp -v /shieldtablet/shieldtablet.real.bak/proprietary/vendor/lib/nvshieldtech.so /system_dump/system/vendor/lib
```

What's missing from zip

```
/system/vendor/bin/ussrd
/system/vendor/firmware/tegra_xusb_firmware
/system/vendor/lib/libaffinitydaemon.so
/system/vendor/lib/libgov_boot.so
/system/vendor/lib/libgov_camera.so
/system/vendor/lib/libgov_force.so
/system/vendor/lib/libgov_generic.so
/system/vendor/lib/libgov_gpucompute.so
/system/vendor/lib/libgov_graphics.so
/system/vendor/lib/libgov_il.so
/system/vendor/lib/libgov_spincircle.so
/system/vendor/lib/libgov_tbc.so
/system/vendor/lib/libgov_ui.so
/system/vendor/lib/libshieldtech.so
/system/vendor/lib/libussrd.so
/system/vendor/lib/nvshieldtech.so
/system/vendor/app/ConsoleUI/ConsoleUI.apk
```

What's missing from official ROM

```
/system/vendor/bin/downloader
/system/vendor/bin/glgps_nvidiaTegra2android
/system/vendor/bin/gps_select.sh
/system/vendor/bin/icera-switcherd
/system/vendor/bin/modemnic
/system/vendor/bin/rm_ts_server
/system/vendor/bin/run_ss_status.sh
/system/vendor/bin/ss_status
/system/vendor/bin/tlk_daemon
/system/vendor/bin/ussrd
/system/vendor/firmware/bcm43241.hcd
/system/vendor/firmware/nvram_43241.txt
/system/vendor/firmware/tegra12x/nvhost_tsec.fw
/system/vendor/firmware/tegra12x_xusb_firmware
/system/vendor/firmware/tegra_xusb_firmware
/system/vendor/lib/hw/gps.brcm.so
/system/vendor/lib/hw/sensors.default.api_v1.3.mpl520.nvs.so
/system/vendor/lib/libmllite.so
/system/vendor/lib/libmplmpu.so
/system/vendor/lib/libopencv24_tegra.so
/system/vendor/lib/libprotobuf-cpp-lold.so
/system/vendor/lib/libril-icera.so
/system/vendor/lib/libsensors.fusion.mpl520.nvs.so
/system/vendor/lib/libsensors.hal-drivers.nvs.so
/system/vendor/lib/libsensors.hal.nvs.so
/system/vendor/lib/libsensors.prefusion.mpl520.nvs.so
/system/vendor/lib/libtbb.so
/system/vendor/lib/libw.so
/system/vendor/lib/touch_para_10.so
/system/vendor/app/NvShieldTech/NvShieldTech.apk
```

Maybe it's hard to see but files in these lists almost do not overlap, therefore I will use zip and replenish missing files using my ROM.


But here's what I must delete for sure from `device/nvidia/shieldtablet/proprietary-files.txt`

```
/system/vendor/bin/ussrd
/system/vendor/firmware/tegra_xusb_firmware
```

And then I used the following command that doesn't use `adb` but just uses files from another folder

```
./extract-files.sh /system_dump/
```


## Troubleshooting Jack 

It was not so easy with [Jack](https://source.android.com/docs/setup/create/jack), because it's another piece of software that I've never heard of. Yes, those 80 gigabytes of kernel stuff didn't worry me so much as this one.

I've got this error

```
Launching Jack server java -XX:MaxJavaStackTraceDepth=-1 -Djava.io.tmpdir=/tmp -Dfile.encoding=UTF-8 -XX:+TieredCompilation -Xmx4G -cp /root/.jack-server/launcher.jar com.android.jack.launcher.ServerLauncher
Jack server failed to (re)start, try 'jack-diagnose' or see Jack server log
SSL error when connecting to the Jack server. Try 'jack-diagnose'
```

So here's a few helpful commands that help you to tame this beast

```bash
jack-admin kill-server
jack-admin start-server
```

The problem was fixed by [enabling deprecated TLS algorithms](https://stackoverflow.com/questions/67363030/rebuild-android-code-with-error-ssl-error-when-connecting-to-the-jack-server-t) in Java 8. I added that to my initial Docker commands above.

