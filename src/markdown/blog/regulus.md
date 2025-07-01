---
title: Regulus
date: 2025-05-13
published: 2025-05-28
lastModified: 2025-05-28
subtitle: My thesis program and new development
---
Now when I almost finished with [the titanic competition](/ai/titanic-kaggle-challenge) (I didn’t reach 90% accuracy how a planned, though I don’t know if it’s possible), it’s time to think how to apply this algorithm to reinforcement learning tasks.

Like the snake environment. The first difference with a simple classification task is that the solution is spread in time. Some may think that this task provides a huge space to search for an optimal solution. And reinforcement learning, and specifically Alfa zero variation, can provide an efficient way of minimizing the search. 

But that’s is not how you would play this game. First of all, you are not a snake, you see the whole field. And let’s consider a variation where there are obstacles on a way to apples. With reinforcement learning the agent will be crashing into walls until the policy changes to stay away from these walls. But that doesn’t mean that it will direct our agent to apples or find an optimal route in a changing environment.

Second, you don’t see a grid, you immediately see how to avoid obstacles. It’s like lines going around with concrete details and alterations during actual execution of this plan.

We will start looking at the problem using a simple approach. As usual there’s a state and action, and taking that action will change the state. But don’t think about the state as a precise collection of pixels on a grid. This is a macro state: nothing dangerous, hitting a wall, collecting apple. It’s already processed by “a pattern recognition” system. What’s important on this step is a sequence of events, a chain of state-action pairs that can lead to a terminal state or if we can branch out before that event and continue in another direction. So this is the search space.

Time sequence is predicted by neurons when they receive a current state and expected state, so they can predict an action required to transition to the expected state.
State nothing - action - state nothing (not actions will result in nothing, where to get this additional information?)
State nothing - action - state eat apple

## How rules represent synaptic connections

Rules are like descriptions of spiking activity. A premise holds pre-synaptic neurons. And when receptors receive signals (tokens added to initial ideal state) these rules describe what next neurons will be excited or inhibited (that’s when we look at the conclusion). However all parts of premises, all terms lie in the receptors layer. Thus they form only inter layer connections. While even for a classification task with labels with a simple Artificial Neural Network, it will pass information to one or two layers of hidden neurons. Neurons in those layers don’t have any specific meaning. Speaking from linear algebra perspective (and linear optimization) they just break out of linearity (at least one hidden layer is required to approximate XOR function). And connections (weights) between layers are formed by the gradient descent method.

Is it possible to add hidden layers to rules and use them in the training process?

I added weights per rule to fix wrong predictions. But that technique didn’t work well because it was either changing weights back and forth and making no difference for the second run, or it was doing meaningless adjustments.

But I suppose we can add a term to some rules to increase or decrease their influence. Some rules can have different terms which will make weights independent and influence from these terms will be non linear (it will be a combination).

These hidden neurons like internal flags that can help to distinguish between classes better. But they cannot be added to observations, they must be constructed by rules when an ideal is transformed. So maybe a few rules that don’t follow probability and criterion tests requirements?

So let’s say three terms appear frequently but they don’t create any rules because there’s no fourth term that would connect them together. **Then we create a new dimension (on another layer) that will be a combination of these three values.** When we create several elements on the new layer, we can convert training data to new dimension and train for inter connections.

## Search optimization and training based on real experience 

What if the full search we perform is hurting our predictions. If we found excessive patterns that in some cases true but contradict knowledge we need for the best results over the test data? That’s what I plan to fix with weights by reviewing predictions on all rules. But what if it will be better without these rules. Because we are looking for short combinations of 2-3 terms , it doesn’t make the set of rules the only one, complete and correct.
I was trying to find explanation for next level terms. Should statistical data (this is artificial data that we try to get insight using machine learning algorithms, it doesn’t resemble low level perception input like color, smell, gravity, sound or muscles. This data consists of high concepts like names. From a list of names you can infer information about this population: their relationship to each other like family, guess nationality or religion. But if it’s only text to your algorithm then it tries to consume this data as low level signals.)
So, should statistical data be organized in levels. Where the label is not part of the input.

