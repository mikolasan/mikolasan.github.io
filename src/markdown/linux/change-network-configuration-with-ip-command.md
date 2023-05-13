---
date: 2022-09-02
title: ip command
subtitle: Change network configuration
published: 2022-09-02
lastModified: 2022-09-02
---

## Change IP

Here are the commands used to change the network settings by adding or removing IP addresses and turning on or off network interfaces. 

They can be useful when you want to connect your computer to a different network or when you want to troubleshoot network connectivity issues.

```bash
ip addr del 192.168.1.2/24 dev eno1
ip addr add 192.168.0.2/24 dev eno1
ip link set up dev eno1
```

1. Remove the IP address `192.168.1.2` that is assigned to a network interface called `eno1`. The `/24` part is a fancy way of saying that it is a small network (it is equivalent to the `255.255.255.0` network mask).
2. Add a new IP address `192.168.0.2` to the same network interface called `eno1`. This is like giving your computer a new phone number that other devices can use to call it.
3. Turn on the network interface eno1 so that it can start communicating with other devices on the network. It's like turning on the switch for a light bulb so that it can start working. 


## Set default gateway

```bash
ip route change default via 192.168.0.1 dev eno1
```

It's like telling your computer to use a specific road to get to your friend's house, "go through the big park".