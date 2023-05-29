---
date: 2023-04-04
title: Agent emotion model
topic: true
draft: true
published: 2023-04-04
lastModified: 2023-04-04
---

## Task

Display emotions on small LED screen. Draw them with GAN network - trained on real faces, but it converts it to simplistic black and white drawing. Primary emotions (see Plutchik or Wilcox _feeling wheel_) are chosen based on scales for the following characteristics:

- fear (adrenaline) (cortisol ?)
- mad (endorphins)
- joy (dopamine)
- love (oxytocin)
- sad (opposite to dopamine) (serotonin ?)
- surprise ([noradrenaline](https://news.mit.edu/2022/noradrenaline-brain-surprise-0601))
- power (serotonin)


## Approach

Modern AI researchers would create a text prompt that would explain what conditions correspond to what face expression (also describing how that face looks), and use autogenerator to create an image from that description.

But feelings do exist because of innate wiring and special [chemicals assigned to them](https://www.frontiersin.org/articles/10.3389/fpsyg.2020.00021/full) (neurotransmitters / neuromodulators (?)). Thus saturation to a specific level make it [visible on our face](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4221207/) (and in behavior) because some muscles also highly correlate to it.

Stimulator adds neuromodulators into the system. Presence of specific modulators affects facial expressions directly, but we assign sets of pictures by emotion name and the name is assigned by the neuromodulator. Neuromodulators slowly dissolve or become overthrown by new emotion (caused by new stimulator).


## GAN sketching 

I’ll go through a [list of projects](https://github.com/MarkMoHR/Awesome-Sketch-Synthesis) focusing on sketch synthesis. I will feed [Face expression recognition dataset](https://paperswithcode.com/datasets?task=facial-expression-recognition&page=1) Initially I found FER2013 on kaggle as my first result on google. 7 categories are exactly what I was looking for, but 48x48 pixel grayscale images will not do good.

That's why I targeted the AffectNet trainset and convert all photos to sketches.

- https://github.com/yiranran/QMUPD


[https://github.com/aliprf/Ad-Corre](https://github.com/aliprf/Ad-Corre) - model: any picture to a feeling name

[https://peterwang512.github.io/GANSketching/](https://peterwang512.github.io/GANSketching/)

[https://cybertron.cg.tu-berlin.de/eitz/pdf/2012_siggraph_classifysketch.pdf](https://cybertron.cg.tu-berlin.de/eitz/pdf/2012_siggraph_classifysketch.pdf)

I have [OLED monochrome display module](/make/oled-display-ssd1306) 128x64 pixels blue color based on SSD1306 chip. Which means we are going to create a GAN model that converts any picture to 128x64 size. Should I do 64x64 centered in the screen? I think no, because I want it to mimic zoom in effect and that’s where you need to use full area of the screen.



## Facial expression recognition

Datasets:

- https://paperswithcode.com/datasets?task=facial-expression-recognition&page=1
- AffectNet 96x96 version https://www.kaggle.com/datasets/noamsegal/affectnet-training-data

Jupyter notebooks:

- https://github.com/edukhnai/valence-arousal-recognition
- https://github.com/amirhossein-hkh/facial-expression-recognition

Pretrained models:

- https://www.kaggle.com/code/edwardjross/affectnet-resnet-fastai/output


## Mathematical model

Let's assume that the agent's emotional state can be represented by a vector E, where each element corresponds to one of the emotions


## Interpolation path in latent space

You say What? Yes, this wasn't easy to figure out what I need. I knew that GAN models can do some transformation: transform from one person to another, from a person to an animal. It's done by messing with vectors in latent space. The purpose of GAN networks is to generate a picture of some type (zebras) by another picture of another type (horses). The best part is that no labels or exact match are required for training.

To explain the latent space, let me briefly tell you about GAN internal architecture. It has two networks inside. One is a discriminator, it takes an input image and with convolutional layers "compresses" the image from 1024x1024x3 (1024 is a common maximum size, but it can be smaller, 3 = 3 colors) to an vector of high-level features (common size is 512 real value numbers). This vector is an input for the second network - generator. Generator works in reverse it uses convolutional layers to create an image from that encoded information.

In some way these 512 numbers define the whole picture. Values and correlation between them is important. And if we forget for a moment about the input image and the discriminator and play with the numbers that work as input to the generator network we can make that transformation.

If we want to transform from one image to another, then we process the on the discriminator, evaluate two vectors. Using these two ectors we can interpolate some vectors in between, and then pass all these vectors to the generator. The generator will generate us pictures of desired transformation. Then we combine all the pictures in the video file.

I remember seeing a demo of transfomation from a human into animal. So I started searching for that. The idea of using GAN model to generate images of new crossbreed species is cool. But the GAN cannot deal with this task because it doesn't understand what's displayed in the picture in 3D sense.

- [Ganimals](https://ganimals.media.mit.edu/discover_em) (just refresh the page to get a new result). It uses [BigGAN](https://arxiv.org/abs/1809.11096)
- [Humanimals](https://www.vice.com/en/article/884wek/ai-algorithm-turns-humans-into-animals) (StyleGAN v2) ([StyleGAN 3](https://github.com/NVlabs/stylegan3) for reference)
- [HomoInterpGAN](https://openaccess.thecvf.com/content_CVPR_2019/papers/Chen_Homomorphic_Latent_Space_Interpolation_for_Unpaired_Image-To-Image_Translation_CVPR_2019_paper.pdf) ([code](https://github.com/yingcong/HomoInterpGAN))
- [StarGAN](https://arxiv.org/abs/1711.09020) - facial attribute transfer and a facial expression synthesis ([code](https://github.com/yunjey/stargan))

StyleClip
GANSpace
SeFa

## HomoInterpGAN

For `matplotlib` (version 2.2.4) download zip-s and extract

- freetype https://github.com/ubawurinna/freetype-windows-binaries/releases/tag/v2.13.0
- zlib https://www.zlib.net/
- libpng https://sourceforge.net/projects/libpng/files/libpng16/1.6.39/

Add 

```
target_link_directories(png PUBLIC ${ZLIB_LIBRARY_DIRS})
target_link_directories(png_static PUBLIC ${ZLIB_LIBRARY_DIRS})
target_link_directories(png-fix-itxt PUBLIC ${ZLIB_LIBRARY_DIRS})
```

to CMakeLists.txt for libpng in appropriate places

And then build!

```
cd ..\zlib-1.2.13
cmake -G "NMake Makefiles" -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX="C:/Users/neupo/develop/thirdparty" -S . -B build
cmake --build build --target all
cmake --build build --target install

cd ..\lpng1639
cmake -G "NMake Makefiles" -DZLIB_INCLUDE_DIRS="C:/Users/neupo/develop/thirdparty/include" -DZLIB_LIBRARY_DIRS="C:/Users/neupo/develop/thirdparty/lib" -DZLIB_LIBRARIES="zlib" -DPNG_BUILD_ZLIB=ON -DPNG_TESTS=NO -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX="C:/Users/neupo/develop/thirdparty" -S . -B build
cmake --build build --target all
cmake --build build --target install

cd ..\HomoInterpGAN
pip install --global-option=build_ext --global-option="IC:/Users/neupo/develop/thirdparty/include" --global-option="-LC:/Users/neupo/develop/thirdparty/lib" matplotlib==2.2.4

pip install https://download.lfd.uci.edu/pythonlibs/archived/matplotlib-2.2.5-cp38-cp38-win_amd64.whl

```

- just take a wheel https://stackoverflow.com/questions/38608698/error-with-pip-install-scikit-image/38618044#38618044


## StarGAN

- v1 PyTorch https://github.com/yunjey/stargan
- v2 PyTorch https://github.com/clovaai/stargan-v2
- v2 TensorFlow https://github.com/clovaai/stargan-v2-tensorflow

## TODO

- Get full [AffectNet trainset](https://mohammadmahoor.com/affectnet/) ([academic torrent](https://academictorrents.com/details/3c740bf0655ca4e818c3e0bf33b79cebda83563c))
- Get full [RaFD](https://web.archive.org/web/20210617170920/http://www.socsci.ru.nl:8180/RaFD2/RaFD) (WebArchive)
- Get full [RAF-DB](http://www.whdeng.cn/raf/model1.html)
- If I understand it correctly, [VQVAE-2](https://arxiv.org/abs/1906.00446) is a quility improvement technique
- Other face datasets https://pics.stir.ac.uk/Other_face_databases.htm

try diffusion https://github.com/Stability-AI/stablediffusion
datasets, tools to make datasets https://laion.ai/projects/