---
date: 2022-10-04
title: Linux mysteries
developing: true
---

A collection of things that I cannot explain

## Write permissions

On one machine with Ubuntu 22.04 all files have write permission for the user group by default, but on another - Manjaro 22 - no.

## apt update critical error

```
(appstreamcli:3459): GLib-CRITICAL **: 23:46:48.952: g_variant_builder_end: assertion '!GVSB(builder)->uniform_item_types || GVSB(builder)->prev_item_type != NULL || g_variant_type_is_definite (GVSB(builder)->type)' failed
(appstreamcli:3459): GLib-CRITICAL **: 23:46:48.952: g_variant_new_variant: assertion 'value != NULL' failed                                                                                  
(appstreamcli:3459): GLib-ERROR **: 23:46:48.952: g_variant_new_parsed: 11-13:invalid GVariant format string

E: Problem executing scripts APT::Update::Post-Invoke-Success 'if /usr/bin/test -w /var/cache/app-info -a -e /usr/bin/appstreamcli; then appstreamcli refresh-cache > /dev/null; fi'
```

## Dazed and confused

> Uhhuh. NMI received for unknown reason 31 on CPU 13.
> Do you have a strange power saving mode enabled?
> Dazed and confused, but trying to continue

No handler for the interrupt. Not good, but not critical. More important is that nothing wrong with the power supply.

Source: https://utcc.utoronto.ca/~cks/space/blog/linux/NMIUnknownReasonMeaning?showcomments#comments


## Sleeping COM ports

IIRC this was an issue in Ubuntu 16.04. After reboot the COM port is not sending or receiving any data. It's "sleeping". In order to wake up such port you need to open it with `screen` once

```bash
#!/bin/bash

# touch ports
screen -S com5 -d -m /dev/ttyS4
screen -S com7 -d -m /dev/ttyS6
screen -S com8 -d -m /dev/ttyS7

# kill screen sessions
screen -S com5 -X kill
screen -S com7 -X kill
screen -S com8 -X kill
```

## Serial console speed

A very good Morse code operator can send/receive 30 words per minute, which is about 600bits/s.
Linux serial console is only 192 times faster.

Just a random thought.