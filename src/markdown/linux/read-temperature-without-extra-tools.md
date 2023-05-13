---
date: 2022-08-09
title: Read temperature without extra tools
published: 2022-08-09
lastModified: 2022-08-09
---


```bash
paste \
  <(cat /sys/class/hwmon/hwmon*/temp*_label) \
  <(cat /sys/class/hwmon/hwmon*/temp*_input) \
  | column -s $'\t' -t | sed 's/\(.\)..$/.\1°C/'
```

```
edge  40.0°C
Tdie  40.5°C
Tctl  40.5°C
```