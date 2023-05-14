---
date: 2021-04-06
title: Use C++ library from Node.js
published: 2021-04-06
lastModified: 2021-04-06
---

It's possible to use SWIG (see some links at the end of this post), but for a small library with 3 exported functions it's feasable to do everything by hand.

## Bindings

**my_library_wrap.cxx**

```cpp
#include <node.h>
#include <v8.h>
#include <assert.h>

#include "my_library.h"

namespace {

// std::string make_password(std::string id, int sequence, int version);
void MakePassword(const v8::FunctionCallbackInfo<v8::Value>& info) {
  assert(info[0]->IsString());
  assert(info[1]->IsInt32());
  assert(info[2]->IsInt32());

  auto isolate = info.GetIsolate();
  v8::String::Utf8Value id(isolate, info[0]);
  if (id.length() != ID_LENGTH) {
    auto exception = v8::Exception::Error(v8::String::NewFromUtf8(isolate,
      "Bad ID length").ToLocalChecked());
    isolate->ThrowException(exception);
    return;
  }
  v8::Local<v8::Int32> sequence = info[1].As<v8::Int32>();
  v8::Local<v8::Int32> version = info[2].As<v8::Int32>();
  std::string id_s(*id, id.length());
  std::string password = make_password(id_s, sequence->Value(), version->Value());
  v8::Local<v8::String> result = v8::String::NewFromUtf8(isolate, password.data()).ToLocalChecked();
  info.GetReturnValue().Set(result);
}

void Initialize(v8::Local<v8::Object> exports, v8::Local<v8::Value> module, v8::Local<v8::Context> context, void* priv)
{
  auto isolate = context->GetIsolate();
  key = v8::String::NewFromUtf8(isolate, "makePassword").ToLocalChecked();
  value = v8::FunctionTemplate::New(isolate, MakePassword)->GetFunction(context).ToLocalChecked();
  assert(exports->Set(context, key, value).IsJust());
}

} // namespace

NODE_MODULE_CONTEXT_AWARE(NODE_GYP_MODULE_NAME, Initialize)
```

- [Hello world](https://github.com/nodejs/node/blob/master/test/addons/hello-world/binding.cc) of Node.js bindings
- [v8 docs](https://v8.dev/docs/embed)
- [V8 API Reference Guide](https://v8docs.nodesource.com/node-16.0/) (Node 16)
  - [FunctionCallbackInfo](https://v8docs.nodesource.com/node-16.0/dd/d0d/classv8_1_1_function_callback_info.html)
  - [Local](https://v8docs.nodesource.com/node-16.0/de/deb/classv8_1_1_local.html)
  - [Maybe](https://v8docs.nodesource.com/node-16.0/d9/d4b/classv8_1_1_maybe.html)


### Config file

**binding.gyp**

```json
{
  'targets': [
    {
      'target_name': 'my_library',
      'sources': ['my_library_wrap.cxx', 'my_library.cpp'],
      'include_dirs': ['thirdparty/include'],
      'defines': [
          'OPENSSL_CONFIGURED_API=0x10101000L',
          'OPENSSL_API_COMPAT=0x10101000L',
        ],
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'libraries': ['-L<(module_root_dir)/thirdparty/lib', '-lPocoFoundation', '-lPocoCrypto']
    }
  ]
}
```

- [exception handling disabled](https://github.com/nodejs/node-gyp/issues/17)
- [link libraries](https://github.com/nodejs/node-gyp/issues/328)


### Build

```bash
node-gyp configure
node-gyp build
```


### v8 config

_???_ I don't remember why I looked into that :)

```
target_cpu = "x64"
use_custom_libcxx = false
v8_enable_i18n_support = false
v8_static_library = false
v8_monolithic = false
v8_expose_symbols = true
```

- [Chromium v8 config](https://chromium.googlesource.com/v8/v8.git/+/master/gni/v8.gni)
- [Building V8 with GN](https://v8.dev/docs/build-gn)


## SWIG

- [https://stackoverflow.com/questions/9629677/how-can-i-use-a-c-library-from-node-js/27917698#27917698](https://stackoverflow.com/questions/9629677/how-can-i-use-a-c-library-from-node-js/27917698#27917698)
- [https://github.com/swig/swig/wiki/Getting-Started](https://github.com/swig/swig/wiki/Getting-Started)

```
git clone https://github.com/swig/swig.git
cd swig
./autogen.sh && ./configure && make
```
