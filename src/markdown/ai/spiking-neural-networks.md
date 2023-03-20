---
section: brain
title: Spiking Neural Networks
topic: true
description: ""
published: 2022-12-20
lastModified: 2022-12-20
---

- http://www.xavierdupre.fr/app/ensae_teaching_cs/helpsphinx/ml2a/td2a_mlplus_snn.html
- A minimal sNN network https://thesai.org/Downloads/IJARAI/Volume4No7/Paper_1-A_Minimal_Spiking_Neural_Network_to_Rapidly_Train.pdf
- online book https://neuronaldynamics.epfl.ch/online/Ch7.S1.html
- Local connectivity and synaptic dynamics in mouse and human neocortex https://www.science.org/stoken/author-tokens/ST-374/full


## Implementation

How to write a spiking neural network simulation from scratch in Python

- Izhikevich model, Tensorflow https://github.com/kaizouman/tensorsandbox/blob/master/snn/simple_spiking_model.ipynb
- SpykeTorch ? https://github.com/miladmozafari/SpykeTorch
- snntorch https://snntorch.readthedocs.io/en/latest/tutorials/tutorial_3.html


## Training methods

A list from https://cnvrg.io/spiking-neural-networks/

- Unsupervised Learning
  - [Spike-timing-dependent plasticity (STDP)](http://www.scholarpedia.org/article/Spike-timing_dependent_plasticity)
  - [Growing Spiking Neural Networks](https://arxiv.org/pdf/1807.09374.pdf)
  - [Artola, Bröcher, Singer (ABS) rule](https://www.sciencedirect.com/science/article/abs/pii/016622369390081V)
  - [Bienenstock, Cooper, Munro (BCM) rule](http://www.scholarpedia.org/article/BCM_theory)
  - [Relationship between BCM and STDP rules](http://www.izhikevich.org/publications/bcm.pdf)
- Supervised Learning
  - [SpikeProp](https://www.researchgate.net/publication/221165220_SpikeProp_backpropagation_for_networks_of_spiking_neurons)
  - [Remote Supervised Method (ReSuMe)](http://d1.cie.put.poznan.pl/pracownicy/prac_15/Publikacje/ReSuMe_FP_TechRep_2005a.pdf)
  - [FreqProp](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.58.5637&rep=rep1&type=pdf)
  - [Local error-driven associative biologically realistic algorithm (LEABRA)](https://en.wikipedia.org/wiki/Leabra)
  - [Supervised Hebbian Learning](http://ecee.colorado.edu/~ecen4831/Demuth/Ch7_pres.pdf)
- Reinforcement Learning
  - [Spiking Actor-Critic method](https://watermark.silverchair.com/neco.2008.08-07-593.pdf?token=AQECAHi208BE49Ooan9kkhW_Ercy7Dm3ZL_9Cf3qfKAc485ysgAAAq4wggKqBgkqhkiG9w0BBwagggKbMIIClwIBADCCApAGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMZnhncbq_rDsCI1ZHAgEQgIICYfFxqPJsnp8NHlB4yh8tBi8fqpL9fWyKyXx3GAISccfVNJMZ09_99O-x6ifl4GshYEhVX2MVIaUW54zL3I_MPMpEO7anv5Q3BZUHIozYiSmCgDqbhfkPZOfypIq78Ttm6SPT1z92WWDfu72RMZ4dA94QeINMRrDl8smAMHJ-0uzb_S2ox5IGKbJk2wDlJTv9P-m8YSJoFI9LA1_hm6gbiA10j3ynDV4gBSAVKQcnwOa-UZtKdqAyAgXF6oOOT5HVXRdwfWUuhrClqnsJtBgWMWo9YUVXjjh-8D3f29V_-1SfyI7DgsaVMiV6kogmX5wPOCruPD3cQ-oLc3ZX-54JGRKFTAQ6gTAQAI6NKRHcuLCwbQoB_ePUP6XFM4_lWZhY75qwUF75riz9KYEOflMdTtf4nZBIRqG21PTq6BbaJdcmt_wBcoSYgQJ3FsTUwzU3wiFGBtOQiOSd-3nJyMWN_aONJYjd8opTIsLc5WHU_ORHbjnCCj9LvQlJANB4cWlOv4nbFK0xcpolYzkku9-VwAuIW9uFyspCp2xe8ubvr6TEjQOsOMjqG2BR9d3IKv20K3tkAqbctSLLEs-wqWaReHSZ5V_xpXgmu0ws6UQKeqqKxAEPQVHzi_l7wJS1ilwWhJ8_5T9JPoGHdoCdyWMKpQBWoEjDpDRxXZGRcX36WrojjNAneVMPEIbJeXvjNqowr1EzahGdmkUR3qXdgIgloTxr064gTFM_QYxgsgxID5SL-Qd_V2EXJqBa4aNc8L8oCm5Y0ulqbY5grrSr6mGbyoM1gVy9MPOs8-8s34yojLYiBQ)
  - [Reinforcement Learning through reward-modulated STDP](https://florian.io/papers/2007_Florian_Modulated_STDP.pdf)


## Papers

- [2019 Thiele](https://arxiv.org/pdf/1906.00851.pdf) SpikeGrad: An ANN-equivalent Computation Model for Implementing Backpropagation with Spikes
- [2002 Gerstner Kistler](http://catdir.loc.gov/catdir/samples/cam031/2002067657.pdf) SPIKING NEURON MODELS: Single Neurons, Populations, Plasticity
- [2020 Comsa et al](https://arxiv.org/abs/1907.13223) - Temporal Coding in Spiking Neural Networks with Alpha Synaptic Function: Learning with Backpropagation https://arxiv.org/pdf/1907.13223.pdf
- [2010 Basu, Hasler](https://0795f079-a-62cb3a1a-s-sites.googlegroups.com/site/arindambasu/writings/2010_J2.pdf) - Nullcline-Based Design of a Silicon Neuron

