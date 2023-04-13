---
date: 2023-04-11
title: Pixelate images with CycleGAN
draft: true
published: 2023-04-11
lastModified: 2023-04-11
---


I'm using TensorFlow and I need to scale black and white image from 512x512 pixels stored in `tf.Tensor` to 128x96 and add pixelation effect to the image using.


```py
import tensorflow as tf

# Load the image as a tf.Tensor
image = tf.io.read_file('path/to/image.jpg')
image = tf.image.decode_jpeg(image, channels=1) # assuming the image is black and white

# Scale the image to 128x96 pixels
image = tf.image.resize(image, [96, 128])

# Add pixelation effect
block_size = 8
image = tf.nn.avg_pool(image, ksize=[block_size, block_size], strides=[block_size, block_size], padding='VALID')

# Cast the image back to uint8 data type and save it
image = tf.cast(image, tf.uint8)
image = tf.image.encode_jpeg(image)
tf.io.write_file('path/to/scaled_and_pixelated_image.jpg', image)
```

In this code, we first load the image as a `tf.Tensor` using `tf.io.read_file` and `tf.image.decode_jpeg` functions. We then use the `tf.image.resize` function to scale the image to 128x96 pixels. Finally, we apply the pixelation effect using the `tf.nn.avg_pool` function with a block size of 8x8 pixels.

Note that the `tf.nn.avg_pool` function returns a `float32` tensor, so we need to cast it back to `uint8` data type before saving the image using `tf.image.encode_jpeg` and `tf.io.write_file` functions.