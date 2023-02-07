---
date: 2022-06-08
title: File system performance
subtitle: Test with dd
---

Test read performance with dd:

```sh
sudo /sbin/sysctl -w vm.drop_caches=3
dd if=./test of=/dev/zero bs=512k count=2048
```

Source: https://www.unixtutorial.org/test-disk-speed-with-dd/