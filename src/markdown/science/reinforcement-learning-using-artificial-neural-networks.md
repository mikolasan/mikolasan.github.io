---
title: Reinforcement Learning using ANN
date: 2022-10-25
---

**Guest star: @mathuccino**

My advice is 

> don't focus too much on articles


## A primer

[This](https://www.sciencedirect.com/science/article/pii/S0896627320307054) is the article I was reading, it is said to be a "primer" but actually covers the mathematical foundational aspects as well as the code for "hands on" experience

I found it good to begin with because it's a "primer", which means it's simple enough for you to play with it

You can find the repo [here](https://github.com/gyyang/multitask)


But this is still a bit vague for what you asked I think

It's a compilation of examples, they have around 30

Some are from biology as I can see

But it's the "basics"


## Applying Evolutionary Artificial Neural Networks

[This repo](https://github.com/ArztSamuel/Applying_EANNs) simulates a car that mustn't touch walls

It made me think of your research because the README file states 

> A car has five front-facing sensors which measure the distance to obstacles in a given direction. The readings of these sensors serve as the input of the car's neural network.

Here, the official description 

>A 2D Unity simulation in which cars learn to navigate themselves through different courses. The cars are steered by a feedforward neural network. The weights of the network are trained using a modified genetic algorithm.


## Machine learning without any libraries

You have [this very basic implemetation](https://github.com/pavankalyan1997/Machine-learning-without-any-libraries/blob/master/8.%20ANN/ANN.py) of ANNs in Python with one hidden layer and no hidden dependencies


## Value Iteration Network (VIN)

There is this repo [here](https://github.com/itdxer/neupy)

> Exploring world with Value Iteration Network (VIN) One of the basic applications of the Value Iteration Network that learns how to find an optimal path between two points in the environment with obstacles.

from an article

> We introduce the value iteration network (VIN): a fully differentiable neural network with a ‘planning module’ embedded within. VINs can learn to plan, and are suitable for predicting outcomes that involve planning-based reasoning, such as policies for reinforcement learning.

![VIN figure 1](./vin-figure-1.jpg "Typical example of use")


## Simplest artificial neural network

Do you code in Go? If you do, there is [this approach](https://github.com/gokadin/ai-simplest-network), the simplest one

To keep in a corner because it's the "bone structure" of the way it works


## Building Neural Networks using NumPy

But we need a matrix at some point so how to generate it?

[Another resource](https://github.com/ahmedfgad/NumPyANN) you might want to use. And [it seems](https://pygad.readthedocs.io/en/latest/README_pygad_nn_ReadTheDocs.html) pretty handy

![PyGAD docs](./pygad-docs.jpg)


## Conclusion

That's what I have for now. I think it is better to start with a popular repo that works and that has been tested by many before, these are projects with many collaborators so they have visibility

Then you will focus on finding articles if needed. I am still not sure how the generation of a matrix works in your project so these approaches deserve to be compared


## Testing

I'm eager to see what will come out of this approach of running examples before reading articles.  need to check them. I don't need the solution that works. I need the solution that "thinks"