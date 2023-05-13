---
date: 2021-04-06
title: Use C++ library from Node.js
published: 2021-04-06
lastModified: 2021-04-06
---

- [https://stackoverflow.com/questions/9629677/how-can-i-use-a-c-library-from-node-js/27917698#27917698](https://stackoverflow.com/questions/9629677/how-can-i-use-a-c-library-from-node-js/27917698#27917698)
- [https://github.com/swig/swig/wiki/Getting-Started](https://github.com/swig/swig/wiki/Getting-Started)

```
git clone https://github.com/swig/swig.git
cd swig
./autogen.sh && ./configure && make
```

- [https://github.com/nodejs/node/blob/master/test/addons/hello-world/binding.cc](https://github.com/nodejs/node/blob/master/test/addons/hello-world/binding.cc)
- [https://v8.dev/docs/embed](https://v8.dev/docs/embed)
- [https://chromium.googlesource.com/v8/v8.git/+/master/gni/v8.gni](https://chromium.googlesource.com/v8/v8.git/+/master/gni/v8.gni)

```
target_cpu = "x64"
use_custom_libcxx = false
v8_enable_i18n_support = false
v8_static_library = false
v8_monolithic = false
v8_expose_symbols = true
```

- [https://v8.dev/docs/build-gn](https://v8.dev/docs/build-gn)
- [https://explorerplusplus.com/blog/2019/03/07/embedding-v8-c++-application](https://explorerplusplus.com/blog/2019/03/07/embedding-v8-c++-application)
- [https://just.billywhizz.io/blog/on-javascript-performance-01/#caveats](https://just.billywhizz.io/blog/on-javascript-performance-01/#caveats)

- https://v8docs.nodesource.com/node-16.0/
- https://v8docs.nodesource.com/node-16.0/dd/d0d/classv8_1_1_function_callback_info.html
- https://v8docs.nodesource.com/node-16.0/de/deb/classv8_1_1_local.html
- https://v8docs.nodesource.com/node-16.0/d9/d4b/classv8_1_1_maybe.html
- https://github.com/nodejs/node-gyp/issues/17
- https://github.com/nodejs/node-gyp/issues/328