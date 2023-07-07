---
title: Build Lineage 16
date: 2023-06-27
published: 2023-06-27
lastModified: 2023-06-27
---

Docker setup is the same as for [Lineage 15 build](/linux/build-lineage-15)

I just wiped the whole `/lineage/` folder. Maybe there is a better way. I just repeat from the beginning with another branch

```bash
repo init -u https://github.com/LineageOS/android.git -b lineage-16.0 --git-lfs
```

And the `breakfast shieldtablet` command spits these errors.

```
build/make/core/product_config.mk:234: error: Can not locate config makefile for product "lineage_shieldtablet".

...

frameworks/native/build/phone-xhdpi-2048-dalvik-heap.mk:20: error: _nic.PRODUCTS.[[device/nvidia/shieldtablet/lineage_shieldtablet.mk]]: "vendor/nvidia/shieldtablet/shieldtablet-vendor.mk" does not exist.

...

** Don't have a product spec for: 'lineage_shieldtablet'
** Do you have the right repo manifest?
```


## About project structure

Also there is no `extract-files.sh` script in `device/nvidia/shieldtablet` folder. Because of that some folders do not exist and `breakfast` fails. For example

- makefiles Android.mk, BoardConfigVendor.mk, shieldtablet-vendor.mk in `vendor/nvidia/shieldtablet`
- directory `vendor/nvidia/shieldtablet/proprietary`
- `etc`, `vendor` in `proprietary`

