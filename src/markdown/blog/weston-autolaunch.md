---
path: /blog/weston-autolaunch
date: 2021-07-19
title: Weston autolaunch
published: 2021-10-14
lastModified: 2021-10-14
---

- `~/.config/autostart/` and `/etc/xdg/autostart/` maybe worked in very old version of Weston https://specifications.freedesktop.org/autostart-spec/autostart-spec-latest.html, but not with 9.0.0.
- Open issue about it https://gitlab.freedesktop.org/wayland/weston/-/issues/171
- And one more https://gitlab.freedesktop.org/wayland/weston/-/issues/456
- Parabola OS gives some hints https://wiki.parabola.nu/Wayland
- From InitV to systemd https://archlinuxarm.org/forum/viewtopic.php?f=57&t=15209


Interesting workaround found in [Yocto Project](https://developer.toradex.com/knowledge-base/how-to-autorun-application-at-the-start-up-in-linux)

```bash
# wait for weston
while [ ! -e  $XDG_RUNTIME_DIR/wayland-0 ] ; do sleep 0.1; done
sleep 1

/path/to/the/application &
```