---
date: 2022-09-02
title: Move docker image between computers
published: 2022-09-02
lastModified: 2022-09-02
---

In some scenarios when you don't have access to the Docker registry, or limited or no internet, then this approach can be hepful.

Save image as a tar archive

```bash
docker save -o docker-image.tar <image name or ID>
```

Once you have the tar archive, move it to another machine (on USB, over ssh), and there execute

```bash
docker load -i docker-image.tar
docker images | grep <image ID>
docker tag <image ID> <image name:image tag>
```