They say that you need to become familiar with the `repo` tool. They send you to the official [Getting started](https://source.android.com/docs/setup/download) page. But I guarantee you, they won't tell you all shortcuts that normal people would use. So let's begin.

`repo` is like Git Submodules, but for some reason no one likes submodules. When you run `repo sync` for the first time, it dowloads many repositories and orginizes them in directories and subdirectories. This organization is conformed with the build system, which means that it composes a huge build tree for you.

This process can be more transparent and customizable. There is at least one tool that serves very similar purpose, and this is the tool that I very like - [Buildroot](/linux/custom-linux-distro). It has very tiny repository. It's basically a set of Makefiles and scripts which create full Linux-based operating system. All components like applications, tools, frameworks, libraries, drivers and so on, it downloads from public repositories, then compiles, then puts it together into the image of your choise like tar archive, cpio ramfs, or ISO. But because you can select a subset of tools from the whole variety of open source projects, thus it downloads only that subset. On the other side, Android seems very monolithic, it downloads everything and all this tools always in the image.

In order to review the build system I need to find the originating script `build/make/core/product_config.mk` and review actions from the `breakfast` command.

In the root directory there is a hidden  folder, `.repo`. In the main manifest file (a thing similar to `.gitmodules`) search for `build/make`

```bash
grep build/make .repo/manifests/default.xml
```

And you find that you need [android_build](https://github.com/LineageOS/android_build/tree/lineage-16.0) repository. Then we locate the [source](https://github.com/LineageOS/android_build/blob/lineage-16.0/core/product_config.mk#L234) of our error.

And you know what? Makefiles are scary. But from my supeficial lookup I can tell that it creates a list of products by finding `$(SRC_TARGET_DIR)/product/AndroidProducts.mk` files. This error is safe to ignore because this is how it reilizes that it need to download [android_device_nvidia_shieldtablet](https://github.com/LineageOS/android_device_nvidia_shieldtablet/tree/lineage-16.0)

Here's device specific manifest `.repo/local_manifests/roomservice.xml` that defines many repositories for Nvidia components

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest>
  <project name="LineageOS/android_device_nvidia_shieldtablet" path="device/nvidia/shieldtablet" remote="github" />
  <project name="LineageOS/android_device_nvidia_icera" path="device/nvidia/icera" remote="github" />
  <project name="LineageOS/android_device_nvidia_t124-common" path="device/nvidia/t124-common" remote="github" />
  <project name="LineageOS/android_device_nvidia_touch" path="device/nvidia/touch" remote="github" />
  <project name="LineageOS/android_device_nvidia_shield-common" path="device/nvidia/shield-common" remote="github" />
  <project name="LineageOS/android_kernel_nvidia_shield" path="kernel/nvidia/shield" remote="github" />
  <project name="LineageOS/android_hardware_nvidia_interfaces" path="hardware/nvidia/interfaces" remote="github" />
  <project name="LineageOS/android_hardware_nvidia_light" path="hardware/nvidia/light" remote="github" />
  <project name="LineageOS/android_hardware_nvidia_memtrack" path="hardware/nvidia/memtrack" remote="github" />
  <project name="LineageOS/android_hardware_nvidia_power" path="hardware/nvidia/power" remote="github" />
  <project name="LineageOS/android_hardware_nvidia_thermal" path="hardware/nvidia/thermal" remote="github" />
  <project name="LineageOS/android_device_nvidia_tegra-common" path="device/nvidia/tegra-common" remote="github" />
</manifest>
```

I think this step with extracting proprietary files can be done better, but for now I just copy the `system` archive from previous build. Extract archive

```bash
tar xvf /system.tar.gz -C /system_dump/ --numeric-owner
cd device/nvidia/shieldtablet/
./extract-files.sh /system_dump/
```

## libnvphs

And brunch time! Oh no, not again

```
hardware/nvidia/power/Android.mk: error: "vendor.nvidia.hardware.power@1.0-service (EXECUTABLES android-arm) missing libnvphs (SHARED_LIBRARIES android-arm)"
```

Ok, this library, `libnvphs` I can find in [proprietary_vendor_nvidia](https://github.com/TheMuppets/proprietary_vendor_nvidia/tree/lineage-16.0/shield) repository. Which means I need to fix proprietary files manually again.

```bash
git clone -b lineage-16.0 --single-branch https://github.com/TheMuppets/proprietary_vendor_nvidia.git /proprietary_vendor_nvidia
cp -v /proprietary_vendor_nvidia/t124/nvphs/lib/libnvphs.so /lineage/vendor/nvidia/shieldtablet/proprietary/vendor/lib/
```

I check [that makefile](https://gitlab.incom.co/CM-Shield/android_hardware_nvidia_power/-/blob/lineage-16.0/Android.mk?ref_type=heads) and trying to find where other libraries are located

```bash
find . -type f -name "libhardware.so"
```

It appears that they all are part of `platform/prebuilts/vndk/v27` [link](https://android.googlesource.com/platform/prebuilts/vndk/v27/). Of course proprietary Nvidia library will be missing.

According to [this](https://gitlab.incom.co/CM-Shield/android_device_nvidia_tegra-common/-/blob/lineage-18.1/extract/file.list) list I conclude that libnvphs was introduced in new versions of Shield tablet. So I comment out that line in the makefile that requires the library. It could fail during linkage with many undefined reference errors or, as before with files in proprietary blobs, it's just extra (or leftover) from another models.

It did fail (output split into lines by me):

```
[ 98% 72880/73717] target Executable: ven...vendor.nvidia.hardware.power@1.0-service)
FAILED: /lineage/out/target/product/shieldtablet/obj/EXECUTABLES/vendor.nvidia.hardware.power@1.0-service_intermediates/LINKED/vendor.nvidia.hardware.power@1.0-service

/bin/bash -c "/usr/bin/ccache prebuilts/clang/host/linux-x86/clang-4691093/bin/clang++ 
-pie -nostdlib -Bdynamic -Wl,-dynamic-linker,/system/bin/linker -Wl,--gc-sections -Wl,-z,nocopyreloc 
-Wl,-rpath-link=/lineage/out/target/product/shieldtablet/obj/lib 

/lineage/out/target/product/shieldtablet/obj/lib/crtbegin_dynamic.o 
/lineage/out/target/product/shieldtablet/obj/EXECUTABLES/vendor.nvidia.hardware.power@1.0-service_intermediates/service.o 
/lineage/out/target/product/shieldtablet/obj/EXECUTABLES/vendor.nvidia.hardware.power@1.0-service_intermediates/Power.o 
/lineage/out/target/product/shieldtablet/obj/EXECUTABLES/vendor.nvidia.hardware.power@1.0-service_intermediates/nvpowerhal.o 
/lineage/out/target/product/shieldtablet/obj/EXECUTABLES/vendor.nvidia.hardware.power@1.0-service_intermediates/timeoutpoker.o 
/lineage/out/target/product/shieldtablet/obj/EXECUTABLES/vendor.nvidia.hardware.power@1.0-service_intermediates/powerhal_parser.o 
/lineage/out/target/product/shieldtablet/obj/EXECUTABLES/vendor.nvidia.hardware.power@1.0-service_intermediates/powerhal_utils.o 
/lineage/out/target/product/shieldtablet/obj/EXECUTABLES/vendor.nvidia.hardware.power@1.0-service_intermediates/tegra_sata_hal.o 

-Wl,--whole-archive  -Wl,--no-whole-archive   
/lineage/out/target/product/shieldtablet/obj/STATIC_LIBRARIES/libunwind_llvm_intermediates/libunwind_llvm.a  
/lineage/out/target/product/shieldtablet/obj/STATIC_LIBRARIES/libclang_rt.ubsan_minimal-arm-android_intermediates/libclang_rt.ubsan_minimal-arm-android.a  
/lineage/out/target/product/shieldtablet/obj/STATIC_LIBRARIES/libcompiler_rt-extras_intermediates/libcompiler_rt-extras.a   
/lineage/out/target/product/shieldtablet/obj/STATIC_LIBRARIES/libatomic_intermediates/libatomic.a 
/lineage/out/target/product/shieldtablet/obj/STATIC_LIBRARIES/libgcc_intermediates/libgcc.a 

-Wl,-z,noexecstack -Wl,-z,relro -Wl,-z,now -Wl,--build-id=md5 -Wl,--warn-shared-textrel 
-Wl,--fatal-warnings -Wl,--no-undefined-version -Wl,--icf=safe -Wl,--hash-style=gnu -Wl,-m,armelf -Wl,--no-fix-cortex-a8   

-target arm-linux-androideabi 
-Bprebuilts/gcc/linux-x86/arm/arm-linux-androideabi-4.9/arm-linux-androideabi/bin 
-Wl,--exclude-libs,libunwind_llvm.a 
-Wl,--exclude-libs,libclang_rt.ubsan_minimal-arm-android.a 
-Wl,--no-undefined 

/lineage/out/target/product/shieldtablet/obj/lib/libhardware.so 
/lineage/out/target/product/shieldtablet/obj/lib/libhidlbase.so 
/lineage/out/target/product/shieldtablet/obj/lib/libhidltransport.so 
/lineage/out/target/product/shieldtablet/obj/lib/liblog.so 
/lineage/out/target/product/shieldtablet/obj/lib/libcutils.so 
/lineage/out/target/product/shieldtablet/obj/lib/libutils.so 
/lineage/out/target/product/shieldtablet/obj/lib/libexpat.so 
/lineage/out/target/product/shieldtablet/obj/lib/vendor.nvidia.hardware.power@1.0.so 
/lineage/out/target/product/shieldtablet/obj/lib/libc++.so 
/lineage/out/target/product/shieldtablet/obj/lib/libc.so 
/lineage/out/target/product/shieldtablet/obj/lib/libm.so 
/lineage/out/target/product/shieldtablet/obj/lib/libdl.so 

-o /lineage/out/target/product/shieldtablet/obj/EXECUTABLES/vendor.nvidia.hardware.power@1.0-service_intermediates/LINKED/vendor.nvidia.hardware.power@1.0-service 
/lineage/out/target/product/shieldtablet/obj/lib/crtend_android.o"


hardware/nvidia/power/nvpowerhal.cpp:796: error: undefined reference to 'NvPHSCancelThroughputHints'
hardware/nvidia/power/nvpowerhal.cpp:793: error: undefined reference to 'NvPHSSendThroughputHints'
clang-6.0: error: linker command failed with exit code 1 (use -v to see invocation)
```

Function `NvPHSCancelThroughputHints` [is called](https://github.com/LineageOS/android_hardware_nvidia_power/blob/5c87ad184e67418b2e064ea8ece72fcdedec520c/nvpowerhal.cpp#L796) but needs a library
([gitlab mirror](https://gitlab.incom.co/CM-Shield/android_hardware_nvidia_power/-/blob/lineage-20.0/nvpowerhal.cpp#L796)).
So where to put that library?



One easy solution is this:

```makefile
#ifeq ($(TARGET_TEGRA_PHS),nvphs)
#    LOCAL_CFLAGS += -DUSE_NVPHS
#    LOCAL_SHARED_LIBRARIES += libnvphs
#endif
```

Yes, just comment out this part where the flag is set and the library added to the list.

Another solution is to follow [this guide](https://developer.android.com/ndk/guides/prebuilts). Actually I found an example first in [this repo](https://github.com/LineageOS/android_hardware_nvidia_sensors/blob/lineage-16.0/Android.mk)


And a third option is

- download `libnvphs.so` from [this repo](https://github.com/BigTopKrazies/vendor_nvidia/tree/8.1/shield/common/lib)
```bash
wget -O /system_dump/system/vendor/lib/libnvphs.so https://github.com/BigTopKrazies/vendor_nvidia/raw/8.1/shield/common/lib/libnvphs.so
```
- add to `device/nvidia/shieldtablet/proprietary-files.txt` this line
```
vendor/lib/libnvphs.so
```

I don't know what path to specify

```
OUT is obsolete. Use OUT_DIR instead. See https://android.googlesource.com/platform/build/+/master/Changes.md#OUT
```

So, I'd rather puth in the `$(LOCAL_PATH)`

```
cp /system_dump/system/vendor/lib/libnvphs.so /lineage/hardware/nvidia/power/
```


New error (when BUILD_SHARED_LIBRARY)
```
libnvphs: Unused source files: hardware/nvidia/power/libnvphs.so
```

Means ...

> `brunch` is just `breakfast + mka bacon` - you can do it manually.



## Upgrade to Android.bp

What I usually do, I search for similar use cases and try to copy how someone already did it

But strangely I don't see Android.mk files, I see is Android.bp files - this is [a new format](https://android.googlesource.com/platform/build/soong/). [There is a tool](https://stackoverflow.com/questions/51207766/where-can-i-find-androidmk-tool-to-convert-android-mk-to-android-bp) that can convert `mk` files to `bp`

```bash
# build a tool
make blueprint_tools
# convert to new format
cd hardware/nvidia/power/
androidmk Android.mk > Android.bp
```

The downside of bp format: it doesn’t have fancy string manipulation stuff like 

```makefile
LOCAL_CFLAGS += -DTARGET_TEGRA_VERSION=$(TARGET_TEGRA_VERSION:t=)
```

and not supporting conditionals.

The build script will look like this (but I didn't test it)

```json
cc_binary {
    name: "powerhal.tegra",

    cflags: [
        "-DGPU_IS_LEGACY",
        "-DPOWER_MODE_SET_INTERACTIVE",
        "-DUSE_NVPHS",
        "-DLINEAGE_PROFILES",
    ]

    srcs: [
        "service.cpp",
        "Power.cpp",
        "nvpowerhal.cpp",
        "timeoutpoker.cpp",
        "powerhal_parser.cpp",
        "powerhal_utils.cpp",
        "tegra_sata_hal.cpp",
        // "power_floor_t210.cpp"
    ],

    shared_libs: [
        "libhardware",
        "libhidlbase",
        "libhidltransport",
        "liblog",
        "libcutils",
        "libutils",
        "libdl",
        "libexpat",
        "vendor.nvidia.hardware.power@1.0",
        "libnvphs",
        "vendor.lineage.power@1.0",
    ],

    init_rc: ["vendor.nvidia.hardware.power@1.0-service.rc"],
    intf_fragments: ["vendor.nvidia.hardware.power@1.0-service.xml"],
    relative_install_path: "hw",
    vendor: true,
    owner: "nvidia",
}
```


## Stuck on boot

My build finished, but it stuck on boot logo

1. Reboot to TWRP
2. ...?

- Try GSI https://developer.android.com/topic/generic-system-image/releases#android-gsi-10
- Try prebuilt versions, like from Andy Yan https://sourceforge.net/projects/andyyan-gsi/files/lineage-16.x/

this is exactly my problem https://forum.xda-developers.com/t/how-get-boot-log-of-fresh-builded-lineage-of-device-stucks-on-boot-animation.4077827/

where to find logs?

pstore thing should be supported by the kernel https://android.stackexchange.com/questions/213336/how-can-i-enable-last-kmsg

https://docs.halium.org/en/latest/porting/debug-build/dmesg.html

https://github.com/torvalds/linux/blob/v5.1/Documentation/admin-guide/ramoops.rst#reading-the-data

data/dontpanic folder https://stackoverflow.com/questions/9682306/android-how-to-get-kernel-logs-after-kernel-panic

enable logcat during boot https://android.stackexchange.com/questions/221431/how-to-see-the-boot-progress-messages-akin-to-dmesg-when-booting-lineageos

unpack boot.img https://www.whitewinterwolf.com/posts/2016/08/11/how-to-unpack-and-edit-android-boot-img/

problems to pack back https://android.stackexchange.com/questions/169528/device-does-not-boot-to-system-after-flashing-boot-image?rq=1
