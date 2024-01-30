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

- soccer bi-pedal robot recover after push with Deep Reinforcement Learning [site](https://sites.google.com/view/op3-soccer?pli=10) [paper](https://arxiv.org/abs/2304.13653)
- 2019 Neftci - Reinforcement learning in artificial and biological systems https://www.gwern.net/docs/reinforcement-learning/model-free/2019-neftci.pdf
- neurorobotics can be used to explain how neural network activity leads to behavior. [Neurorobots as a Means Toward Neuroethology and Explainable AI](https://www.frontiersin.org/articles/10.3389/fnbot.2020.570308/full)
- [TensorFlow tutorials](https://www.tensorflow.org/agents/tutorials/0_intro_rl) probably bad about theory part, but [Hugging Face course](https://huggingface.co/learn/deep-rl-course/unit3/deep-q-algorithm) is definetily more clear.
- Explnataion-based learning VS Reinforcement learning [Dietterich 1997](https://link.springer.com/article/10.1023/A:1007355226281)
- HOT! (According to [Ignacio de Gregorio](https://medium.com/@ignacio.de.gregorio.noblejas/offline-rl-680450c472c), pulp fiction writer: In a paper that’s not even been officially presented yet, Google has announced pre-trained robots that are capable of doing multiple different activities and also be easily trained to ambitious downstream tasks.) https://arxiv.org/pdf/2211.15144.pdf
- [Review of clutches](https://www.nature.com/articles/s42256-023-00701-w) required in RL 

## Questions

- Does anyone know if the reward function in reinforcement learning was ever supported by logical reasoning instead of a priori given values?

## Program

I read [DQN Paper](https://storage.googleapis.com/deepmind-media/dqn/DQNNaturePaper.pdf) and implement something better than [any Python](https://github.com/berkeleydeeprlcourse/homework/blob/master/hw3/dqn.py) code.

Let's write Reinforcement Learning program in Rust. In the beginning we will be solving frost lake environment. We will use a [grid world](https://github.com/tspooner/rsrl/blob/master/rsrl_domains/src/grid_world.rs) from `rsrl`

```sh
cargo new qu-robot
cd qu-robot
cargo add rsrl
```

Walls in the grid environmnt is an interesting problem. In `rsrl` crate it was implemented that the movement is possible but not movement actually occurs, so the agent just stays in the same position. It's not good. Because stay in place should be intentional action rather than a loophole in the implementation. Staying in the same spot is an equlibrium, so we can say it's safe strategy.

What can we do to fix it? We can remove movements that go into any wall from a list of possible actions. But then the sum of probabilities for remaining actions stops being equal to 1. And this can be solved by normalization, but I have more important vote against it. I think that the agent should understand something about the environment and know what walls are. As thy can be the limits of the environment and also any obstacle inside the environment. And if the agent finds a way to avoid the obstacles then it can apply the same technique to the limits of the environment and leave the box...

Then if we add another state 'W' everywhere around our current grid then we emphasize the problem that we had originally. Every decision takes in consideration only the current state. If this state was near a wall then we learned that that direction is bad. Instead of just observing what is near our agent is taking actions like a blind hedgehog in the dark. So then we need to combine all cells around into one state.

But this is just very exponentially increased our set of possible states and dimensions of transition matrix. Then let's only include states that have reward values. That's not every state, right?

We skip diogonal values. Thus we have 5 states that will create one meta state. Having only 3 meaningful states we have 5^3 = 125 meta states.