---
title: Before uploading files to cloud storage
subtitle: Encrypt them!
date: 2025-02-24
published: 2025-02-24
lastModified: 2025-02-24
---

Before uploading your files to [any cloud storage](/blog/degoogling) for backup purposes, it is a good idea to restrict unsanctioned access to your information.

Download [gpg](https://www.gnupg.org/download/). By the way, I do it on Windows.

```sh
gpg --gen-key
gpg --output revocation.crt --gen-revoke <your email>
```

> Create a Revocation Certificate. This should be done as soon as you make the key pair, not when you need it. [source](https://www.digitalocean.com/community/tutorials/how-to-use-gpg-to-encrypt-and-sign-messages#how-to-make-your-public-key-highly-available)


Note: Who is Mallory?

### Other GPG commands

List local keys

```
gpg -k
```

Prepare your public key for hard copy exchange
```
gpg --export -a email@address.com > ~/neupokoev.gpg
```

Upload your key to the server
```
gpg --send-keys 9F10192825F0EBA5C05FEA5363D4FD2BF3515F41
```

So anyone can find it
```
gpg --search-keys email@address.com
```

But what they need, is to install it from the server
```
gpg --recv-keys 9F10192825F0EBA5C05FEA5363D4FD2BF3515F41
```

## Encrypt for myself

```sh
gpg --encrypt --sign --armor -r <your email> <file or archive>
```

## Decrypt

```sh
gpg <file or archive>.asc
```

## Upload to storage

Another tool, [rclone](https://rclone.org/downloads/) that just works on Windows as well as on Linux

```sh
rclone copy <file or archive>.asc google-drive:
```

Or maybe someone already created a [cloud storge file manager](/ideas/cloud-storage-file-manager)?
