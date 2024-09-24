---
title: Understanding invariants in ANN
date: 2024-09-23
published: 2024-09-23
lastModified: 2024-09-23
article: quest
---
What are invariants in ANN? If some features extracted from the input data stay unchanged under some types of transformation like rotation, translation, scaling or other, then such features are invariant. This allows, for example, to recognize the same object from different angles. For models like YOLO (and other CNN networks) the training data is prepared in a special way (data augmentation) when transformations like scaling, rotation, adding different backgrounds applied to the original images. Also this way more training data will be available which is usually better for deep neural networks.

We are going to review here such mathematical method as the Fourier Transform. It decomposes a signal into its frequency components. 


The Discrete Fourier Transform (DFT) is computed as:
$$
F(k) = \sum_{n=0}^{N-1} f(n) e^{-2\pi i kn / N}
$$
where 
- $N$ is the total number of samples,
- $f(n)$ is the $n$-th sample, and
- $k$ is the frequency bin index.

The magnitude spectrum of the Fourier Transform can help us to extract invariants because the translation of a signal in the spatial domain only affects the **phase** of its Fourier Transform, not the magnitude. Thus, if two signals are identical except for a translation, their magnitude spectra will be the same.

Let's work through an example to illustrate how this works. It will be a 2D example where we apply the DFT on an 8x8 matrix of integers in the $[0, 10]$ interval. Let's consider horizontal lines: one line at the top of 8x8 matrix and horizontal line at the bottom of that matrix, what magnitude spectrums are they going to have?

