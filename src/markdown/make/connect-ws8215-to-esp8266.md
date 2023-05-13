---
date: 2021-08-24
title: Connect WS8215 to ESP8266
published: 2021-08-24
lastModified: 2021-08-24
---

With the increasing popularity of smart home devices and the Internet of Things (IoT), it's now possible to control lighting remotely from a server. In this post, we'll explore a project idea that involves sending LED light sequences from a server over the network, using ESP8266 boards connected to Wi-Fi. Specifically, we'll be using Art-Net, a popular protocol for transmitting DMX512 (digital multiplex) lighting control data over Ethernet networks. With this project, we can create dynamic lighting displays that can be controlled from anywhere with an internet connection. 

- https://github.com/jasoncoon/esp8266-fastled-webserver
- https://tynick.com/blog/11-03-2019/getting-started-with-wled-on-esp8266/
- https://depositphotos.com/217207028/stock-video-music-light-box-audio-meter.html


## Pinout

- try other pins (also [https://www.instructables.com/ESP8266-Using-GPIO0-GPIO2-as-inputs/](https://www.instructables.com/ESP8266-Using-GPIO0-GPIO2-as-inputs/)), cause "since there are only 2 pins available on the ESP8266 for "hardware accelerated" LED driving" [https://github.com/Aircoookie/WLED/issues/104#issuecomment-462276979](https://github.com/Aircoookie/WLED/issues/104#issuecomment-462276979) and "What you are seeing about "No SPI hardware pins" is just a warning, below that it says that it will use a bitbanged software solution." [https://www.reddit.com/r/arduino/comments/bsl6mg/esp8266_and_fastled/eoo6ick/?utm_source=reddit&utm_medium=web2x&context=3](https://www.reddit.com/r/arduino/comments/bsl6mg/esp8266_and_fastled/eoo6ick/?utm_source=reddit&utm_medium=web2x&context=3)
- SPI? https://github.com/FastLED/FastLED/issues/429 https://github.com/FastLED/FastLED/pull/936
- https://www.ledlightinghut.com/files/WS2815B.pdf


## Art-net libraries

To get started, you'll need to set up your ESP8266 board to receive Art-Net packets from the server. Art-Net is a protocol for controlling DMX lighting fixtures over a network, and it's commonly used in lighting installations and stage productions. You can use the ESP8266's built-in Wi-Fi module to connect to your network and receive Art-Net packets. The Art-Net protocol sends data in the form of DMX512 packets, which contain up to 512 channels of data. Each channel corresponds to a single LED or group of LEDs in your installation. There are several libraries available for the ESP8266 that implement the Art-Net protocol


### FastLED

[Example](/make/ws8215-led-strip-fastled-example)

- https://acrobotic.com/products/acr-00021/
- https://www.esp8266.com/viewtopic.php?p=67776
- https://tttapa.github.io/ESP8266/Chap04 - Microcontroller.html
- https://github.com/FastLED/FastLED/wiki/ESP8266-notes
- https://github.com/FastLED/FastLED/wiki/Rgb-calibration
- try 160 Mhz [https://www.reddit.com/r/FastLED/comments/c2w1yy/esp32_esp8266_fastled_no_signal_output_on_the_pin/ern3eg6/?utm_source=reddit&utm_medium=web2x&context=3](https://www.reddit.com/r/FastLED/comments/c2w1yy/esp32_esp8266_fastled_no_signal_output_on_the_pin/ern3eg6/?utm_source=reddit&utm_medium=web2x&context=3) [https://github.com/FastLED/FastLED/issues/367#issuecomment-618656585](https://github.com/FastLED/FastLED/issues/367#issuecomment-618656585)
- interrupts [https://github.com/FastLED/FastLED/wiki/Interrupt-problems](https://github.com/FastLED/FastLED/wiki/Interrupt-problems) [https://forum.makerforums.info/t/im-having-trouble-just-getting-fastled-to-work-properly-with-a-wemos-d1-mini/62964/10](https://forum.makerforums.info/t/im-having-trouble-just-getting-fastled-to-work-properly-with-a-wemos-d1-mini/62964/10)


### NeoPixel

[https://github.com/adafruit/Adafruit_NeoPixel](https://github.com/adafruit/Adafruit_NeoPixel)


### NeoPixelBus

[https://github.com/Makuna/NeoPixelBus/wiki](https://github.com/Makuna/NeoPixelBus/wiki)

### My library

I compiled all resources one need to know about UDP, DMX and Art-Net in [this](/code/udp-client-and-art-net-parser) blog post