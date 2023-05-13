---
title: SSL/TLS client socket with OpenSSL
date: 2023-01-26
published: 2023-01-26
lastModified: 2023-01-26
---

- **When does verification happen?** From [this wiki](https://wiki.openssl.org/index.php/SSL/TLS_Client) it seems like the [get function](https://www.openssl.org/docs/man1.1.1/man3/SSL_get_verify_result.html) does it.
- **What security level to use?** https://www.openssl.org/docs/man1.1.1/man3/SSL_CTX_set_security_level.html
- **How big the keys can be?** Or will it affect the performance when we start using keys greater than 15360 bits?