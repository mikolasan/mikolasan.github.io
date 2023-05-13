---
date: 2022-05-26
title: SHA1 with HMAC using OpenSSL
published: 2022-05-26
lastModified: 2022-05-26
---

Taking the message you want to authenticate and combining it with a secret key creates a "message authentication code" (MAC). HMAC stands for "Hash-based Message Authentication Code".

Here's is how you calculate a hash using openssl cli:

```bash
openssl dgst \
  -sha1 \
  -mac HMAC \
  -macopt hexkey:$(echo -n "<secret key string>" | od -A n -t x1 | sed 's/ *//g') \
  <file path>
```

1. Echo the secret key to standard output without a trailing newline character (`-n`).
2. `od` stands for "octal dump". 
  - `-A n` - don't print the address of the input data
  - `-t x1` - output the input data as a series of hexadecimal bytes
3. `'s/ *//g'` - removes any spaces between the hexadecimal bytes output