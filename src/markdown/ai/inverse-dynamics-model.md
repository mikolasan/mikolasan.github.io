---
section: brain
title: Inverse Dynamics Model
article: main
published: 2023-03-20
lastModified: 2023-03-20
---

I was trying to understand the "inverse-dynamics model" block in the paper by [Mitsuo Kawato](https://www.researchgate.net/profile/Mitsuo-Kawato/publication/19486290_A_hierarchical_neural-network_model_for_control_and_learning_of_voluntary_movement/links/567487f208ae0ad265ba7ab0/A-hierarchical-neural-network-model-for-control-and-learning-of-voluntary-movement.pdf). First, I thought that somehow he's applying sequential input to simple ANN. Besides, it has a feedback signal. This internal feedback loop replaces long-loop feedback that's usually used in reinforcement learning.


## Theory

- Rotation of an Object About a Fixed Axis [Chapter 1](https://www2.tntech.edu/leap/murdock/books/v2chap1.pdf)
- Rolling Motion; Angular Momentum [Chapter 2](https://www2.tntech.edu/leap/murdock/books/v2chap2.pdf)
- Rolling motion [formulas](https://courses.lumenlearning.com/suny-osuniversityphysics/chapter/11-1-rolling-motion/) [slides](https://slideplayer.com/slide/10409305/)
- Angular momentum for Earth https://web.mit.edu/8.01t/www/materials/Presentations/SelectPresentation_W11D1.pdf
- Rolling friction https://www.physicsforums.com/threads/coefficient-of-rolling-friction-for-a-lab-cart.1010113/
- Planar system of four links solved with Newton-Euler method in [Multi-body dynamics](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1693250/pdf/14561340.pdf)
- MIT, [Introduction to Robotics, Chapter 7](https://ocw.mit.edu/courses/2-12-introduction-to-robotics-fall-2005/c7caaa2376b8ec01e270328a3b80b029_chapter7.pdf)
- Purdue University, [Chapter 5](https://www.purdue.edu/freeform/me274/wp-content/uploads/sites/15/2020/04/Lecture_27_Filled.pdf)
- Inverse kinematics https://scaron.info/robotics/inverse-kinematics.html
- [Lagrange's equation of motion](https://phys.libretexts.org/Bookshelves/Classical_Mechanics/Classical_Mechanics_(Tatum)/13%3A_Lagrangian_Mechanics/13.04%3A_The_Lagrangian_Equations_of_Motion)
- Sensor-Based Intelligent Navigation and Control of Autonomous Mobile Robots for Advanced Terrain Missions [paper](https://www.researchgate.net/publication/268394926_Sensor-Based_Intelligent_Navigation_and_Control_of_Autonomous_Mobile_Robots_for_Advanced_Terrain_Missions)

### 4 wheel robot

- **[A skid-steering wheeled robot](https://www.mdpi.com/1424-8220/15/5/9681)** - analysis and experimental kinematics 
- [Unified framework](https://hal.science/hal-00578090/document) A lot of heavy formulas. Not good for the beginner. Maybe will return later
- [Mecnum wheels](https://www.researchgate.net/publication/269757704_An_approach_to_the_kinematics_and_dynamics_of_a_four-wheeled_mecanum_vehicles)


## Examples

- Autonomous ground vehicle (i.e., wheeled mobile robot) [simulation examples in Python](https://github.com/botprof/agv-examples)

![Ackermann kinematic](./ackermann_kinematic.gif)



## See also

- Inverse dynamics learning with PEST (internal parameter estimation), model based DBM ([Dynamic Bezier Map](https://www.researchgate.net/publication/261353871_Learning_robot_dynamics_with_Kinematic_Bezier_Maps)) and feed forward neural network (input: angle, angular velocity and acceleration; output: torque; separate network for every joint)
\[[1](https://am.is.mpg.de/uploads_file/attachment/attachment/302/paper.pdf)]
\[[2](https://h2t.anthropomatik.kit.edu/pdf/Hitzler2019.pdf)].
- OMG this [web site](https://scaron.info/robotics/inverse-kinematics.html)
- Kalman filters