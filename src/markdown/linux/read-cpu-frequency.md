---
date: 2023-04-03
title: Read CPU frequency
published: 2023-04-03
lastModified: 2023-04-03
---


```bash
watch -n.1 "grep \"^[c]pu MHz\" /proc/cpuinfo"
```