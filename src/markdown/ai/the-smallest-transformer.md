---
title: The smallest Transformer
date: 2023-06-03
published: 2023-06-03
lastModified: 2023-06-03
---

Based on [this tutorial](https://www.tensorflow.org/text/tutorials/transformer)

I am trying to understand the difference in training data between sequence2sequence and bidirectional Transformers (like [BERT](https://arxiv.org/pdf/1810.04805.pdf), [code](https://github.com/tensorflow/models/blob/master/official/legacy/bert/bert_models.py))

## Reference 

- [Original Transformer](https://nlp.seas.harvard.edu/2018/04/03/attention.html) with code
- [Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- The Annotated Transformer [version 1](https://nlp.seas.harvard.edu/2018/04/03/attention.html) [version 2](https://nlp.seas.harvard.edu/annotated-transformer/) (PyTorch)
- [Embedding](https://medium.com/deeper-learning/glossary-of-deep-learning-word-embedding-f90c3cec34ca) is just a way of converting sentences into vectors.
- 


## Homework

- What is a usual window size for attention in current models? See [here](https://stats.stackexchange.com/questions/411736/why-do-attention-models-need-to-choose-a-maximum-sentence-length/411919#411919) why it's theoretically infinite
- How Transformers solve problem with [overfitting usually caused by softmax](https://smerity.com/articles/2017/mixture_of_softmaxes.html)?

> The softmax allows you to produce a probability distribution over a set of classes