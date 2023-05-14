---
date: 2022-06-07
title: Intro to CycleGAN
draft: true
twitter: https://twitter.com/mikolasan/status/1534059344353845249
previewImage: stylegan-my-lucky-zebra.png
published: 2022-06-10
lastModified: 2022-10-03
---


My plan is to play with CycleGAN and to read 2 papers

- \[[2018](https://arxiv.org/abs/1809.11096)] Large Scale GAN Training for High Fidelity Natural Image Synthesis
- \[[2017](https://arxiv.org/abs/1703.10593)] Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networks


I'm following the tutorial from [TensorFlow documentation](https://www.tensorflow.org/tutorials/generative/cyclegan)

While this artcicle is in draft state I'm going to keep here only my questions along the way. Later I will compile a big story how to train your own model and so on.

## Newbie questions

### Jupyter notebook or Python interpreter?

[Jupyter notebook](/science/everything-you-need-to-know-about-jupyter-notebook) or filling a script line by line and executing it?


### Keras vs PyTorch vs TensorFlow

Is there a difference? When you see implementation in all frameworks, which one to chose and why?

## Follow along

I'm running the tutorial on my laptop with Windows 10 and CUDA 11.3 on Nvidia GeForce GTX 1060. TensorFlow 2.3 [compiled from source](/science/how-to-run-dalle-locally)

### How to check TensorFlow version

```python
tf.version.VERSION
# or
tf.__version__
```
2.9 is [the latest version](https://www.tensorflow.org/versions) at the time of this writing.

Just a reminder that there is a big difference between TensorFlow 1 and 2. They hate each other and many projects and tutorials still use version 1. I highly recommend do not try to upgrade projects from 1 to 2. Especially if you do not understand how the project works. Even their creators do not know how it works, so don't even try.


### AUTOTUNE

Are you still wondering why data scientist jobs pay so well? I ran in Python interpreter just the beginning of the tutorial, and it failed with an error. This code

```python
"""
https://www.tensorflow.org/tutorials/generative/cyclegan
pip install IPython
"""

import tensorflow as tf

import tensorflow_datasets as tfds
from tensorflow_examples.models.pix2pix import pix2pix

import os
import time
import matplotlib.pyplot as plt
from IPython.display import clear_output

AUTOTUNE = tf.data.AUTOTUNE
dataset, metadata = tfds.load('cycle_gan/horse2zebra',
                              with_info=True, as_supervised=True)
```

The error message

```
AttributeError: module 'tensorflow._api.v2.data' has no attribute 'AUTOTUNE'
```

According to the [TensorFlow 2.3 documentation](https://www.tensorflow.org/versions/r2.3/api_docs/python/tf/data/experimental#other_members), `AUTOTUNE` lies under the `tensorflow.data.experimental` namespace. Simple enough:

```python
AUTOTUNE = tf.data.experimental.AUTOTUNE
```

## WindowsGPath

Next line, another error


```
TypeError: Expected binary or unicode string, got WindowsGPath('C:\\Users\\<and so on>')
```

`WindowsGPath`? Google even cannot give a single result about such type.

![error downloading dataset](./expected-binary-or-unicode-string-got-windowsgpath.png)

But searching locally with the power of MSYS shell

```bash
grep -rn WindowsGPath /c/Users/neupo/AppData/Local/Programs/Python/Python38/lib/site-packages
```

I found that there is such class in [etils/epath/gpath.py:257](https://github.com/google/etils/blob/main/etils/epath/gpath.py)


![adding support for WindowsGPath](./patching-tensorflow-to-work-with-windows-path.png)

So, in TensorFlow 2.3 I fixed that by converting `WindowsGPath` (a special class from eclectic utils from Google) to array of bytes in **python/util/compat.py**

```python{8-10}
def as_bytes(bytes_or_text, encoding='utf-8'):
  if isinstance(bytes_or_text, bytearray):
    return bytes(bytes_or_text)
  elif isinstance(bytes_or_text, _six.text_type):
    return bytes_or_text.encode(encoding)
  elif isinstance(bytes_or_text, bytes):
    return bytes_or_text
  elif isinstance(bytes_or_text, WindowsGPath):
    string_path = str(bytes_or_text)
    return string_path.encode(encoding)
  else:
    raise TypeError('Expected binary or unicode string, got %r' %
                    (bytes_or_text,))
```

And please don't tell me that it's already been fixed in version >= 2.3 of TensorFlow (yes, it's fixed ).

I don't know why my terminal window is flooded with text. Very long warning message. Too long that I think it's an error.

![Very long warning message](./tensorflow-very-long-warning-message.png)

I remember back in the day I had a few dates when a girl was very talkative. It didn't end well. For me it was a first sign that she is not my type.

### Display plot windows

You need to run just one command somewhere before all plot commands:

```python
plt.interactive(True)
```

## Experiments

Out of all zebras I've got this. This clearly defines my luck

![my lucky ass](./stylegan-my-lucky-zebra.png)

### Temperature

These horses are making my computer very hot 🔥🔥🔥 85C

![training on laptop](./tensorflow-hot-hot-hot-training.png)

Then I remembered about the tool to control fans and turned them to the max speed. It decreased GPU temperature from 88C to 81C.

But people say that:

if your GPU is not at ~80-90 C, this means that it is not working at full power, and you are losing some performance.

😒

![fans at max](./tensorflow-fan-speed-at-max.png)

I'm reading StackOverflow to find an answer on: _How to slowdown Cuda in TensorFlow to keep GPU cool?_

And someone explains their setup:

> My GPU is a water cooled gtx 1080 "Super-clocked" edition in a 24/7 refrigerated room. ❄️