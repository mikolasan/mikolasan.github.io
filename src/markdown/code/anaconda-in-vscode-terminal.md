---
date: 2020-05-06
title: Anaconda in VSCode's terminal
published: 2021-11-07
lastModified: 2023-08-08
---

It's possible to add specific terminal to VS Code on Windows machine when you have Anaconda package installed.
You will have Python interpreter under your fingertips.
Just add to **settings.json** the following configuration

```json
"terminal.integrated.profiles.windows": {
  "miniconda": {
    "path": [
      "${env:windir}\\System32\\cmd.exe"
    ],
    "args": ["/k C:\\Users\\neupo\\miniconda3\\Scripts\\activate.bat"]
  },  
  "MinGW": {
    "path": [
      "C:\\msys64\\msys2_shell.cmd"
    ],
    "args": ["-defterm", "-here", "-no-start", "-mingw64"],
    "icon": "terminal-bash"
  },
}
```

And then select the profile in local workspace settings **.vscode/settings.json**

```json
"terminal.integrated.defaultProfile.windows": "MinGW",
```

Ref: https://stackoverflow.com/questions/67601161/the-new-way-to-configure-default-shell-and-argument-commands-in-vscode

For a long time I was against any virtual environment for Python. You only need it for the clean experiment, right? The package manager must resolve all conflicts and it's not a problem to jump a few versions ahead. That's what I thought. But more and more I started see conflicts and new versions got uninstalled and another random version installed in my system. 

I got tired of it. And when the time has come to update Python 3.8 to the new version, I decided to go with Conda. Just at the same time Arch rolled another confusing for me politics - `pip` refuses to install any package even with the `--user` flag and insists to use `pypenv`.

Since that I started using in my day after day experiments

- [Transformers and PyTorch](/blog/starcode)
- Also [PyTorch](/ai/agent-emotion-model), but in WSL2 and this version is craving for `CUDA_HOME`
- [Diffusers](my-dataset.md) from Hugging Face
- [TensorFlow 2.12](/ai/unsupervised-image-classification-with-gan) on Windows can only be installed in WSL2

Also, can be helpfull [Anaconda cheatsheet](https://docs.conda.io/projects/conda/en/stable/user-guide/cheatsheet.html)