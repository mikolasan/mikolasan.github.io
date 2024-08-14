---
title: How Ubuntu package is compiled?
subtitle: when you want to recompile with identical configuration
date: 2024-04-09
published: 2024-04-09
lastModified: 2024-04-09
---

For example **OpenSSL** library [libssl-dev](https://packages.ubuntu.com/bionic/libssl-dev)

Go to **packages.ubuntu.com** and look for **download source package** ([link for bionic version of openssl](https://packages.ubuntu.com/source/bionic/openssl))

There you will get some archives:

- `debian.tar.xz` - where all build scripts and patches are
- `orig.tar.gz` - package's source code

So now the question is: how to apply patches to ubuntu deb package manually? According to [Ubuntu Packaging Guide](https://packaging.ubuntu.com/html/patches-to-packages.html) you need to use a special tool: **quilt**

```bash
sudo pacman -S quilt
export QUILT_PATCHES=../openssl-patches
quilt applied # funny but no patches applied at this step
quilt push -a # apply all patches
```
