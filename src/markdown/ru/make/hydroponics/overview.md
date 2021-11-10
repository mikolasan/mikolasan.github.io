---
path: "/ru/hydroponics/overview"
date: "2021-01-20"
title: "Обзор материалов по теме Гидропоника"
tags: ["hydroponics"]
language: "ru"
---

## Цель

Выращивать в течении зимы клубнику, чернику, помидоры, салат и килантру.

## Open source проекты

*hydroponic open source*

- [OpenHydro](https://github.com/Cribstone/OpenHydro) - подробный список сенсоров для Ардуинки (не проверял).
- [yieldbuddy](https://yieldbuddy.com) - последнее обновление в 2014, технологии прошлого века PHP и MySQL. Очень сложный интерфейс, где все настройки вручную нужно вводить.
- [Пример](https://www.dudegrows.com/build-your-own-controller-monitor/) того, как можно использовать [Home Assistant](https://www.home-assistant.io/) для монотиронга сенсорами и управления реле.
- [MudPi Smart Garden](https://github.com/mudpi/mudpi-core) - разрабатывается с 2019 и уже доросло до версии 0.10.0. Идея все такая же по использованию Малинки Пи для управления контрольными платами и считыванием сенсоров. Много документации по архитектуре системы (используется PHP 7 и Redis), нет скриншотов текущего UI, вместо этого люди [прикручивают](https://github.com/icyspace/MudPiInflux) к Редису сторонние пакеты по отображению данных - Grafana, Telegraf. Зато лицензия MIT.
- [Mycodo](https://github.com/kizniche/Mycodo/) - очень популярный репозиторий, один возможный недостаток - это лицензия, но хорошие коммерчиские проекты это е останавливает. На [его сайте](https://kylegabriel.com/2020/06/automated-hydroponic-system-build.html) есть подробная инструкция по постройке гидропоники со списком всех необходимых компонентов.
- [Farm bot](https://farm.bot/)

## Конкуренты

- [The Farmstand](https://www.lettucegrow.com/shop) - дизайн, сайт со всем необходимым
- [FarmBets](https://www.microsoft.com/en-us/garage/wall-of-fame/farmbeats/) https://www.microsoft.com/en-us/research/project/farmbeats-iot-agriculture/ https://novosibirsk.tara.ru/catalog/plastikovye_yashchiki/futura_safe_pro/

## Kickstarter проекты

Первые два: маленькие - удались

### HydroBot

[HydroBot](https://www.kickstarter.com/hydrobot/hydrobot-automated-hydroponics/description) - Automated Hydroponics 

$9,218 pledged of $5,000 goal

31 backers

### Bitponics

[Bitponics](https://www.kickstarter.com/1498890810/bitponics-your-shortcut-to-a-green-thumb?ref=discovery&term=Bitponics) - Your Personal Gardening Assistant 

$23,662 pledged of $20,000 goal

261 backers

## MEG

Большие запросы, провалился

[MEG](https://www.kickstarter.com/yradia/meg-open-source-indoor-greenhouse)

$26,391 pledged of $134,967 goal

57 backers

> If you’ve ever struggled to grow houseplants and wondered how the green-fingered do it, take solace in this: In the future, you’ll be able to call on the network to make sure you’ve got the right water levels, pH, and lighting.

Я сходу могу сказать, что за ошибка в их питче. Ведь ясно же, почему она не цепляет и их проект не взлетел. А еще цена этого ящика превышает $5000 - это вызов, я смогу построить такой же ящик за много меньшие... просто за меньшие... просто небольшие деньги.

## 3D печатные проекты

Водопадная система (очень шумная, поэтому есть вариант по типу [проточной тонкослойной подачи (nutrient film technique)](/ru/hydroponics-nutrient-film-technique) https://www.reddit.com/r/hydro/comments/laa76h/i_wanted_to_share_a_project_of_mine_an_opensource/)

- [Модульные башни](https://www.thingiverse.com/thing:2403922) Немного видео https://www.youtube.com/channel/UCL1WZQKbyrSAYk2y8n7KtSg?view_as=subscriber
- [Улучшенная(?) версия](https://www.thingiverse.com/thing:3405964)


## Технологии в контроллере

- MQTT, 
- HiveMQ https://www.hivemq.com/blog/mqtt-over-websockets-with-hivemq/

## Система капельного орошения

https://leplants.ru/tsvetovodstvo/sistemy-kapelnogo-orosheniya-v-gidroponike-drip-systems/
https://www.growertoday.com/top-feed-drip-system-hydroponics/

[Своё](/ru/hydroponics-drip-system)