---
title: MIT magic cookie
date: 2024-10-18
published: 2024-10-18
lastModified: 2024-10-18
---

How to fix invalid magic cookie

```
Invalid MIT-MAGIC-COOKIE-1 keyInvalid MIT-MAGIC-COOKIE-1
```

You need a proper content in **.Xautority** because Xorg started by another user (it probably could be fixed by the `xhost` command by allowing any user but I didn’t succeed in that quest)

```bash
sudo -i
cat /run/user/1001/gdm/Xauthority > /root/.Xauthority
# or just point to already existing file of that user. we are the root - we can do it!
export XAUTHORITY=$(grep "^${SUDO_USER}:" /etc/passwd | cut -d : -f 6)/.Xauthority
export DISPLAY=:0.0

# test
xinput --list
```

But this has a side effect on a GDM session. It kicks back to the login greeter (gnome-shell) from already working **bspwm** window manager.

```
sudo nano /etc/systemd/system/xorg-nik.service

```

```ini
[Unit]
Description=X11 session for nik
After=graphical.target systemd-user-sessions.service

[Service]
User=nik
WorkingDirectory=~

PAMName=login
Environment=XDG_SESSION_TYPE=x11
TTYPath=/dev/tty8
StandardInput=tty
UnsetEnvironment=TERM

UtmpIdentifier=tty8
UtmpMode=user

StandardOutput=journal
ExecStart=/usr/bin/startx -- vt8 -nolisten tcp -background none -noreset -keeptty -novtswitch -verbose 3 -logfile /dev/null
Restart=always
RestartSec=3

[Install]
WantedBy=graphical.target
```

```
sudo systemctl stop gdm
sudo systemctl stop gdm3 
sudo systemctl disable gdm
sudo systemctl disable gdm3

sudo systemctl start xorg-nik.service
sudo systemctl enable xorg-nik.service
```

Ref: https://vincent.bernat.ch/en/blog/2021-startx-systemd


Then change terminal to urxvt because gnome-terminal is broken now. [Add configuration](https://addy-dclxvi.github.io/post/configuring-urxvt/). [Set executable flag](https://superuser.com/questions/1491535/rxvt-terminal-emulator-resets-settings-after-logout) for Xresources (maybe?).

But that didn’t work, I just need to load it manually in **xinitrc**

