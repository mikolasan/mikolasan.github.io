---
title: Designing a robot
date: 2022-07-23
draft: true
---

Design a robot in three easy steps:

- 3d print
- buy components
- assemble

mu-ha-ha in reality you need a little bit more steps

## The look

![uncanny valley graph by Mori](./uncanny-valley-1.jpg)

I'm convinced that any robot should have a creepy aspect. Like big tracking you eyes that can drive people crazy.

> MacDorman and Alexander Diel, a psychology researcher at Cardiff University in Wales, published a paper that organized the current explorations [of the "uncanny valley"] into nine categories.
>
> Discover magazine

- [Paper 1](https://www.semanticscholar.org/paper/Creepy-cats-and-strange-high-houses%3A-Support-for-in-Diel-Macdorman/da9f0e4fdd00d32c58d44308f312b487563dd52c) - 9 theories
- [Paper 2](https://www.researchgate.net/publication/353373476_A_Meta-analysis_of_the_Uncanny_Valley%27s_Independent_and_Dependent_Variables) - the latest paper probably mentioned in the article


![picture from the article shows very disturbing robot](./uncanny-valley-2.jpg)


## Electrical components

### Power source

Motors normally require higher voltage (6V, 12V, 24V) and current, and it's a good practice to keep motors, LEDs (like very long strips of LEDs), switches electronically seperated from the logic (3.3V). But **how do you decouple it** when the whole project should work from the battery? 

Do you use two batteries? Just imagine what a headache is to keep two separate batteries charged. I can only think about sophisticated system where there is an assumption that motors can kill the battery often, but at the same time the main brain must continue operating, therefore it remains only one option: to send a signal about help to other robots. But I've never seen such design.

So what normal people use instead? 

Power supply needs to be protected from Back EMF when motors abruptly stop or reverse the rotation direction. But rechargeable battery only wins from this effect. The only concern will be values above maximum ratings especially for li-poly batteries that are very sensitive.

Read more: [Operating an Arduino for a Year from Batteries](https://analysisnorth.com/articles/arduino-for-a-year.html)


### Battery charger

Let's design our custom board for powering the robot from one lithium polymer battery, say 3.7V and 2500mAh.

First of all, even before using the battery in any way, we should think about charging it. Here's a [battery charger](https://www.adafruit.com/product/259) from Adafruit based on [MCP73833](https://cdn.sparkfun.com/assets/b/a/7/6/8/MCP73833Datasheet.pdf) (evaluation board [doc](https://ww1.microchip.com/downloads/en/DeviceDoc/51626a.pdf)). For a second I thought that I found cheaper option - [MCP73831](https://ww1.microchip.com/downloads/en/DeviceDoc/MCP73831-Family-Data-Sheet-DS20001984H.pdf) on Digi-Key in a 5-lead SOT-23 package, but it consumes 4x times less current during charging which means that it's going to charge much slower and has less indication signals. The datasheet provides PCB layout example.

Old alternative for these chips is [MAX1555](https://datasheets.maximintegrated.com/en/ds/MAX1551-MAX1555.pdf) and [TP4056](https://dlnmh9ip6v2uc.cloudfront.net/datasheets/Prototyping/TP4056.pdf).

![](./battery-charger-typical-application.png)

**Additional components**: 

- 3x indicator LEDs: 2x [yellow](https://www.mouser.com/ProductDetail/755-SML-D11YWT86) and 1x [white](https://www.mouser.com/ProductDetail/720-LWQ38EQ2R23K5L)
- 2x capacitors [4.7uF](https://www.mouser.com/ProductDetail/963-LMK107BJ475MAHT) - Voltage Rating 10VDC
- 3x resistors [470 Ohms](https://www.mouser.com/ProductDetail/71-CRCW0805470RFKEAC) - for LEDs, so for 20mA the Power Rating would be >100mW
- 1x resistor (to set maximum charging current) [1K](https://www.mouser.com/ProductDetail/755-SDR10EZPF1001) - for 25mA current (?), therefore the Power Rating >125mW
- 1x resistor (to skip temperature control) [10K](https://www.mouser.com/ProductDetail/71-CRCW040210K0FKEDC) - for 50uA and 1.25V = 62.5uW

### Step up voltage regulator

We need to boost 3.7V voltage from our battery to 5V level where Arduino and motors can work. Preferably we should supply 3.3V to logic board and separate 5V or 6V or even more to motors. But we must keep the first version simple.

Again we start with a popular at this time [breakout board](https://www.adafruit.com/product/2030) and look at the main chip (TPS61030). For logic board AND motors I found 1.8A [TPS613222](https://www.ti.com/general/docs/suppproductinfo.tsp?distId=10&gotoUrl=http%253A%252F%252Fwww.ti.com%252Flit%252Fgpn%252Ftps61322) and 3.6A [TPS61032](https://www.ti.com/general/docs/suppproductinfo.tsp?distId=10&gotoUrl=https%3A%2F%2Fwww.ti.com%2Flit%2Fgpn%2Ftps61030) switch current boost converters from Texas Instruments. The datasheet provides PCB layout example.

Old alternative for these chips is [TPS6109](https://www.ti.com/lit/ds/symlink/tps61090.pdf?ts=1666623681120&ref_url=https%253A%252F%252Fwww.ti.com%252Fproduct%252FTPS61090).

![](./voltage-regulator-typical-application.png)

**Additional components**: 

- 1x coil (inductor) [2.2uH](https://www.mouser.com/ProductDetail/81-DFE201612E-2R2MP2) (max DC current > 1.18A)
- 1x [schottky diode](https://www.mouser.com/ProductDetail/771-PMEG1020EAT-R) ([alt](https://www.mouser.com/ProductDetail/652-CD1206-B240)) (required for >250mA loads) - find average and peak current from [the inductor](https://www.mouser.com/datasheet/2/281/reference_specification_DFE201612E-1101893.pdf) (1.8A, 2.4A)
- 1x resistor [5 Ohms](https://www.mouser.com/ProductDetail/603-RC0201JR-075R6L) (for RC snubber) - [power dissipation of the snubber](https://www.maximintegrated.com/content/dam/files/design/technical-documents/design-solutions/ds32-correct-snubber-power-loss-estimate-saves-the-day.pdf) is calculated as CV^2f = 150pF x (5V)^2 x 1MHz = 3.75mW (frequency of the circuit is calculated by the formula in datasheet with values V_in = 4V, V_out = 5V, n = 0.9, L = 2.2uH, I_lh = 0.5A)
- 1x capacitor [150pF](https://www.mouser.com/ProductDetail/710-885012005014) (for RC snubber) - x3 of [schottky diode capacitance](https://www.mouser.com/datasheet/2/916/PMEG1020EA-2938861.pdf) (45pF x 3 = 135pF) and voltage rating 10V
- 3x capacitors [10uF](https://www.mouser.com/ProductDetail/81-GRM188R60J106ME4D) - voltage Rating 6.3VDC


### Motors

Main question here is power and torque which is created by series of spur gears called a _gear train_. It could be simple as 2 gears or **planetary gear train** (higher gear reduction, very compact) and this can be implemented in non-circular form 🤤 (They are not as compact as round ones, and at specific points they hold higher stalled resistance than in others which makes movement obviously uneven.) Planetary gearing (or **epicyclic gearing**) is cool, but there is also **cycloidal drive**, that eliminates a _backlash_ - it's that imperfection between gear teeth that is noticeable when rotation direction has been changed. And the last but not least in this list is **strain wave gearing** that is used in the wheels of Apollo Lunar Rover. It requires a flexible spline, but oversteps advantages of the above systems.

I'll try micro gear motors with [75 RPM](https://www.digikey.com/en/products/detail/pimoroni-ltd/COM0806/6873670) and [155 RPM](https://www.digikey.com/en/products/detail/dfrobot/FIT0483/7087160).

_Note:_ voltage defines RPM, not current

### Motor driver

[H-bridge](https://www.uni-weimar.de/kunst-und-gestaltung/wiki/H-Bridge)  (aka full bridge, not half bridge) motor driver [breakout board](https://www.adafruit.com/product/2448) based on [TB6612](https://cdn-shop.adafruit.com/datasheets/TB6612FNG_datasheet_en_20121101.pdf) that supports 2 motors and 1.2A per channel. Texas Instruments offers  [DRV8210](https://www.mouser.com/ProductDetail/595-DRV8210DSGR) 1 channel, [1.76A](https://www.ti.com/general/docs/suppproductinfo.tsp?distId=26&gotoUrl=https://www.ti.com/lit/gpn/drv8210) or [DRV8836](https://www.digikey.com/en/products/detail/texas-instruments/DRV8836DSSR/3088190) 2 channels, [1.5A](https://www.ti.com/general/docs/suppproductinfo.tsp?distId=10&gotoUrl=https%3A%2F%2Fwww.ti.com%2Flit%2Fgpn%2Fdrv8836).


![](./h-bridge-typical-application.png)

Alternative: [TMC7300](https://www.mouser.com/datasheet/2/256/TMC7300_Datasheet_V105-2066925.pdf) that includes DC converter and can work from the battery directly.

**Additional components**: 

- 1x capacitors [10uF](https://www.mouser.com/ProductDetail/81-GRM188R60J106ME4D) - voltage Rating 6.3VDC

### Connectors

- Power for Arduino or Raspberry Pi (1/2 - in theory) - [Micro USB Type B Male Vertical](https://www.digikey.com/en/products/detail/gct/USB3150-30-130-A/9859649) - connector is perpendicular to the board's surface thus it connects to Arduino or Raspberry Pi perpendicular as well. Raspberry Pi 1/2 where lower power consumption. Some components not rated for the current greater than 1A, so with Raspberry Pi 4 it can fry them)
- Battery to the board - [JST PH Connector](https://www.digikey.com/en/products/detail/jst-sales-america-inc/S2B-PH-K-S-LF-SN/926626)
- For charging USB cable let's be modern and use type C - [USB Type C Female](https://www.digikey.com/en/products/detail/adam-tech/USB-C31-S-VT-CS4-BK-PP-T-R/9832222)


### Shopping list

- battery charger [Digi-Key](https://www.digikey.com/en/products/detail/microchip-technology/MCP73833T-AMI-MF/1223181)
- boost converter [Digi-Key](https://www.digikey.com/en/products/detail/texas-instruments/TPS61032PWPR/550687)
- motors 75 RPM [Digi-Key](https://www.digikey.com/en/products/detail/pimoroni-ltd/COM0806/6873670)
- motors 155 RPM [Digi-Key](https://www.digikey.com/en/products/detail/dfrobot/FIT0483/7087160)
- accelerometer [Adafruit](https://www.adafruit.com/product/2019) vs [Digi-Key](https://www.digikey.com/en/products/detail/stmicroelectronics/IIS328DQTR/5268013)
- motor driver [Adafruit](https://www.adafruit.com/product/2448) vs [Digi-Key](https://www.digikey.com/en/products/detail/vishay-siliconix/SIP2100DY-T1-GE3/5086514)


### Eagle

- https://www.youtube.com/watch?v=Eu5XMEh79XM

- create schematics document in Eagle
- Edit -> Add... -> Scroll down to **frames**, Choose LETTER_L

Add 3D models to the library https://support.snapeda.com/en/articles/3545085-how-to-import-a-3d-model-into-eagle
- [Design Rules files for OSHPARK](https://docs.oshpark.com/design-tools/eagle/design-rules-files/)

https://docs.oshpark.com/design-tools/eagle/cutouts-and-slots/

## Miscellaneous

### Film vs ceramic vs electrolytic vs tantalum

Ceramic - high frequency response due to lower inductance (therefore good HF filtering bypass incoming and outgoing noise), non-polar

Electrolytics - low cost, effective at low frequency, large capacitance, lifetime goes down and depends on temperature and voltage (therefore stick to ceramics for anolog filters), polarised

Interesting note:  An electrolytic capacitor relies on an oxidisation layer as an insulator so capacitance will drift more over time if it run at low voltage

Tantalum - light, small, precise, higher cost

Film - linear characteristics (voltage-temperature-capacitance)

**Reference**: [1](https://electronics.stackexchange.com/questions/232631/ceramic-caps-vs-electrolytic-what-are-the-tangible-differences-in-use), [2](https://electronics.stackexchange.com/questions/69919/ceramic-vs-film-capacitor-which-one-is-preferred-in-audio-circuits)

### Selecting voltage rating for capacitors

Multiply voltage by 4/3 or 3/2 (electoolytic caps) and up to 2 (ceramic caps)

**Reference**: [1](https://electronics.stackexchange.com/questions/15700/selecting-voltage-rating-for-capacitors), [2](http://www.learningaboutelectronics.com/Articles/What-does-the-voltage-rating-on-a-capacitor-mean), [3](https://resources.pcb.cadence.com/blog/2022-ceramic-capacitor-voltage-ratings-here-is-what-you-need-to-know)

### SMD Package Types

SMD Package Type | Dimensions (mm) | Dimensions (inches)
-----|-----------|-------------
2920 | 7.4 x 5.1 | 0.29 x 0.20
2512 | 6.3 x 3.2 | 0.25 x 0.125
2010 | 5.0 x 2.5 | 0.20 x 0.10
1825 | 4.5 x 6.4 | 0.18 x 0.25
1812 | 4.6 x 3.0 | 0.18 x 0.125
1806 | 4.5 x 1.6 | 0.18 x 0.06
1210 | 3.2 x 2.5 | 0.125 x 0.10
1206 | 3.0 x 1.5 | 0.12 x 0.06
0805 | 2.0 x 1.3 | 0.08 x 0.05
0603 | 1.5 x 0.8 | 0.06 x 0.03
0402 | 1.0 x 0.5 | 0.04 x 0.02
0201 | 0.6 x 0.3 | 0.02 x 0.01
01005 | 0.4 x 0.2 | 0.016 x 0.008



## Review

Unwise to power an H-bridge with two d-a's, forward and reverse, you run risk of powering both sides on at once. This destroys the H-bridge and can destroy the motor. Be really careful. Using direction and power, this is impossible. You can only power one at a time.

**The letter from Tony's Engineer**

One more thing I advise him to do, is to put in an a-d to verify current control. 
Mosfets have a turn on current, and then a rise current. 
That's if it's range is 5 volts, and it's turn on is one point five volts, you only have a 3.5 volt overall range. 
Also once the turn on current is reached, there is a bit of breakdown so that once it crosses 1.5 volts, it's activation current is now only 1.2 volts. 
You need to tailor the overall current. 
An a-d does an excellent job however that is not conclusive. 
The actual conclusion should be reached from the actual performance. 

Example. I want a motor to rotate at 3.5 RPM. 
Current says that should be 3.2 volts. 
I can set my a-d to keep my d-a at 3.2 volts. 
However that does not guarantee that the motor will travel at 3.5 RPM. 
The only way to guarantee that (?) is to put in an encoder and set the control to 3.5 RPM.
However if at 3.2 volts, I do not achieve 3.5 RPM, there is additional load and drag. 
If this is too great, we have a problem and should abort. 
It's a lot of extra work, but it achieves a significantly _superior product_.

I need to know more about what he is using it for.
If for positioning, it is different than if for speed control.

Also, have him look up snubber circuits. These take the backflow and shunt it into a cap to reduce feedback voltage. It helps us not blow up on an instant reverse. 

On positioning, if exact is needed and it's fair mass, 
then you need a ramp up, down, and hold function.
This needs encoder feedback.
There is a 1 chip control solution but is fairly expensive.

Drive power should always tailor to the load and thus discrete components. 

Let me know what he wants to do with it and I'll give more. 
Microchip and stm are great control chips for high power apps.
Also let me know if the control needs to be synced with other controls.




 The purpose of the bulk capacitor is to overcome the voltage drop caused by the inductive effects of PCB traces. 


## Stacking boards

Today I'm thinking about the best way to stack boards (to support extensions in other words). In my search I [stumbled upon](https://hallmanlabs.com/2020/07/20/discrete-review-update-isoregen-over-troubled-dip8-waters/) these DIP adapters

![DIP adapters](./dip-stacking.webp)

I find Arduino shields bulky. And they can only grow upwards. I want to have flexibility in this regard.

There's such technique as "[castellated vias](https://learn.sparkfun.com/tutorials/how-to-solder-castellated-mounting-holes/all)" where connections are on the edge of the board. Like through holes that metallized inside but located on the edge and cut in half

First I shook off this idea, because it's used mainly for adding daughter boards, so I was considering pinheads. But they restrict the direction of attachments—it only goes in the way it's designed to go.

But then I revisited initial limitations, and soldering wasn't in the list. The credit goes to [Jeremy Cook](https://jeremyscook.com/) and his [LED cubes](https://hackaday.com/2022/03/15/led-flower-bouquet-is-a-radiant-hacker-desk-decoration/)

![Cube of PCBs](./cube-of-pcbs.jpg)

I'm thinking about an extension board for 2 more bi-directional motors. I put one full row of vias on the edge and get castellated edge (I do the bottom row as well). OSH Park [can manufacture such edge](https://docs.oshpark.com/tips+tricks/castellation/) but with possible imperfections

## Drills

[Drill specs](https://docs.oshpark.com/submitting-orders/drill-specs/)