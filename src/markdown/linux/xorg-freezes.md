---
title: How to detect when Xorg freezes?
date: 2023-04-05
published: 2023-04-05
lastModified: 2023-05-03
---

Sometimes Xorg just freezes. Maybe it's caused by my graphical app, or maybe not. Here's what I see in **.xsession-errors.old**

```
The server closed the connection.
The server closed the connection: socket, pipe or stream error.
```

And also another type of errors

```
Failed request: ChangeProperty, BadWindow: 0x00800003.
```

## Investigation begins

Let's find out how Xorg is started and with what arguments. On a system with lightdm you run `systemctl status lightdm` and find this

```
/usr/lib/xorg/Xorg -core :0 -seat seat0 -auth /var/run/lightdm/root/:0 -nolisten tcp vt7 -novtswitch
```

Another place is `nano /etc/X11/xinit/xserverrc`.  

The `-nolisten` flag means that no TCP connections on port 6000, but only unix socket. To enable TCP you need to create a file `nano /usr/share/lightdm/lightdm.conf.d/50-nick-test.conf` with this content

```
[Seat:*]
xserver-allow-tcp=true
```

(Source: nolisten flag [added to the command line](https://github.com/canonical/lightdm/blob/ba7f6efc5c802aa87520b526ab5bc72b81669311/src/x-server-local.c) set by setting from config [here](https://github.com/canonical/lightdm/blob/653809c387c0a4e4d96f7999db3106d89970d4c7/src/seat-local.c))

Then after reboot you will see the Xorg listening on port 6000 with `netstat -lpnt` (install it with `apt install net-tools`)

```
tcp        0      0 0.0.0.0:6000            0.0.0.0:*               LISTEN      894/Xorg
```

Also open ssh [X11 forwarding​](https://gist.github.com/Shivanshu-Gupta/ae67abfa67f6bc8033e361dc119a7d46)  for our experiments `nano /etc/ssh/sshd_config`:

```
X11Forwarding yes
```


I looked into implementation of [the XOpenDisplay function](https://gitlab.freedesktop.org/xorg/lib/libx11/-/blob/master/src/OpenDis.c). So, basically I need to [test the open a connection with **XCB**](https://xcb.freedesktop.org/manual/group__XCB__Core__API.html#ga094470586356d1764e69c9a1882966c3)  ([docs](https://www.x.org/releases/X11R7.6/doc/libxcb/tutorial/index.html))  


## Restart Xorg and save the app

I didn't find any tools to make this proposition to work. But here's a list of tools I looked at

- The answer ​[Possible to move a window from one X screen to another on same host?](https://unix.stackexchange.com/questions/239220/possible-to-move-a-window-from-one-x-screen-to-another-on-same-host)
- another small answer ​[Recover an application in sleeping state after an X server crash](https://superuser.com/questions/238728/recover-an-application-in-sleeping-state-after-an-x-server-crash)  
- ​[X2Go](https://wiki.x2go.org/doku.php/doc:de-compat)  
- ​[Guievict](https://www.paradyn.org/projects/legacy/guievict/)  - A system for checkpointing and migrating the GUI of an X window application ([github](https://github.com/dyninst/guievict))
- 

### xmove

​[xmove](https://en.wikipedia.org/wiki/Xmove)  - ​[github](https://github.com/dparnell/xmove)  

- ​[xmove-2.0-unix-domain.patch](https://github.com/OpenMandrivaAssociation/xmove/blob/master/xmove-2.0-unix-domain.patch)  
- ​[Debian](https://sources.debian.org/src/xmove/2.0beta2-8/)  
- ​[Xmove improved](https://web.archive.org/web/20040808185651/http://markballew.com/projects/xmove/)  

### xpra

- xpra (​[github](https://github.com/Xpra-org/xpra) , [site](https://xpra.org/),  [ArchWiki](https://wiki.archlinux.org/title/Xpra))  Can xpra use opengl framebuffer?

```bash
wget -O /usr/share/keyrings/xpra.asc https://xpra.org/gpg.asc
wget -O /etc/apt/sources.list.d/xpra.sources https://raw.githubusercontent.com/Xpra-org/xpra/master/packaging/repos/bionic/xpra.sources
```

## References

- [https://wiki.postmarketos.org/wiki/Troubleshooting:display](https://wiki.postmarketos.org/wiki/Troubleshooting:display)
- [https://www.x.org/archive/X11R6.8.0/doc/Xorg.1.html](https://www.x.org/archive/X11R6.8.0/doc/Xorg.1.html)
- Also check out the code in my [Mr Bean](https://github.com/mikolasan/cool-beans) repository
