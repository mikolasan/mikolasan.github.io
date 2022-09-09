---
title: Neuron model
date: 2022-20-08
previewImage: neuron-model-3.jpg
developing: true
---

The idea is simple. Find a working example with a small neural network and make all neurons physical, and train it much faster because all neuron is independent. Each neuron is a FPGA that just immediately reacts on incoming signal, adjusts its weights and carry on.

- 3d printed case [like this](https://www.thingiverse.com/thing:3505006)
- led strip
- FPGA chip: [atmega](/make/arduino-soul-possession)?

It should be cute and interactive as japanese toy Tuttuki Bako (ツッツキバコ - easy to remember: 3 smiles, high-voltage power line, uphill, downhill and me on the bike, then dead end...)


# Research

First a quick overview of current branches in machine learning (by [Oleksii Trekhleb](https://github.com/trekhleb/homemade-machine-learning))

![ML roadmap](./machine-learning-map.png)



## My roadmap

1. I started with an [article on Wikipedia about neuron](https://en.m.wikipedia.org/wiki/Neuron). I needed to clear all biological moments, understand new terminology, start with early research on the topic and catch up with the latest results.
2. Phrase "the most negative threshold potential" led me to a specific article about [threshold potential](https://en.m.wikipedia.org/wiki/Threshold_potential). It reviews the neuron from electrical side.
3. I should read more about **Neural coding** in the future, but I couldn't resist to visit a citation that must explain how neuron can code digital and analog data: Thorpe SJ (1990). ["Spike arrival times: A highly efficient coding scheme for neural networks"](https://web.archive.org/web/20120215151304/http://pop.cerco.ups-tlse.fr/fr_vers/documents/thorpe_sj_90_91.pdf). Funny, it's a small note that proposes to use time (relative time between spikes) for encoding. Honestly it looks absurd, but for current artificial models it's a big deal. In respect of that I should read about [sNN](https://en.wikipedia.org/wiki/Spiking_neural_network).
4. After pure biological overview it's time to glance at current models. [Biological neuron model](https://en.wikipedia.org/wiki/Biological_neuron_model)
5. The best model from 1952 is [Hodgkin–Huxley model](https://en.wikipedia.org/wiki/Hodgkin%E2%80%93Huxley_model). It received the Nobel prize in 1963. Based on squid neurons. Think about it ordering fried calamari next time.

6. There are simplified models, but the main question is how to train them. For example _adaptive exponential integrate-and-fire model_ (AdEx) and its implications described by Naud R, Marcille N, Clopath C, Gerstner W. (2008) [Firing patterns in the adaptive exponential integrate-and-fire model](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2798047/#!po=48.6842). Despite it's a [simple one-dimensional model](https://en.wikipedia.org/wiki/Exponential_integrate-and-fire), it can simulate precisely many potential measurements graphs. And I find a [Python library](https://neuronaldynamics-exercises.readthedocs.io/en/latest/exercises/adex-model.html) for this model.
7. I read [Chapter 17](https://link.springer.com/referenceworkentry/10.1007/978-3-540-92910-9_17) from **Handbook of Natural Computing** (2012), where I notice one big omission after reading Wikipedia. The synapse can be either electrical or chemical. This must be included into next improved roadmap version as the second step.
7. Let's say we figured out neuron and synapse level, but how do we organize our network. Connections are not following the same pattern, exceptions are everywhere. Should we copy connections from a real brain? Should we stick to one pattern? How many neurons to consider? I think here should be study about different neuron connections and their properties. Thus based on the qualities we need, we can construct a network for our requirements.
8. Authors of the book see the answer to how the network structure can influence the functionality of the system in the work of Johnson S, Marro J, Torres JJ (2008) [Functional optimization in complex excitable networks](https://arxiv.org/abs/0805.1309). Connections don't change, but neurons still can alter them by chemical control. This alteration happens constantly, but how do we preserve memories, our personality? Perhaps there are another levels that don't change. Is there a study that classifies NNs into such memory writers?
9. About metastable states in the work of Rabinovich MI, Huerta R, Varona P, Afraimovich VS (2008) [Transient cognitive dynamics, metastability, and decision making](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1000072). Which I find rich for mathematical background and interesting for exercises, but not relevant to the question, though interesting research to revisit it later.
10. Then I switch to a huge topic called [Synaptic plasticity](https://www.nature.com/articles/1301559)


## Terminology

- metastable cognitive states/modes [article](https://www.fil.ion.ucl.ac.uk/~karl/Transients,%20Metastability,%20and%20Neuronal%20Dynamics.pdf)
- transient cognitive (brain) dynamics


## Quotes

> Symmetric reciprocal inhibition leads to multistability and this is not an appropriate dynamical regime for the description of reproducible transients. As we have shown [...], **nonsymmetric inhibition is an origin of reproducible transients** in neural networks.
> 
> Rabinovich et al, 2008


## Literature

- Thorpe SJ (1990). ["Spike arrival times: A highly efficient coding scheme for neural networks"](https://web.archive.org/web/20120215151304/http://pop.cerco.ups-tlse.fr/fr_vers/documents/thorpe_sj_90_91.pdf)
- Naud R, Marcille N, Clopath C, Gerstner W. (2008) [Firing patterns in the adaptive exponential integrate-and-fire model](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2798047/#!po=48.6842)
- Handbook of Natural Computing. Chapter 17. Modeling Biological Neural Networks
- Samuel Johnson, J. Marro, and Joaqu ́ın J. Torres **Functional Optimization in Complex Excitable Networks** [arxiv](https://arxiv.org/abs/0805.1309)
- Rabinovich MI, Huerta R, Varona P, Afraimovich VS (2008) [Transient cognitive dynamics, metastability, and decision making](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1000072)


## Links

- [robomimic](https://robomimic.github.io/) is a framework for robot learning from demonstration


# 3d model

## Inspiration

### Flexible snakes

Model by Cinderwing3D printed with rainbow PLA filament. Called **crystal dragon**

![Flexible dragons/snakes. Printed with rainbow PLA](./3d-printed-flexible-dragon-snake.jpg)

### Mini octopus

Model by McGybeer

![](./3d-print-in-place-mini-octopus.jpeg)


# FPGA


There are tutorials on [how to program one FPGA to work as a neural network](https://www.youtube.com/watch?v=Qgjawf20v7Y) (even non real FPGA, but [in the cloud](https://towardsdatascience.com/neural-network-inference-on-fpgas-d1c20c479e84)). Such thing use very perfomant chips like

- [mojo 3](https://www.nutsvolts.com/magazine/article/July2015_Clarke)
- [Perf-v](https://www.electromaker.io/shop/product/perf-v-based-on-xilinx-artix-7-fpga-risc-v-opensource)
- [Arty S7](https://digilent.com/shop/arty-s7-spartan-7-fpga-development-board/)
- [Alchitry Au](https://www.sparkfun.com/products/16527)

But I want small tiny FPGAs to be independent ([how tiny FPGA could be](https://hackaday.com/2015/07/03/hackaday-prize-entry-they-make-fpgas-that-small/), an example [that still in stock](https://www.adafruit.com/product/4332)), that will allow on physical level to see the process when every activation will be illuminated be LEDs on neuron's case.


## ATMega8

ATmega8 has three multi-bit multipurpose I/O ports: 

- **PORTB** with 8 bits, 
- **PORTC** with 7 bits, and 
- **PORTD** with 8 bits. 

Total of 23 bits. Reserve a few bits for I2C communication with an LED strip. With Arduino-type board we a looking for 5V strip

### LED curcuit chips

Chip   | Voltage  | LEDs per chip | Data pins
-------|----------|---------------|----------
WS2811 | 12-24V   |  3            |  1
[WS2812](https://www.amazon.com/BTF-LIGHTING-Individual-Addressable-Flexible-Non-Waterproof/dp/B088FKZWDQ/) | 3.5-5.3V |  1            |  1
WS2813 | 3.5-5.3V |  1            |  2
WS2815 | 9-13.5V  |  1            |  2
WS2818 | 12/24V   |  3            |  2

I don't know if there's good LED review in English, but [this one](https://alexgyver.ru/ws2812_guide/) is all you need 🔥