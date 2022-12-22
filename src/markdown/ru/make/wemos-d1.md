---
date: "2021-07-18"
title: "Плата Wemos D1"
tags: ["hardware"]
language: "ru"
published: 2021-10-13
lastModified: 2022-07-31
---

[Даташит](https://docs.ai-thinker.com/_media/esp8266/docs/esp-12f_product_specification_en.pdf)


## Почему Wemos D1?

Wemos D1 - плата, которую я импульсивно купил в местном магазине. У меня был выбор между китайским аналогом совместимым с Arduino Uno и точно такой же Ардуино-образной плате от Wemos с Wi-fi модулем.

Долго думать я не стал: плата с Wi-Fi модулем стоила дешевле. Только я не сразу понял, что на Wemos меня ждет [ESP8266](https://en.wikipedia.org/wiki/ESP8266) распаянный под Ардуино плату. Это вовсе не ATMega с Wi-Fi модулем как мне показалось на первый взгляд. Для моих целей это не имеет значения, но если вам нужен определенный чип, то имейте в виду.

## Недостатки

Это не ATMega чип. Хнык.

## Преимущества

Дешевле чем пародия на Arduino Uno, но совместима с шилдами и дополнительно имеет Wi-Fi.

Можно прошивать через Arduino IDE, MicroPython или Lua

## Прошивка через Arduino IDE

Все уже описано [вот здесь](https://arduinomaster.ru/datchiki-arduino/esp8266-wemos-d1-mini-raspinovka/)

Arduino IDE берем как обычно на [официальном сайте](https://www.arduino.cc/en/software). Установка съест как минимум 500Мб на диске.
Далее нужно добавить поддержку платы в IDE. Для этого добавить не официальный, но вполне [солидный](https://github.com/esp8266/Arduino) репозиторий `https://arduino.esp8266.com/stable/package_esp8266com_index.json` и после установки пакета **esp8266** выбрать плату **LOLIN(WeMos) D1 R1** как сказано в [кратком руководстве](https://www.wemos.cc/en/latest/tutorials/d1/get_started_with_arduino_d1.html) от Wemos. А также найти драйвер для CH430. Кажется официальный драйвер подписан *Jiangsu Qinheng Co., Ltd*, и имеет версию 3.3.2011.11, а найти можно на любом форуме.

## Как считывать напряжение через A0

Внимание! Мультиметр все же будет точнее и проще, т.к. значения с АЦП возможно тоже нужно сначала откалибровать.

В ESP8266 модели ESP-12F встроенный аналого-цифровой преобразователь (АЦП, ADC) принимает на вход напряжение от 0 до 1В и переводит это в значение от 0 дп 1023 (потому что 10 битный АЦП). До 1В :facepalm: 

https://randomnerdtutorials.com/esp8266-adc-reading-analog-values-with-nodemcu/