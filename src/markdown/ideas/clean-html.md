---
title: Clean HTML
date: 2025-05-08
published: 2025-05-08
lastModified: 2025-05-08
subtitle: Display the web how it supposed to be
---
A **micro HTML GUI renderer** — a minimal windowed app that can:

- Open a GUI window
- Parse a minimal subset of HTML (`<html>`, `<body>`, `<label>`, `<a>`, `<button>`, maybe `<div>`)
- Render those as basic GUI widgets
- Skip CSS/JS, just layout and display

## Resources
### List of small JavaScript engines

Where _small_ means not v8.

- [Ducktape](https://duktape.org/)(MIT License)
- [Espruino](https://github.com/espruino/Espruino) (MPL v2.0)
- [JerryScript](http://jerryscript.net/) (Apache License v2.0)
- [MuJS](http://mujs.com/) (Affero GPL)
- [quad-wheel](https://code.google.com/p/quad-wheel/) (MIT License)
- [QuickJS](https://bellard.org/quickjs/) (MIT License)
- [tiny-js](https://github.com/gfwilliams/tiny-js) (MIT license)
- [v7](https://github.com/cesanta/v7) (GPL v2.0)

### AST 

- [super flat](https://jhwlr.io/super-flat-ast/) - super Rust