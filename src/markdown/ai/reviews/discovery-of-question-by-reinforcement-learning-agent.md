---
title: Discovery of question
subtitle: by RL agent formulated as general value functions
published: 2024-08-11
lastModified: 2024-08-11
year: 2019
authors: Vivek Veeriah et al
section: brain
---
I am reading about [Discovering of useful questions as auxiliary tasks](https://arxiv.org/pdf/1909.04607) and by _discovery_ they mean using General value function, GVF that is just more general than value functions that mainly helpful under some policy. They basically mathematically describe “what if” situations for the model. 

But I understand discovery as a set of new actions. New meta actions as a combination of basic movements. We can mention here the problem of [bipedal walking robot](/ai/reinforcement-learning#environments): it has only constraints in its joints and it must learn how to walk. As with the lizard, I [mentioned earlier](https://mikolasan.substack.com/p/lizards-and-continuous-space), the motions are predefined by [central pattern generator](/ai/solve-cartpole-with-spiking-neural-networks#central-pattern-generator) and neural circuits. But animals with more developed neocortex need to spend some time and fill that space with practice. Which makes the gait unique, which for robots means to be more adaptable to motor and frame nuances. 

Based on some videos of RL training I watched, and I believe that I can say about many RL variations (PPO, SAC), they all learn gradually, cautiously, with little alterations that can lead to very bad dip. In such case, sitting in a bad minimum would require another slow and painful recovery.

Logically I would see another approach in trying all possible movements, categorize them as different actions, and then choose between them to build a strategy. This way we build model free algorithm, and actually _agent free_ (agent unlocked ? ) too. Any agent with actuators and sensors can define the set of actions. The set of basic and more complex actions. With later possibility to discover new.