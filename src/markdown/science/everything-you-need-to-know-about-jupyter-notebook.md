---
title: Everything you need to know about Jupyter Notebook
date: 2022-09-20
published: 2022-10-03
lastModified: 2022-10-03
---

It would be strange to learn Machine Learning and never use [Jupyter](http://jupyter.org) notebooks. Data scientists LOVE Jupyter notebooks. It's what they use on **kaggle** and **Google Colab**. So let's begin.

## Install

```
pip install notebook
```

## Launch

Run the following command from the directory where `.ipynb` file is

```
jupyter notebook
```

On Windows make sure that `C:\Users\<user_name>\AppData\Local\Programs\Python\Python38\Scripts\` is in your user environment variables

## Dark theme

Set dark theme (more info in [this StackOverflow question](https://stackoverflow.com/questions/46510192/change-the-theme-in-jupyter-notebook))

```shell
pip install jupyterthemes  jt -l  jt -t theme-name
```

## Try online

- [binder](https://mybinder.org/v2/gh/ipython/ipython-in-depth/master?filepath=binder/Index.ipynb)
- [replit](https://replit.com)
- [Google Colab](https://colab.research.google.com/)
- [kaggle](https://www.kaggle.com/)