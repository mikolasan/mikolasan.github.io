---
date: 2020-05-06
title: Anaconda in VSCode's terminal
published: 2021-11-07
lastModified: 2023-08-08
---

It's possible to add specific terminal to VS Code on Windows machine when you have Anaconda package installed.
You will have Python interpreter under your fingertips.
Just add to **settings.json** the following configuration

```
"terminal.integrated.shellArgs.windows": [
  "-NoExit",
  "-File", "C:\\Users\\<user name>\\Anaconda3\\Scripts\\activate.ps1"
],
```

For a long time I was against any virtual environment for Python. You only need it for the clean experiment, right? The package manager must resolve all conflicts and it's not a problem to jump a few versions ahead. That's what I thought. But more and more I started see conflicts and new versions got uninstalled and another random version installed in my system. 

I got tired of it. And when the time has come to update Python 3.8 to the new version, I decided to go with Conda. Just at the same time Arch rolled another confusing for me politics - `pip` refuses to install any package even with the `--user` flag and insists to use `pypenv`.

Since that I started using in my day after day experiments

- [Transformers and PyTorch](/blog/starcode)
- Also [PyTorch](/ai/agent-emotion-model), but in WSL2 and this version is carving for `CUDA_HOME`
- [Diffusers](/ai/my-faces-dataset) from Hugging Face
- [TensorFlow 2.12](/ai/unsupervised-image-classification-with-gan) on Windows can only be installed in WSL2

Also, can be helpfull [Anaconda cheatsheet](https://docs.conda.io/projects/conda/en/stable/user-guide/cheatsheet.html)