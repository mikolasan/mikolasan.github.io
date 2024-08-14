---
title: Build latest meson on Ubuntu 18
subtitle: meson-0.61.5 and compile plymouth
date: 2023-06-15
published: 2023-06-15
lastModified: 2023-06-15
---

When I needed to build the latest **plymouth** for Ubuntu 18 I encountered a chain of problems preventing me doing it. 

```
```

But nothing is impossible. Even ubiqutious Python we can update from 3.6 to 3.7 just to make meson happy.

## Update Python from 3.6 to 3.7

Lukily there is a PPA for that

```bash
apt purge python
apt purge python3
apt install software-properties-common
add-apt-repository ppa:deadsnakes/ppa
apt install python3.7
update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.6 1
update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 2
python3 --version
```

Then fix some things in the system

```bash
nano /usr/bin/gnome-terminal # 3 -> 3.6
cd /usr/lib/python3/dist-packages/
ln -s apt_pkg.cpython-36m-x86_64-linux-gnu.so apt_pkg.so
```

```bash
wget https://github.com/ninja-build/ninja/releases/download/v1.11.1/ninja-linux.zip
unzip ninja-linux.zip -d /usr/local/bin

git clone https://github.com/mesonbuild/meson.git /opt/meson
cd /opt/meson
wget https://bootstrap.pypa.io/pip/pip.pyz

apt-get install python3-setuptools
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3.7 get-pip.py

python3.7 -m pip install -e /opt/meson
```


## Other dependencies

Some dependencies are possible to get from the official repository 

```bash
apt install pkg-config \
  autoconf \
  libpng-dev \
  libpango1.0-dev \
  libdrm-dev \
  intltool \
  libudev-dev \
  libgtk-3-dev \
  xsltproc \
  libevdev-dev
```

But something like CMake provides a way to install the latest version

```bash
apt install git
wget https://github.com/Kitware/CMake/releases/download/v3.26.3/cmake-3.26.3-linux-x86_64.sh
mkdir /opt/cmake
sh cmake-3.26.3-linux-x86_64.sh --prefix=/opt/cmake --skip-license
ln -s /opt/cmake/bin/cmake /usr/local/bin/cmake
```


## Test

Let's test our fresh install of meson by building [plymouth](https://www.freedesktop.org/wiki/Software/Plymouth/) (sha: `a5eda165689864cc9a25ec14fd8c6da458598f42`)

```bash
git clone git://git.freedesktop.org/git/plymouth
cd plymouth
./autogen.sh --prefix=/usr --sysconfdir=/etc --localstatedir=/var --enable-tracing --disable-documentation
meson setup \
  --reconfigure \
  --prefix=/usr \
  --buildtype=plain \
  -D docs=false \
  . build
meson compile -C build
meson install -C build --destdir /opt/plymouth-bin
```

- [PKGBUILD](https://aur.archlinux.org/cgit/aur.git/tree/PKGBUILD?h=plymouth-git) as an example build configuration
- And here's a [list of current issues](https://gitlab.freedesktop.org/plymouth/plymouth/-/issues) in plymouth if there is something that bothers you and it's better be on the bleeding edge of development.


## References

- [meson build](https://github.com/mesonbuild/meson)
- [pip docs](https://pip.pypa.io/en/stable/installation/)
- [how to install pip](https://stackoverflow.com/questions/54633657/how-to-install-pip-for-python-3-7-on-ubuntu-18)
- module not found error for [distutils](https://github.com/pypa/get-pip/issues/124)