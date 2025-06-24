---
title: Clear space on Linux
date: 2025-04-15
published: 2025-04-15
lastModified: 2025-04-15
---
So this happened when I was working on a Go project and quite frequently compiled binaries for deployment in docker containers. I didn't pay much attention to the input and missed that every time a build context was more then hundreds megabytes. In another words, I forgot to create a proper `.dockerignore` file that would skip big miscellaneous files not required for the compilation process.


```bash
sudo journalctl --rotate
sudo journalctl --vacuum-time=1s
sudo pacman -Scc
rm -r ~/.cache/vscode-cpptools/*
sudo systemd-tmpfiles --clean
coredumpctl list
sudo rm  /var/lib/systemd/coredump/*

docker image prune --all
docker system prune -a
```