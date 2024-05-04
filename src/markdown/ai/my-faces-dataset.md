---
date: 2023-07-17
title: My Faces Dataset
article: quest
published: 2023-07-17
lastModified: 2023-07-17
---


## Initial plan

1. read about crop blur technique in modern datasets. (I think I’ve seen it when [I read about Celeb HQ](https://arxiv.org/pdf/1710.10196v3.pdf))

![Creating the CELEBA-HQ dataset. We start with a JPEG image (a) from the CelebA in-the-wild dataset. We improve the visual quality (b,top) through JPEG artifact removal (b,middle) and 4x super-resolution (b,bottom). We then extend the image through mirror padding (c) and Gaussian filtering (d) to produce a visually pleasing depth-of-field effect. Finally, we use the facial landmark locations to select an appropriate crop region (e) and perform high-quality resampling to obtain the final image at 1024 × 1024 resolution (f).](./creating-celeba-hq-dataset.png)

2. crop to faces: recognize faces, center, add padding if needed, blur/mirror background if needed
3. train a diffusion model on them (what model to use, what library to use, what video card to use (nvidia/AMD)???)


## Recognize faces

Just to avoid manual work. Also how to create unsupervised butt recognition model? Try to use [GAN for object detection](https://arxiv.org/pdf/1706.05274.pdf)

[code](https://github.com/tkarras/progressive_growing_of_gans)


## Diffusion

[notebook](https://colab.research.google.com/github/huggingface/diffusion-models-class/blob/main/unit1/01_introduction_to_diffusers.ipynb)

```bash
conda create -n diffusers python=3.10
conda activate diffusers
pip install matplotlib Pillow datasets diffusers
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install notebook
jupyter notebook
```

Diffusion in Python is slow. Because, well, who would have thought, it does a big portion in Python, not CUDA. Despite Python version is already spicy for my NVIDIA GeForce GTX 1060 (Compute Capability **6.1**), I think that moving everything to C++ is a correct way. [PyTorch C++ API](https://pytorch.org/tutorials/advanced/cpp_frontend.html)


One main thing, gaussian noise, is what disappointed me in diffusion models. It just a funny toy that surprisingly works. It has no value for neural network research. Restoring/generating images from gray noise? That is not a sign on intellect. It's just an algorithm. And noise is not that important for that idea to work. One can use [masks](https://muse-model.github.io/) which will be much faster because noise generation is not fast with software implmentation.

It's worth noting that PyTorch 2.0 [did some improvements](https://pytorch.org/blog/accelerated-generative-diffusion-models/) for attention layers




I have some doubts that my model architecture is correct, because even after 560k steps (40 epochs on 14k training pictures) it looks almost like noise.

```python
from diffusers import UNet2DModel

model = UNet2DModel(
    sample_size=image_size,  # the target image resolution
    in_channels=3,  # the number of input channels, 3 for RGB images
    out_channels=3,  # the number of output channels
    layers_per_block=2,  # how many ResNet layers to use per UNet block
    block_out_channels=(64, 128, 128, 256, 256),  # More channels -> more parameters
    down_block_types=(
        "DownBlock2D",  # a regular ResNet downsampling block
        "DownBlock2D",
        "DownBlock2D",
        "AttnDownBlock2D",  # a ResNet downsampling block with spatial self-attention
        "DownBlock2D",
    ),
    up_block_types=(
        "UpBlock2D",
        "AttnUpBlock2D",  # a ResNet upsampling block with spatial self-attention
        "UpBlock2D",
        "UpBlock2D",
        "UpBlock2D",  # a regular ResNet upsampling block
    ),
)
```



## C++ code

**PyTorch C++**: [Docs](https://pytorch.org/tutorials/advanced/cpp_frontend.html), [examples](https://github.com/pytorch/examples/tree/main/cpp)