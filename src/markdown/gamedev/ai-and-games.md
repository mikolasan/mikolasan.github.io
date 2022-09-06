---
title: AI and Games
date: 2021-11-25
published: 2021-11-26
lastModified: 2021-11-28
draft: true
---

I always struggle with finding the right assets and because I only look for free assets the choice is limited. I’m thinking to learn about procedural generation and also use some AI method to generate completely new assets. But it’s a huge task so I rather choose another hobby. Just kidding.

_Andraz Vene_: Procedural assets sound like a big one indeed! Have you considering focusing on a genre, where assets are more available, or they are more "programmer art" that can look well? I.e. so not some platformer with characters, but i.e. regular shapes or something?

I refer here to my roguelike project. Top down view. My initial plan was 48x48 pixels for a tile. The game starts in a regular bar, then advance to sci-fi location in a space craft where I need many different alien characters. I was sure that I can find pixel art characters and animations, but I did find only very good reference. So I tried to create my own stuff. It might be easy for me to pretend that I'm a good artist if I would start with 16x16 size 🤷‍♂️ And yes, my next struggle was with a 3D logic game where I wanted a nice model of a chip (like one in checkers). I wanted to upgrade simple cylinders and make them look like crystals. Well, I failed with that idea too.


> Goldilocks zone - something about task that can be tackled but not completely solved


## 3D generated rooms

[The Replica Dataset](https://github.com/facebookresearch/Replica-Dataset) is a dataset of high quality reconstructions of a variety of indoor spaces. Each reconstruction has clean dense geometry, high resolution and high dynamic range textures, glass and mirror surface information, planar segmentation as well as semantic class and instance segmentation.

[Structured3D](https://github.com/bertjiazheng/Structured3D) is a large-scale photo-realistic dataset containing 3.5K house designs **(a)** created by professional designers with a variety of ground truth 3D structure annotations **(b)** and generate photo-realistic 2D images **(c)** https://structured3d-dataset.org/.   

[InteriorNet](https://interiornet.org/) is a RGB-D for large scale interior scene understanding and mapping. The dataset contains 20M images created by pipeline https://paperswithcode.com/dataset/interiornet. Paper: https://interiornet.org/items/interiornet_paper.pdf

[The Matterport3D](https://niessner.github.io/Matterport/) dataset is a large RGB-D dataset for scene understanding in indoor environments. It contains 10,800 panoramic views inside 90 real building-scale scenes, constructed from 194,400 RGB-D images. Paper: https://arxiv.org/pdf/1709.06158.pdf1