---
title: Markov decision processes
date: 2023-01-01
published: 2023-01-01
lastModified: 2023-01-01
topic: true
---

Neural networks, classification and clusterization algorithms are considered to be intelligent as far as they are part of Artificial Intelligence. But can they create novel independent decisions? Plan their execution algorithm and improve it over time?

And when I ask these questions I don't want to focus on specific aspects like "improving the algorithm". Because I can manually add some genetic algorithm to the system, and voila, it improves some characteristic over time. Instead I want the system to decide itself if it needs improvement, or a change - all of it depending on its goals.

In another words, if the environment changes, the system can use its prior knowledge to learn and adapt to new conditions. In terms of current AI paradigm: it doesn't need new training and testing set and training process for many hours and days on many GPUs. Is it possible?

Appropriate keywords:

- incremental learning
- generative neural networks

### Papers

- MDP formal description https://arxiv.org/pdf/2006.05879.pdf (wikipedia as always sucks)
- More math https://games-automata-play.github.io/blog/dynamic_algorithms_MDP/
- Comparing MDP with other planning techniques https://arxiv.org/pdf/1105.5460.pdf
- Unpredictable transitions https://gaips.inesc-id.pt/~fmelo/publications/witwicki13icaps.pdf
- Dynamic states with fixed initial one https://finale.seas.harvard.edu/files/finale/files/doshi-velez-tpami-2015.pdf
- Dynamic state space https://www.frontiersin.org/articles/10.3389/fncom.2021.784592/full <<<=== this is something very related to what I was - hoping to find. It's 2022, imagine how fresh it is!

### Code 

May be good for the implementation

- Straight-forward implementation, but code can be useful https://github.com/sawcordwell/pymdptoolbox/blob/master/src/mdptoolbox/mdp.py
- Not bad Python code https://github.com/coverdrive/MDP-DP-RL/blob/master/src/processes/mdp.py
- https://github.com/infer-actively/pymdp


## Value Iteration Network (VIN)

There is this repo [here](https://github.com/itdxer/neupy)

> Exploring world with Value Iteration Network (VIN) One of the basic applications of the Value Iteration Network that learns how to find an optimal path between two points in the environment with obstacles.

from an article (2017 Aviv Tamar, Yi Wu, Garrett Thomas, Sergey Levine, and Pieter Abbeel - [Value Iteration Networks](https://arxiv.org/pdf/1602.02867.pdf))

> We introduce the value iteration network (VIN): a fully differentiable neural network with a ‘planning module’ embedded within. VINs can learn to plan, and are suitable for predicting outcomes that involve planning-based reasoning, such as policies for reinforcement learning.

![VIN figure 1](./vin-figure-1.jpg "Typical example of use")

Here's a bold claim accusing RL in only maximizing one action over a smart strategy

> [Typical NNs] are inherently reactive, and in particular, lack explicit planning computation. The success of reactive policies in sequential problems is due to the learning algorithm, which essentially trains a reactive policy to select actions that have good long-term consequences in its training domain.


So I skipped simple ANN implementations and tried VIN.I had git problems here. I found a fork with a fix. I also found that VIN is implemented in PyTorch and TensorFlow which means I don't need to use neupy library. 
