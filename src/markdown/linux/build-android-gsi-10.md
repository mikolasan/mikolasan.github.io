---
title: Build Android GSI
subtitle: Generic System Image
date: 2023-07-06
published: 2023-07-06
lastModified: 2023-07-06
---

I hate Reddit and forums.

Especially popular forums like XDA, the source of unique and valuable information and good advice. But. All information is lost in 100 page threads. Good comments indistinguishable from bad comments. That’s why I like StackOverflow so much. I was on this forum and some discussion went me on a wrong track. So, let's see what happenned.


...I think this is the explanation why [my Lineage ROM](/linux/build-lineage-16) stuck on boot logo:

> "In Android 9 and higher, this requirement has changed to enable vendors to boot a GSI. Specifically, Keymaster shouldn't perform verification because the version info reported by the GSI may not match the version info reported by vendor's bootloader. For devices implementing Keymaster 3 or lower, vendors must modify the Keymaster implementation to skip verification (or upgrade to Keymaster 4). For details on Keymaster, refer to Hardware-backed Keystore.”
>
> [Comment on reddit](https://www.reddit.com/r/LineageOS/comments/k6ph0s/how_do_i_debug_a_device_that_doesnt_get_into_boot/)


So, no Lineage, instead I need to build [GSI](https://source.android.com/docs/setup/create/gsi) first. Why? Because it will work. That's what they said.


Okay, there is no `android9-gsi` branch. I’ll skip Android 9 GSI for now. Android 10 GSI it is.


## Docker setup

I build on Manjaro and get exactly the same error as [these guys](https://gist.github.com/Roker2/f9a6422a70840435880a11d12902bafc). 

```
Invalid filesystem option set: has_journal,extent,huge_file,flex_bg,metadata_csum,metadata_csum_seed,64bit,dir_nlink,extra_isize,orphan_file
```

Then I decide to make right, in the Docker. Because I already have the whole build tree setup on my host machine, then I will mount this folder into the docker container.

```bash
docker run -it -v $(pwd)/gsi:/gsi --name gsi-build ubuntu:18.04 bash
# re-enter later
docker start -a -i gsi-build
docker exec --tty --interactive --privileged gsi-build bash
```

In the Docker container:

```bash
apt update && apt install python3 unzip m4 rsync openssl
```

I had `openssl` missing and as a result of my almost empty docker setup

- I did some research in `external/avb/avbtool` and realized that it is a Go tool that executes different programs including `apexer` that spits out Python traceback. `apexer` is a beefy binary, 28MB. Apparently it includes Python interpreter inside. So, I can add the `--verbose` flag into the Go program, and add more prints into the Python scripts in order to understand what is wrong.
- Also I manually converted `device/generic/goldfish/tools/mk_combined_img.py` from Python 2 to 3 because it was the only script that failed in my container with Python 3.6

```diff
diff --git a/tools/mk_combined_img.py b/tools/mk_combined_img.py
index 1b7bbff0..c67d18b2 100755
--- a/tools/mk_combined_img.py
+++ b/tools/mk_combined_img.py
@@ -11,7 +11,8 @@ def check_sparse(filename):
     magic = 3978755898
     with open(filename, 'rb') as i:
         word = i.read(4)
-        if magic == int(word[::-1].encode('hex'), 16):
+        # if magic == int(word[::-1].encode('hex'), 16):
+        if magic == int.from_bytes(word, byteorder='big'):
             return True
     return False

@@ -45,18 +46,18 @@ def parse_input(input_file):
         try:
             partition_info["num"] = int(line[2])
         except ValueError:
-            print "'%s' cannot be converted to int" % (line[2])
+            print("'%s' cannot be converted to int" % (line[2]))
             sys.exit(1)

         # check if the partition number is out of range
         if partition_info["num"] > len(lines) or partition_info["num"] < 0:
-            print "Invalid partition number: %d, range [1..%d]" % \
-                    (partition_info["num"], len(lines))
+            print("Invalid partition number: %d, range [1..%d]" % \
+                    (partition_info["num"], len(lines)))
             sys.exit(1)

         # check if the partition number is duplicated
         if partition_info["num"] in num_used:
-            print "Duplicated partition number:%d" % (partition["num"])
+            print("Duplicated partition number:%d" % (partition["num"]))
             sys.exit(1)
         num_used.add(partition_info["num"])
         partitions.append(partition_info)
@@ -68,23 +69,23 @@ def write_partition(partition, output_file, offset):
     # $ dd if=/path/to/image of=/path/to/output conv=notrunc,sync \
     #   ibs=1024k obs=1024k seek=<offset>
     dd_comm = ['dd', 'if='+partition["path"], 'of='+output_file,'conv=notrunc,sync',
-                'ibs=1024k','obs=1024k', 'seek='+str(offset)]
+                'ibs=1024k','obs=1024k', 'seek='+str(int(offset))]
     shell_command(dd_comm)
     return

 def unsparse_partition(partition):
     # if the input image is in sparse format, unsparse it
     simg2img = os.environ.get('SIMG2IMG', 'simg2img')
-    print "Unsparsing %s" % (partition["path"]),
+    print("Unsparsing %s" % (partition["path"]))
     partition["fd"], temp_file = mkstemp()
     shell_command([simg2img, partition["path"], temp_file])
     partition["path"] = temp_file
-    print "Done"
+    print("Done")
     return

 def clear_partition_table(filename):
     sgdisk = os.environ.get('SGDISK', 'sgdisk')
-    print "%s --clear %s" % (sgdisk, filename)
+    print("%s --clear %s" % (sgdisk, filename))
     shell_command([sgdisk, '--clear', filename])
     return

@@ -116,7 +117,7 @@ def main():
     # check input file
     config_filename = args.input
     if not os.path.exists(config_filename):
-        print "Invalid config file name " + config_filename
+        print("Invalid config file name " + config_filename)
         sys.exit(1)

     # read input file
@@ -144,7 +145,7 @@ def main():
     # add padding
     # $ dd if=/dev/zero of=/path/to/output conv=notrunc bs=1 \
     #   count=1024k seek=<offset>
-    offset = os.path.getsize(output_filename) / 1024 / 1024
+    offset = int(os.path.getsize(output_filename) / 1024 / 1024)
     shell_command(['dd', 'if=/dev/zero', 'of='+output_filename,
                 'conv=notrunc', 'bs=1024k', 'count=1', 'seek='+str(offset)])
```


The end result: `out/target/product/generic/system.img`. But I still don't know why it fails on Manjaro.


## Treble?

Oh. After I've read about the process of [making old devices Treble-ready](/linux/unofficial-treble-support-for-nvidia-shield) I realized that I will need new boot, system, and vendor partitions. And GSI only provides the system partition (because it's `system.img`).

## Install

Install GSI from TWRP [link](https://4pda.to/forum/index.php?showtopic=892755&st=3180#entry75709782)