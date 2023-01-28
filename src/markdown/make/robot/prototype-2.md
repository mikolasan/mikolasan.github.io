---
section: robot
title: Prototype 2
date: 2022-12-26
published: 2022-12-26
lastModified: 2022-12-26
---

## Plans for version 2

- battery level indicator (LCD + DAC converter)
- 130 Ohm resistors for LEDs instead of 470 Ohm
- optional remote charger
- get power straight from PSU when in charge mode (something like [TPS2113](https://www.ti.com/lit/ds/symlink/tps2113.pdf))
- add to power board logic level 3.3V
- brushless DC motors
- look into adjustable output regulator based on [L78M](https://datasheetspdf.com/pdf-file/1045179/STMicroelectronics/78M12/1) and [LS141](https://datasheetspdf.com/pdf-file/237025/SGS/LS141/1)


## Control voltage with microcontroller

### Digipots and opamp

MCU controllable resistor - digital potentiometer (aka digipot)

Tweaking https://www.electronicdesign.com/technologies/analog/article/21801191/extend-lowvoltage-digipot-resolution-to-control-an-adjustable-regulator

FAQ https://www.analog.com/en/app-notes/an-1291.html

### DAC

> In general if you are not using a digital pot to handle an analog signal originating off-board, you don't need the digital pot, a DAC is the simplest approach. DACs are much more numerous and easy to source too.
>
> MarkT

### PWM

> The high-frequency switching of the PWM output stage consumes much more power than a low-power DAC or digital trim pot, both of which are DC by nature.

Cascade of resistor dividers and mosfets
Motorized potentiometer


