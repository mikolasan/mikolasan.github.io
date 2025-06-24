---
title: Spiking autoencoder with embodied actions
date: 2025-05-14
published: 2025-05-14
lastModified: 2025-05-14
---
I need to mix a new neural network architecture for image recognition. If we consider a simple input images, 8x8 pixels in size, where one neuron receives input from each pixel. Then a few feed-forward layers for sparse spatial encoding. 

However, I'm adding neurons responsible for image transformation. There will be neurons that can command to move the image Y-pixels up or down, and/or X-pixels left or right. Another group of neurons will be commanding to rotate an image, and the third one will be scaling - zoom in, zoom out. 

So these transformation neurons will be sending a signal to an external source that would actually change the input. And the first layer (sensors) will receive an image with that transformation applied. Moreover, the neurons responsible for transformation are connected to the recognition system of neurons that evaluates prediction results. 

A prediction is a reconstruction of images from triggers happening in the latent space. The prediction is compared with the input. And when prediction is far from the observed image, that is when transformation neurons try to adjust the image.