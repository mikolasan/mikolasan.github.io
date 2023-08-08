---
title: GDScript AI code completion
date: 2023-07-18
published: 2023-07-18
lastModified: 2023-07-18
---

Following the [tutorial](https://huggingface.co/blog/starchat-alpha) and [this](https://huggingface.co/blog/codeparrot). For optimization [PEFT](https://github.com/huggingface/peft)

- Install [miniconda](https://docs.conda.io/en/latest/miniconda.html)
- Start Anaconda in your terminal. For example, open [Alacritty](/science/how-to-run-dalle-locally) and run `C:\Users\neupo\miniconda3\Scripts\activate.bat`. Also see [VS Code example](/code/anaconda-in-vscode-terminal).

```bash
conda create -n starchat python=3.10
conda activate starchat

git clone https://github.com/bigcode-project/starcoder.git
cd starcoder/chat
pip install -r requirements.txt
```

To exit the environment type

```bash
conda deactivate
```

## Create dataset

Comparison with GPT and supposedly heuristics on how to prepare a dataset from github repositories ([paper](https://arxiv.org/pdf/2107.03374.pdf)).
Big Query [example](https://medium.com/google-cloud/analyzing-go-code-with-bigquery-485c70c3b451#.glhi7lrl4) and [another](https://glaforge.dev/posts/2016/07/06/what-can-we-learn-from-million-lines-of-groovy-code-on-github/)
