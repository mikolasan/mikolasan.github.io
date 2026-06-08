---
title: IRC server
subtitle: Install on Raspberry Pi
date: 2025-02-28
published: 2025-02-28
lastModified: 2025-08-30
---

Probably you have seen on Mastodon people advocating for RSS, forums and IRC as a foundation of new cozy and niche internet without big tech companies. So I want to check if there’s a real reincarnation of these old things. (Except emails, because I believe in real paper mails -they are much cooler.)

I started to play with the system on my Raspberry Pi. It doesn’t boot from an SD card, but it can boot from a USB stick. But during `apt upgrade` I lost the ssh connection, decided to power cycle the board, and now it doesn’t boot. On Windows I fixed the file system on the first partition, and it started blinking but still no booting. Apparently, the kernel file was corrupted and I needed to replace it with a genuine one file from another place.

So anyway, back to installing an IRC server. I already have done it on a Debian machine:

```sh
wget https://github.com/inspircd/inspircd/releases/download/v4.3.0/inspircd_4.3.0.deb12u1_amd64.deb
apt install ./inspircd_4.3.0.deb12u1_amd64.deb
apt install gnutls-bin

certtool --generate-privkey --outfile key.pem
certtool --generate-privkey --outfile ca-key.pem
certtool --generate-certificate --load-privkey key.pem --outfile cert.pem
certtool --generate-self-signed --load-privkey ca-key.pem  --outfile ca-cert.pem
# certtool --generate-dh-params --sec-param normal --outfile dhparams.pem
mkdir /etc/inspircd/keys
mv key.pem cert.pem /etc/inspircd/keys

chmod 644 /etc/inspircd/keys/*
chown -R irc:irc /etc/inspircd/

ufw allow 6697/tcp
systemctl start inspircd
journalctl -u inspircd.service
```

Interesting, that you can test your custom certificates with [gnutls](https://www.gnutls.org/manual/html_node/certtool-Invocation.html):

```sh
cd /etc/inspircd/keys
gnutls-serv --x509certfile ca-cert.pem --x509keyfile ca-key.pem
HTTP Server listening on IPv4 0.0.0.0 port 5556...done
HTTP Server listening on IPv6 :: port 5556...done
```
## Build from sources

Doing fun Linux stuff first: compiling an IRC client from source. (Because **inspircd** doesn't have debian packages for arm64)

No, I'm serious, I like it. Doing that you will feel that your computer is a sandbox and you can make programs from raw instructions. For the record, I'm not saying that I like Gentoo - that is overboard.

```sh
sudo apt install libpq-dev libgnutls28-dev

git clone https://github.com/inspircd/inspircd.git
cd inspircd
./configure
make install

/home/nikolay/irc/inspircd/run/conf/
```

To get features that one would expect from a normal chat (permanent channels, backlog of messages, user registration) I added [Anope](https://github.com/anope/anope) (just a random choice, not sure that I like it)
```sh
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

### Anope Servers

These commands I tried, not all of them worked, because it depends on Anope configuration also. For some reason I still cannot login as an OP.

- register a user `/msg NickServ REGISTER <pass>`
- register a moderator `/oper <user> <password>`
- create a permanent channel `/msg ChanServ REGISTER #general`
- other [NickServ Commnds](https://www.geekshed.net/commands/nickserv/)
- and other [NickServ Commnds](https://gist.github.com/parsa/8d03ea272add575c67cc9b9305c5237a)

## Reference

- Web interface - Kiwi IRC  ([configuration](https://github.com/kiwiirc/kiwiirc/wiki/Configuration))
- Very long dump but maybe helpful https://clients.sisrv.net/knowledgebase/89/How-to-build-your-own-InspIRCd-IRC-Server-and-Anope.html
- IRC bouncer [ZNC](https://wiki.znc.in/ZNC)
- Writing [my chat platform](/code/rust/irc-server-and-modern-chat) in Rust