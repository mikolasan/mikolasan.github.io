---
title: Compile decentralised chat app
subtitle: Rust and GTK4 on Windows
date: 2023-04-26
published: 2023-05-05
lastModified: 2023-05-05
---
## Fractal (Matrix client)

[Fractal](https://gitlab.gnome.org/World/fractal) - [Matrix](https://matrix.org/) group messaging app

### How to build on Windows

To test that you have all native libraries installed, run build through meson

```
meson setup build
```

GTK4 bindings for Rust done through [this crate](https://gtk-rs.org/). So they assume that one already have GTK4 installed natively.
And [this](https://gtk-rs.org/gtk4-rs/stable/latest/book/installation_windows.html) is how we install GTK4 using MSVC toolchain.
I'm going to follow the [gvsbuild docs](https://github.com/wingtk/gvsbuild#development-environment) to build GTK 4.

Updated **chocolatey** just in case (the last time I used this tool in 2018 when I built [Open Morrowind](/projects/my-morrowind)).

```sh
mkdir gtk-build
cd gtk-build
mkdir github
cd github
git clone https://github.com/wingtk/gvsbuild.git
cd gvsbuild
```

Open Anaconda PowerShell prompt (I installed **miniconda** [here](/blog/starcode))

```powershell
python -m venv .venv
.\.venv\Scripts\activate.ps1
pip install .
gvsbuild build gtk4 libadwaita gtksourceview5 gettext
```

Then make sip of tea 🍵

Add `C:\gtk-build\gtk\x64\release\bin` to user's `PATH`.


GStrreamer. Make sure to run ninja from **x64 Native Tools Command Prompt for VS 2022**

```
git clone https://gitlab.freedesktop.org/gstreamer/gstreamer.git
cd gstreamer
pip install --user meson
meson configure
meson setup -Dbuildtype=release -Dprefix="c:/gtk-build/gstreamer/x64/debug/" -Dtests=disabled -Dexamples=disabled -Dintrospection=disabled c:\Users\neupo\develop\gtk-build\github\gstreamer-build
ninja -C c:\Users\neupo\develop\gtk-build\github\gstreamer-build
cd ..\gstreamer-build
meson install
```

Or fix config later with `meson configure -Dtests=disabled -Dexamples=disabled -Dintrospection=disabled c:\Users\neupo\develop\gtk-build\github\gstreamer-build`. If you forgot to specify `prefix`, don't worry, it can be fixed on the install step by specifying `--destdir` ([ref](https://mesonbuild.com/Installing.html#destdir-support))

```
git clone https://gitlab.gnome.org/GNOME/libshumate.git
cd libshumate
```