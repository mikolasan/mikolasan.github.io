---
title: Simple Reinforcement Learning
date: 2024-08-05
published: 2024-08-05
lastModified: 2024-08-05
subtitle: Looking for mistakes in Snake environment
---

## State representation

Make sure that graphical representation matches with internal data which usually means values in tensors. If it's a 2D world then check that axis are not swapped.
This is where I found that an agent advances after the game is over

## Model

Verify that the network is learning. After every training step the outcome should be slightly (or not slightly) different. Training process is not always goes the same way but networks itself are deterministic and forward output is always predictable.
With model freeze and deepcopy gradient can be broken in PyTorch. Check that `print(list(self.model.parameters())[0].grad)` is not `None`.

## Replay buffer

Should the final reward be included?

## Batches

PyTorch allows to feed batched input to the model but you need to be careful what axis you use for stacking matrices. As I understand it must be the first one. Use [`torch.stack`](https://pytorch.org/docs/stable/generated/torch.stack.html) for that. I've seen [`torch.cat`](https://pytorch.org/docs/stable/generated/torch.cat.html#torch.cat) used instead but I assume that your original data then must be of another configuration. 2D arrays must be flattened before processed through the Linear module.
Your model size doesn't need to be enlarged by batch size.

## Problem of popular courses 
As I know the entry course from the books, it’s a dead end. There are several problems. First, it’s the state from where you take action. It only includes one cell where you are standing. I added one cell around and it exponentially increased complexity of the following training by gradient descent. Which means deep q learning is not a magical solution. 
So instead of 1^4 it’s (1+4)^4.
Second thing is memory. It’s applied for Atari games, but it’s really important. Also anticipation. Using past observations and pattern extraction, the agent will be predicting probabilities of actions step ahead. So, a course of previous and future actions is always in processing.
But how more steps can be the in transition matrix without blowing up the size?
And emotions. Once it learns that a hole is leading to a negative reward it can say that about any new observation where the hole is present (especially for moving into that direction)

## Continuous variables in state space

Discrete MDP and model minimization ( Dean Givan)

And one approach would be to find similar situations and treat them as one. Where values sort of going through discretization process but not based on ready set intervals but more like grouped by results.

Also here we can try to apply the most powerful technique that you can find in any field reappearing over and over. It’s adding hierarchy. It folds so many possibilities in a little space and saves many outcomes and situations behind little triggers.
So every state is a combination of such hierarchical states in their first hierarchy level. But next level doesn’t change the original state though it has its own transition matrix that has an effect on the action.

## Next

Then you realize that one reward function is not enough. You define several and set priority rules between them. It will work as conditions to prefer one goal over another. 

Find an article about a beaver escaping from prison 

To test network correctness we need simpler environments. First, check that rewards work. There are two actions, red and blue, one is positive and another is negative. As a result only blue option (positive reward) must be chosen.
Next, three or more options and different reward values, like a range in a scale. Check distribution of choosing every option.
Then walking. State is specific here /<need to think/>

I believe a simple neural network cannot learn the notion of distance from a set of inputs representing absolute positions and reward values awarded when the distance becomes zero.

I already was reviewing this question. I don’t remember for sure, maybe I have read it, but humans can only approximate distances that they observe. Or maybe that was about time? Anyway, one can measure and feel with one’s body but vision is not giving the answer. And if we look at the snake game as an observer (like if we are not the snake, and her head is not our point of view) then there is no way we can precisely calculate where the apple is.
So then we just notice relative positions, relations between objects.
https://mastodon.social/@mikolasan/112794749604350118
https://arxiv.org/abs/2407.06723
“Humans describe complex scenes with compositionality, using simple text descriptions enriched with links and relationships. […] this is not reflected yet in existing datasets which, for the most part, still use plain text to describe images. In this work, we propose a new annotation strategy, graph-based captioning that describes an image using a labelled graph structure”
But that description is obtained by open source lava model. Though encoding positions as words is interesting. 

## Negative events

While playing with the snake environment, I noticed that negative outcomes don’t really teach an agent to avoid actions or previous actions leading to such results. And more often it learns something but not in a way rewards were assigned. For example if on every step when the snake is not hitting a wall the total reward goes up  (we reward longer episodes without hitting a wall) then spinning in circles on one place will accumulate enough to exceed one big negative reward of hitting the wall. And if we give a small negative reward on every step to stimulate the agent to pick up fruits with higher reward more often then the agent can find out that hitting the wall on early stages is more optimal than searching for apples.

## Parents

One agent can learn from actions of another. That reward comes in a multitude of regular training and exploration 

## Vityaev

What if instead of long tables of data where the amount of columns exponentially increases exhaustive search instead the rules will be obtained and their probabilities improved by feeding data line by line.
Also RF usually operates on matrices and Markov processes but what about “rules” - bayeasian causality with probabilities 

