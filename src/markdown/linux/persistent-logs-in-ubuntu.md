---
date: 2022-05-24
title: Ubuntu persistent logs
published: 2022-05-24
lastModified: 2022-05-24
---

System logs can be very useful for troubleshooting issues that occur on the system. So you might want to store logs persistently across reboots.

```bash
mkdir /var/log/journal
systemd-tmpfiles --create --prefix /var/log/journal
systemctl restart systemd-journald
```
