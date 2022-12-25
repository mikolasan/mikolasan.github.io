---
date: 2021-10-15
title: Containerized builds with Docker
subtitle: Build C++ app written with the new standard (c++20) on Ubuntu 18.04 in 2022
featuredImage: steelworks.jpg
published: 2022-07-17
lastModified: 2022-07-17
---

<i>Photo by <a href="https://unsplash.com/@rozetsky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ant Rozetsky</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></i>


# Why it happens

On my personal workstation I use Manjaro, which is a version of Arch with a nice installer and less frequent updates, which is also nice. But for production we need to deploy to Debian or Ubuntu of specific version.

So here is why I like Manjaro/Arch: I can use cutting edge technologies without a hassle of searching for newer package versions in untrusted/outdated PPA or building from sources by myself - there's such thing as AUR where with a high chance you can find any library/tool that you are looking for.

You might say

> If you are not using the same Linux distribution in development and in production, then you introduce additional work to yourself. Stop dreaming about GCC 12, install Ubuntu whatever version you need for production and case is closed.

Maybe I would follow this recommendation if I would not be so proficient with docker. In fact I just force my internal lazy developer to follow best practices of CI/CD. And here's how.

When I create a docker file I unknowingly create documentation on how to build my app. I create instructions that will work on any machine that can run docker. And it's true while docker has Ubuntu version that I'm targeting for. In another words my app will build without errors no matter what sequel of Fast and Furious people are watching in cinema these days.

# My goal

Build C++ app written with the new standard (c++20) on Ubuntu 18.04 in 2022

# TL;DR

How to build

```bash
docker build -t myapp:master -f Dockerfile .
docker rm -f myapp-sdk
docker create -ti --name myapp-sdk myapp:master
docker cp myapp-sdk:/app/build/myapp ./
docker rm -f myapp-sdk
```

**Dockerfile**

```dockerfile
FROM ubuntu:bionic

## for apt to be noninteractive
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

## preesed tzdata, update package index, upgrade packages and install needed software
RUN truncate -s0 /tmp/preseed.cfg; \
    echo "tzdata tzdata/Areas select US" >> /tmp/preseed.cfg; \
    echo "tzdata tzdata/Zones/US select Pacific" >> /tmp/preseed.cfg; \
    debconf-set-selections /tmp/preseed.cfg \
    && rm -f /etc/timezone /etc/localtime \
    && apt-get update && apt-get -y install \
    software-properties-common \
    make \
    libzmq3-dev \
    libpcap-dev

# install GCC 11
RUN add-apt-repository ppa:ubuntu-toolchain-r/test \
    && apt-get update && apt-get -y install g++-11 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# install latest cmake (https://askubuntu.com/a/889453/434353, https://cmake.org/download/)
ADD https://github.com/Kitware/CMake/releases/download/v3.21.3/cmake-3.21.3-linux-x86_64.sh /cmake-linux-x86_64.sh
RUN mkdir /opt/cmake \
    && sh /cmake-linux-x86_64.sh --prefix=/opt/cmake --skip-license \
    && ln -s /opt/cmake/bin/cmake /usr/local/bin/cmake

COPY . /app
WORKDIR /app

RUN export CC=/usr/bin/gcc-11; export CXX=/usr/bin/g++-11 \
    && cmake -DCMAKE_BUILD_TYPE=Release -S . -B build \
    && cmake --build build --target all
```

Make sure to install libraries if you link against them. I have `libzmq3-dev` and `libpcap-dev` in this example.

**.dockerignore**

```
/.vscode
/build
```

# Explanation

## build

```bash
docker build -t myapp:master -f Dockerfile .
```

`docker build` reads **Dockerfile** and creates an image. Every command in **Dockerfile** is a layer on top of the base system. Instruction `FROM` defines the base. In our case it’s Ubuntu 18.04 (codename bionic). Then it installs all required packages. It also applies few fixes to make `apt-get update` work on my machine. Then it copies sources into the image skipping files and directories from **.dockerignore**. 

