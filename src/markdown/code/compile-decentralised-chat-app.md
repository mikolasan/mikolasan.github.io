---
title: Compile decentralised chat app
subtitle: Rust and GTK4 on Windows
date: 2023-04-26
published: 2023-05-05
lastModified: 2023-05-05
---

Today we are going to compile [Fractal](https://gitlab.gnome.org/World/fractal) - [Matrix](https://matrix.org/) group messaging app - on Windows, because this app doesn't support Windows out of the box.

## cargo vs meson

First thing first, people like to use the latest features in Rust, so we will update the toolchain:

```
rustup update
```

To test that you have all native libraries installed, run the build through meson

```
meson setup build
```

## gtk-rs

GTK4 bindings for Rust done through [this crate](https://gtk-rs.org/). So they assume that one already have GTK4 installed natively.
And [this](https://gtk-rs.org/gtk4-rs/stable/latest/book/installation_windows.html) is how we install GTK4 using MSVC toolchain.

## Install GTK4 using MSVC toolchain

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

Open Anaconda PowerShell prompt 
- I have installed **miniconda** before (as described [here](/blog/starcode))
- or simple Windows PowerShell and execute `C:\Users\neupo\miniconda3\shell\condabin\conda-hook.ps1`, then `conda activate 'C:\Users\neupo\miniconda3'` 
and there

```powershell
python -m venv .venv
.\.venv\Scripts\activate.ps1
pip install .
gvsbuild build gtk4 libadwaita gtksourceview5 gettext
```

Then take a sip of tea 🍵

```
Project(s) built:
    ninja                     (0.008)
    meson                     (0.000)
    pkgconf                   (0.743)
    cmake                     (0.000)
    nasm                      (0.016)
    libjpeg-turbo             (1.952)
    libtiff-4                 (9.334)
    win-iconv                 (0.649)
    gettext                   (14.424)
    libffi                    (0.633)
    zlib                      (0.154)
    pcre2                     (0.787)
    glib-base                 (1.920)
    glib                      (0.031)
    libpng                    (0.950)
    gdk-pixbuf                (1.388)
    freetype                  (1.500)
    gperf                     (0.718)
    expat                     (0.718)
    fontconfig                (1.173)
    pixman                    (0.649)
    cairo                     (0.856)
    harfbuzz                  (1.003)
    fribidi                   (0.733)
    pango                     (1.357)
    libepoxy                  (0.686)
    graphene                  (1.366)
    gtk4                      (169.799)
    msys2                     (0.000)
    libadwaita                (85.240)
    libxml2                   (29.655)
    gtksourceview5            (57.754)
```

Add `C:\gtk-build\gtk\x64\release\bin` to user's `PATH`.


GStreamer. Make sure to run ninja from **x64 Native Tools Command Prompt for VS 2022**

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

Or fix the config later with 
```
meson configure -Dtests=disabled -Dexamples=disabled -Dintrospection=disabled c:\Users\neupo\develop\gtk-build\github\gstreamer-build
```

If you forgot to specify `prefix`, don't worry, it can be fixed on the install step by specifying `--destdir` ([ref](https://mesonbuild.com/Installing.html#destdir-support))

```
git clone https://gitlab.gnome.org/GNOME/libshumate.git
cd libshumate
```

This is where I stopped.