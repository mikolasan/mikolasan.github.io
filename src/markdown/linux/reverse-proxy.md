---
title: Reverse Proxy
date: 2023-02-22
published: 2025-02-04
lastModified: 2023-02-23
---

I was looking for a reverse proxy for my self-hosted services. The choice is hard. I found 4 options:
- ~Apache~
- nginx
- traefik
- Caddy
- feron ([https://www.ferronweb.org/docs/modules/](https://www.ferronweb.org/docs/modules/) [https://github.com/ferronweb/ferron](https://github.com/ferronweb/ferron) )

## Traefik

I don't know why I didn't choose **nginx**. I was not a fan of [Apache](https://www.jenkins.io/doc/book/system-administration/reverse-proxy-configuration-apache/) so I concluded that configuring **nginx** will be the same mess. Or **nginx** has this only in a paid version? Anyway, I decided that small unknown teams could make it better and based on the amount of docs I chose Traefik.

So on the Edge Router I moved the gui port from 80/443 to 9080/9443 and disabled access from WAN

```bash
configure
set service gui https-port 9443
set service gui listen-address 192.168.0.1
commit
save
exit
```

Then got a free SSL certificate

```bash
sudo certbot certonly --standalone
```

Installed [Traefik](https://doc.traefik.io/traefik/routing/routers/#tls) . Configuration based on two files. 

One base config: **traefik.yml**

```yml
global:
  checkNewVersion: false
  sendAnonymousUsage: false

entryPoints:
  web:
    address: :80
    http:
      redirections:
        entrypoint:
          to: websecure
          scheme: https

  websecure:
    address: :443

log:
  level: DEBUG

api:
  insecure: true
  dashboard: true

providers:
  file:
    filename: dynamic_conf.yml

  docker:
    defaultRule: Host(`{{ normalize .Name }}.docker.localhost`)
    exposedByDefault: true 
```

And the place where you define / add / delete hostnames and services without restarting the server: **dynamic_conf.yml**

```yml
http:
  routers:
    social-xyz:
      entrypoints: websecure
      rule: "Host(`social.neupokoev.xyz`)"
      service: social
      tls: {}

  middlewares:

  services:
    social:
      loadBalancer:
        servers:
        - url: "http://192.168.0.130:8080/"

tls:
  certificates:
    - certFile: /etc/letsencrypt/live/***/fullchain.pem
      keyFile: /etc/letsencrypt/live/***/privkey.pem
    - certFile: /etc/letsencrypt/live/***/fullchain.pem 
      keyFile: /etc/letsencrypt/live/***/privkey.pem
```

And a systemd file **/etc/systemd/system/reverse-proxy.service**

```ini
[Unit]
Description=Reverse proxy

[Service]
Type=simple
WorkingDirectory=/<path_to>/traefik
SyslogIdentifier=traefik
ExecStart=/<path_to>/traefik/traefik --configfile traefik.yml
User=root
Group=root
Restart=always
RestartSec=20
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```


## Caddy