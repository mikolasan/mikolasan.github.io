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