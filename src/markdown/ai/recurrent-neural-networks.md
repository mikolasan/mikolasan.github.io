---
section: brain
title: Recurrent Neural Networks
topic: true
published: 2023-01-19
lastModified: 2023-04-29
---

ANN should have notion of time. RNN can do it


## Event sequence prediction

How to encode time in ANN? With the help of another ANN that will nonlinearly transform idle delay time into encoded input. Almost like one-hot encoding, but they call it _soft_.

- [Recurrent Neural Networks cheatsheet](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks) by Afshine Amidi and Shervine Amidi
- [How-to encode time property in recurrent neural networks](https://towardsdatascience.com/how-to-encode-time-property-in-recurrent-neutral-networks-friday-experiment-c14c39ba9755) ([code](https://github.com/crazyleg/time-dependant-rnn-embeddings-keras), [article](https://arxiv.org/pdf/1708.00065.pdf))


## Exercise

How to represent time in hidden neurons. Let’s assume that we have neurons “second”, “minute”, “hour”, “day”. How to start counting in ANN? How to write a calculator with ANN?
