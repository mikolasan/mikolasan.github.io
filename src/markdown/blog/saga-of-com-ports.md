---
date: 2019-04-18
title: Saga of COM ports
published: 2024-08-08
lastModified: 2024-08-08
---

## Commands

View the activity

```bash
cat /proc/tty/driver/serial
```

Example output:

```
serinfo:1.0 driver revision:
0: uart:16550A port:00004310 irq:32 tx:70610 rx:70683 RTS|CTS|DTR|DSR|CD|RI
1: uart:16550A port:00004318 irq:32 tx:6352 rx:12704 RTS|CTS|DTR|DSR|CD|RI
2: uart:16550A port:00004320 irq:32 tx:16314 rx:0 RTS|DTR|DSR|CD|RI
3: uart:16550A port:00004328 irq:32 tx:132 rx:0 DSR|CD|RI
4: uart:16550A port:00004300 irq:32 tx:0 rx:0 DSR|CD|RI
5: uart:16550A port:00004308 irq:32 tx:0 rx:0 DSR|CD|RI
```

Get current port settings

```bash
stty -F /dev/ttyS0 -a
```

Example output

```
speed 9600 baud; rows 0; columns 0; line = 0;
intr = ^C; quit = ^; erase = ^?; kill = ^U; eof = ^D; eol = <undef>; eol2 = <undef>; swtch = <undef>;
start = ^Q; stop = ^S; susp = ^Z; rprnt = ^R; werase = ^W; lnext = ^V; discard = ^O; min = 1; time = 0;
-parenb -parodd -cmspar cs8 hupcl -cstopb cread -clocal -crtscts
-ignbrk -brkint ignpar -parmrk -inpck -istrip -inlcr -igncr -icrnl -ixon -ixoff -iuclc -ixany -imaxbel
-iutf8
-opost -olcuc -ocrnl -onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0
-isig -icanon -iexten -echo -echoe -echok -echonl -noflsh -xcase -tostop -echoprt -echoctl -echoke -flusho
-extproc
```


## Ownership

The `c_cflag` member contains two options that should always be enabled, `CLOCAL` and `CREAD`. These will ensure that your program does not become the 'owner' of the port subject to sporatic job control and hangup signals, and also that the serial interface driver will read incoming data bytes.

```bash
#!/bin/bash

set -x

setup_com_port() {
    id=$1
    # set baud rate, disable modem control signals
    stty -F "/dev/ttyS$id" 9600 eof ^D min 0 time 8 clocal -ignpar inpck parenb
}

if [ -n "$1" ]; then
    setup_com_port $1
else
    for i in $(seq 0 5); do
        setup_com_port $i
    done
fi
```

Magical touch with the **screen** utility

```bash
#!/bin/bash

# touch ports
screen -S com5 -d -m /dev/ttyS4
screen -S com7 -d -m /dev/ttyS6
screen -S com8 -d -m /dev/ttyS7

# kill screen sessions
screen -S com5 -X kill
screen -S com7 -X kill
screen -S com8 -X kill
```

Links:

- [](https://www.cmrr.umn.edu/~strupp/serial.html)
- [](http://ezv24.sourceforge.net/api-html/ezV24_8h.html#ac5c162d1349468a5baf6b7ba0e10ada6)
- [](https://github.com/joede/libezV24)
- [](https://pythonhosted.org/pyserial/pyserial_api.html#classes)



## Reference

- Linux kernel [boot parameters](https://tldp.org/HOWTO/Serial-HOWTO-15.html)
- [Remapping with udev rules](https://serverfault.com/questions/137400/remapping-linux-serial-port-device-names): `ACTION=="add" KERNEL=="ttyS2" NAME="ttyS1"`
- Rename `mv /dev/ttyS2 /dev/ttyS1`
- ModemManager can screw you over ([documentation](https://modemmanager.org/docs/modemmanager/port-and-device-detection/))
- [Inspect serial port on Linux](https://sourceforge.net/projects/serlook/)
- [Sniff serial port on Linux](https://serverfault.com/questions/112957/sniff-serial-port-on-linux)
- [Monitor serial port on Linux](https://stackoverflow.com/questions/940374/how-can-i-monitor-data-on-a-serial-port-in-linux)