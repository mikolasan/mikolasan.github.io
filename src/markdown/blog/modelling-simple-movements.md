---
date: 2023-04-29
title: Modelling simple movements 
published: 2023-04-29
lastModified: 2023-05-11
twitter: https://twitter.com/mikolasan/status/1651481568555433984
quality: good
---

I was trying to understand the "inverse-dynamics model" block in the paper by Mitsuo Kawato. And I refreshed in my memory all physics from the university like Lagrange equations, Newton/Euler formulas; I made the wheel to roll and stop because of negative acceleration.

And I learned a weird thing about wheels - its upper part moves twice faster than the bottom one. This is the thing that I didn’t know until I was in my 30s.

What I’m trying to do is I want to train an ANN to predict what torque should be applied to motors when coordinates of the final position are known.

I’ve read about similar systems but for robot arms where the movement is performed in one step. I think that I better work with time series, that's why I have to use RNNs or Transformers.


## From goal to simple blocks

I sit on a chair and I have a notebook on my lap. If I want to stand up and get a cup of tea, then how to organize the sequence of actions that can be written as algorithm?

I know where the kettle is, I need to stand up first, I will put the laptop aside first. I can walk with the laptop, but then both my hands will be busy and I need to put it first, but then I will need to carry it back. Then why not to leave it where I sit.

It seams obvious when you do it every day. You can transfer this behavior from a similar situation. For example, when you were lying on a sofa with a book and decided to get orange juice from the fridge. From that task you maybe already learned that you should leave the book first.

Main takeaways:

- do not carry extra items with you if you are not gonna use them
- if you somehow sit in the chair, then you can reverse your actions
- you have to walk

Let’s try to explain this task with a language that is limited to 30 words (referring to a character from The Twelve Chairs by Ilf and Petrov)

tea = far = walk

walk = stand + walk

walk = step forward or turn left or turn right and repeat

tea = check water, add water, tun on the kettle, wait, get a cup, make tea, pour boiling water

“far”. But we know where it is because it’s in our sight or we have been there already. Which means the way to our current location we already walked, then we can reverse it back. Sometimes in new environment like some airbnb place we must use memory a lot. But first we need to follow directions. 

What is the minimum block of movement? One step? Short rotation of one motor?

In more complex robots with multiple degrees of freedom, the minimum block of movement could be a combination of movements from multiple motors or joints.

When we combine these blocks together in time series what is high hierarchy block? Different patterns like turn left by moving left motors in reverse and right motors forward. In case of slippage, in some off-road test for example, we need to move only one motor. One motor is a simple block, but its actuation in this example is a high order decision related to the specific situation of slippage. In other words we can formulate that for this situation it is important to keep other three motors static.

Originally I was looking into MDP, the model that will make decisions. 

When you feel tired you feel that every body part become heavy and you lie down. Biologically everything is defined and you know what to do. You can put your face on a hand because it’s softer than a table. Or use your arm as a stand because you want to keep your head at some level fighting with fatigue.

Which means your brain sends very specific task and a vision how it should be done, you just need to execute it.


## Architecture

There will be no labeled input data, thus autoencoders will be a good choice. However, the network input will be directions or final goals like "go find mushrooms" or "find pine tree in the south" and the output will be sequences of values representing torque applied to motors of wheeled robot.

Using physics-based equations, such as Lagrange, Euler, or Newton equations, to model the robot's dynamics and kinematics, and using this model to generate the torque commands.

**I need to create a universal model that will not require creating new inverse kinematics algorithm if robot's structure is changed.** I know that it's not possible to approximate the equations with neural networks. Equation system can be solved with neural networks? Indeed, there are several techniques that can be used to solve equation systems with neural networks, such as physics-informed neural networks (PINN) and differential equation neural networks (DENN).

[This code](https://github.com/maziarraissi/PINNs/blob/master/main/discrete_time_identification%20(KdV)/KdV.py) is very beautiful

One weakness of the Hamiltonian approach is that it assumes knowledge of the canonical coordinates q, p. In general our observed data from a dynamical system may not match up against this canonical structure. An alternative is to instead parameterise the Lagrangian.

Take simple perceptron and train it with the first derivative, but it learns the original function. [Basics of NN for ODE](https://colab.research.google.com/drive/12ztGwxR1TK8Ka6H3bOsSt57kB71ieQ-W?usp=sharing).
Then we take a Hamiltonian and approximate it. [here](https://greydanus.github.io/2019/05/15/hamiltonian-nns/)
Hamiltonian is from [this paper](https://arxiv.org/abs/1909.12077) ([code](https://github.com/Physics-aware-AI/Symplectic-ODENet)) 


- Look for [solution of double pendulum problem](https://arxiv.org/abs/2009.09457)
- [Big review](https://arxiv.org/abs/2202.02435) of Neural Differential Equations
- Lagrangian Deep Networks https://openreview.net/forum?id=BklHpjCqKm