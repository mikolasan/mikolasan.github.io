---
title: Install TeX on Windows
date: 2023-01-12
published: 2023-01-13
lastModified: 2023-01-27
---

1. Go to miktex website and download the installer https://miktex.org/download
2. Use the installer
3. Open MiKTeX Console. Switch to Updates, press Update Now
4. Switch to PAckages, type in `cm-super`, press enter and press `+` to install the package
5. Create .tex document

```tex
\documentclass[10pt,a5paper,draft]{book}
\usepackage[T2A]{fontenc}
\usepackage[utf8x]{inputenc}
\usepackage[russian, english]{babel}

\begin{document}

\rmfamily
Какой-то осмысленный текст1.

\sffamily
Какой-то осмысленный текст2.

\ttfamily
Какой-то осмысленный текст3.

\end{document}
```

6. Open it in TeXworks
7. (Optional) Edit -> Preferences -> Editor: set font to Source Code Pro 11 pt


## Cheat sheets

- Small, only basice stuff https://wch.github.io/latexsheet/latexsheet.pdf
- Very robust http://www.ccas.ru/voron/download/voron05latex.pdf (rus)