---
path: "/ru/hydroponics/sensors/co2"
date: "2021-07-19"
title: "Сенсор углекислого газа"
subtitle: "Статья из цикла про гидропонику"
buttonText: Сенсоры
buttonLink: /ru/hydroponics/sensors
secondButtonText: Гидропоника
secondButtonLink: /ru/hydroponics
tags: ["hydroponics"]
language: "ru"
draft: true
---

С одной стороны найти дешевый датчик углекислого газа сложно, потому что тема климата и окружающей среды для DIY еще не поставлена на поток, рынок в основном предлагает датчики угарного газа, дыма, алкоголя и другого. С другой стороны всяких разнообразных решений по детектированию углекислого газа намного больше чем датчиков [кислотности воды](/ru/hydroponics/sensors/ph) или [температуры](/ru/hydroponics/sensors/temperature):

- [SCD30 Sensirion](https://www.sensirion.com/en/environmental-sensors/carbon-dioxide-sensors/carbon-dioxide-sensors-scd30/)
- [AMS IAQ-CORE C](https://www.compel.ru/item-pdf/c232e7e7dbddb20824a26cdc0f748bed/pn/ams~iaq-core-c.pdf)
- [Sense Air](https://senseair.com/products/size-counts/s8-residential/)
- Figaro TGS4160
- WINSEN MG811, WINSEN MG812
- CCS811B

Именно последний из них (CCS811B) показался не интересным по конструкции и по цене. 

Купил я его на али [от keyestudio](https://s.click.aliexpress.com/e/_AmOv9C).
Есть другой вариант, который сразу на плате имеет датчик температуры и влажности  (https://s.click.aliexpress.com/e/_An8OwQ)

[Даташит](https://cdn.compacttool.ru/downloads/CCS811_Datasheet.pdf)


## Абракадабра от продавца

Описание с [офичиального сайта](https://wiki.keyestudio.com/KS0457_keyestudio_CCS811_Carbon_Dioxide_Air_Quality_Sensor)

Keyestudio CCS811 carbon dioxide, temperature air quality sensor mainly uses the CCS811B chip. It is an ultra-low-power miniature digital gas sensor that can detect a wide range of volatile organic compounds (TVOCs), including equivalent carbon dioxide (eCO2) and metal oxide (MOX) levels.

Equivalent carbon dioxide (eCO2) is measured in the range of 400 to 8192 ppm (parts per million), and various volatile organic compounds (TVOC) ranges from 0 to 1187 ppb (parts per billion).

At the same time, the sensor comes with a 10K precision 1% NTC thermistor, which can be used to test the specific temperature in the environment.

In order to fix to other devices, the sensor comes with a positioning hole with a diameter of 3mm.

Technical Parameters

- Working voltage: DC 5V
- Working current: 30mA
- Maximum power: 46mW
- eCO2 measurement range: 400-8192 ppm
- TVOC measurement range: 0 to 1187 ppb
- Working temperature: -25 ~ +65℃
- Interface: 7pin (2.54mm pitch)
- Positioning hole diameter: 3mm  
- Dimensions: 30*20mm
- Environmental attributes: ROHS
 
### PINOUTS

- GND - ground
- VCC - Input power（5V）
- SDA - I2C data pin
- SCL - I2C clock pin
- RST - Reset pin: connect to ground, sensor will automatically reset.
- WAKE - WAKE pin should connect to ground to communicate with sensor conveniently
- INT - This is the interrupt output pin that detects when a new reading is ready or the reading becomes too high or too low. 

### Комменты

There was almost 3 days burn-in period before the sensor stopped drifting. Now it seems to read the value well, although I have no way of testing its precision. It also requires 20 minutes of preheat when cold started and baseline calibration.



## Подключение



## Ссылки

[Али](https://s.click.aliexpress.com/e/_AmOv9C)
[Даташит](https://cdn.compacttool.ru/downloads/CCS811_Datasheet.pdf)