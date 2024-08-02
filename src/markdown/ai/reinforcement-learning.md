---
section: brain
title: Reinforcement Learning
topic: true
published: 2022-12-20
lastModified: 2022-12-20
---

## Personal research

**[Link](/ai/reinforcement-learning-using-artificial-neural-networks)**

## Articles

- [How RL Agents Behave When Their Actions Are Modified](https://arxiv.org/pdf/2102.07716.pdf), [code](https://github.com/edlanglois/mamdp)
- soccer bi-pedal robot recover after push with Deep Reinforcement Learning [site](https://sites.google.com/view/op3-soccer?pli=10) [paper](https://arxiv.org/abs/2304.13653)
- 2019 Neftci - Reinforcement learning in artificial and biological systems https://www.gwern.net/docs/reinforcement-learning/model-free/2019-neftci.pdf
- neurorobotics can be used to explain how neural network activity leads to behavior. [Neurorobots as a Means Toward Neuroethology and Explainable AI](https://www.frontiersin.org/articles/10.3389/fnbot.2020.570308/full)
- [TensorFlow tutorials](https://www.tensorflow.org/agents/tutorials/0_intro_rl) probably bad about theory part, but [Hugging Face course](https://huggingface.co/learn/deep-rl-course/unit3/deep-q-algorithm) is definetily more clear.
- Explnataion-based learning VS Reinforcement learning [Dietterich 1997](https://link.springer.com/article/10.1023/A:1007355226281)
- HOT! (According to [Ignacio de Gregorio](https://medium.com/@ignacio.de.gregorio.noblejas/offline-rl-680450c472c), pulp fiction writer: In a paper that’s not even been officially presented yet, Google has announced pre-trained robots that are capable of doing multiple different activities and also be easily trained to ambitious downstream tasks.) https://arxiv.org/pdf/2211.15144.pdf
- [Review of clutches](https://www.nature.com/articles/s42256-023-00701-w) required in RL 
- Smart Reinforcement learning in [How to Create a Modular & Compositional Self-Preserving Agent for Life-Long Learning](https://arxiv.org/pdf/2211.10851.pdf). It is based on [Markov decision processes](https://medium.com/@ngao7/markov-decision-process-basics-3da5144d3348) (too wordy, but very simple articles with examples) that uses Bellman equation, [value functions](http://incompleteideas.net/book/ebook/node34.html), [temporal goals in MDP](https://arxiv.org/pdf/2211.10851.pdf). I think one can rewrite [this smelly python code](https://www.tech-quantum.com/markov-decision-process-implemented-from-scratch/) while using [this popular python library](https://github.com/sawcordwell/pymdptoolbox/blob/master/src/mdptoolbox/mdp.py) (470 stars) as reference.
- Game theory in RF. [Mastering the Game of Stratego with Model-Free Multiagent Reinforcement Learning](https://arxiv.org/pdf/2206.15378.pdf). Where you need to know what is [The replicator equation](https://www.pnas.org/doi/full/10.1073/pnas.1400823111) and how to plot [3-Strategy Evolutionary Games](https://www.biorxiv.org/content/10.1101/300004v2.full.pdf#page91)
- [Policy gradient methods](https://people.eecs.berkeley.edu/~pabbeel/cs287-fa09/readings/KakadeLangford-icml2002.pdf) -> [Proximal policy optimization](https://arxiv.org/pdf/1707.06347.pdf)

## Questions

- Does anyone know if the reward function in reinforcement learning was ever supported by logical reasoning instead of a priori given values?

## Program

I read [DQN Paper](https://storage.googleapis.com/deepmind-media/dqn/DQNNaturePaper.pdf) and implement something better than [any](https://pytorch.org/tutorials/intermediate/reinforcement_q_learning.html) [Python](https://github.com/Apress/deep-reinforcement-learning-python/blob/main/chapter6/listing6_1_dqn_pytorch.ipynb) code.

Let's write Reinforcement Learning program in Rust. In the beginning we will be solving frost lake environment. We will use a [grid world](https://github.com/tspooner/rsrl/blob/master/rsrl_domains/src/grid_world.rs) from `rsrl`

```sh
cargo new qu-robot
cd qu-robot
cargo add rsrl
```

Walls in the grid environment is an interesting problem. In `rsrl` crate it was implemented that the movement is possible but not movement actually occurs, so the agent just stays in the same position. It's not good. Because stay in place should be intentional action rather than a loophole in the implementation. Staying in the same spot is an equilibrium, so we can say it's safe strategy.

What can we do to fix it? We can remove movements that go into any wall from a list of possible actions. But then the sum of probabilities for remaining actions stops being equal to 1. And this can be solved by normalization, but I have more important vote against it. I think that the agent should understand something about the environment and know what walls are. As thy can be the limits of the environment and also any obstacle inside the environment. And if the agent finds a way to avoid the obstacles then it can apply the same technique to the limits of the environment and leave the box...

Then if we add another state 'W' everywhere around our current grid then we emphasize the problem that we had originally. Every decision takes in consideration only the current state. If this state was near a wall then we learned that that direction is bad. Instead of just observing what is near our agent is taking actions like a blind hedgehog in the dark. So then we need to combine all cells around into one state.

But this is just very exponentially increased our set of possible states and dimensions of transition matrix. Then let's only include states that have reward values. That's not every state, right?

We skip diogonal values. Thus we have 5 states that will create one meta state. Having only 3 meaningful states we have 5^3 = 125 meta states.

## Further development

### Sub goals

**Goal-Conditioned Reinforcement Learning: Problems and Solutions** by Liu et al ([paper](https://arxiv.org/pdf/2201.08299), 2022)
Goals are positions where robot should reach (it's body, or parts like arms). There are many end positions that correspond to different tasks or steps. These positions can be discovered with several methods, so no need  to hard-code them. But there is no single answer how to switch between goals. It resembles very much bayesian learning where conditional probabilities are learned from experience. 