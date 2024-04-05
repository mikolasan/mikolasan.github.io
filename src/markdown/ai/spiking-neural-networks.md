---
section: brain
title: Spiking Neural Networks
topic: true
description: ""
published: 2022-12-20
lastModified: 2022-12-20
---

Better than any words, you can get an idea how SNNs work from [this animation](https://youtu.be/3JQ3hYko51Y?t=122).

But here's a downside:

>  ...in order to reach accuracy of its ANN counterpart, 
> it usually requires long spike trains to ensure the accuracy. 
> Traditionally, a spike train needs around one thousand time steps to approach similar accuracy as its ANN counterpart
>
> _[Efficient Spiking Neural Networks with Radix Encoding](https://arxiv.org/pdf/2105.06943.pdf)_

- http://www.xavierdupre.fr/app/ensae_teaching_cs/helpsphinx/ml2a/td2a_mlplus_snn.html
- A minimal sNN network https://thesai.org/Downloads/IJARAI/Volume4No7/Paper_1-A_Minimal_Spiking_Neural_Network_to_Rapidly_Train.pdf
- online book https://neuronaldynamics.epfl.ch/online/Ch7.S1.html
- Local connectivity and synaptic dynamics in mouse and human neocortex https://www.science.org/stoken/author-tokens/ST-374/full


## Implementation

How to write a spiking neural network simulation from scratch in Python

- Izhikevich model, Tensorflow https://github.com/kaizouman/tensorsandbox/blob/master/snn/simple_spiking_model.ipynb
- SpykeTorch ? https://github.com/miladmozafari/SpykeTorch
- snnTorch https://snntorch.readthedocs.io/en/latest/tutorials/tutorial_3.html ([white paper](https://arxiv.org/pdf/2109.12894.pdf))
- Guillaume Chevalier's experiment [in his blog](https://guillaume-chevalier.com/spiking-neural-network-snn-with-pytorch-where-backpropagation-engenders-stdp-hebbian-learning/)
- [Notebook](https://github.com/dacorvo/tensorsandbox/blob/master/snn/simple_spiking_model.ipynb) simulating spiking neurons with Tensorflow
- [The Attentional Routing Circuit](https://uwspace.uwaterloo.ca/bitstream/handle/10012/6122/Bobier_Bruce.pdf) by Bobier
- Eliasmith and [Spaun](https://xchoo.github.io/spaun2.0/videos.html) model. Original article from [Science](https://www.science.org/doi/10.1126/science.1225266). [PDF version](https://compneuro.uwaterloo.ca/files/publications/eliasmith.2012.pdf). And supplementary materials for [A Large-Scale Model of the Functioning Brain](https://www.science.org/action/downloadSupplement?doi=10.1126%2Fscience.1225266&file=1225266.eliasmith.sm.pdf#page91)


## Training methods

A list from [this blog](https://cnvrg.io/spiking-neural-networks/)

### Unsupervised Learning

- [Spike-timing-dependent plasticity (STDP)](http://www.scholarpedia.org/article/Spike-timing_dependent_plasticity)
- [Unsupervised Learning with Self-Organizing Spiking Neural Networks](https://arxiv.org/pdf/1807.09374.pdf) (Hazan et al 2018). Growing Spiking Neural Networks, activation based on spacial proximity which makes similar classes transition from one to another.
- [Artola, Bröcher, Singer (ABS) rule](https://www.sciencedirect.com/science/article/abs/pii/016622369390081V)
- [Bienenstock, Cooper, Munro (BCM) rule](http://www.scholarpedia.org/article/BCM_theory)
- [Relationship between BCM and STDP rules](http://www.izhikevich.org/publications/bcm.pdf)

### Supervised Learning

- [SpikeProp](https://www.researchgate.net/publication/221165220_SpikeProp_backpropagation_for_networks_of_spiking_neurons)
- [Remote Supervised Method (ReSuMe)](http://d1.cie.put.poznan.pl/pracownicy/prac_15/Publikacje/ReSuMe_FP_TechRep_2005a.pdf)
- [FreqProp](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.58.5637&rep=rep1&type=pdf)
- [Local error-driven associative biologically realistic algorithm (LEABRA)](https://en.wikipedia.org/wiki/Leabra)
- [Supervised Hebbian Learning](http://ecee.colorado.edu/~ecen4831/Demuth/Ch7_pres.pdf)

### Reinforcement Learning

- [Spiking Actor-Critic method](https://www.semanticscholar.org/paper/A-Spiking-Neural-Network-Model-of-an-Actor-Critic-Potjans-Morrison/dee121c5fb8b74c7c37b953ffabd73c16cb216ab) "A Spiking Neural Network Model of an Actor-Critic Learning Agent" by Wiebke Potjans, A. Morrison, M. Diesmann (2008)
- [Reinforcement Learning through reward-modulated STDP](https://florian.io/papers/2007_Florian_Modulated_STDP.pdf)


## Papers

- [2002 Gerstner Kistler](http://catdir.loc.gov/catdir/samples/cam031/2002067657.pdf) SPIKING NEURON MODELS: Single Neurons, Populations, Plasticity
- [2010 Basu, Hasler](https://0795f079-a-62cb3a1a-s-sites.googlegroups.com/site/arindambasu/writings/2010_J2.pdf) - Nullcline-Based Design of a Silicon Neuron
- [2019 Thiele](https://arxiv.org/pdf/1906.00851.pdf) SpikeGrad: An ANN-equivalent Computation Model for Implementing Backpropagation with Spikes
- [2020 Comsa et al](https://arxiv.org/abs/1907.13223) - Temporal Coding in Spiking Neural Networks with Alpha Synaptic Function: Learning with Backpropagation https://arxiv.org/pdf/1907.13223.pdf


## My links

**A Minimal Spiking Neural Network** to Rapidly Train and Classify Handwritten Digits in Binary and 10-Digit Tasks [paper](https://thesai.org/Downloads/IJARAI/Volume4No7/Paper_1-A_Minimal_Spiking_Neural_Network_to_Rapidly_Train.pdf). Guess how spikes work in this work. Pixels from black and white picture unwrapped into spike trains (facepalm)


## Questions

- How does STDP start if no synaptic connections exist a priori?