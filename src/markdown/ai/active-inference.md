---
title: Active inference
date: 2024-09-04
published: 2024-09-04
lastModified: 2024-09-04
subtitle: in artificial neural networks
topic: true
---
Everyone is talking about active inference but no one implementing it. Right?

This is what makes me think that everyone is talking about it:

- [A book](https://putanumonit.com/2023/08/19/seth-explains-consciousness/ "https://putanumonit.com/2023/08/19/seth-explains-consciousness/")  - **Being You** by Anil Seth
- [ML street talk episode](https://m.youtube.com/watch?v=bk_xCikDUDQ) a book "**Active Inference**: The Free Energy Principle in Mind, Brain and Behavior" by Thomas Parr

## Theory

One thing is when one says that all our actions heavily use background inference (for more context I will send the reader to Anil Seth’s book), because that is how organisms quickly react (requiring no processing from scratch) or correct noise (where we would need to compare the two images) and more but I want to focus on _how_.

But it is definitely an another thing when one looks at standard pyramidal hierarchy of artificial neural networks and tries to figure out where is that inference. The closest architecture variation would be autoencoders. They have a shape of hourglasses: information from sensors passed through layers, features extracted, then these features used in a reverse process of recreating something similar to the input. But I don’t think it would work as inference.

### Articles

- [Canonical neural networks perform active inference](https://www.nature.com/articles/s42003-021-02994-2#Equ6)

## Ideas

[LSTM](/ai/long-short-term-memory) but it compares an input with a full pattern from memory