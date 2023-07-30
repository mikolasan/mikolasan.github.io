---
date: 2023-05-27
title: Diffusion models
published: 2023-05-27
lastModified: 2023-05-27
---


- https://lilianweng.github.io/posts/2021-07-11-diffusion-models/
- Another diffusion tutorial https://github.com/Project-MONAI/GenerativeModels/blob/main/tutorials/generative/2d_ddpm/2d_ddpm_compare_schedulers.ipynb
- PyTorch code with explanation [link](https://huggingface.co/blog/annotated-diffusion)
- no gaussian noise, [masks instead](https://muse-model.github.io/). any other distortion is good also https://arxiv.org/pdf/2208.09392.pdf

## Papers

- diffusion probabilistic models ([Sohl-Dickstein et al., 2015](https://arxiv.org/abs/1503.03585))
- noise-conditioned score network ([NCSN; Yang & Ermon, 2019](https://arxiv.org/abs/1907.05600))
- denoising diffusion probabilistic models ([DDPM; Ho et al. 2020](https://arxiv.org/abs/2006.11239), [example](https://github.com/lucidrains/denoising-diffusion-pytorch), [tricks](https://github.com/yiyixuxu/denoising-diffusion-flax))

> Our neural network architecture follows the backbone of PixelCNN++, which is a U-Net based on a Wide ResNet
>
> _Denoising Diffusion Probabilistic Models_

- adding more confusing physics: [Annealed Langevin dynamics](https://arxiv.org/pdf/2006.09011.pdf)
- [self-conditioning](https://arxiv.org/pdf/2208.04202.pdf)
- [P2 weighting](https://arxiv.org/pdf/2204.00227.pdf) ([PyTorch code](https://github.com/jychoi118/P2-weighting))
- [non linear scheduling](https://openreview.net/pdf?id=-NEXDKk8gZ)
- from OpenAI [bragging that diffusion beats GAN](https://arxiv.org/pdf/2105.05233.pdf)
- some people referring that UNet model in duffision is taken from [PixelCNN++](https://github.com/openai/pixel-cnn)

> condition on whole pixels, rather than R/G/B sub-pixels
>
> _PixelCNN++: Improving the PixelCNN with Discretized Logistic Mixture Likelihood and Other Modifications_

## Extra

It's possible to get access to TPU v3-8 (similar to 8 V100 GPUs) with [Google TRC program](https://sites.research.google/trc/about/).

On top you need the Super resolution models. From [IF](https://github.com/deep-floyd/IF), for example.
And [tutorial](https://huggingface.co/blog/if) to use small memory footprint.

## Lessons

**Diffusion model staggers and not improving loss**

It’s normal. Diffusion models can plateau at 0.1 or somewhere there. It’s better not fixate on that

**Why batch size not reducing train time?**

From [this tweet](https://twitter.com/Yampeleg/status/1674034884652802048) TL;DR:

- Maximum speed: Largest batch_size as possible.
- Maximum generalization: small batch_size, and increase throughout the training.

There is a lot of confusion about neural networks batch size during training, here is what I know. The `batch_size` is a balance between the training speed and generalization performance.
Generally, up to a certain limit (can be around around 8-9 samples), the smaller the batch: the better the generalization performance on the validation set.
In addition: Increasing the `batch_size` throughout the training also helps with the validation performance.

If you changed your `batch_size`, it is important to also change the `learning_rate` as well. A good ratio for this is according to the ratio of the `batch_size` change. Larger batches: Need larger `learning_rate`. Smaller batches Need smaller `learning_rate`.