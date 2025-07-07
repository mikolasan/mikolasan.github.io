---
article: quest
title: Spiking MNIST
date: 2025-05-28
published: 2025-05-28
lastModified: 2025-05-28
genai: yes
---

every picture 28x28 = 784 pixels + label. We will create 5x5 patches with no overlap.
Then combine all of them into one dataset, classify, and replace 5x5 patches with class identifiers. 

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

and so on. for example, k = 10, layer 10

784 -> k * 9 = 90

fourth layer: possibly 10 or more values (m)

## Trying brian library

Brian [docs](https://brian2.readthedocs.io/en/stable/user/equations.html)

- NeuronGroup + Synapses [example](https://brian2.readthedocs.io/en/stable/examples/frompapers.Graupner_Brunel_2012.html)
- [STDP and MNIST](https://brian2.readthedocs.io/en/stable/examples/frompapers.Diehl_Cook_2015.html) (somewhat different code in [their repo](https://github.com/peter-u-diehl/stdp-mnist/blob/master/Diehl%26Cook_spiking_MNIST.py)) - but this is not an autoencoder architecture

C++ options for SNN simulation

- [CARLsim](https://github.com/UCI-CARL/CARLsim5/blob/master/carlsim/kernel/src/snn_manager.cpp)
- 

## How numbers and quantities are represented in neural ensembles?

**Place Value and Population Coding** The dominant theory is that numerical magnitude is represented through population coding in ensembles of "number neurons." These neurons have tuned responses to specific numerical ranges, with overlapping tuning curves that create a distributed representation. Individual neurons fire maximally for their preferred numerosity but also respond (with decreasing intensity) to nearby values.

**Key Brain Regions** The intraparietal sulcus (IPS), particularly the horizontal segment, shows robust activation for numerical processing across different formats (dots, digits, number words). Single-cell recordings in monkeys have identified neurons that respond selectively to specific numerosities, independent of other visual features like size or density.

**Approximate Number System (ANS)** This system represents numerical magnitude in an analog, approximate manner following Weber's law - discrimination becomes harder as numbers get larger. The neural representation appears to be logarithmically compressed, similar to other magnitude representations in the brain.

**Experimental Evidence** Research using fMRI adaptation paradigms shows that repeated presentation of the same numerosity leads to decreased activation, while changing numerosity causes recovery of the signal. The degree of recovery correlates with numerical distance, supporting the idea of overlapping tuning curves.

**Symbolic vs. Non-symbolic Processing** There's evidence for partially distinct neural pathways for exact symbolic numbers (like "7") versus approximate quantities (like a collection of dots), though they share common magnitude representation areas.

**Neural Oscillations** Recent work suggests that different frequency bands in neural oscillations may encode different aspects of numerical information, with gamma oscillations potentially important for precise numerical computations.