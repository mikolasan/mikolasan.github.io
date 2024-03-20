---
date: 2022-06-23
title: How to run DALL-E locally
featuredImage: a_cat_in_a_cosmonaut_costume_floating_in_deep_space_with_colorful_nebulas_on_the_background.png
previewImage: run-dalle-playground.png
published: 2022-08-20
lastModified: 2022-09-08
quality: bad
---

Prompt for generating a featured picture: _cat cosmonaut floating in deep space with colorful nebulas on the background_

# Crazy data scientist diary

Full collection of tricks and fixes required to run TensorFlow on Windows compiled with the latest Visual Studio 2022.

- Windows 10 64 bit
- CUDA 11.3
- cudnn 8.4.1.50
- Microsoft Visual Studio 2022
- Python 3.8.1
- MSYS2 (2018-05-31)

![running dalle playground](./run-dalle-playground.png)


## Day 3

https://twitter.com/mikolasan/status/1536575253312221185

I want to create AI-generated cover pictures for my articles. I want to try [DALL-E Mini](https://github.com/borisdayma/dalle-mini) for this purpose, but [the online version](https://www.craiyon.com/) is so popular that it even cannot handle all requests.

![Too much trafic please try again](./crazy-data-scientist-diary-day-3.png)

Thus I'm installing a [local version](https://github.com/saharmor/dalle-playground) on my laptop.

So the first step is to install the correct tools. I'm going with

- CUDA 11.3.1 (not the latest, just saw it in PyTorch [support table](https://pytorch.org/get-started/locally/))
- cuDNN 8.4 (latest for 11.x)
- NVIDIA Graphics Driver 512.96 (latest)

![Compatibility diagram PyTorch vs Cuda](./crazy-data-scientist-diary-day-3-2.png)

I usually do not update video drivers, but here is a picture to explain why the graphics driver must be updated

![Compatibility diagram Nvidia driver vs Cuda](./crazy-data-scientist-diary-day-3-3.png)

Next step is CUDA. Go to advanced mode and disable some old payload that comes in the bundle.

![Installation wizard steps](./crazy-data-scientist-diary-day-3-4.png)

I'm not sure why but I need to [compile JAX from source](https://jax.readthedocs.io/en/latest/developer.html#additional-notes-for-building-jaxlib-from-source-on-windows). And it's an nuclear mix of Windows and Linux tools. For example

> Open PowerShell, and make sure MSYS2 is in the path of the current session

According to my personal beliefs, this is a recipe for disaster 🙉

![PowerShell it is](./crazy-data-scientist-diary-day-3-5.png)

```powershell
python .\build\build.py `
  --enable_cuda `
  --cuda_path='C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.3' `
  --cudnn_path='C:/Program Files/NVIDIA/CUDNN/v8.4.1.50' `
  --cuda_version='11.3' `
  --cudnn_version='8.4.1' `
  --bazel_options='--local_cpu_resources=1'
```

It's building now. However exception still occurred in the beginning 😬

![It's building now](./crazy-data-scientist-diary-day-3-6.png)

The fact that I need to turn my fans to max in this project is bothering me.

In the end it failed because the compiler was out of heap space 😠

![Control fan speed](./crazy-data-scientist-diary-day-3-7.png)



## Day 4

https://twitter.com/mikolasan/status/1536923666398580736

I restarted the build process and it advanced further. Now it stopped at the point where library developers do not trust Microsoft developers. I need to lull the build system that we can trust Visual Studio 2022.

![The nvcc flag `--allow-unsopported-compiler`](./crazy-data-scientist-diary-day-4.png)

I was naïve. I should never trust my life to the compiler

```
C:\Program Files (x86)\Windows Kits\10\include\10.0.19041.0\um\winbase.h(9531): warning C5105: macro expansion producing 'defined' has undefined behavior

external/org_tensorflow/tensorflow/compiler/xla/pjrt/distributed/service.cc(56): error C2398: Element '1': conversion from 'size_t' to 'const Key &' requires a narrowing conversion
        with
        [
            Key=google::protobuf::int32
        ]
```

![error C2398](./crazy-data-scientist-diary-day-4-2.png)

Maybe I don't understand bazel, but it always restarts the build from the beginning and very frequently just skyrockets in demand of memory. The Langoliers from JAX.

![memory spike](./crazy-data-scientist-diary-day-4-3.png)

So in the nutshell

1. install requirements
2. clone jax
3. switch to a specific tag
4. ignore new compilers
5. fix type conversion
6. compile with options that make build process more stable (hint: use only one CPU)
7. install the wheel and the module (the same version)
8. install also from sources [dalle-mini](https://github.com/borisdayma/dalle-mini) (0.1.1) and flax (0.5.2)

Links:

- https://github.com/google/jax#installation
- https://jax.readthedocs.io/en/latest/developer.html#building-from-source

## Day 5

I've installed [Alacritty terminal](https://github.com/alacritty/alacritty) on Windows and more than happy with it.

- it's configurable
- it's portable (only 4MB)
- it runs on GPU
- it supports emoji and color output

But inside you still have cmd.exe or powershell. 

Here is my config `%APPDATA%\alacritty\alacritty.yml`:

```yaml
# Configuration for Alacritty, the GPU enhanced terminal emulator.

window:
  opacity: 0.9
  dimensions:
    columns: 120
    lines: 30

  padding:
    x: 5
    y: 5

  decorations: full

# Font configuration
font:
  # Normal (roman) font face
  normal:
    family: Source Code Pro

    # The `style` can be specified to pick a specific face.
    style: Medium
  size: 13.0
colors:
  # Default colors
  primary:
    background: '#000000'
    foreground: '#eaeaea'

selection:
  save_to_clipboard: true

shell:
  program: cmd.exe
  args:
    - /k "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat"

working_directory: C:\Users\neupo\

```

The command to build TensorFlow

```powershell
bazel build --local_ram_resources=4096 --local_cpu_resources=1 --config=opt --config=cuda --copt=-nvcc_options=disable-warnings --define=no_tensorflow_py_deps=true //tensorflow/tools/pip_package:build_pip_package
```

Think about `/arch:AVX2` ([MSVC compiler reference about the `/arch` option](https://docs.microsoft.com/en-us/cpp/build/reference/arch-x64?view=msvc-170))


A usual finale of this evening is a long output of errors but this time I was [compiling ROCM on Linux](/blog/build-rocm-from-source). However, you can simply enjoy more Source Pro font samples.

![Alacritty showcase](./alacritty-showcase.png)