---
title: If you hate OpenSSL
subtitle: like for mandatory upgrade from 1.1.1 to 3.0
date: 2024-05-10
published: 2024-05-10
lastModified: 2024-05-10
---

Then here is the list of alternatives

## Intel-IPP

Links: [https://software.intel.com/en-us/intel-ipp](https://software.intel.com/en-us/intel-ipp) , [https://github.com/intel/ipp-crypto](https://github.com/intel/ipp-crypto)
  - Apache license
  - CON: Only crypto primitive, no certificate, no TLS

## Libsodium

Links: [https://doc.libsodium.org/](https://doc.libsodium.org/), [https://github.com/jedisct1/libsodium](https://github.com/jedisct1/libsodium)
  - ISC license
  - CON: Only crypto primitive, no certificate, no TLS

## BoringSSL

Links: [https://github.com/google/boringssl](https://github.com/google/boringssl)
  - ISC license
  - CON: Google only project. It says: “We don't recommend that third parties depend upon it.”

## WolfSSL

Links: [https://www.wolfssl.com/](https://www.wolfssl.com/), [https://github.com/wolfSSL/wolfssl](https://github.com/wolfSSL/wolfssl)
  - GPL license
  - CON: GPL License issue.

## BearSSL

Links: [https://bearssl.org/](https://bearssl.org/)
  - MIT license
  - CON: Current version is 0.6. It is now considered beta-quality software.