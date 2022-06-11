---
date: 2022-06-07
title: Intro to CycleGAN
draft: true
---

I'm following the tutorial from [TensorFlow documentation](https://www.tensorflow.org/tutorials/generative/cyclegan)

While this artcicle is in draft state I'm going to keep here only my questions along the way. Later I will compile a big story how to train your own model and so on.

## Newbie questions

### Jupyter notebook or Python interpreter?

Or filling a script line by line and executing it?

**Jupyter** http://jupyter.org/. 

- Start https://towardsdatascience.com/how-to-launch-jupyter-notebook-quickly-26e500ad4560
- Set dark theme https://stackoverflow.com/questions/46510192/change-the-theme-in-jupyter-notebook

```
pip install jupyterthemes  jt -l  jt -t theme-name
```

- Try it https://mybinder.org/v2/gh/ipython/ipython-in-depth/master?filepath=binder/Index.ipynb
- Also on repl.it (select Python)




### Keras vs PyTorch vs TensorFlow

Is there a difference? When you see implementation in all frameworks, which one to chose and why?

## Follow along

### How to check TensorFlow version

Just a reminder that there is a big difference between TensorFlow 1 and 2. They hate each other and many projects and tutorials still use version 1. I highly recommend do not try to upgrade projects from 1 to 2. Especially if you do not understand how the project works. Even their creators do not know how it works, so don't even try.

