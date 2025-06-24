---
title: Encrypted backup with ZFS
date: 2025-06-10
published: 2025-06-10
lastModified: 2025-06-10
---
I called my pool **'dinosaur'** and three datasets, you guessed it, triassic, jurassic, cretaceous

Steps:

```bash
sudo zpool create -R /backup -o ashift=12 dinosaur /dev/sdb2
sudo zfs set dedup=on dinosaur

sudo zfs create -o encryption=on -o keyformat=passphrase dinosaur/triassic
sudo zfs allow nikolay create,destroy,mount,snapshot dinosaur/triassic

sudo zpool import dinosaur
sudo zfs set mountpoint=/backup dinosaur
sudo zfs load-key dinosaur/triassic
sudo zfs mount dinosaur/triassic

sudo rsync -a /run/media/nikolay/nick-home/ /backup/triassic/
sudo wipefs -a --backup /dev/sdb1
sudo zpool add dinosaur /dev/sdb1
```
## Reference

- [archwiki - zfs](https://wiki.archlinux.org/title/ZFS#Experimenting_with_ZFS)
- [zfs handbook](https://www.zfshandbook.com/docs/security/access-control/)
- [openzfs docs](https://openzfs.github.io/openzfs-docs/man/master/8/zfs-allow.8.html)