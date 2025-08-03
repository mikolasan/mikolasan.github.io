---
article: quest
title: Spiking MNIST
date: 2025-05-28
published: 2025-05-28
lastModified: 2025-05-28
genai: yes
---
I am planning for some hierarchical encoding for an experiment with my [rule-based system](/blog/regulus).

Take MNIST data. Every picture 28x28 = 784 pixels + label. We will create 5x5 patches with no overlap. Then combine all of them into one dataset, classify, and replace 5x5 patches with class identifiers. 

This will give 6x6 grid on the next level (30 / 5 = 6, where 30 pixels come from 28 with one extra pixel added to all sides)

```
x x x x x x
x x x x x x
x x x x x x
x x x x x x
x x x x x x
x x x x x x
```

This is the second layer with 6x6 nodes, taking possibly 10 or more values (denote this value as $k$)

So for $k$ different observations (meaning, definitely not similar, not converging to one of $k$ classes) we should have different nodes active. But what if the same node is activated by different patches?

9 copies of each node. 

```
x x
x x -> Dx
```

third layer: 10 nodes x 9 copies, like 10 tiny mini layers for every node type that makes a 3x3 grid

layer 1

```
D1 D1 D1
D1 D1 D1
D1 D1 D1
```

layer 2

```
D2 D2 D2
D2 D2 D2
D2 D2 D2
```

and so on

## Trying brian library

Brian [docs](https://brian2.readthedocs.io/en/stable/user/equations.html)

- NeuronGroup + Synapses [example](https://brian2.readthedocs.io/en/stable/examples/frompapers.Graupner_Brunel_2012.html)
- [STDP and MNIST](https://brian2.readthedocs.io/en/stable/examples/frompapers.Diehl_Cook_2015.html) (somewhat different code in [their repo](https://github.com/peter-u-diehl/stdp-mnist/blob/master/Diehl%26Cook_spiking_MNIST.py)) - but this is not an autoencoder architecture

C++ options for SNN simulation

- [CARLsim](https://github.com/UCI-CARL/CARLsim5/blob/master/carlsim/kernel/src/snn_manager.cpp)
- 

## How numbers and quantities are represented in neural ensembles?

_Numerosity estimation_ refers to the ability to perceive and estimate quantities without explicit counting ([from](https://homepages.uni-tuebingen.de/andreas.nieder/Nieder%20(2025b)%20CerCort.pdf) "Numerosity coding in the brain: from early visual processing to abstract representations" by Andreas Nieder)

So some neurons have tuned responses to specific numerical ranges, possibly overlapping. Individual neurons fire maximally for their numerosity but also, with decreasing intensity, respond to nearby values. This system represents numerical magnitude in an analog, approximate manner following [Weber's law](https://en.wikipedia.org/wiki/Weber%E2%80%93Fechner_law) - discrimination becomes harder as numbers get larger. The neural representation appears to be logarithmically compressed.

There's a debate if distinct neural pathways for exact symbolic numbers (like "7") and approximate quantities (like a collection of dots) may work the same way to represent numerosities.

The intraparietal sulcus (IPS), particularly the horizontal segment, shows robust activation for numerical processing.

It is known that [neuronal oscillations](https://www.philippstreicher.com/blog/neural-oscillations) in various frequency bands may carry functionally distinct information. So, can different frequency bands encode different aspects of numerical information?