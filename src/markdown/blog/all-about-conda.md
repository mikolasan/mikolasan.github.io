---
date: 2024-08-05
title: All about Conda
published: 2024-08-05
lastModified: 2024-08-05
---

I decided to create this page because I often 

- [Anaconda cheatsheet](https://docs.conda.io/projects/conda/en/stable/user-guide/cheatsheet.html)
- [My note](/code/anaconda-in-vscode-terminal) on how to install Anaconda in VSCode terminal

## Common tasks

There is probably an environment where I already have PyTorch installed but **how to find the environment with one specific package installed**? Of course this is about some big packages like TensorFlow or PyTorch or something with native dependencies where it's more of a hassle to create a new one.

So list configured environments with

```bash
conda info --envs
```

and then search for the package

```bash
conda list -n diffusers torch # last positional argument is a regex
# so instead you can apply your bash-fu
conda list -n diffusers | grep torch
```

## Examples

My environments I created in the following projects

- [Transformers and PyTorch](/blog/starcode)
- Also [PyTorch](/ai/agent-emotion-model), but in WSL2 and this version is craving for `CUDA_HOME`
- [Diffusers](/ai/my-faces-dataset) from Hugging Face
- [TensorFlow 2.12](/ai/unsupervised-image-classification-with-gan) on Windows can only be installed in WSL2
