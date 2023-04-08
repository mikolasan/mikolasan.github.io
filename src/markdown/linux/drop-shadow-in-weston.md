---
path: /blog/drop-shadow-in-weston
date: 2021-08-19
title: Drop shadow effect in Weston
published: 2021-10-14
lastModified: 2021-10-14
---

Weston terminal has a shadow effect. 

<pre>
Me: I want the same thing for my Qt app!
Weston: No
Weston (hesitantly): But you can draw it by yourself
</pre>

- https://gitlab.freedesktop.org/wayland/weston/-/issues/266
- https://github.com/mpv-player/mpv/pull/7186
- https://gitlab.gnome.org/GNOME/mutter/-/issues/158

In other words, trying to add shadow effect to Qt app in Weston is bleeding edge technologies. As always.

- https://www.qt.io/blog/2018/12/14/whats-new-wayland-platform-plugin-qt-5-12
- https://www.qt.io/blog/custom-window-decorations

Before we start. Here is more shadow examples:

- Liri desktop https://twitter.com/liridev
- Proposed to GNOME https://gitlab.gnome.org/GNOME/gtk/-/issues/1357

## Window flags

https://doc.qt.io/qt-5/qtwidgets-widgets-windowflags-example.html

## Wayland Decoration Plugin

Qt Wayland decoration plugin **bradient** https://lists.qt-project.org/pipermail/development/2015-November/023663.html

- **material** from `qtintegration` (Liri OS) https://github.com/lirios/qtintegration/blob/develop/src/plugins/decorations/material/materialdecoration.cpp
- **material** from Papyros Shell https://github.com/indraneeldutta/Indistro/blob/c0d6e3e6c4eaffe9857edd5cc8ff1659b79a833b/decorations/main.cpp

```
QT_WAYLAND_DECORATION=material
```

## Window property

```
window->sendProperty("drawServerShadow", "true");
```

## Client side decoration (CSD)

```
QT_WAYLAND_DISABLE_WINDOWDECORATION
```

- https://github.com/WayfireWM/wayfire/issues/437
- https://git.sailfishos.org/faenil/qtwayland/commit/77248e2765e4db5cd7fe6e53e07a612d75b91011?view=parallel
