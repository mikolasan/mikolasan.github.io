---
title: Electonics building blocks
date: 2023-11-04
published: 2023-11-04
lastModified: 2023-11-04
---

## From Ali

- [Capacitive Soil Moisture Sensor](/make/capacitive-soil-moisture-sensor)


## Wishlist

- [T-Deck](https://www.lilygo.cc/products/t-deck) - Blackbery / Nokia clone
- [T-Display](https://www.lilygo.cc/products/t-display-s3-amoled) - Juicy display, favourite toy of [@Sulfuroid](https://twitter.com/sulfuroid)


## Dumpster dive

- DAGU robot MINI DC gearbox DG01D 48:1
- Liyhium Poli Battery 3.7V 1300mAh
- [Qwiic motor driver](https://www.sparkfun.com/products/15451) (1.5 A peak drive per channel, 1.2 A steady state, Operates from 3 to 11 Volts with 12V absolute max, 3.3V default VCC and logic, Controllable by I2C or TTL UART signals) based on DRV8835. Similar chip [I reveiwed already](/make/robot/motor-controller-board)
- [Pi Servo Hat](/make/servo-hat-for-raspberry-pi). 16 PWM channels, controllable over I2C
- [Accelerometer and gyroscope](https://www.sparkfun.com/products/18020). I2C, 3.3V operating voltage
- Passive Infrared (PIR) sensors are great for detecting motion in a small area around the sensor. 
- [MicroMod MikroBUS Carrier Board](https://www.sparkfun.com/products/18710) - I also mention it in my [power board](/make/robot/power-board) development notes. equipped with a MCP73831 Single-Cell Lithium-Ion/Lithium-Polymer Charge IC. It receives power from the USB connection and can source up to 450mA to charge an attached battery. PLus 3.3V 1A Voltage 
## Other components

- [WROOM](/make/esp32-s2-wroom)
- [Ultrasonic distance sensor HC-SR04](/make/distance-sensor)


## 1.14 Inch TFT Display Module

- Screen size: 135 x 240 (14.86 x 24.91 (mm))
- Module size: 30.40 x 28 (mm)
- Colors: 65K
- Protocol: SPI
- IC: ST7789V [datasheet](https://newhavendisplay.com/content/datasheets/ST7789V.pdf)
- VCC: 3.3V
- [store link](https://www.aliexpress.us/item/3256805450520253.html)
- OLED ?

### Connection (Wemos D1 R1)

- GND -> GND obviously
- VCC -> 3.3V
- SCL -> D5 / SCK (clock)
- SDA -> D7 / MOSI (data out)
- RES -> D0 (reset, any port is good)
- DC -> D3 (?, any port is good)
- CS -> D4 (child select, any port is good)
- BLK - not connected

## 1.44 inch TFT Display Module

- Screen size: 240 x 240 (23.4 x 23.4 (mm))
- Module size: 27,78 x 39.22 (mm)
- Colors: 65K
- Protocol: SPI
- IC ST7789VW
- VCC: 3.3V
- [store link](https://www.aliexpress.us/item/3256805804462796.html)
- IPS ?

### Important

- For Arduino boards do NOT forget resistors to [make voltage dividers](https://simple-circuit.com/arduino-st7789-ips-tft-display-example/). Connecting to 3.3V pin is not enough to save the display from 5V. 
- Do not skip the Reset pin (-1 doesn't mean that it is not connected)

In order to avoid level shifting (voltage dividers) use 3.3V boards. Here are some options

- [Adafruit Feather HUZZAH ESP8266](https://www.adafruit.com/product/3046) 80MHz with 3.3V (80MHz, Carl!)
- [Arduino Pro Mini 328](https://www.sparkfun.com/products/11114) 3.3V/8MHz (higher clock requires higher voltage, so if you see 16MHz quarts on the board with ATmega328P then it's definitely 5V)
- [Pro Micro](https://www.sparkfun.com/products/12587) ATmega32U4 3.3V/8MHz
- [Seeeduino-V4.2](https://www.seeedstudio.com/Seeeduino-V4-2-p-2517.html)


### Libraries

- Fast SPI in C for ST7789 [code](https://github.com/cbm80amiga/Arduino_ST7789_Fast)
- [Python library](https://github.com/Zeroji/st7789v)
- Adafruit GFX: [how config sent to the controller](https://github.com/adafruit/Adafruit-ST7735-Library/blob/master/Adafruit_ST77xx.cpp#L93C30-L93C30),
[number of columns and rows set in the config](https://github.com/adafruit/Adafruit-ST7735-Library/pull/126/files),
and [how SPI works](https://github.com/adafruit/Adafruit-GFX-Library/blob/126007f2c52d3238b7a1133ec14192c3d1deb8a9/Adafruit_SPITFT.cpp#L1901)


## Artemis Dev Kit

- [pinout](https://cdn.sparkfun.com/assets/6/b/e/8/c/Graphical_Datasheet_Artemis_DK.pdf)
- About [SPI](https://learn.sparkfun.com/tutorials/getting-started-with-the-artemis-development-kit/hardware-overview) (probably a typo in the pinout about SCK and SDO)


## Vibration motors

- Motor size: 4mm x 8mm
- Rated voltage: 3.0V DC
- Operating voltage range: 2.5-4.0V DC
- Rotation direction: CW/CCW
- Operating environment: -20°C - + 60°C
- Storage Environment: -30°C - + 70°C
- Rated speed: 11000 ± 3000RPM Min
- Rated current: 90mA max
- Stall current: 120mA max
- Starting voltage: 2.4V DC Max
- Insulation resistance: 10MΩ Min
- Termination impedance: 30Ω ±15% (single phase) | | 60 Ω ±15% (duplex)
- [store link](https://www.aliexpress.us/item/3256802567607902.html)