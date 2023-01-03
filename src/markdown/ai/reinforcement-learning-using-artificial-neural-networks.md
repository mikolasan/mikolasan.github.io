---
title: Reinforcement Learning using ANN
date: 2022-10-25
published: 2022-10-25
lastModified: 2022-10-30
---


> My advice is **don't focus too much on articles**
>
> _@mathuccino_

Practice, practice, practice!


> ANN are universal function approximators
>
> Julien Pascal [mentioning the theorem and writing code in Julia](https://julienpascal.github.io/post/ann_1/)


## The simpliest ANN

First of all lets create the simpliest but non trivial perceptron - [neuron system that works as a XOR function](https://medium.com/mlearning-ai/learning-xor-with-pytorch-c1c11d67ba8e).
Two input neurons, two in the hidden layer, and one neuron - output. Simple as that:

```py
"""
Original code:
https://courses.cs.washington.edu/courses/cse446/18wi/sections/section8/XOR-Pytorch.html

Another reference from:
https://medium.com/mlearning-ai/learning-xor-with-pytorch-c1c11d67ba8e
https://colab.research.google.com/drive/1sKJfB5YAfAUD9PU-SNDGlMdKa9M7yCcH?usp=sharing

Made it work in Python 3, PyTorch 1.11
"""

import torch
from torch.autograd import Variable
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt
# %matplotlib inline

# for reproducible results
# torch.manual_seed(2)
# np.random.seed(2)

epochs = 2001
X = torch.Tensor([ [0,0], [0,1], [1,0], [1,1] ])
Y = torch.Tensor([0,1,1,0]).view(-1,1)


class XOR(nn.Module):
    def __init__(self, input_dim = 2, output_dim=1):
        super(XOR, self).__init__()
        self.linear1 = nn.Linear(input_dim, 2)
        self.linear2 = nn.Linear(2, output_dim)
    
    def forward(self, x):
        x = self.linear1(x)
        x = torch.sigmoid(x)
        x = self.linear2(x)
        return x


def train(model):
    def weights_init(model):
        # initialize the weight tensor and bias
        linear_layers = [m for m in model.modules() if isinstance(m, nn.Linear)]
        for m in linear_layers:
                # here we use a normal distribution
                m.weight.data.normal_(0, 1)
                # print(f'Initial weights: {m.weight}')

    weights_init(model)
    mseloss = nn.MSELoss() # mean squared error
    optimizer = torch.optim.SGD(model.parameters(), lr=0.02, momentum=0.9)
    # optimizer = torch.optim.Adam(model.parameters(), lr=0.03)

    for i in range(epochs):
        y_hat = model.forward(X)
        loss = mseloss(y_hat, Y)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

        if i % 500 == 0:
            print(f'Epoch: {i}, Loss: {loss.item()}') 


def plot_model(model):
    model_params = list(model.parameters()) # returns weights and biases
    model_weights = model_params[0].data.numpy()
    print(f' Model weights: {model_weights}')
    model_bias = model_params[1].data.numpy()
    print(f' Model bias: {model_bias}')

    plt.scatter(X.numpy()[[0,-1], 0], X.numpy()[[0, -1], 1], s=50)
    plt.scatter(X.numpy()[[1,2], 0], X.numpy()[[1, 2], 1], c='red', s=50)

    x_1 = np.arange(-0.1, 1.1, 0.1)
    y_1 = ((x_1 * model_weights[0,0]) + model_bias[0]) / (-model_weights[0,1])
    plt.plot(x_1, y_1)

    x_2 = np.arange(-0.1, 1.1, 0.1)
    y_2 = ((x_2 * model_weights[1,0]) + model_bias[1]) / (-model_weights[1,1])
    plt.plot(x_2, y_2)
    plt.legend(["neuron_1", "neuron_2"], loc=8)
    plt.show()


if __name__ == "__main__":
    model = XOR()
    train(model)
    plot_model(model)
```

![Output](./pytorch-ann-xor-function.png)

Later you might be tempted to review such simple systems further

- [ANN Primer](https://www.sciencedirect.com/science/article/pii/S0896627320307054) for Neuroscientists. It covers the mathematical foundational aspects as well as the code for "hands on" experience. Around 30 examples are in [the repo](https://github.com/gyyang/multitask) (written for Tensorflow 1.8.0, Python 2.7 / 3.6)
- [Very basic implemetation](https://github.com/pavankalyan1997/Machine-learning-without-any-libraries/blob/master/8.%20ANN/ANN.py) of ANNs in Python with one hidden layer and no hidden dependencies (requires: numpy, pandas, scikit-learn, matplotlib)
- [The simplest artificial neural network possible](https://github.com/gokadin/ai-simplest-network) explained and demonstrated. Even if you don't code in Go, check out the theory - it's the "bone structure" you need to understand
- [ANN module](https://pygad.readthedocs.io/en/latest/README_pygad_nn_ReadTheDocs.html) in PyGAD library
- [NumPy only dependency](https://github.com/ahmedfgad/NumPyANN/blob/master/TutorialProject/ann_numpy.py)


So if you think library for machine learning is not making this example any simpler, then look how it would look with no external libraries (only numpy for matrix operations)

```py
```


## Function approximation

Then let's [approximate the sin function](https://machinelearningmastery.com/neural-networks-are-function-approximators/) and generalize our knowledge for any function. What requirements stand for functions in order to be approximable by neural networks?

Later we will focus out research on aspects such as

- function sophistication (hypothesis: you get an excellent approximation but with apparently many more epochs needed)
- function properties: differentiable, continuous, smooth
- sinusoid and exponential (infinitely differentiable so no problems) -> approx with linear regression
- structural limitations of the network
- accuracy control

[Here is a blog post](https://blog.cubieserver.de/2019/approximate-function-with-neural-network/) which tackles a few of the last bullet points.



## Deep Q-learning

https://observablehq.com/@mbostock/predator-and-prey

So I'm trying to find Python library for numerical differentiation. numpy should do it, but I don't see an example for function of two variables f(x, y) that depend on time - x(t), y(t).

And in math explanation I noticed one thing. I said Riemann sums, but I actually meant Taylor series expansion which is also about approximation, but in Taylor series accuracy grows with more operands we take into account.

So Python code from Jack's blog works, but I didn't put my function because I need to make an array of differentiated values. Not sure why. I wanted just to play around with things. And I stopped reading on [this](https://www.tensorflow.org/agents/tutorials/0_intro_rl)

Which is maybe what we are looking.


## Logic statements in ANN

I've found two articles, more of a good read than a coding tutorial, it seems relevant:

1. [Emulating logical gates with a neural network](https://towardsdatascience.com/emulating-logical-gates-with-a-neural-network-75c229ec4cc9)
2. [How to teach logic to your neural networks](https://medium.com/autonomous-agents/how-to-teach-logic-to-your-neuralnetworks-116215c71a49) And in this last link, you will find [a link](https://playground.tensorflow.org/#activation=sigmoid&regularization=L2&batchSize=10&dataset=xor&regDataset=reg-plane&learningRate=0.03&regularizationRate=0&noise=0&networkShape=2,2,1&seed=0.00814&showTestData=false&discretize=false&percTrainData=90&x=true&y=true&xTimesY=false&xSquared=false&ySquared=false&cosX=false&sinX=false&cosY=false&sinY=false&collectStats=false&problem=classification&initZero=false&hideText=false) to TensorFlow Playground, that could help you visualize your network. And the associated [GitHub page](https://github.com/tensorflow/playground)


Ok for the multivariable thing you don't use numpy but [SymPy](https://docs.sympy.org/latest/tutorials/intro-tutorial/calculus.html). [A more digestible tuto](https://www.askpython.com/python/examples/derivatives-in-python-sympy). It also explains how to use the chain rule

For Lotka-Volterra ordinary differential equations

- sympy and scipi http://bebi103.caltech.edu.s3-website-us-east-1.amazonaws.com/2015/tutorials/r6_sympy.html
- algebraic solution with sympy https://ipython-books.github.io/157-analyzing-a-nonlinear-differential-system-lotka-volterra-predator-prey-equations/
- scipy with plot https://scientific-python.readthedocs.io/en/latest/notebooks_rst/3_Ordinary_Differential_Equations/02_Examples/Lotka_Volterra_model.html


## Develop new actions

> If it uses fixed model of states and actions then it's not good. Is there a model that can develop new actions and adapt to the environment?

I worked on [adaptive algos](https://www.allerin.com/blog/everything-you-need-to-know-about-adaptive-neural-networks) for my med internship. it's the natural extension of ANNs apparently when coupled with the neural network approach

A man-made adaptive neural network, also called an artificial neural network, is modeled after the naturally occurring neural networks in the brains of humans and animals.

It's the same thing as an ANN pretty much

Ok so the main use is for a single-layer algo. It's called [Adaline](https://www.allerin.com/blog/everything-you-need-to-know-about-adaptive-neural-networks) if you want

Seems like a good start before having to deal with 5364 layers

Activity Recognition with Adaptive Neural Networks - [Notebook](https://www.kaggle.com/code/malekzadeh/activity-recognition-with-adaptive-neural-networks) and [paper](https://arxiv.org/abs/2008.02397)


[Multi Layer Perceptron](https://scikit-learn.org/stable/modules/neural_networks_supervised.html) - I don't like this approach too much but just sending in case


I somewhat satisfied how many topics we tackled this week. Even though I didn't train a single ANN (I think conventional "training" is wrong because it stops once errors on test set are minimized which obviously reveals the flaw - the network can only do what it trained to do), but I see that ANN can approximate functions, can follow logical statements, can store information as memory. It creates a base for my theory. Some insights can be borrowed from neuroscience to advance ANN quality, but there must be a way to transfer connections into symbolism - extract functions, logic and memories encoded in ANN. So what we just did, but in reverse.



## Bonus reading

[This repo](https://github.com/ArztSamuel/Applying_EANNs) simulates a car that mustn't touch walls. "A 2D Unity simulation in which cars learn to navigate themselves through different courses. The cars are steered by a feedforward neural network. The weights of the network are trained using a modified genetic algorithm." Cars on C# is basically a "game" made on Unity game engine - hard to use as a standalone project. It was created 6 years ago - may be problems to run it on current Unity version. Also training by genetic algorithm is no go. The result is cool tho. (Unity, Genetic algorithm)