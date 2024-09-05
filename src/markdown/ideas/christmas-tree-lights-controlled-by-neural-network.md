---
title: Christmas tree lights
subtitle: controlled by neural netowrk
date: 2023-12-23
tags: ["artificial intelligence"]
published: 2023-12-23
lastModified: 2023-12-23
---


Addressable LEDs in some ornament. A neural network drives the signals. It defines timings and selects what LEDs should be on or off. A camera feed goes to another network which provides feedback for the first network. I propose, instead of designing special algorithm for switching lights or crafting special reward function for reinforcement learning system, it will make decisions based on the visuals it perceives from the camera.

It essentially creates a closed-loop system where the visual input guides the lighting decisions.

## Multi network architecture

### Learning patterns

From a video camera show same samples like fireworks, fireplace, clouds, sunset or anything else and the network will recognize colors and how patterns change over time.

### Replaying patterns with rhythm

Another network can take these time series and apply them to current situation by listening for surrounding sounds.

## 3D design

### Inspiration

- [Embedded Neopixel LED Christmas Tree ](https://www.printables.com/model/13643) by maketvee
- [DIY Christmas Tree](https://www.hackster.io/theSTEMpedia/diy-christmas-tree-and-christmas-decor-using-arduino-61c6cf) made of acrylic with lights on the side

![DIY Christmas Tree made of acrylic with lights on the side](./diy-christmas-tree-acrylic.avif)