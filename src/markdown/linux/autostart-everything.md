---
title: Autostart everything
date: 2025-05-26
published: 2025-05-26
lastModified: 2025-05-26
---
I already got used to auto-starting services when they run with **docker compose** or **docker stack**, but I like it even more when the apps run natively without extra layers of virtual networks or file systems and mounting. And this is where **systemd**, a thing that is in every modern Linux distribution by default, will do that for us. But we will need to write a service file first. And the syntax is INI and it's not very user-friendly.

As far as I remember, all the configs have three sections. It's either **Service** and **Unit** and **Install**. The middle one is a core - where you specify 

- how to run this thing (what executable and what arguments)
- set environment variables
- how and when to restart
- where to write logs
- working directory and permissions
- maybe something else, but I don't really go so hardcore about this thing

So let me try to create one from memory for a bookmark tool / offline reader  I recently got obssessed with - [Readeck](https://readeck.org/en/). This will demonstrate how their awkward syntax prevents me from using systemd extensively. That's why I always need to keep a template nearby, and if I were to write this from memory, it would turn out something like this

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

The last section has a weird name, `Install`, that's why I remembered it. It's like when you write instructions for the CMake build system for local development when you never plan to specify details on how it should be installed system-wise. 

Why didn't you just make it so people could create a service file using a single line
```init
Run=/home/nikolay/readeck
```
and systemd would use default values for other parameters. But no.

In order this thing really to work we need to make the following corrections.

Section order: `[Unit]` should come first, followed by `[Service]`, then `[Install]`.

Fix syntax errors:
- Remove spaces around `=` signs
- - `Name=` → `Description=`
- `Exec=` → `ExecStart=`
- `Wanted-by` → `WantedBy`
- `multiuser.target` → `multi-user.target`

Add helpful directives I missed:
- `After=network.target` ensures network is available before starting
- `Restart=always` automatically restarts on failure
- `RestartSec=5` waits 5 seconds before restarting

The result

```ini
[Unit]
Description=Readeck - Self-hosted bookmark manager
After=network.target

[Service]
Type=simple
User=nikolay
Group=nikolay
WorkingDirectory=/home/nikolay/readeck
ExecStart=/home/nikolay/readeck/readeck
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal
SyslogIdentifier=readeck

[Install]
WantedBy=multi-user.target
```

So this will be for my headless little bolt computer (it ain't cheap, but I got it for free as a decommissioned peace from work).

And we will be installing this fresh file into a place where **systemd** can see it and where usually you should put your manually created services: **/etc/systemd/system** (**/usr/lib/systemd/system** is used by package managers and it is very crowded)