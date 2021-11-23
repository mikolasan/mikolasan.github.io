---
path: /blog/artnet-on-arduino
date: 2021-09-21
title: Art-Net on Arduino
tags: ["led", "hardware"]
published: 2021-10-13
lastModified: 2021-10-13
---

## DMX512

Send/receive DMX on Arduino

- https://www.mischianti.org/2020/05/11/interface-arduino-esp8266-esp32-rs-485/
- https://tigoe.github.io/DMX-Examples/arduinodmx.html
- http://www.mathertel.de/Arduino/DMXSerial.aspx
- https://github.com/mathertel/DMXSerial/blob/master/examples/DmxSerialNeoPixels/DmxSerialNeoPixels.ino

## ArtNet

Send/receive Art-Net on Arduino

- https://www.arduino.cc/reference/en/libraries/artnet/
- choose one http://dmxking.com/m/support/13-control-software/80-artnet-sacn-software
- https://artisticlicence.com/product/dmx-workshop/
- https://learn.sparkfun.com/tutorials/using-artnet-dmx-and-the-esp32-to-drive-pixels/all
- https://resolume.com/download/files?file=Resolume_Arena_7_5_0_rev_77960_Installer.exe

## Art-Net listener

I'm thiinking to write my own UDP client and Art-Net parser. Let's learn about direct UDP packets and UDP broadcast

- https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/udp-examples.html
- https://wiki.python.org/moin/UdpCommunication
- https://github.com/cpvalente/stupidArtnet/blob/b24f5939b8d14371511e3544721b01a673340882/stupidArtnet/StupidArtnet.py#L16
- https://www.qlcplus.org/index.html