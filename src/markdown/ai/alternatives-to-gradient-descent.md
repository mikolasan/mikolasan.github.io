---
article: main
title: Alternatives to gradient descent
date: 2022-11-13
published: 2023-01-03
lastModified: 2023-10-04
---

## Improvements

First let's review improvements for Gradient Descent. They are still GD by its nature.

7. Momentum gradient descent (MGD)
8. Nesterov accelerated gradient descent (NAG)
9. Adaptive gradient (Adagrad)
10. Root-mean-square gradient propagation (RMSprop)
11. Adaptive moment estimation (Adam)

Source: from an alternative ANN architecture - **Backpropagation Neural Tree** [paper](https://arxiv.org/pdf/2202.02248.pdf)


## Alternatives

When it comes to **Global Optimisation** tasks (i.e. attempting to find a global minimum of an objective function) you might wanna take a look at:

1. [*Pattern Search*][1] (also known as *direct search, derivative-free search*, or black-box search), which uses a *pattern* (set of vectors ${\{v_i\}}$) to determine the points to search at next iteration. 
2. [*Genetic Algorithm*][2] that uses the concept of mutation, crossover and selection to define the population of points to be evaluated at next iteration of the optimisation.
3. [*Particle Swarm Optimisation*][3] that defines a set of particles that "walk" through the space searching for the minimum. 
4. [*Surrogate Optimisation*][4] that uses a *surrogate* model to approximate the objective function. This method can be used when the objective function is expensive to evaluate.
5. [Multi-objective Optimisation][5] (also known as *Pareto optimisation*) which can be used for the problem that cannot be expressed in a form that has a single objective function (but rather a vector of objectives).
6. [*Simulated Annealing*][6], which uses the concept of *annealing* (or temperature) to trade-off exploration and exploitation. It proposes new points for evaluation at each iteration, but as the number of iteration increases, the "temperature" drops and the algorithm becomes less and less likely to explore the space thus "converging" towards its current best candidate.
7. Backpropagation Neural Tree (BNeuralT)
8. [**Target Propagation**][7]
9. [**Alternating Descent Method of Multipliers**][8] (ADMM) (You need 7000 CPU cores on a supercomputer, while I can have 1280 GPU cores on my old laptop with GeForce GTX 1060)
10. [**Zeroth-Order Relaxed Backpropagation**][9] (ZORB)
11. Finito https://arxiv.org/abs/1407.2710
12. Stochastic Dual Coordinate Ascent (SDCA) https://arxiv.org/abs/1209.1873
13. Stochastic Optimization with Variance Reduction https://hal.inria.fr/hal-01375816v1/document
14. Spike timing-dependent plasticity (STDP) for [Spiking Neural Networks](/ai/spiking-neural-networks)
15. Feedback alignment (FA)


As mentioned above, *Simulated Annealing, Particle Swarm Optimisation and Genetic Algorithms* are good global optimisation algorithms that navigate well through huge search spaces and unlike *Gradient Descent* do not need any information about the gradient and could be successfully used with black-box objective functions and problems that require running simulations.



Source: [1](https://stats.stackexchange.com/questions/97014/what-are-alternatives-of-gradient-descent) [2](https://stackoverflow.com/questions/23554606/what-are-alternatives-of-gradient-descent)


## Vityaev's method

Vityaev’s method gives more flexibility to the dendrites part of the system comparing to how they are modeled in perceptrons or any deep network, instead of simple weights per synapses it reacts to signal patterns like in spiking neurons. Moreover, using this framework it’s possible to interpret signal propagation with logic statements and probabilities like in Bayes networks. Thus we have a bigger choice of learning methods. It can be some statistical analysis of data.

## Extreme Learning

- [official](https://web.njit.edu/~usman/courses/cs675_fall20/ELM-NC-2006.pdf) (?) 
- [matrix notation](https://pdfs.semanticscholar.org/13be/dd5a3299a115ecc425eff6e7853741c81816.pdf)
- [lame explanation](https://erdem.pl/2020/05/introduction-to-extreme-learning-machines)
- [python code](https://github.com/burnpiro/elm-pure/blob/master/model.py)
- [wiki](https://en.wikipedia.org/wiki/Extreme_learning_machine)
- [paper](https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=7140733)

## Towards a more biologically plausible learning algorithm

Main article - Biologically-Plausible Learning Algorithms Can Scale to Large Datasets [link](https://arxiv.org/pdf/1811.03567.pdf)


## Nash’s equilibrium

Why is gradient descent the most popular, the only one technique in use? Because it’s stable. No matter what’s in your training data, with any order you will get predictable outcome. And things like Adaptive Resonance Theory aren't stable in that regard. They learn fast, but the order of data is very important. But. What if we apply Nash’s equilibrium here? Every system, component in the brain fight for their truth and shift the system, they play against each other, but we can determine when they must stop overwriting each other. Will it fix the problem with order?



  [1]: https://en.wikipedia.org/wiki/Pattern_search_(optimization)
  [2]: https://en.wikipedia.org/wiki/Genetic_algorithm
  [3]: https://en.wikipedia.org/wiki/Particle_swarm_optimization
  [4]: https://www.mathworks.com/help/gads/surrogate-optimization-algorithm.html
  [5]: https://en.wikipedia.org/wiki/Multi-objective_optimization
  [6]: https://en.wikipedia.org/wiki/Simulated_annealing
  [7]: https://arxiv.org/abs/1412.7525#
  [8]: https://arxiv.org/abs/1605.02026
  [9]: https://arxiv.org/abs/2011.08895
