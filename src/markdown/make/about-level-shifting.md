---
date: 2021-08-24
title: About level-shifting
published: 2021-08-24
lastModified: 2021-08-24
---


## Connect 12V LED with 3.3V logic

Controlling a 12V line using a 3.3V logic signal from an ESP8266 board requires a level-shifting circuit. There are several ways to achieve this, but two popular methods are using optocouplers or MOSFETs.

- https://arduino-esp8266.readthedocs.io
- https://alexgyver.ru/ws2812_guide/
- https://electronics.stackexchange.com/questions/465523/switching-12v-pilot-with-3-3v-logic
- https://www.electronics-tutorials.ws/transistor/tran_7.html
- https://circuitdigest.com/electronic-circuits/simple-mosfet-switching-circuit-how-to-turn-on-turn-off-mosfets
- https://wiki.analog.com/university/courses/alm1k/alm-ldo-lab
- mosfets and optocouplers https://blog.simtronyx.de/en/arduino-rgb-led-strip-control-mosfets-optocouplers-part-1-hardware/


## Optocouplers

Optocouplers use an LED and a photosensitive transistor to isolate the input and output circuits electrically. When the LED is illuminated, the photosensitive transistor conducts, allowing current to flow through the output circuit. This makes optocouplers a great choice for applications where electrical isolation is important, such as when dealing with high voltages or noisy environments.

- https://electronics.stackexchange.com/questions/532570/designing-a-transistor-switching-circuit-with-opto-isolation
- Using Optocouplers - https://learnabout-electronics.org/Semiconductors/opto_52.php
- 78xxl - https://electrosome.com/esp8266-arduino-programming-led-blink/
- (alert! a lot of ads!) https://bestengineeringprojects.com/interfacing-optocoupler-with-arduino/
- isolate or not isolate grounds of logic and control circuit?



**use** optron EL817 https://www.tme.eu/Document/371e110151e1c8afec5198356913d01a/EL817.pdf


## MOSFETs

MOSFETs, on the other hand, are voltage-controlled switches that can be used to turn a load on and off. They have a very low resistance when turned on, allowing them to handle high currents with minimal power loss. MOSFETs are commonly used in electronic circuits as a switch because they are very efficient and can be controlled with a low-voltage signal.

- n-type
- I_d_max > 1A
- U_ds_max < 30V
- U_gs_max < 6V

RF1K49090 RF1K49092 RF1K49211 2SK1587 2SK1588 2SK1959 2SK1960 2SK2053 FDC6305N FDC637AN SI8802DB ZXM66N02N8TA SI2302 IRF3704STRL IRFU3704ZPBF IRF3704ZPBF SUD50N024-09P-E3 STB60NH02LT4 IPU06N03LAG PHB55N03LTA 

**use** MOSFET BS170 https://www.onsemi.com/pdf/datasheet/mmbf170-d.pdf


## Reference

- https://electricfiredesign.com/2021/03/12/logic-level-shifters-for-driving-led-strips/