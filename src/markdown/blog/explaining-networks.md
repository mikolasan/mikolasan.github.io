---
date: 2023-10-07
title: Explaining networks
published: 2023-10-07
lastModified: 2023-10-07
---

> The fact that most individual neurons are uninterpretable presents a serious roadblock to a mechanistic understanding of language models. We demonstrate a method for decomposing groups of neurons into interpretable features with the potential to move past that roadblock.
>
> [Anthropic AI](https://twitter.com/AnthropicAI/status/1709986949711200722)

[Cyberwizard](https://twitter.com/cwizprod1) is saying:

> there's something there, something is happening, and it's happening inside a computer. everything that a computer does can be logged. so log what each neuron is doing, while it's doing it - maybe you can interpret what it's doing then.

It takes a word, converts it to numbers, puts that into an array, multiplies it with a matrix, takes one row, and after converting it back to character symbols, that’s a new word for output. It’s doing something, but why?

> log what it's doing - then look at everything it's doing and follow the math yourself. if I do this x=1 y=? and then I do a bunch of math to wind up with y=2, if you look at every step I took, you'll know why I did that

Let’s say for every forward pass in the network we would trace transformation for every input. As some might argue, this will be a waste of computational resources, but we only assume theoretical possibilities here. Let’s consider just one input, a word. Then we have traces for every letter. It could be a vector of intermediate values, but that will be very cryptic. We rather need to answer why. Why are these values and not different ones? Then we add more information, because we know what formula gave us all the numbers. Then, having a formula and values, can we answer why? As a consequence of the answer, can we change something in the formula to control the outcome?