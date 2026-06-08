---
title: Sniff TCP traffic
date: 2023-04-03
published: 2023-04-03
lastModified: 2023-04-03
subtitle: Troubleshooting server deployment
---
When you develop components in a server-client architecture, there is a moment when you deploy them and nothing works. This is when you want to see if packets are really travelling in the network:

```bash
tcpdump port 5432 -i lo -X
```

`-i` is for specifying an interface, `-X` - ??? well, I need to check the man pages.

And also you would want to see if the ports are really open:

```bash
netstat -lpnt
```

(install it with `apt install net-tools`)


What path does traffic take to reach the server IP (check the routing table)?

```bash
ip route get 192.168.0.54
```

And which interface is actually sending (UDP example here)?

```bash
sudo tcpdump -i any udp port 51820 -n
```