---
title:
date: 2025-08-31
published: 2025-08-31
lastModified: 2025-08-31
---
Oh, yeah, how to dynamically load shared objects (dlls) into a go server? Go supports `plugin` but they do not recommend it because it can fail if modules (plugins? it’s kinda the same thing, right?) build with different toolchain or even build flags. So, RPC then.

- [Standard Go project layout](https://github.com/golang-standards/project-layout)
- [Channels 101](https://go101.org/article/channel.html)