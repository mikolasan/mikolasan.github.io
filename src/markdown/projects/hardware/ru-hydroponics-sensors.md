---
path: "/ru/projects/hydroponics-sensors"
date: "2021-04-18"
title: "Гидропоника: сенсоры"
tags: ["hydroponics"]
language: "ru"
draft: true
---

[OpenHydro](https://github.com/Cribstone/OpenHydro) - подробный список сенсоров для Ардуинки (не проверял).


## Качество воды (TDS)

https://aliexpress.ru/item/4001010691199.html
https://aliexpress.ru/item/33050818416.html


## Температура

Похоже это самый крутой обзор/сравнение доступных на рынке датчиков температуры: https://randomnerdtutorials.com/dht11-vs-dht22-vs-lm35-vs-ds18b20-vs-bme280-vs-bmp180/
где в наглядном графике показано, какие данные вы будете получать от сенсора.

**ASAIR AHT10**
- [Обзор](https://elchupanibrei.livejournal.com/53764.html)
- [Datasheet](https://server4.eca.ir/eshop/AHT10/Aosong_AHT10_en_draft_0c.pdf)
- [Купить](https://www.chipdip.ru/product1/8007154405)
- [Купить на али](https://aliexpress.ru/item/4000125526434.html) (с понижающей до 5В схемой)

**DHT22**
- [Как подключать](https://www.mouser.com/datasheet/2/737/dht-932870.pdf)
- [Datasheet](https://files.seeedstudio.com/wiki/Grove-Temperature_and_Humidity_Sensor_Pro/res/AM2302-EN.pdf)


**DS18b20 Dallas**

## Температура / влажность / давление

**TE Connectivity (Tyco) MS8607**
- [Зарубежный магаз](https://www.sparkfun.com/products/16298)
- [Купить](https://www.chipdip.ru/product/ms860702ba01-50)
- [Datasheet](http://www.farnell.com/datasheets/2301874.pdf)

## Углекислый газ

**SCD30 Sensirion**
- [Сайт производителя](https://www.sensirion.com/en/environmental-sensors/carbon-dioxide-sensors/carbon-dioxide-sensors-scd30/)
- [Купить на али](https://aliexpress.ru/item/1005001392172293.html)

**AMS IAQ-CORE C**
- [Купить на али](https://aliexpress.ru/item/33044332335.html)
- [Datasheet](https://www.compel.ru/item-pdf/c232e7e7dbddb20824a26cdc0f748bed/pn/ams~iaq-core-c.pdf)

**Sense Air**
- [Сайт производителя](https://senseair.com/products/size-counts/s8-residential/)
- [Купить на али](https://aliexpress.ru/item/32863793412.html)

**Figaro TGS4160**

**WINSEN MG812**
- [Купить](https://www.chipdip.ru/product0/8000978122)
- [Datasheet](https://data.electronshik.ru/z/Datasheet/M/mg812-co2-manual-v1_1.pdf)

**WINSEN MG811**
- [Купить на али](https://aliexpress.ru/item/1005002212335911.html)

**CCS811B**
- [Купить на али](https://aliexpress.ru/item/1005001376765343.html)
- [Купить на али 2](https://aliexpress.ru/item/4000073907942.html)
- [Datasheet](https://cdn.compacttool.ru/downloads/CCS811_Datasheet.pdf)

Нельзя чтобы датчик лежал долго без использования.

> The sensors resistance will drift reversibly if it’s stored for a long time without electrify, this drift is related with storage conditions. Sensors should be stored in airproof bag without volatile silicon compound. For the sensors with long time storage but no electrify, they need to belong galvanized aging time for stability before using. 

## Кислотность воды

[Купить](https://aliexpress.ru/item/32957428276.html)

Калибровать
https://raspberrypi.stackexchange.com/questions/96653/ph-4502c-ph-sensor-calibration-and-adc-using-mcp3008-pcf8591-and-ads1115
https://scidle.com/how-to-use-a-ph-sensor-with-arduino/
https://tlfong01.blog/2019/04/26/ph-4502c-ph-meter-calibration-notes/
https://cimpleo.com/blog/simple-arduino-ph-meter/
https://www.e-tinkers.com/2019/11/measure-ph-with-a-low-cost-arduino-ph-sensor-board/
only code https://wiki.dfrobot.com/PH_meter_SKU__SEN0161_