---
path: "/ru/hydroponics/sensors/co2"
date: "2021-07-19"
title: "Сенсор углекислого газа"
subtitle: "Статья из цикла про гидропонику"
buttonText: Сенсоры
buttonLink: /ru/make/hydroponics/sensors
secondButtonText: Гидропоника
secondButtonLink: /ru/make/hydroponics
featuredImage: co2-hero.jpg
tags: ["hydroponics"]
language: "ru"
published: 2021-11-10
lastModified: 2021-11-10
---

С одной стороны найти дешевый датчик углекислого газа сложно, потому что тема климата и окружающей среды для DIY еще не поставлена на поток, рынок в основном предлагает датчики угарного газа, дыма, алкоголя и другого. С другой стороны всяких разнообразных решений по детектированию углекислого газа намного больше чем датчиков [кислотности воды](/ru/make/hydroponics/sensors/ph) или [температуры](/ru/make/hydroponics/sensors/temperature):

- [SCD30 Sensirion](https://www.sensirion.com/en/environmental-sensors/carbon-dioxide-sensors/carbon-dioxide-sensors-scd30/)
- [AMS IAQ-CORE C](https://www.compel.ru/item-pdf/c232e7e7dbddb20824a26cdc0f748bed/pn/ams~iaq-core-c.pdf)
- [Sense Air](https://senseair.com/products/size-counts/s8-residential/)
- Figaro TGS4160
- WINSEN MG811, WINSEN MG812
- CCS811B

Именно последний из них (CCS811B) показался мне интересным по конструкции и по цене. 

Купил я его на али [от keyestudio](https://s.click.aliexpress.com/e/_AmOv9C).
Есть [другой вариант](https://s.click.aliexpress.com/e/_An8OwQ), который сразу на плате имеет датчик температуры и влажности.

[Даташит](https://cdn.compacttool.ru/downloads/CCS811_Datasheet.pdf)


## Абракадабра от продавца

Описание с [официального сайта](https://wiki.keyestudio.com/KS0457_keyestudio_CCS811_Carbon_Dioxide_Air_Quality_Sensor)

<blockquote>

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
 
</blockquote>

### PINOUTS

- GND - ground
- VCC - Input power（5V）
- SDA - I2C data pin
- SCL - I2C clock pin
- RST - Reset pin: connect to ground, sensor will automatically reset.
- WAKE - WAKE pin should connect to ground to communicate with sensor conveniently
- INT - This is the interrupt output pin that detects when a new reading is ready or the reading becomes too high or too low. 

### Комменты

> There was almost 3 days burn-in period before the sensor stopped drifting. Now it seems to read the value well, although I have no way of testing its precision. It also requires 20 minutes of preheat when cold started and baseline calibration.

Я так понял, что нельзя, чтобы датчик лежал долго без использования.

> The sensors resistance will drift reversibly if it’s stored for a long time without electrify, this drift is related with storage conditions. Sensors should be stored in airproof bag without volatile silicon compound. For the sensors with long time storage but no electrify, they need to belong galvanized aging time for stability before using. 


## Подключение

5 вольт можно взять с пинов 2 и 4 на малинке

![5-ти вольтовый пин](./5v-Power-Raspberry-Pi.png)

Заметка: использую сайт https://pinout.xyz/pinout/5v_power, который показывает распиновку и подсказки по каждому пину.



## Ссылки

- [Али](https://s.click.aliexpress.com/e/_AmOv9C)
- [Даташит](https://cdn.compacttool.ru/downloads/CCS811_Datasheet.pdf)



## Другие варианты

**SCD30 Sensirion**
- [Сайт производителя](https://www.sensirion.com/en/environmental-sensors/carbon-dioxide-sensors/carbon-dioxide-sensors-scd30/)
- [Купить на али](https://aliexpress.ru/item/1005001392172293.html)

**AMS IAQ-CORE C**
- [Datasheet](https://www.compel.ru/item-pdf/c232e7e7dbddb20824a26cdc0f748bed/pn/ams~iaq-core-c.pdf)
- [Купить на али](https://aliexpress.ru/item/33044332335.html)

**Sense Air**
- [Сайт производителя](https://senseair.com/products/size-counts/s8-residential/)
- [Купить на али](https://aliexpress.ru/item/32863793412.html)

**Figaro TGS4160**

**WINSEN MG812**
- [Datasheet](https://data.electronshik.ru/z/Datasheet/M/mg812-co2-manual-v1_1.pdf)
- [Купить](https://www.chipdip.ru/product0/8000978122)

**WINSEN MG811**
- [Купить на али](https://aliexpress.ru/item/1005002212335911.html)
