---
path: /blog/weston-autolaunch
date: 2021-07-19
title: Weston autolaunch
published: 2021-10-14
lastModified: 2021-10-14
---

**Update (May 2022):** Back in June 2021 when I was working on my task and was dissecting Weston, this [feature request](https://gitlab.freedesktop.org/wayland/weston/-/issues/171) was open. But now it's merged to upstream! I'm going to test that out. 
**End of the update**

---


For example you need to make a kiosk-type system where after automatic login one main application starts [in the center of the screen](/blog/center-window-in-weston). This is where you research about autostart feature.

According to the [official XDG specification](https://specifications.freedesktop.org/autostart-spec/autostart-spec-latest.html)

> By placing an application's .desktop file in one of the Autostart directories the application will be automatically launched during startup of the user's desktop environment after the user has logged in. 

Autostart directories can be either `~/.config/autostart/` or `/etc/xdg/autostart/`. This does not work. [Maybe it worked](https://gitlab.freedesktop.org/wayland/weston/-/issues/456) in the old version, but I'm using Weston 9.0.0.

In the following [ticket](https://gitlab.freedesktop.org/wayland/weston/-/issues/476) and [this forum](https://archlinuxarm.org/forum/viewtopic.php?f=57&t=15209) autostart of graphical application was prepared as systemd service which might work, but only once in a blue moon.

On [wiki pages](https://wiki.parabola.nu/Wayland) of Parabola OS I found some ideas. I can use **.bash_profile** and `dbus-run-session` to autostart on login

```bash
[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && dbus-run-session -- gnome-shell --display-server --wayland
```

But docs of [Yocto Project](https://developer.toradex.com/knowledge-base/how-to-autorun-application-at-the-start-up-in-linux) gave me more ideas that finally all together turned into one working solution. 

So their version looks like this:

```bash
# wait for weston
while [ ! -e  $XDG_RUNTIME_DIR/wayland-0 ] ; do sleep 0.1; done
sleep 1

/path/to/the/application &
```

It can be a systemd service that calls the script as was mentioned earlier. Such service example:

```
[Unit]
Description=Start a wayland application
After=weston@root.service
Requires=weston@root.service
 
[Service]
Restart=on-failure
Type=forking
ExecStart=/usr/bin/wayland-app-launch.sh
RestartSec=1

[Install]
WantedBy=multi-user.target
```

Weston service example if needed

```
[Unit]
Description=Weston Kiosk mode
After=network.target

[Service]
Type=notify
RuntimeDirectory=weston
RuntimeDirectoryMode=0755
Environment="XDG_RUNTIME_DIR=/run/weston"
ExecStart=/usr/bin/weston --tty=1 --log=/var/log/runeaudio/weston.log \
              --config=/srv/http/.config/weston.ini --modules=systemd-notify.so
ExecStop=/usr/bin/pkill -15 weston
IgnoreSIGPIPE=no
StandardOutput=journal
StandardError=journal
TimeoutSec=infinity

[Install]
WantedBy=multi-user.target
```


But in my case, while I'm using InitV in my [custom Linux build](/blog/custom-linux), this bash script goes to **/etc/init.d/** and has the `case` block around main logic:

```bash
#!/bin/sh
#
# Start The Installer....
#

case "$1" in
  start)
    echo "Starting The Installer..."
    # writeble dir for weston
    export XDG_RUNTIME_DIR=/tmp/xdg-runtime-dir
    rm -rf "${XDG_RUNTIME_DIR}"
    mkdir "${XDG_RUNTIME_DIR}"
    chmod 0700 "${XDG_RUNTIME_DIR}"
    export XDG_CONFIG_HOME=/root/.config
    dbus-launch weston --tty=1 &
    
    # wait for weston
    while [ ! -e $XDG_RUNTIME_DIR/wayland-0 ]; do sleep 0.1; done

    export WAYLAND_DISPLAY=wayland-0
    /path/to/some-qt-app -platform wayland
    ;;
  stop)
    ;;
  restart|reload)
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
    exit 1
esac

exit $?

```

This script just waits in the background while Weston is going to be initialized by checking one variable `$XDG_RUNTIME_DIR/wayland-0` and after that it starts the application.