It copies files in whatever state they are - be careful when start a build on a dirty repository. Check with `git status` before proceed. 

On the same step we run all **cmake** stuff. Some developers only prepare the system on build step, and execute build instructions with `docker run`. Transition to such approach is very simple: replace the last `RUN` with `CMD`. I prefer to build everything in one command and already have artifacts in the image before I create a container.

Some other developers prefer even trickier solution that eliminates coping sources from host to the container. It's similar to the `docker run` approach, except you also need to mount your local source tree to the container. It probably saves space and time for big projects, but I like to have an exact copy of sources in the container for incident investigation if such thing happens.

## rm

```bash
docker rm -f myapp-sdk
```

Based on that image we will create a live system - a container. You can do any operations only with containers, not images. But containers based on images. Containers like a cake, where image is a recipe. To make sure that there is no container with name **myapp-sdk**, we remove it.

## create

```bash
docker create -ti --name myapp-sdk myapp:master
```

With `docker create` we create a container with specified name. But it is different from `docker run` or `docker exec`. Here is a quote from the docs:

> The `docker create` command creates a writeable container layer over the specified image and prepares it for running the specified command. The container ID is then printed to `STDOUT`. This is similar to `docker run -d` except the container is never started. You can then use the `docker start <container_id>` command to start the container at any point.

So container is there, but it’s not running - means it’s not consuming memory and resources of your computer, but you can take build artifacts from it.

## cp

```bash
docker cp myapp-sdk:/app/build/myapp ./
```

The copy command has bad documentation ([docker cp](https://docs.docker.com/engine/reference/commandline/cp/) - just look how many downvotes this page has!)

```bash
docker cp e909db63a534:/app/build/myapp ./
```

Instead of name you can use container ID, you need its short form. But be careful: use container ID, not image ID. Read the metaphor about the cake again.

To get the container ID run `docker ps -a`. 

```bash
docker ps -a
CONTAINER ID   IMAGE                    COMMAND                  CREATED              STATUS                          PORTS     NAMES
64568f4fe55f   myapp:master           "/bin/bash"              17 hours ago         Created                                   myapp-sdk
```
But it’s better to use a name that we used in the `docker create` command.

Do not confuse it with image "name" (technically it’s a tag) **myapp:master**.

## rm again

```bash
docker rm -f myapp-sdk
```

The last step is clean up - remove the container

# Example with `docker run`

Using the same **Dockerfile** we create an image

```bash
docker build -t myapp:master -f Dockerfile .
```

But then we run a container

```bash
docker run -it --name myapp-cmd myapp:master bash
```

With this command we jump into container’s terminal (important to use `-it` flag here) and can run build scripts over and over

# Example with `docker exec`

In order to use `docker exec`, the container must be running. 

```bash
docker exec 64568f4fe55f ls
Error response from daemon: Container 64568f4fe55ffd1fddc5c6021ecd0ed9a1313cd36c4eaab711c60dbd53c21dae is not running
```

Execute `docker run` with `-d -t` flags:

```bash
docker run -d -t --name myapp-cmd myapp:master
```

To run a container again you need to remove a previous one that was created with the same name

```bash
docker: Error response from daemon: Conflict. The container name "/myapp-cmd" is already in use by container "334905f5a32c98c8950005b11985c63ea79ed04b2a22b3a9f545149ce28020fe". You have to remove (or rename) that container to be able to reuse that name.
```

Remove

```bash
docker rm -f myapp-cmd
```

For example we can list files 

```
docker exec myapp-cmd ls /app/build
```

to verify what files actually exist in the container. `docker exec` also can take container ID (not image ID). Reminder: to get the container ID run `docker ps -a`. BTW in case you need image ID, then run `docker images`.

# Done

Okay, there are so many nuances with docker. I think it's time to wrap up for today. I hope this small docker instruction will help someone (or even me in the future) to easily build their C++ app.