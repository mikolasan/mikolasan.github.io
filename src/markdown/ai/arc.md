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

Data is [here](https://github.com/fchollet/ARC-AGI).

For a neural network, when inference improvements are finished on one image, you verify it on other images. Or most likely next training samples will be used for formulating the transformation properly. For the ARC challenge there should be a network that can recognize a space of one color surrounded by a line or other shape of another color. Network of 5 neurons should be sufficient. It would be similar to RNN, it starts from one point, follows the edge until it finds if it breaks or connect with the starting point. There should be an external network that waits an answer. But how do we make a question? (Another side question: Why such network would exist?)

I think the question should appear after comparing input and output and trying to transform them pixel by pixel, where every step or a group of steps describe specific transformation. All steps in transformation we will call _a question about the current task_. Then this _question_ will find or create networks for transformation and they will be applied to the test data.

The network will be applying transformations if it understand them. There will be a unique network for every transformation. They will be like heads in multi-head attention: input goes to all networks then they apply transformation and produce some output. Then we compare networks' output to the expected output and mark the best transformation network for further fine tuning.

## Search space

From that video, [ML street talk about applying LLMs for solving ARC challenge], I have another thought against matrices. The host said that ARC challenge forces researchers to search for a solution in a big space. 2D grid and 9 colors - it may not sound like much, but it probably harder than chess with brute-force approach, but from a human perspective it is simple if one understands geometry, transformation and other notions. Which requires big matrices and this implies demanding memory requirements already on this toy stage.

Then forget about matrices, don’t measure space size as one plane with all parameters on one level. It’s possible that separate networks can calculate portions of the solution. It’s like writing Domain Specific Language (DSL) when you know about specific operations you need to handle for this task. 


### Helpful links

- Someone's notes about ARC https://github.com/neoneye/arc-notes/tree/main/awesome
- DSL solution - https://github.com/michaelhodel/arc-dsl/blob/main/solvers.py
- Interesting [task vizualization](https://gist.github.com/p-i-/9ebed4917d5ea61674e536896fe0aa83#file-006-yaml) using colors from Unicode symbols.
- Tech talk about the challenge https://bdtechtalks.com/2020/02/19/kaggle-arc-challenge-francois-chollet/
- https://arxiv.org/pdf/2208.02957.pdf - what if GPT-3 is not that stupid as you think (Discussion: https://twitter.com/spiantado/status/1556641543959695361)

### Tools

- Python cmd and plot visualization https://github.com/mxbi/arckit
- ARC editor https://arc-editor.lab42.global/

## Papers/results

- https://github.com/zoenguyenramirez/arc-prize-2024/
- https://www.paulfletcherhill.com/mini-arc.pdf

