---
title: ELI5 How to use PyTorch
date: 2022-09-21
published: 2022-10-03
lastModified: 2022-12-16
---

One morning I see in my timeline [this tweet](https://twitter.com/davidandrzej/status/1570969380284141570?s=12). It exlaims about transformer model abilities

> NN learns **how to learn** linear regression, decision trees, 2-layer ReLU nets 😲 furthermore: outperforms XGBoost, does Lasso in one-pass, seems not to rely on nearest-neighbor.

It refers to [this work](https://arxiv.org/abs/2208.01066). I look carefully through the article. The example looks simple, and I want to play with linear approximation and find its limitation. Good thing they published [model and training scripts](https://github.com/dtsip/in-context-learning).

At work we recently deployed POS (point of sale) software written in Python. Web server, DB connector, abstract classes, function decorators. It is great. Python is great. But when I read implementation of a ML algorithm from this paper I’m starting to hate Python.


## Prerequisites

To go through evaluation process you need to run [jupyter notebook](/science/everything-you-need-to-know-about-jupyter-notebook)

It will be handy if CUDA 11.3 is already installed. I wrote about it [earlier](/science/how-to-run-dalle-locally). Then [to install PyTorch](https://pytorch.org/get-started/locally/) you will need to run

```
pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu113
```

Also the following modules will be required:

- `transformers`
- `sklearn`
- `numpy` - vectors and matrices (`@` operator which is a short for `matmul`)
- `xgboost`
- `munch` - config reading
- `tqdm` - fancy progressbar for terminal


## Understand Models in PyTorch

The core of any neural network model (and apparently Transformer as well) is [Module](https://pytorch.org/docs/stable/generated/torch.nn.Module.html)

What can you say about it's trivial example?

```python
import torch.nn as nn
import torch.nn.functional as F

class Model(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 20, 5)
        self.conv2 = nn.Conv2d(20, 20, 5)

    def forward(self, x):
        x = F.relu(self.conv1(x))
        return F.relu(self.conv2(x))
```

Clearly it has something to do with [2D convolutions](https://pytorch.org/docs/stable/generated/torch.nn.Conv2d.html) that process 1 channel on the first layer and 20 channels on second. Channels? [Easy](https://medium.com/apache-mxnet/multi-channel-convolutions-explained-with-ms-excel-9bbf8eb77108) [peasy](https://towardsdatascience.com/a-comprehensive-introduction-to-different-types-of-convolutions-in-deep-learning-669281e58215). Kernel size is 5. Signal between layers simplified by rectified linear unit (ReLU).

Still nothing makes sense? Okay, let me tell this one more time. Given two dimensional data (in the case of stock price graph it's stock price VS closing time) we want to catch patterns and correlations and apply them in the future. This data is on the first layer. Then 

## Tensor operations

Extract specific elements from one tensor when another tensor works as a mask

```python
>>> import torch
>>> q = torch.tensor([[1,2,3],[4,5,6],[7,8,9],[10,11,12]])
>>> q
tensor([[ 1,  2,  3],
        [ 4,  5,  6],
        [ 7,  8,  9],
        [10, 11, 12]])
>>> a = torch.tensor([[0,1,0],[1,0,0],[0,0,1],[0,1,0]])
>>> a
tensor([[0, 1, 0],
        [1, 0, 0],
        [0, 0, 1],
        [0, 1, 0]])
>>> q.gather(1,a)
tensor([[ 1,  2,  1],
        [ 5,  4,  4],
        [ 7,  7,  8],
        [10, 11, 10]])
```

Now, if rows in vector `a` have $1$ in the place to indicate what index we need to use in tensor `q` (something like one-hot encoding) then

```python
>>> b = a.max(1).indices.view(4,1)
>>> b
tensor([[1],
        [0],
        [2],
        [1]])
>>> q.gather(1,b)
tensor([[ 2],
        [ 4],
        [ 9],
        [11]])
```

If we need to update rows with new values and remove old rows (that is similar to a `shift` operation on arrays but in this case regarding to a specific axis)

```python
>>> a = torch.tensor([[1,2],[3,4],[5,6]])
>>> a
tensor([[1, 2],
        [3, 4],
        [5, 6]])
>>> b = torch.roll(a,-1,0)
>>> b
tensor([[3, 4],
        [5, 6],
        [1, 2]])
>>> b[2,:] = torch.tensor([7,8])
>>> b
tensor([[3, 4],
        [5, 6],
        [7, 8]])
```

In case if a sequence of events stared in one array, and we have several sequences like this in one tensor, and we want to take sub intervals from these sequences and feed them in batches where these subintervals form 2D tensors

```python
>>> a = torch.tensor([[1,2,3,4],[5,6,7,8]])
>>> a
tensor([[1, 2, 3, 4],
        [5, 6, 7, 8]])
>>> a.view(2,2,2)
tensor([[[1, 2],
         [3, 4]],

        [[5, 6],
         [7, 8]]])
>>> a.view(2,2,2).permute(1,0,2)
tensor([[[1, 2],
         [5, 6]],

        [[3, 4],
         [7, 8]]])
```

Two vectors make a matrix

```python
# ( 1 ) * (1 0) = [ 1 0
#   0               0 0 ]
>>> a = torch.tensor([1,0]).unsqueeze(1)
>>> torch.mm(a, a.T)
tensor([[1, 0],
        [0, 0]])
```

When for any reason one column (or row) must be copied several times to create a matrix that can be then processed in one go then keep in mind that these are the same

```python
>>> torch.stack([torch.tensor([1,2,3]) for i in range(2)])
tensor([[1, 2, 3],
        [1, 2, 3]])
>>> torch.tensor([1,2,3]).unsqueeze(0).repeat(2,1)
tensor([[1, 2, 3],
        [1, 2, 3]])
```

The same as these basics

```python
>>> [2 for i in range(5)]
[2, 2, 2, 2, 2]
>>> [2]*5
[2, 2, 2, 2, 2]
```

What is a difference between (vector * matrix) and (matrix * \[vector\]T)?

In the case of (vector * matrix), vector is a row and its size must match with the amount of rows in the matrix. The resulting size will be the same as the matrix.

In the case of (matrix * \[vector\]T), vector is a column and its size must match with the amount of columns in the matrix. The resulting size will be the same as the matrix.