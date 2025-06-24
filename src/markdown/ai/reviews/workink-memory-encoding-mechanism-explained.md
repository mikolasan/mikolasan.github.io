---
section: brain
title: Recurrent neural networks with transient trajectory
subtitle: explain working memory encoding mechanisms
year: 2025
authors: Liu et al
published: 2025-01-02
lastModified: 2025-06-23
---

LINK: [nature.com](https://www.nature.com/articles/s42003-024-07282-3)

## How I found it

I was looking for some insights about encoding methods and knows tricks like spatial distribution in sparse encoding while I was playing with [hippocampus model](/ai/hippocampus-model).

## What I expect after reading the abstract 

RNN example with sparse encoding. 

How information stored in neurons? Every neuron has a value? Every dendrite has a value? Or memory is not stored in one neuron but rather in a group of neurons when the path of activations encodes a specific pattern (this is a term from signal theory, but how would we call a single entity stored in memory?) This paper says that it’s both. So can we extract one entity? Can we find and erase specific memories?

And what is stored in memory? Short little facts or chains of events?

The main question is what data we need to train such memory and how this stored information is used?

## Abstract

> Whether working memory (WM) is encoded by persistent activity using attractors or by dynamic activity using transient trajectories has been debated for decades in both experimental and modeling studies, and a consensus has not been reached. Even though many recurrent neural networks (RNNs) have been proposed to simulate WM, most networks are designed to match respective experimental observations and show either transient or persistent activities. Those few which consider networks with both activity patterns have not attempted to directly compare their memory capabilities. In this study, we build transient-trajectory-based RNNs (TRNNs) and compare them to vanilla RNNs with more persistent activities. The TRNN incorporates biologically plausible modifications, including selfinhibition, sparse connection and hierarchical topology. Besides activity patterns resembling animal recordings and retained versatility to variable encoding time, TRNNs show better performance in delayed choice and spatial memory reinforcement learning tasks. Therefore, this study provides evidence supporting the transient activity theory to explain the WM mechanism from the model designing point of view.