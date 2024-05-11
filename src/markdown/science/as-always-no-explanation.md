---
title: As always - no explanation
date: 2023-06-04
published: 2023-06-04
lastModified: 2024-05-10
---
You can find this in many scientific papers, common phrases indicating that the proper explanation is skipped, here sorted in the growing order of complexity:

- Rather trivial
- Then clearly
- Simple (small) algebraic transformation
- Tedious exercise leave up to the reader

## Positional encoding

From: Attention is all you need [this reprint with comments](https://nlp.seas.harvard.edu/2018/04/03/attention.html)

$$
PE_{pos, 2i} = sin(pos / 10000^{2i/d_{model}}) \\
PE_{pos, 2i+1} = cos(pos / 10000^{2i/d_{model}})
$$

where pos is the position and i is the dimension. That is, each dimension of the positional encoding corresponds to a sinusoid.
The wavelengths form a geometric progression from $2\pi$ to $10000 \cdot 2\pi$.
We chose this function because we hypothesized it would allow the model to easily learn to attend by relative positions, since for any fixed offset $k$, $PE_{pos+k}$ can be represented as a linear function of $PE_{pos}$.
We chose the sinusoidal version because it may allow the model to extrapolate to sequence lengths longer than the ones encountered during training.


[Jupyter notebook](https://github.com/jalammar/jalammar.github.io/blob/master/notebookes/transformer/transformer_positional_encoding_graph.ipynb) to illustrate it


### What?

Maybe it's just me but I don't understand how sin/cos functions can save positional relations. I can understand convolutional operations how they transform data based on their positions. 

Why $sin$ for even indices and $cos$ for odd ones?

### Explanation