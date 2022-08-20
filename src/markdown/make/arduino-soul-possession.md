---
title: Arduino soul possession
date: 2022-08-19
---

I have two AVR chips: **ATMega8l-8pu** and **ATMega8a-8p**. 


## Specs

[Datasheet](https://www.mouser.com/datasheet/2/268/Atmel_2486_8_bit_AVR_microcontroller_ATmega8_L_dat-1315266.pdf)


Product Attribute | Attribute Value
------------------|------------------
MCU name | atmega8
Maximum Clock Frequency | 8 MHz (1 MHz without external clock)
Data Bus Width | 8 bit
ADC Resolution | 10 bit
Number of ADC Channels | 6 Channel
Interface Type | 2-Wire, SPI, USART
Number of I/Os | 23 I/O
Number of Timers/Counters | 3 Timer
Program Memory Size | 8 kB
Data RAM Type | SRAM
Data RAM Size | 1 kB
Data ROM Type | EEPROM
Data ROM Size | 512 B
Package / Case | PDIP-28
Dimensions (HxLxW)| 3.3 mm x 34.67 mm x 7.62 mm
Supply Voltage | 2.7 V - 5.5 V

*Note:* Interesting element I noticed—anolog comparator. Only one. It seems, that this is what I'm looking. [According to wikipedia](https://en.m.wikipedia.org/w/index.php?title=Comparator&section=Speed_and_power#Speed_and_power) I can find very fast comparators. Like [LMH7220](https://www.ti.com/product/LMH7220)

## From Raspberry Pi to the chip

But as long as I remember there is a chicken-egg problem related to this microcontroller hobby: to flash one of them you need to make a jtag - device that communicates over USB with your computer and on special protocol it communicates between itself and another Atmega chip that you want to burn. Not literally though.

Surely you can buy such thing. But I've got a question. Can I do it from Raspberry Pi? Apparently, yes! So I'm following [this tutorial from Adafruit](https://learn.adafruit.com/program-an-avr-or-arduino-using-raspberry-pi-gpio-pins/programming), but it's not explaining how to install and use **avr-gcc**. It actually very simple.

### Main question

My main question that cannot be highlighted even more by just writing it all caps (but I will not write it this way, because it's not polite): Why we don't use [SPI pins](https://pinout.xyz/pinout/spi#)? If they are random pins, why not to chose all consecutive?

## avr-gcc

[Build from source](https://www.nongnu.org/avr-libc/user-manual/install_tools.html)? No, just run

```sh
sudo apt install avr-libc binutils-avr gcc-avr
```

The hello world of microcontrollers blinking LED **blink.c**

```c
// F_CPU is only a way for you to *tell* _delay_ms() how fast your MCU is running
// Note: set lfuse to 0xE4 to make AVR work at 8MHz
// 8MHz
#define F_CPU 8000000UL

#include <avr/io.h>
#include <util/delay.h>

int main()
{
  // each port consists of three registers DDRx PORTx, and PINx (for instance DDRA, PORTA, and PINA)
  DDRC |= (1 << DDC1);    // Make pin 13 be an output.  
  while(1)
  {
    // use PORTx to control pin source
    PORTC |= (1 << PORTC1);   // Turn the LED on.
    _delay_ms(500);
    PORTC &= ~(1 << PORTC1);  // Turn the LED off.
    _delay_ms(500);
  }
  // Note: PINx is used for reading input states

  return 0;
}
```

And it's make file. 

```Makefile
MCU=atmega8
CFLAGS=-g -Wall -mmcu=$(MCU) -Os
LDFLAGS=-Wl,-gc-sections -Wl,-relax
CC=avr-gcc
OBJCOPY=avr-objcopy
DUDE=avrdude
TARGET=main
PROGRAMMER_NAME=pi_1

all: $(TARGET).hex

clean:
	rm -f *.o *.hex *.obj *.hex

%.hex: %.obj
	$(OBJCOPY) -R .eeprom -O ihex $< $@

%.obj: %.o
	$(CC) $(CFLAGS) $< $(LDFLAGS) -o $@

program: $(TARGET).hex
	$(DUDE) -p $(MCU) -c $(PROGRAMMER_NAME) -v -U flash:w:$(TARGET).hex:i
```

I might go fancy and will create script for CMake. Or Gradle.

Then build it

```sh
make
```

## Connection

> There are two power and two ground pins. They are NOT redundant. One set is Digital VCC and GND, the other is Analog VCC and GND. Ideally, you should use an inductor between the DVCC and AVCC pins, for noise sensitive analog circuits, **but at the minimum, DVCC and AVCC should be connected, as should DGnd and AGnd.** A decoupling cap for both (~0.1uf) is recommended as well, but you could just use one for DVCC/DGnd.

Here is how: [picture](https://github.com/denilsonsa/atmega8-blinking-leds/blob/master/atmega8-blinking-leds.png)
Only grounds are important to connect together [according to this diagram](http://code.rancidbacon.com/LearningAboutArduinoATMega8)

Then check the connection

```
sudo avrdude -p atmega8 -C avrdude_gpio.conf -c pi_1 -v
```
I'm using very sketchy breadboard that requires soldering but I keep all parts loose. Under no circumstances it can be a problem, but I get

```
avrdude: AVR device not responding
```

Sad face :(

> The usual debugging methodology for bitbang programmers involves to omit the target AVR, and shortcut MISO and MOSI. Then, run AVRDUDE with `-vvvv` (that's four option letters **v**), which will dump the entire low-level communication. You should see the programming enable sequence `AC 53 00 00` echoed back with an offset of one octet `FF FF 53 00`.
>
> [from](https://www.avrfreaks.net/forum/avrdude-device-not-responding)

I'm getting back the same `AC 53 00 00`. Strange.

I successfully tested the same procedure with a firm ISP connector on Arduiono UNO 3. But I still think my chips are dead than it's the wiring.

Test SPI https://importgeek.wordpress.com/2017/09/11/raspberry-pi-spi-loopback-testing/

## Reference

- Blink example and makefile https://www.pololu.com/docs/0J83/6.3
- Newbie mistakes review https://electronics.stackexchange.com/questions/86110/blinking-led-with-atmega8-wont-blink

## Further reading

- I found [this blog](https://desertbot.io/blog/page/2)
- and another https://blog.podkalicki.com/how-to-compile-and-burn-the-code-to-avr-chip-on-linuxmacosxwindows/
- Fuses http://code.rancidbacon.com/LearningAboutArduinoATMega8