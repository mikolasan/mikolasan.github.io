---
title: Modelling of Hippocampus
date: 2024-10-01
published: 2024-10-14
lastModified: 2024-10-14
article: main
---



Ref: [Modeling of Hippocampus Together with Neocortex for Few-Shot Learning](https://www.youtube.com/watch?v=EC6e8y4_nBs) by Gideon Kowadlo from Cerenaut.ai

## DG

I have a layer that transforms an input into a sparse tensor. 

```python
class DGModel(nn.Module):
    """
    Goal: separation
    Methods: sparsity
    """
    
    def __init__(self, input_size, output_size):
        super(DGModel, self).__init__()
        self.fc1 = nn.Linear(input_size, output_size)
        nn.init.xavier_uniform_(self.fc1.weight)
        
    def forward(self, x):
        with torch.no_grad():
            x = self.fc1(x)
            x = torch.tanh(x)
        return x
```

But the result of this network is very noisy tensor with many cells active at the same time. How to keep the sparsity effect which means that even a small difference in input creates a different output but also it has very little of active cells. Maybe the same amount of active cells as in the input.

## Memory

Memory is done with a [Hopfield network](/ai/hopfield-networks)
