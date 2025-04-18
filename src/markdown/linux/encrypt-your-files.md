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

Note: Who is Mallory?

### Encrypt for myself

```sh
gpg --encrypt --sign --armor -r <your email> <file or archive>
```

### Decrypt

```sh
gpg <file or archive>.asc
```

### Upload to storage

Another tool, [rclone](https://rclone.org/downloads/) that just works on Windows as well as on Linux

```sh
rclone copy <file or archive>.asc google-drive:
```

Or maybe someone already created a [cloud storge file manager](/ideas/cloud-storage-file-manager)?
