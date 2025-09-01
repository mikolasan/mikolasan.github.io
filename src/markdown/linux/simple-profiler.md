---
title: perf
date: 2023-04-03
published: 2023-04-03
lastModified: 2023-04-03
---


### Build

Surprisingly, **perf** is part of the Linux kernel

```bash
apt install build-essential git flex bison
git clone --depth 1 https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git
cd linux/tools/perf
make
cp perf /usr/bin
```


### Use

```bash
./perf record -p $(pgrep your_graphical_app) -o pout -e cycles:u -a -- sleep 5
./perf report -i pout | grep -c radeonsi_dri.so
```


## Reference

[Linux perf examples](https://www.brendangregg.com/perf.html)