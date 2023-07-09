---
title: Treble for NVIDIA Shield K1
subtitle: Unofficial support
date: 2023-07-07
published: 2023-07-07
lastModified: 2023-07-07
---

## Check support

Check Treble support with [TrebleInfo](https://gitlab.com/TrebleInfo/TrebleInfo/-/releases)

## Treblize

Of course Nvidia Shield Tablet doesn't support Treble. But this should be simple, it's just repartitioning and moving some folders around as I understood from [this thread](https://forum.xda-developers.com/t/guide-q-a-treble-from-stock-to-treble-everything-you-need-to-know.3793734/).

So let's get started.

Do I need TWRP with Treble Manager (like [this](https://forum.xda-developers.com/t/recovery-treble-twrp-3-3-1-0-with-tissot-manager.3976117/), or this [old version with screenshots](https://forum.xda-developers.com/t/recovery-treble-retired-twrp-with-tissot-manager-treble-dual-boot-support.3793637/))?

Behind the hood it's just this [list of instructions](https://github.com/Giovix92/twrp_device_xiaomi_tissot/blob/android-9.0/recovery/root/tissot_manager/installer.sh#L73)

[Here's](https://forum.xda-developers.com/t/dev-how-to-compile-twrp-touch-recovery.1943625/) an explanation how to make TWRP for A/B devices

This is my plan:

- From Lineage 15 read `/proc/cmdline`, check that **selinux** and **dm-verity** are disabled (we are going to change partitions and next boot should not fail just because partitions are changed)
- [Build TWRP](https://forum.xda-developers.com/t/dev-how-to-compile-twrp-touch-recovery.1943625/) with **Treble Manager** merged from [this repo](https://github.com/Giovix92/twrp_device_xiaomi_tissot)
- 

Just in case https://forum.xda-developers.com/t/tool-tissot-low-level-backup-restore-unbrick-toolkit-for-mi-a1.3790307/


## Reference

- A very broad steps on how to convert to Android 9 ROM to GSI compatible one [link](https://4pda.to/forum/index.php?showtopic=892755&st=3380#entry75861460)
- GitHub of legendary [phhusson](https://github.com/phhusson/treble_experimentations)
