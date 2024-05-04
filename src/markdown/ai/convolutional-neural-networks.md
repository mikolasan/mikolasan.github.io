---
topic: true
title: Convolutional Neural Networks
date: 2023-05-13
published: 2023-05-13
lastModified: 2023-05-13
---

A long time ago, I was thinking about systems that perceive only video input. But the more I read about image processing, the more I get a notion that sole video is not enough.

The system must be able to change its view position according to its internal directive. It also must move in the world and have sensor feedback about its movements. This will add so much more context that no manual object segmentation will be required.

For more information on why more sensor data help to understand the world better, refer to [Embodied Cognition](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4405253/).

However, if you want to focus on a visual processing system, then I would recommend looking at [YOLO v4](https://github.com/AlexeyAB/darknet).

It’s written in C. This model made a breakthrough in real-time object detection in 2012.

Do you know what I like about this model? It's easily compiled on Windows, and highly optimized for different GPUs. But I like it because it implements many biological principles one can find in Hubel’s book [“Eye, Brain, and Vision”](https://clinic.medlink.org/wp-content/uploads/2019/09/Eye_Brain_and_Vision.pdf).

## Main questions

### Halftone images

Human eyes not exactly percieve the world as a matrix of RGB pixels. There are several types of [retinal ganglion cells](https://en.wikipedia.org/wiki/Retinal_ganglion_cell). What if we convert images using [halftone](https://en.wikipedia.org/wiki/Halftone) technique ([python 1](https://github.com/GravO8/halftone), [python 2](https://github.com/philgyford/python-halftone), [c opencv](https://stackoverflow.com/questions/1487517/fastest-dithering-halftoning-library-in-c)). Also: [Rod and Cone Connections With Bipolar Cells in the Rabbit Retina](https://www.frontiersin.org/articles/10.3389/fncel.2021.662329/full)

### How does a convolution kernel get trained?

2D convolution is [a matrix-matrix multiplication](https://stackoverflow.com/questions/16798888/2-d-convolution-as-a-matrix-matrix-multiplication). See [here](https://ai.stackexchange.com/questions/11172/how-can-the-convolution-operation-be-implemented-as-a-matrix-multiplication) with pictures and formulas.


## Papers

A good list compiled in [this post](https://towardsdatascience.com/a-comprehensive-introduction-to-different-types-of-convolutions-in-deep-learning-669281e58215) on Towards Science

- Network in Network [Link](https://arxiv.org/abs/1312.4400)
- A guide to convolution arithmetic for deep learning [Link](https://arxiv.org/abs/1603.07285)
- Deconvolution and Checkerboard Artifacts [Link](https://distill.pub/2016/deconv-checkerboard/)
- Multi-Scale Context Aggregation by Dilated Convolutions [Link](https://arxiv.org/abs/1511.07122)
- ResNeXt: Aggregated Residual Transformations for Deep Neural Networks [Link](https://arxiv.org/abs/1611.05431)
- Going deeper with convolutions [Link](https://arxiv.org/abs/1409.4842)
- Flattened convolutional neural networks for feedforward acceleration [Link](https://arxiv.org/abs/1412.5474)
- Semantic Image Segmentation with Deep Convolutional Nets and Fully Connected CRFs [Link](https://arxiv.org/abs/1412.7062)
- Xception: Deep Learning with Depthwise Separable Convolutions [Link](https://arxiv.org/abs/1610.02357)
- Rethinking the Inception Architecture for Computer Vision [Link](https://arxiv.org/pdf/1512.00567v3.pdf)
- MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications [Link](https://arxiv.org/abs/1704.04861)
- ShuffleNet: An Extremely Efficient Convolutional Neural Network for Mobile Devices [Link](https://arxiv.org/abs/1707.01083)

### Blogs

- [Convolutional Neural Networks backpropagation: from intuition to derivation](https://grzegorzgwardys.wordpress.com/2016/04/22/8/) by grzegorz gwardys
- [Backpropagation In Convolutional Neural Networks](https://www.jefkine.com/general/2016/09/05/backpropagation-in-convolutional-neural-networks/) by Jefkine