## Stability and fixed point

One thing why I returned to Vityaev’s algorithm is its stability around transforming observations into an ideal object. It’s never an empty object at the end (actually this happened for not correlated objects, but I will blame very bad dataset). It’s either already in ideal shape or will make a transformation (once there was an artificial dataset with contradicting predictions and it was exactly 50-50 to insert and to delete one element. It has been stuck at this conundrum forever. So a chance of this happening in real dataset is minuscule but this example confirms that the algorithm is perfect.)

In the titanic challenge I observed quite a bit of rules with 0.999 probability. When later we apply a log function it quickly reaches very big numbers. So this scaling could be problematic.

When I tried to make a spiking network, I didn’t know how to set weights and how to predict when it’s going to stop. So if we represent dendrites and a spike as a rule and conditional probability as weights then that’s how the network structure is made.


## Spatial compression 

If we think about MNIST dataset of handwritten digits and neurons that must recognize lines and other shapes, will that be created by correlations? Which really depends on dataset. Or we can think about first few layers as a spatial compression which triggers next level neurons when a specific pattern is recognized, and those patterns don’t have any meaning or statistical significance they are just different. So different patterns triggers different neurons on the next level.

Run a search with only positive terms. Sort by probability descending and by premise length ascending. Probably just ignore one term rules (or include the conclusion?). These groups in premises are new dimension. So create a new dataset in terms of these groups. So now, run another search on this dataset. Carry over the dimension where predictions are labeled without changes.

## The search is taking too long

When I started another search after another row of optimizations, a suspicion came to me, there’s something wrong what I am doing.
From one side, we need to build strong connections between “neurons” and that only happens through repetition. Repetition brings stronger connections. But what data do we process. We are trying to solve some statistical problem which feels wrong.
While ANN does the same thing of building specific weights and connections from pure chaos, but the system explicitly demands for data to be repeated over and over without false statements. A benefit that some parts could be extrapolated.

But regulus doesn’t have only one activation. It has many activations, very broad and more specific, they add up and highlight correlation in data. It explicitly can formulate what is missing and what is wrong. (Does this work as noise resistance?) Though current process creates very rigid sets, once discovered, never changed later. Although it is very easy to add or remove rules.
From my experiments with spiking networks and modeling hippocampus, where I tried to change weights instantly and harden them by predictions and contradictions, I think regulus is far from it. However, regulus can pick up an anomaly and that is something that ANN cannot learn quickly.
So by finding correlations in data and testing them for causal relationships, it extracts groups that always fire together, which makes this system unique, this is the only system that can create new meaningful nodes this way. They are not similar to hidden neurons in ANN. Hidden layers try to fulfill the idea, but only in some basic sense.

## 3.0

We need to add a dimension controller. This code will work with data on the first layer, consuming new examples and encoding them as predicates. Predicates should have this information about position in the example, like x, y, and layer 0. If no rules are available then we will create only short rules going to the layer 1.
When we review the next example and some rules are applied, then we build new rules based on these combination. Then it can reach the next level.

## Movement 

I’m going against the pyramidal structure and auto regression in VAE (v auto encoders) because I think it’s missing any way to extract invariants from data. Also prediction doesn’t come into comparison with the input.
CNN kernels and layers by layer generalization of patches is the only technique for finding higher level patterns. But movement is not possible to find this way. Such information cannot be part of this structure. YOLO solves it but making such invariants in the training data. 

Here's, what I think. The neural path is not pyramidal but more random. It just follows the sparse spatial encoding. And signal going up (further from input) will create more abstract understanding. But the point is to match it with something from memory. And **if there is no exact match, then it can try to apply some adjustments to the input,** try to match it with existing information. As it is known, this will be reinforced by emotional response.

Where is these ideas about possible transformations are stored?

## Ideas

The agent should control how the input is located. The agent can move, rotate or scale the input. 
To execute these actions we will have special neurons for that. Thus these neurons know about transformations and can be used as a part of decision making without any real action, the same as image prediction when the output is not what appears on the receptive field.