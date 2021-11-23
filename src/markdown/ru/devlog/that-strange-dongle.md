---
title: Тот странный USB адаптер
date: 2020-06-21
path: /ru/blog/that-strange-dongle
language: "ru"
published: 2021-10-28
lastModified: 2021-10-28
---

Наводил порядок в тубочке и нашел юэзби затычку, которую где-то когда-то нашел, сунул в карман и принес домой, положил в тумбочку и забыл. Значит сегодня настал день внимательно присмотреться к этому донглу ешё раз. Присмотрелся: RG 1130. Передатчик для мыши и клавы. Мыши и клавы у меня нет. Но вот что интересно, так это то, что такие устройства не безопасны

https://null-byte.wonderhowto.com/news/security-alert-your-wireless-mouse-keyboard-can-be-hacked-0169022/

> As an example, an attacker could use an inexpensive antenna to masquerade as a wireless mouse to enter your computer. From there, the intruder can switch the signal to emulate a wireless keyboard and gain control of your machine. The trick was found to have worked from up to 200 meters (and sometimes even 225 meters) away, so even if an attacker can't see your screen, he or she could use keyboard commands to do anything from opening websites to downloading malware onto your computer — or even wiping your hard drive altogether.

Ссылка на источник https://www.mousejack.com/

Вставил донгл обратно и посмотрел на VendorId DeviceId: 04f2:1130. Оказывается что и эта крошка в списке

https://www.bastille.net/research/vulnerabilities/keyjack/affected-devices

> The following devices have been tested and are vulnerable to a KeyJack injection attack (specifically vulnerabilities that pertain to Bastille Threat Research Team Tracking Number #13).

Так, а если у меня нет этой крутой штуки с антенной, могу ли я использовать телефон? (в нем каких только сенсоров нет)

Вернемся обратно к коду RG-1130 и посмотрим на какие частоты получено разрешение в FCC

https://fccid.io/E8HRG-1130/User-Manual/UserMan-E8HRG-1130-1599857

Кстати, вот как его можно разобрать: https://fccid.io/E8HRG-1130/Internal-Photos/Int-Pho-E8HRG-1130-1599852

Открываем фотку с микроконтроллером и яростно жмем на плюс, чтобы приблизить и прочесть код на нем. NRF 0 / LU1P... Что? Это такой же чип про который я недавно смотрел видео https://hackaday.com/2020/02/20/the-art-of-usb-dongle-repair/

> The device is an nRF24LU1+, but it's an OTP (one-time programmable) variant, which cannot be erased once programmed (you can only change a bit from '1' -> '0', not from '0' -> '1') This is indicated by the chip marking:
>
> NRF 0 LU1PA 1410NR
>
> Please see the nRF24LU1P-OTP datasheet, chapter 26, for detailed information about the chip marking: https://infocenter.nordicsemi.com/pdf/nRF24LU1P-OTP_PS_v1.0.pdf

Хорошо, перепрошить не получится, но известно, что можно код взломать и притворяться устройством ввода. Значит оперируем стандартной частотой 2.4 ГГерц. Так может ли телефон служить приемником?

**Question:** Is it possible to built an app which sends out RF signals? Is it possible to control the exact frequency? So each button would send different frequency signal? How far those signals usually reach?

**Answer:** Yes, but you need some external RF hardware - check out [GNU radio](http://gnuradio.org/) and the general subject area of [Software Defined Radio](http://en.wikipedia.org/wiki/Software-defined_radio).

**Question:** I'm looking for info about how I can connect RF 2.4G mouse to android device without RF 2.4G usb dongle, only over Bluetooth or WiFi.

**Answer:** They are completely different standards, just because they run near the same frequency does not make them easily interchangeable. [Remote keyboard and mouse] must have a 2.4Ghz RF receiver built in, which is very uncommon. I see they sell 2.4Ghz RF accessories on that same page so its possible that its been added just for their accessories. I don't know if 2.4Ghz RF stuff is universal, I was always under the impression it wasn't, but maybe its not. 

Собственно вот https://en.wikipedia.org/wiki/2.4_GHz_radio_use . Вкратце, телефон не поможет. Откладываю проект, затычку в коробку и на полку. Если решу начинать в этом направлении, то начинать стоит отсюда - https://github.com/BastilleResearch