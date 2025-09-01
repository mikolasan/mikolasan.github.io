---
title: SSH tunnels
date: 2023-12-09
published: 2023-12-09
lastModified: 2023-12-09
---
## One client connects to a network

We will ssh to one machine in a remote network (this doesn't make sense in a local network) and will redirect port from another machine (I used this to setup a router through a web interface).

We will need two terminals. First, connect to the remote machine **10.10.0.123** and create a tunnel. But there is nothing on port 8888 yet.

```
ssh user@10.10.0.123 -L 8888:localhost:8888
```

Second, redirect to port 8888 on **10.10.0.123** traffic from **10.10.0.1:443**.

```
ssh user@10.10.0.123 -L 8888:10.10.0.1:443
```


Now locally access in the browser [https://localhost:8888](https://localhost:8888) which will be the same as if you are in the remote network accessing https://10.10.0.1:443.


## Both clients behind NAT

They must meet at a neutral location that has a public IP address, and a ssh server listening on port 22. Let's say this address is **10.20.30.40**.

### Client 1

Connect to the rendezvous host and leave there an entry point available locally on port 20000 

```
ssh -R 20000:127.0.0.1:22 user@10.20.30.40
```

### Client 2

Run 2 commands in separate terminals. First, also connect to the rendezvous host, find there a local port 20000, and make it available locally (locally for client 2) at 21000:

```
ssh -o PubkeyAuthentication=no -L 21000:127.0.0.1:20000 user@10.20.30.40
```

Second, connect to the tunnel we just opened:

```
ssh -o PubkeyAuthentication=no bingo@127.0.0.1 -p 21000
```

## Not ssh solutions

- [fowl](https://fowl.readthedocs.io/en/latest/)
- [Magic Wormhole](https://magic-wormhole.readthedocs.io/en/latest/)