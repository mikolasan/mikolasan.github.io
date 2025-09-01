---
title: Host isolation
date: 2025-02-21
published: 2025-02-21
lastModified: 2025-02-21
subtitle: Make absolutely lonely subnet with your router
---
You need 2 rules.
## In

name: LONELY_IN

description: guest to LAN/WAN

default action Drop

interface: eth2, direction in

rules:

1. allow http. source port 8080, protocol TCP, action Accept
2. 3. allow ssh. source port 22, protocol TCP, action Accept
3. drop guest to LAN. destination: network group LAN_NETWORKS. protocol all, action Drop

## Local

name: LONELY_LOCAL

description: guest to router

default action Drop

interface: eth2 direction local

rules:

1. allow DNS. destination port 53, protocol TCP/UDP, action Accept
2. allow DHCP. destination port 67, protocol UDP, action Accept