---
date: "2020-05-16"
title: "Word clock"
tags: ["hardware", "embedded", "laser cut"]
coverImage: "word-clock.jpg"
published: 2021-10-13
lastModified: 2022-12-16
---

I followed instructions from Make magazine (Volume 67) and I made a word clock.

I also started a [code project](https://repl.it/@stakanmartini/WordClock#main.cpp) for discovering ways to place words on a grid. With all possible optimization like shaping words in a form of crossword.

![Acryl is ready](./word-clock-1.jpg)

## Why

It will stay on the table and will show time when I need to head out of the office.

## Process

Ordered laser cut

![Peel it](./word-clock-2.jpg)

Bought screws and adafruit boards. In the original instructions it used [Trinket Pro 5V](https://www.adafruit.com/product/2000) (ATmega328), but I followed the deprecation warning and chose [Adafruit ItsyBitsy 32u4 - 5V 16MHz](https://www.adafruit.com/product/3677) (Atmega32u4). Imprtant difference between them: the latter is missing mount holes which is the only way to attach the board to the acrylic case inside. I put it inside the case loosely, thus the USB connector become impossible to connect back once you unplug it, so one USB cable took roots in this build for a long time.

![The case parts](./word-clock-3.jpg)

How do you call screen that does not display time with digits, but tells it with words?

## Result

![The case is assembled](./word-clock-4.jpg)

The clock is working.

![It shows words](./word-clock-5.jpg)


## Links

- Laser cut layouts, Arduino code: https://github.com/andydoro/WordClock-NeoMatrix8x8
- [Add ItsyBitsy to Arduino IDE](https://learn.adafruit.com/introducting-itsy-bitsy-32u4/arduino-ide-setup). Additional Boards Manager URL: `https://adafruit.github.io/arduino-board-index/package_adafruit_index.json`