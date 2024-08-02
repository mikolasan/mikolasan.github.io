---
article: quest
title: Unsupervised image classification
subtitle: with GAN
date: 2023-07-29
published: 2023-07-29
lastModified: 2023-07-29
---

After [playing with CycleGAN](/science/cycle-gan-intro), I [started wondering](/devlog/14) if [Generative Adversarial Networks](/ai/generative-adversarial-networks) (GANs) can be trained without labels on small datasets and their discriminator part would work as classificator. I found one [notebook](https://github.com/sthalles/blog-resources/blob/master/semi-supervised/semi-supervised_learning.ipynb) that follows this path, but it uses TensorFlow 1. So instead I will use PyTorch and their [DCGAN tutorial](https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html)

Dataset: [CelebA](https://mmlab.ie.cuhk.edu.hk/projects/CelebA.html) - 64x64 faces

### Generator

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

### Discriminator

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

```python
# For each batch in the dataloader
for i, data in enumerate(dataloader, 0):
    
  ############################
  # (1) Update D network: maximize log(D(x)) + log(1 - D(G(z)))
  ###########################
  ## Train with all-real batch
  netD.zero_grad()
  # Format batch
  real_cpu = data[0].to(device)
  b_size = real_cpu.size(0)
  label = torch.full((b_size,), real_label, dtype=torch.float, device=device)
  # Forward pass real batch through D
  output = netD(real_cpu).view(-1)
  # Calculate loss on all-real batch
  errD_real = criterion(output, label)
  # Calculate gradients for D in backward pass
  errD_real.backward()
  D_x = output.mean().item()

  ## Train with all-fake batch
  # Generate batch of latent vectors
  noise = torch.randn(b_size, nz, 1, 1, device=device)
  # Generate fake image batch with G
  fake = netG(noise)
  label.fill_(fake_label)
  # Classify all fake batch with D
  output = netD(fake.detach()).view(-1)
  # Calculate D's loss on the all-fake batch
  errD_fake = criterion(output, label)
  # Calculate the gradients for this batch, accumulated (summed) with previous gradients
  errD_fake.backward()
  D_G_z1 = output.mean().item()
  # Compute error of D as sum over the fake and the real batches
  errD = errD_real + errD_fake
  # Update D
  optimizerD.step()

  ############################
  # (2) Update G network: maximize log(D(G(z)))
  ###########################
  netG.zero_grad()
  label.fill_(real_label)  # fake labels are real for generator cost
  # Since we just updated D, perform another forward pass of all-fake batch through D
  output = netD(fake).view(-1)
  # Calculate G's loss based on this output
  errG = criterion(output, label)
  # Calculate gradients for G
  errG.backward()
  D_G_z2 = output.mean().item()
  # Update G
  optimizerG.step()
  
  # Output training stats
  if i % 100 == 0:
      print('[%d/%d][%d/%d]\tLoss_D: %.4f\tLoss_G: %.4f\tD(x): %.4f\tD(G(z)): %.4f / %.4f'
            % (epoch, num_epochs, i, len(dataloader),
                errD.item(), errG.item(), D_x, D_G_z1, D_G_z2))

  # Check how the generator is doing by saving G's output on fixed_noise
  if (iters % 500 == 0) or ((epoch == num_epochs-1) and (i == len(dataloader)-1)):
      with torch.no_grad():
          fake = netG(fixed_noise).detach().cpu()
      img_list.append(vutils.make_grid(fake, padding=2, normalize=True))
      
  iters += 1
```




## Next 

- StyleGAN3 and photo editing [link](https://github.com/yuval-alaluf/stylegan3-editing)