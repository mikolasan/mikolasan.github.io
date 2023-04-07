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

