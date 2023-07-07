---
title: Build Android GSI
subtitle: Generic System Image
date: 2023-07-06
published: 2023-07-06
lastModified: 2023-07-06
---


I think this is it

- "In Android 9 and higher, this requirement has changed to enable vendors to boot a GSI. Specifically, Keymaster shouldn't perform verification because the version info reported by the GSI may not match the version info reported by vendor's bootloader. For devices implementing Keymaster 3 or lower, vendors must modify the Keymaster implementation to skip verification (or upgrade to Keymaster 4). For details on Keymaster, refer to Hardware-backed Keystore.”
    
    

https://www.reddit.com/r/LineageOS/comments/k6ph0s/how_do_i_debug_a_device_that_doesnt_get_into_boot/

Wow, becoming a ROM maintainer is not easy. First you need to test aosp on your device and check all changes made in Android work with vendor stuff. https://source.android.com/docs/setup/create/gsi


no 9. maybe I’ll skip it


## Docker setup

```bash
python3 unzip m4 rsync openssl
```


maybe this https://github.com/phhusson/treble_experimentations ?

https://forum.xda-developers.com/t/guide-tutorial-howto-nvidia-shield-tablet-k1-stock-to-android-9.4524451/

```bash
APEXER_TOOL_PATH=out/soong/host/linux-x86/bin:prebuilts/sdk/tools/linux/bin 
out/soong/host/linux-x86/bin/apexer 
--force 
--manifest art/build/apex/manifest.json 
--file_contexts system/sepolicy/apex/com.android.runtime.debug-file_contexts 
--canned_fs_config out/soong/.intermediates/art/build/apex/com.android.runtime.debug/android_common_com.android.runtime.debug/canned_fs_config 
--payload_type image 
--key art/build/apex/com.android.runtime.pem 
--pubkey art/build/apex/com.android.runtime.avbpubkey 
--target_sdk_version 29 
--assets_dir out/soong/.intermediates/art/build/apex/com.android.runtime.debug/android_common_com.android.runtime.debug/NOTICE 
out/soong/.intermediates/art/build/apex/com.android.runtime.debug/android_common_com.android.runtime.debug/image.apex 
out/soong/.intermediates/art/build/apex/com.android.runtime.debug/android_common_com.android.runtime.debug/com.android.runtime.debug.apex.unsigned
```

```bash
usage: apexer [-h] [-f] [-v] [--manifest MANIFEST]
              [--android_manifest ANDROID_MANIFEST] [--assets_dir ASSETS_DIR]
              [--file_contexts FILE_CONTEXTS]
              [--canned_fs_config CANNED_FS_CONFIG] [--key KEY]
              [--pubkey PUBKEY] [--payload_type TYPE]
              [--override_apk_package_name OVERRIDE_APK_PACKAGE_NAME]
              [--android_jar_path ANDROID_JAR_PATH]
              [--apexer_tool_path APEXER_TOOL_PATH]
              [--target_sdk_version TARGET_SDK_VERSION]
              INPUT_DIR OUTPUT

Create an APEX file

positional arguments:
  INPUT_DIR             the directory having files to be packaged
  OUTPUT                name of the APEX file

optional arguments:
  -h, --help            show this help message and exit
  -f, --force           force overwriting output
  -v, --verbose         verbose execution
  --manifest MANIFEST   path to the APEX manifest file
  --android_manifest ANDROID_MANIFEST
                        path to the AndroidManifest file. If omitted, a
                        default one is created and used
  --assets_dir ASSETS_DIR
                        an assets directory to be included in the APEX
  --file_contexts FILE_CONTEXTS
                        selinux file contexts file. Required for "image"
                        APEXs.
  --canned_fs_config CANNED_FS_CONFIG
                        canned_fs_config specifies uid/gid/mode of files.
                        Required for "image" APEXS.
  --key KEY             path to the private key file. Required for "image"
                        APEXs.
  --pubkey PUBKEY       path to the public key file. Used to bundle the public
                        key in APEX for testing.
  --payload_type TYPE   type of APEX payload being built "zip" or "image"
  --override_apk_package_name OVERRIDE_APK_PACKAGE_NAME
                        package name of the APK container. Default is the apex
                        name in --manifest.
  --android_jar_path ANDROID_JAR_PATH
                        path to use as the source of the android API.
  --apexer_tool_path APEXER_TOOL_PATH
                        A list of directories containing all the tools used by
                        apexer (e.g. mke2fs, avbtool, etc.) separated by ':'.
                        Can also be set using the APEXER_TOOL_PATH environment
                        variable
  --target_sdk_version TARGET_SDK_VERSION
                        Default target SDK version to use for
                        AndroidManifest.xml
```



https://gist.github.com/Roker2/f9a6422a70840435880a11d12902bafc



some research in `external/avb/avbtool`

and fixed `device/generic/goldfish/tools/mk_combined_img.py`  from python 2 to 3

The result:

`out/target/product/generic/system.img`
