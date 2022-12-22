---
path: "/ru/neural-networks/visualize-sentence-parse-trees"
date: "2020-08-26"
title: Деревья
language: "ru"
draft: true
published: 2021-10-13
lastModified: 2022-07-31
---

Будь-то работа с [CoreNLP библиотекой](/ru/neural-networks/modifying-stanford-parser) или [GPT-2](/ru/neural-networks/gpt-2), в любом случае предложение представляется в виде дерева.
Для создания картинки этого дерева есть разные готовые решения. Вот что я подобрал для себя.


## Hierplane

Библиотека на React, которая компилируется в JavaScript для браузера, отображает подготовленную древовидную структуру в формате json

- https://github.com/allenai/hierplane 


## nlpviz

Java на бэкенде, d3 на фронтенде

- https://bpodgursky.com/2013/08/19/using-corenlp-d3-js-and-dagre-js-to-visualize-sentence-parse-trees/
- http://nlpviz.bpodgursky.com/
- https://github.com/bpodgursky/nlpviz


## tree-viewer

Чистый JavaScript и d3

- http://christos-c.com/treeviewer/ 
- https://github.com/christos-c/tree-viewer

Использует деревья из версии 3: https://github.com/d3/d3-3.x-api-reference/blob/master/Tree-Layout.md#tree (документация с последней, шестой версии: https://github.com/d3/d3-hierarchy/blob/master/README.md#tree). Пример дерева, написанный на последней версии https://observablehq.com/@d3/tidy-tree

Из реализации можно легко выкинуть jQuery. Я же предпочитаю Vue.js (https://vuejs.org/v2/guide/installation.html), который я буду использовать для общения с бэкендом. Попробую в этом проекте пощупать Webpack (https://webpack.js.org/guides/getting-started/), для того чтобы писать код по последним стандартам Ява-скрипта с импортом модулей (https://jakearchibald.com/2017/es-modules-in-browsers/), если уж я взялся прокачать это приложение.


## AST

- https://javascriptstore.com/2017/10/15/visualize-ast-javascript/ (сайт исчез в 2020? https://web.archive.org/web/20180814184846/https://javascriptstore.com/2017/10/15/visualize-ast-javascript/)
- https://viswesh.github.io/astVisualizer/ 
- https://github.com/viswesh/astVisualizer


## d3

- https://github.com/d3/d3
- https://github.com/d3/d3-hierarchy/blob/master/README.md#tree