---
date: 2021-06-17
title: Important lesson about Btrfs
published: 2021-06-17
lastModified: 2021-06-17
---

If the database resides on a Btrfs file system, you should consider disabling Copy-on-Write for the directory before creating any database.

Source: https://wiki.archlinux.org/title/PostgreSQL


## Reference

- https://www.linux.com/learn/how-create-and-manage-btrfs-snapshots-and-rollbacks-linux-part-2
- http://snapper.io/development.html
