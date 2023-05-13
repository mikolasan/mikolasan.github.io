---
date: 2022-08-10
title: Read temperature without extra tools
published: 2022-08-10
lastModified: 2022-08-10
---


```bash
top -p `pgrep "app"` -n 1 -b | tail -n 2
```