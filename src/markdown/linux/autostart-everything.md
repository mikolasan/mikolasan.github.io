---
title: Autostart everything
date: 2025-05-26
published: 2025-05-26
lastModified: 2025-05-26
---
I already got used to auto-starting services when they run with **docker compose** or **docker stack**, but I like it even more when the apps run natively without extra layers of virtual networks or file systems and mounting. And this is where **systemd**, a thing that is in every modern Linux distribution by default, will do that for us. But we will need to write a service file first. And the syntax is INI and it's not very user-friendly.

So let me try to create one from memory for a bookmark tool / offline reader  I recently got obssessed with - [Readeck](https://readeck.org/en/).

```ini
[Service]
Name = Readeck

[Unit]
Type=simple
WorkingDirectory=/home/nikolay/readeck
Exec=/home/nikolay/readeck
User=nikolay
Group=nikolay

[Install]
Wanted-by = multiuser.target
```


As far as I remember, all the configs have three sections. It's either Service and Unit and Install. The middle one is a core - where you specify 
- how to run this thing (what executable and what arguments)
- set environment variables
- how and when to restart
- where to write logs
- working directory and permissions
- maybe something else, but I don't really so hardcore about this thing

The last one has a weird name, that's why I remembered it. It's like when you write instructions for a CMake build system for local development when you never plan to invent details how it should be installed system-wise. 

So this will be for my headless little bolt computer (it ain't cheap, but I got it for free as a decommissioned peace from work).

And we will be installing this fresh file into a place where **systemd** can see it and where usually you should put your manually created services: **/etc/systemd/system** (**/usr/lib/systemd/system** is used by package managers and it is very crowded)