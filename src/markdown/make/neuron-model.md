---
title: Neuron model
date: 2022-20-08
previewImage: neuron-model-3.jpg
---

The idea is simple. Find a working example with a small neural network and make all neurons physical, and train it much faster because all neuron is independent. Each neuron is a FPGA that just immediately reacts on incoming signal, adjusts its weights and carry on.

- 3d printed case [like this]()
- led strip
- FPGA chip: [atmega](/make/arduino-soul-possession)?


There are tutorials on [how to program one FPGA to work as a neural network](https://www.youtube.com/watch?v=Qgjawf20v7Y) (even non real FPGA, but [in the cloud](https://towardsdatascience.com/neural-network-inference-on-fpgas-d1c20c479e84)). Such thing use very perfomant chips like

- [mojo 3](https://www.nutsvolts.com/magazine/article/July2015_Clarke)
- [Perf-v](https://www.electromaker.io/shop/product/perf-v-based-on-xilinx-artix-7-fpga-risc-v-opensource)
- [Arty S7](https://digilent.com/shop/arty-s7-spartan-7-fpga-development-board/)
- [Alchitry Au](https://www.sparkfun.com/products/16527)

But I want small tiny FPGAs to be independent ([how tiny FPGA could be](https://hackaday.com/2015/07/03/hackaday-prize-entry-they-make-fpgas-that-small/), an example [that still in stock](https://www.adafruit.com/product/4332)), that will allow on physical level to see the process when every activation will be illuminated be LEDs on neuron's case.