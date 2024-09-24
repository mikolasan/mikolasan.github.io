---
title: ARC-AGI
date: 2024-08-21
published: 2024-08-21
lastModified: 2024-09-04
article: main
---

Deadline for the [kaggle competition](https://www.kaggle.com/competitions/arc-prize-2024/leaderboard) is November

## Path to AGI

What do researchers miss when they try to design a system that conforms to AGI principles? (besides the part where they focus on LLMs too much)

When I search for “multiple neural network systems”, it finds me articles about networks trained on different parameters. In other words, multiple networks as an ensemble of networks, functional copies that do the same calculations and at the end then there is some strategy for choosing the final answer.

In my mind I see multiple networks to work in conjunction. There is a work that seems close to my view:  **A theoretical framework for multiple neural network systems** by Mike Shields and Matthew Casey. Also [Model-Agnostic Meta-Learning](https://arxiv.org/pdf/1703.03400) (MAML) look like a multi network system

There is also a biologically plausible system based on Anokhin’s theory of functional systems. Anokhin’s theory of functional systems is about enclosing every component by its function. Every component can be thought as an RL agent (but not limited to, I saw another approach used in practice).

Components in the system would perceive the world perfectly and look like a conscious entity but no one can prove if it is really conscious or only imitating. This is a reference to David Chalmers’s thought experiment about zombies (p-zombies).
## The challenge

### Helpful links

- Someone's notes about ARC https://github.com/neoneye/arc-notes/tree/main/awesome
- DSL solution - https://github.com/michaelhodel/arc-dsl/blob/main/solvers.py
- Interesting [task vizualization](https://gist.github.com/p-i-/9ebed4917d5ea61674e536896fe0aa83#file-006-yaml) using colors from Unicode symbols.

### Tools

- Python cmd and plot visualization https://github.com/mxbi/arckit