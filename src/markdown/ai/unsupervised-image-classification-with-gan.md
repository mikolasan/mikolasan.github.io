---
article: quest
title: Unsupervised image classification
subtitle: with GAN
date: 2023-07-29
published: 2023-07-29
lastModified: 2023-07-29
---

After [playing with CycleGAN](/science/cycle-gan-intro), I [started wondering](/devlog/14) if [Generative Adversarial Networks](/ai/generative-adversarial-networks) (GANs) could be trained without labels on small datasets in a way that their discriminator part would work as a classifier.

## Self-supervised learning

I found one [notebook](https://github.com/sthalles/blog-resources/blob/master/semi-supervised/semi-supervised_learning.ipynb) that at least has a classifier.
It uses TensorFlow 1, but I would prefer PyTorch. 
Anyway, we should start with [DCGAN tutorial](https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html)

### Generator

Starting from a vector, that theoretically contains all features in the image, the flow goes trough several convolutional layers and at the end produces an image. The last layer is finalised with a $tanh$ function which maps the output into $[-1, 1]$ interval (they say, important for stability).

This component is also called **decoder**.

```
Generator(
  (main): Sequential(
    (0): ConvTranspose2d(100, 512, kernel_size=(4, 4), stride=(1, 1), bias=False)
    (1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (2): ReLU(inplace=True)
    (3): ConvTranspose2d(512, 256, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
    (4): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (5): ReLU(inplace=True)
    (6): ConvTranspose2d(256, 128, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
    (7): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (8): ReLU(inplace=True)
    (9): ConvTranspose2d(128, 64, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
    (10): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (11): ReLU(inplace=True)
    (12): ConvTranspose2d(64, 3, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
    (13): Tanh()
  )
)
```

### Decoder in psychological tests

So about the decoder system and how it compares its results with the expected images. 
I remembered one psychological test when a person is asked to draw a human figure. I think I was seven when they tested me before school. I guess the idea is how many details one would put into that figure. Will it be a stick person or more cartoon like character or something else?

Mine wasn’t sophisticated. I drew pants and big shoes. Shoes were facing left and right, I never really grasped how the perspective works with shoes even years later. I don’t remember much about the face. Not sure if it had a hat. Most likely no hat, and only a few single short hairs sticking into the air. 

This test is about how we perceive the world, right? It reveals our model of the world through drawing, as we try to reconstruct concepts. Considering Piaget’s stages of development (that say that we need to experience more information to jump to the “next cognitive level”), I can formulate my question: is it possible to teach kids draw realistic pictures? Or it’s not possible because their concepts are still simple?

### Discriminator

Takes an image and classifies it as a real or fake. Technically this is an **encoder**.

```
Discriminator(
  (main): Sequential(
    (0): Conv2d(3, 64, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
    (1): LeakyReLU(negative_slope=0.2, inplace=True)
    (2): Conv2d(64, 128, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
    (3): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (4): LeakyReLU(negative_slope=0.2, inplace=True)
    (5): Conv2d(128, 256, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
    (6): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (7): LeakyReLU(negative_slope=0.2, inplace=True)
    (8): Conv2d(256, 512, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
    (9): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
    (10): LeakyReLU(negative_slope=0.2, inplace=True)
    (11): Conv2d(512, 1, kernel_size=(4, 4), stride=(1, 1), bias=False)
    (12): Sigmoid()
  )
)
```

### Train

Okay, open [your favorite terminal](/blog/alacritty-everywhere) and create a special Python environment (believe me, this is how you would want to work with Python ML libraries)

```bash
conda create -n diffusers python=3.10
conda activate diffusers
pip install matplotlib Pillow datasets diffusers
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install notebook
jupyter notebook
```

At this point we assume that the dataset is ready (how to prepare will be discussed later in a corresponding chapter). Let's load it and configure the model

```python
dataset = load_dataset("parquet", data_files='dataset-resized-64.parquet', split="train")
dataset.set_format("torch")


```


```python

```



## Blobs

I [found a post](https://www.unite.ai/editing-a-gans-latent-space-with-blobs/) about blobs that serve as a blurred contour for locating objects in pictures. And here's the [BlobGAN paper](https://dave.ml/blobgan/static/blobgan_paper.pdf).

The idea is that we can take that generator and prepend a fully connected network that maps Gaussian noise (technically that is the vector with features?) into the spatial map with blobs.

Discriminator in this case produces blobs from the last layer but not a binary classification

What loss function makes the blobs match with objects?

$$
\begin{align}
\mathcal{L}_{inversion} &= \mathcal{L}_{LPIPS} (x_{real}, G(E(x_{real})))\\
&+ \mathcal{L}_{LPIPS}(x_{fake}, G(E(x_{fake}))) \\
&+ \mathcal{L}_2(x_{real}, G(E(x_{real}))) \\
&+ \mathcal{L}_2(x_{fake}, G(E(x_{fake}))) \\
&+ \lambda \mathcal{L}_2(\beta_{fake}, E(x_{fake})) \\
\end{align}
$$
where $\lambda = 10$, and $\mathcal{L}_{LPIPS}$ is the [Learned Perceptual Image Patch Similarity](https://richzhang.github.io/PerceptualSimilarity/) which uses features of the VGG network trained on ImageNet classification instead of comparing images pixel by pixel.

```bash
pip install wandb hydra-core --upgrade
```



## Dataset

See how to load pictures into torch in [this post](/ai/my-faces-dataset)

Also, everyone uses this: [CelebA](https://mmlab.ie.cuhk.edu.hk/projects/CelebA.html) - 64x64 faces

## Next 

- StyleGAN3 and photo editing [link](https://github.com/yuval-alaluf/stylegan3-editing)