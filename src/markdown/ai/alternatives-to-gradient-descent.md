---
date: 2022-11-13
title: Alternatives to gradient descent
---

## Improvements

First let's review improvements for Gradient Descent. They are still GD by its nature.

7. Momentum gradient descent (MGD)
8. Nesterov accelerated gradient descent (NAG)
9. Adaptive gradient (Adagrad)
10. Root-mean-square gradient propagation (RMSprop)
11. Adaptive moment estimation (Adam)


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
9. [**Alternating Descent Method of Multipliers**][8] (ADMM)
10. [**Zeroth-Order Relaxed Backpropagation**][9] (ZORB)

As mentioned above, *Simulated Annealing, Particle Swarm Optimisation and Genetic Algorithms* are good global optimisation algorithms that navigate well through huge search spaces and unlike *Gradient Descent* do not need any information about the gradient and could be successfully used with black-box objective functions and problems that require running simulations.


  [1]: https://en.wikipedia.org/wiki/Pattern_search_(optimization)
  [2]: https://en.wikipedia.org/wiki/Genetic_algorithm
  [3]: https://en.wikipedia.org/wiki/Particle_swarm_optimization
  [4]: https://www.mathworks.com/help/gads/surrogate-optimization-algorithm.html
  [5]: https://en.wikipedia.org/wiki/Multi-objective_optimization
  [6]: https://en.wikipedia.org/wiki/Simulated_annealing
  [7]: https://arxiv.org/abs/1412.7525#
  [8]: https://arxiv.org/abs/1605.02026
  [9]: https://arxiv.org/abs/2011.08895

Source: https://stats.stackexchange.com/questions/97014/what-are-alternatives-of-gradient-descent https://arxiv.org/pdf/2202.02248.pdf

Also: https://stackoverflow.com/questions/23554606/what-are-alternatives-of-gradient-descent


## Extreme Learning

- [official](https://web.njit.edu/~usman/courses/cs675_fall20/ELM-NC-2006.pdf) (?) 
- [matrix notation](https://pdfs.semanticscholar.org/13be/dd5a3299a115ecc425eff6e7853741c81816.pdf)
- [lame explanation](https://erdem.pl/2020/05/introduction-to-extreme-learning-machines)
- [python code](https://github.com/burnpiro/elm-pure/blob/master/model.py)
- [wiki](https://en.wikipedia.org/wiki/Extreme_learning_machine)
- [paper](https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=7140733)