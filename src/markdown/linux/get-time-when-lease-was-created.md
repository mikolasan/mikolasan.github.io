---
date: 2021-11-02
title: Network Manager - DHCP lease
subtitle: Get time when lease was created
published: 2021-11-02
lastModified: 2021-11-02
---

If you are experiencing network connectivity issues, knowing the time when a DHCP lease was created can help you to identify  whether a lease has been renewed properly or if a device has lost in oblivion.

In a DHCP environment, leases have a limited lifespan and are automatically renewed periodically.

```bash
find /var/lib/NetworkManager -type f -name "*.lease" \
| awk -F"-" '{ print $2"-"$3"-"$4"-"$5"-"$6 }' \
| xargs -i nmcli con show {} 2> /dev/null \
| grep timestamp \
| cut -d ":" -f 2 | tr -d '[:space:]' \
| xargs -i date -d @{}
```