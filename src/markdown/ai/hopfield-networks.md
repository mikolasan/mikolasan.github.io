---
date: 2022-08-17
title: Hopfield Networks
topic: true
published: 2022-08-22
lastModified: 2022-10-20
---


It probably started in [1982](https://www.pnas.org/doi/10.1073/pnas.79.8.2554). [Full crash course](http://www.scholarpedia.org/article/Hopfield_network) about Hopfiled networks.

### Train

```python
def naive_train(data):
    M, N = data.shape
    print("data shape", M, N)
    
    W = np.zeros((M, M))
    rho = np.sum([np.sum(t) for t in data]) / (N * M)
    for k in range(N):
        t = data[:, k] - rho
        W += np.outer(t, t)

    W /= N
    
    # Zeroing the diagonal
    np.fill_diagonal(W, 0)
    return W
```

### Predict

```python
# This function approximates the behavior of the MATLAB satlins function 
# (saturating linear transfer) using np.clip().
def satlins(x):
    return np.clip(x, 0, 1)

def predict(data, W):
    CY = []

    M, N = data.shape
    # Iterating over each column of t
    for k in range(N):
        u = data[:, k]
        while np.linalg.norm(satlins(W @ u) - u) > 0:
            u = satlins(W @ u)
        CY.append(u)

    CY = np.array(CY).T  # Convert list of arrays to 2D array
    return CY
```


Full notebook on [AI sandbox](https://github.com/mikolasan/ai_sandbox/blob/master/arc/hopfield.ipynb)

### More resources

- [An example](https://www.alexbod.com/hopfield-neural-network/) with rotation and C code
- [Nice little letters](https://github.com/ccd97/hello_nn/blob/master/Hopfield-Network/np_hnn_reconstruction.ipynb) and denoising that works!
- [My matlab code](https://gist.github.com/mikolasan/5f40cbea6db57bedc96c8bb6762c9ab0) which is absolutely unreadable (brrr)

## Modern Hopfield

And a recent article [Hopfield Networks is All You Need](https://arxiv.org/abs/2008.02217) saying that Hopfield networks just a generalization of Transformers.


## Biology behind it (?)

https://molecularbrain.biomedcentral.com/articles/10.1186/1756-6606-5-14

My dictionary:

- transcription factors SRF, c-fos, EGR-1, NF-kB
- binding of transcritption factors
- control region of a gene
- response elements
- increasing the transcription
- binding protein
- phosphorylated by PKA, MAPK, CaMK
- promoter
