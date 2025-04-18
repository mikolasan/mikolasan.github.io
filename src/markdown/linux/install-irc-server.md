---
title: IRC server
subtitle: Install on Raspberry Pi
date: 2025-02-28
published: 2025-02-28
lastModified: 2025-02-28
---

Probably you have seen on Mastodon people advocating for RSS, forums and IRC as a foundation of new cozy and niche internet without big tech companies. So I want to check if there’s a real reincarnation of these old things. (Except emails, real paper mails are much cooler.)

I started to play with the system on my raspberry pi. It doesn’t boot from an SD card, but it can boot from a USB stick. But during `apt upgrade` I lost the ssh connection, decided to power cycle the board, and now it doesn’t boot. On Windows I fixed the file system on the first partition, and it started blinking but still no booting. Apparently, the kernel file was corrupted and I needed to replace it with a genuine one file from another place.

## Build from sources

Doing fun Linux stuff first: compiling an IRC client from source.  

No, I'm serious, I like it. Doing that you will feel that your computer is a sandbox and you can make programs from raw instructions. For the record, I'm not saying that I like Gentoo - that is overboard.

```bash
sudo apt install libpq-dev libgnutls28-dev

git clone https://github.com/inspircd/inspircd.git
cd inspircd
./configure
make install

/home/nikolay/irc/inspircd/run/conf/

git clone https://github.com/anope/anope.git
cd anope
./Config
cd build
make
make install
```


## CLI Client

I remotely connected to a Raspberry Pi board. I use a custom terminal ([Alacritty](/blog/alacritty-everywhere) with Source Code Pro font), but it's nothing special, standard Windows terminal or MinGW will do the same. I have a tmux session open (fancy powerline at the top can tell that) and it will become handy when I will start the IRC client there. The web page about irssi IRC client is pretty. I was considering to install sic from the "suckless" tools (yeah, there is such a philosophy among developers) but then I looked at irssi and their purple theme...

## Self-signed certificates

Add security level. For irssi: [Connect to a server which uses a self-signed certificate](https://joshcurry.co.uk/posts/irssi-connect-to-a-server-which-uses-a-self-signed-certificate/)

## Web client

```bash
wget https://kiwiirc.com/downloads/kiwiirc_20.05.24.1-1_amd64.deb
apt install ./kiwiirc_20.05.24.1-1_amd64.deb

/etc/kiwiirc/client.json
/etc/kiwiirc/config.conf
```

Added to the welcome page a hint that I just watched Interstellar for the hundredth time:
```html
<p>
Do not go gentle into that good night,<br>
Old age should burn and rave at close of day;<br>
Rage, rage against the dying of the light.
</p>
```

### Reverse proxy with Apache 2

According to [the kiwiirc documentation](https://gist.github.com/ItsOnlyBinary/3e38b66d71e51d12d7df32f739978799) this should be enough but for some reason the websoket part (I assume that, because static files are served just fine) doesn't work. Maybe my Apache config is broken somewhere else, or maybe [the issue is still there](https://github.com/prawnsalad/KiwiIRC/issues/499)

```
    # requires: a2enmod rewrite proxy proxy_wstunnel
    RewriteEngine   On
    RewriteCond %{HTTP:UPGRADE} ^WebSocket$ [NC]
    RewriteRule .* ws://localhost:6080%{REQUEST_URI} [P,QSA,L]

    # Reverse proxy http connections
    # requires: a2enmod proxy proxy_http
    ProxyVia On
    ProxyRequests Off
    ProxyPass /webirc/ http://localhost:6080/webirc/
    ProxyPassReverse /webirc/ http://localhost:6080/webirc/
    ProxyPreserveHost on

    # Set header to allow the irc connection to be marked as secure
    # requires: a2enmod headers
    RequestHeader set "X-Forwarded-Proto" expr=%{REQUEST_SCHEME}
```


## IRC commands

### Server window

- `/list` - list of channels to join

### In the channel

- `/names` - list of users
- To tag a person - just type in their nickname

## Reference

- Very long dump but maybe helpful https://clients.sisrv.net/knowledgebase/89/How-to-build-your-own-InspIRCd-IRC-Server-and-Anope.html