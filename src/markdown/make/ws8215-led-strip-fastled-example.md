---
date: 2021-08-30
title: WS8215 LED strip
subtitle: FastLED example
published: 2021-08-30
lastModified: 2021-08-30
---

Wemos D1 R1 is an Arduino like board that has ESP8266 on board
(specifically ESP-12F)

## Initial setup (Arduino IDE)

1. File > Preferences > Additional Boards Manager URLSs: http://arduino.esp8266.com/stable/package_esp8266com_index.json
2. Tools > Board > Boards Manager. Search for: **wemos**. esp 8266 by ESP8266 Community. Version 3.0.2. Install
3. Tools > Board > LOLIN(WeMos) R1 D1
4. Tools > CPU Frequency > 160 MHz
5. Tools > Manage Libraries > Search for: **fastled**. FastLED by Daniel Garcia. Version 3.4.0. Install

## Upload

Copy the following sketch to Arduino IDE and **Upload** it to the board

```cpp
#define FASTLED_ESP8266_D1_PIN_ORDER
#include "FastLED.h"

#define WS2815 WS2812B
#define LED_TYPE WS2815
#define NUM_LEDS 4
#define DATA_PIN 4
#define COLOR_ORDER RGB

#define BRIGHTNESS 50

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(115200); // open serial port, set baud rate
  delay(1000);
  FastLED.addLeds<LED_TYPE, DATA_PIN, COLOR_ORDER>(leds, NUM_LEDS)
    .setCorrection(TypicalLEDStrip);
  FastLED.setBrightness(BRIGHTNESS);
}

const int max_size = 5;

void serialReadCommand() {
  static char buffer[max_size];
  static int size = 0;
  if (Serial.available() > 0) {
    char c = Serial.read();
    if ((c == '\r' || c == '\n') && size > 0) {
      processCommand(buffer);
      size = 0;
    } else if (size < max_size) {
      buffer[size++] = c;
      buffer[size] = '\0';
    }
  }
}

uint32_t current_color = 0x000000;

void processCommand(const char* command) {
  uint32_t color = 0x000000;
  switch(command[0]) {
    // Idle
    case '0': {
      color = 0x3AB795; // Mint
      break;
    }
    // Reels spinning
    case '1': {
      color = 0x55C1FF; // Maya Blue
      break;
    }
    // Reels stopped
    case '2': {
      color = 0x102E4A; // Prussian blue
      break;
    }
    // Transition start
    case '3': {
      color = 0x45364B; // English violet
      break;
    }
    // Transition done
    case '4': {
      color = 0x8797AF; // Cool grey
      break;
    }
    // Legacy bonus
    case '5': {
      color = 0xF3C969; // Orange yellow crayola
      break;
    }
    // Game cancelled
    case '6': {
      color = 0xA93F55; // Amarath Purple
      break;
    }
    // Nudge
    case '7': {
      color = 0xF7F06D; // Icterine
      break;
    }
    default: {
      color = 0x40F99B; // Medium spring green
      break;
    }
  }
  
  if (current_color != color) {
    current_color = color;
    CRGB pixel = CRGB(color);
    for (int i = 0; i < 4; ++i) {
      leds[i] = pixel;
    }
    FastLED.show();
  }
}

void loop() {
  serialReadCommand();
}
```

The latest version is available in my [GitHub gist](https://gist.github.com/mikolasan/8d197dabe24faab2e3f7d20c49ffc314)