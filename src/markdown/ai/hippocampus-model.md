---
title: Modelling of Hippocampus
date: 2024-10-01
published: 2024-10-14
lastModified: 2024-10-14
article: main
example: about consuming many foreign language words
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

## Notebooks

- [SOM](https://codeberg.org/mikolasan/ai-sandbox/src/branch/master/arc/kohonen.ipynb)
- [Hippocampus](https://codeberg.org/mikolasan/ai-sandbox/src/branch/master/arc/Hippocampus.ipynb)
## Training

I don’t like how training works right now. It applies the whole matrix, and it does that constantly. And initial random weights can be negative and positive.

I think they all should be positive only and have little values in the beginning. 

And every neuron will have a big threshold. During training this threshold can be lowered and values increased.

For example, you’re listening speech in another language and maybe you’ll learn some words and you can recognize them, but other words you cannot recognize, and they will go to some empty new category. For every new word. And if you were listening for a speech (or reading long text) with many words, then possibly big amount of new words would create many new categories. So many that, of course, it will explode.

But this would happen in the hippocampus, which means in a short term memory these categories can be overwritten. So some words will be erased, but if you repeat the words again then you will build categories that will go to a long-term memory. There they will be stored properly.