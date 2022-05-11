---
date: 2020-05-06
title: Anaconda in VSCode's terminal
published: 2021-11-07
lastModified: 2022-05-01
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
