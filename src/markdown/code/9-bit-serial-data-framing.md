---
date: 2021-05-06
title: 9-bit serial data framing
published: 2021-05-06
lastModified: 2021-05-06
---

There is a very simple and very useful reason to have mark or space parity that appears to be left out here: node address flagging.

Very low-power and/or small embedded systems sometimes utilize an industrial serial bus like RS485 or RS422. Perhaps many very tiny processors may be attached to the same bus.

These tiny devices don't want to waste power or processing time looking at every single character that comes in over the serial port. Most of the time, it's not something they're interested in.

So, you design a bus protocol that uses for example maybe 9 bits... 8 data bits and a mark/space parity bit. Each data packet contains exactly one byte or word (the node address) with the mark parity bit set. Everything else is space parity. Then, these tiny devices can simply wait around for a parity error interrupt. Once it get's the interrupt, it checks that byte. Is that my address? No, go back to sleep.

It's a very power-efficient system... and only 10% wasteful on bandwidth. In many environments, that's a very good trade-off.

So... if you've then got a PC-class system trying to TALK to these tiny devices, you need to be able to set/clear that parity bit. So, you set MARK parity when you transmit the node addresses, and SPACE parity everywhere else.

----

Source: [darron](https://stackoverflow.com/a/15491266/1104612)

## Reference

- https://www.sealevel.com/support/what-is-9-bit-data-framing/
- https://adontec.com/9-bit-serial-communication.htm
- https://github.com/RishiGupta12/SerialPundit/blob/master/applications/9-bit-data.md
- https://www.ing.iac.es/~docs/external/serial/serial.pdf)
- [tcsetattr](https://linux.die.net/man/3/tcsetattr)
- [ioctl (tty)](https://man7.org/linux/man-pages/man4/tty_ioctl.4.html)
- [termios](https://man7.org/linux/man-pages/man3/termios.3.html)
- [https://stackoverflow.com/a/52303/1104612](https://stackoverflow.com/a/52303/1104612)
- [socat RFC 2217](http://www.dest-unreach.org/socat/contrib/socat-rfc2217.html)
- https://forum.arduino.cc/index.php?topic=595484.0
- https://forum.arduino.cc/index.php?topic=91377.15
- https://forum.arduino.cc/index.php?topic=85207.0
- https://pubs.opengroup.org/onlinepubs/009696799/basedefs/xbd_chap11.html#tag_11
- https://stackoverflow.com/questions/13953095/what-is-the-difference-between-using-mark-space-parity-and-parity-none