---
date: 2022-07-19
title: Raspberry Pi camera
tags: ["3d printing"]
featuredImage: rpi-and-camera-setup.jpg
---

I wouldn't be so puzzled if I had to choose what I buy, but this was left from [playing cards recognition system](/projects/playing-card-recognition-system) I did at work. Raspberry Pi [High Quality HQ Camera](https://www.adafruit.com/product/4561) requires a lens. A lens!

![Raspberry Pi 4 and High Quality camera](./rpi-and-camera-setup.jpg)

That strange cylinder connected with white ribbon is the camera. It only shows pink or blue, because this thing requires a lens! I'm surprised.

### Specs

- Sony IMX477 sensor [datasheet](https://www.sony-semicon.co.jp/products/common/pdf/IMX477-AACK_Flyer.pdf)
- 12.3 megapixels
- Sensor size: diagonal 7.857 mm (Type 1/2.3) 
- FPC cable for connection to a Raspberry Pi computer

## Lens

Lens for Raspberry Pi HQ Camera? Anyone?

Speaking of lenses. I'm thinking to make my own lens instead of buying an official one for $50.

Of course I first looked up [how to make camera lens DIY](https://www.youtube.com/watch?v=miuhxhodpiQ) so to speak, but then I found sets of glass lenses on Amazon. Which means I need to find a formula and scheme of camera lens.

I found a lot on Amazon that offers [6x 50mm Diameter](https://www.amazon.com/Amlong-Crystal-Premium-Optical-Diameter/dp/B07Z3CVFMB/)

- 3 Double Convex (20, 30, 50cm FL) and
- 3 Double Concave (20, 30, 50cm FL) 

https://www.ni.com/en-us/support/documentation/supplemental/18/calculating-camera-sensor-resolution-and-lens-focal-length.html

![](./lens-mechanism-for-projector-lens.jpg)

https://www.myminifactory.com/object/3d-print-3d-printed-photography-lens-mechanism-for-projector-lens-125175


## Software

What software to use, and how to stream covered in [this article](https://www.tomshardware.com/how-to/use-raspberry-pi-camera-with-bullseye)


## Reference

Projects:
- https://learn.adafruit.com/raspberry-pi-hq-camera-low-light-long-exposure-photography

Theory:
- https://learn.adafruit.com/raspberry-pi-hq-camera-lenses/crop-factor
