---
date: 2023-07-17
title: My Faces Dataset
draft: true
published: 2023-07-17
lastModified: 2023-07-17
---


## Initial plan

1. read about crop blur technique in modern datasets. (I think I’ve seen it when [I read about Celeb HQ](https://arxiv.org/pdf/1710.10196v3.pdf))

![Creating the CELEBA-HQ dataset. We start with a JPEG image (a) from the CelebA in-the-wild dataset. We improve the visual quality (b,top) through JPEG artifact removal (b,middle) and 4x super-resolution (b,bottom). We then extend the image through mirror padding (c) and Gaussian filtering (d) to produce a visually pleasing depth-of-field effect. Finally, we use the facial landmark locations to select an appropriate crop region (e) and perform high-quality resampling to obtain the final image at 1024 × 1024 resolution (f).](./creating-celeba-hq-dataset.png)

2. crop to faces: recognize faces, center, add padding if needed, blur/mirror background if needed
3. train a diffusion model on them (what model to use, what library to use, what video card to use (nvidia/AMD)???)


## Recognize faces

Just to avoid manual work. Also how to create unsuervised butt recognition model?

[code](https://github.com/tkarras/progressive_growing_of_gans)