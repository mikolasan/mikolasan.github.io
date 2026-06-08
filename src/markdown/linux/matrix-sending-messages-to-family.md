---
title:
date: 2026-04-26
published: 2026-04-26
lastModified: 2026-05-01
---
Today we are installing Matrix on my home lab server. 

## Prepare files

Folders

```
mkdir files schemas mautrix-twitter
```

I have this **docker-compose.yml**

```yaml
services:

  synapse:
    image: ghcr.io/element-hq/synapse
    restart: unless-stopped
    # NOTE: You must edit homeserver.yaml to use postgres, it defaults to sqlite
    environment:
      - SYNAPSE_CONFIG_PATH=/data/homeserver.yaml
    volumes:
      - ./files:/data
    depends_on:
      - db
    ports:
      - 127.0.0.1:8008:8008/tcp

  db:
    image: docker.io/postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=synapse
      - POSTGRES_PASSWORD=XXX
      - POSTGRES_INITDB_ARGS=--encoding=UTF-8 --lc-collate=C --lc-ctype=C
    volumes:
      - ./schemas:/var/lib/postgresql/data

  mautrix-twitter:
    image: dock.mau.dev/mautrix/twitter
    restart: unless-stopped
    volumes:
      - ./mautrix-twitter:/data
    depends_on:
      - synapse
```

Run the config generator first if you haven't already to get your signing key and log config file created:

```bash
docker run -it --rm \
    -v $(pwd)/files:/data \
    -e SYNAPSE_SERVER_NAME=matrix.neupokoev.xyz \
    -e SYNAPSE_REPORT_STATS=no \
    ghcr.io/element-hq/synapse generate
```

And this is my final version of **files/homeserver.yaml**

```yaml
server_name: "matrix.neupokoev.xyz"
pid_file: /data/homeserver.pid
listeners:
  - port: 8008
    tls: false
    type: http
    x_forwarded: true
    resources:
      - names:
          - client
          - federation
        compress: false
    
database:
  name: psycopg2
  args:
    user: synapse
    password: XXX
    dbname: synapse
    host: db
    cp_min: 5
    cp_max: 10
log_config: "/data/matrix.neupokoev.xyz.log.config"
media_store_path: /data/media_store
registration_shared_secret: "XXX"
report_stats: false
macaroon_secret_key: "XXX"
form_secret: "XXX"
signing_key_path: "/data/matrix.neupokoev.xyz.signing.key"
trusted_key_servers:
  - server_name: "matrix.org"
    
#turn_uris:
#  - "turns:matrix.neupokoev.xyz:5349?transport=udp"
#  - "turns:matrix.neupokoev.xyz:5349?transport=tcp"
#  - "turn:matrix.neupokoev.xyz:3478?transport=udp"
#  - "turn:matrix.neupokoev.xyz:3478?transport=tcp"
#turn_shared_secret: "XXX"
#turn_user_lifetime: 86400000
#turn_allow_guests: false

experimental_features:
  # MSC3266: Room summary API. Used for knocking over federation
  msc3266_enabled: true
  # MSC4222 needed for syncv2 state_after. This allow clients to
  # correctly track the state of the room.
  msc4222_enabled: true

# The maximum allowed duration by which sent events can be delayed, as
# per MSC4140.
max_event_delay_duration: 24h

rc_message:
  # This needs to match at least e2ee key sharing frequency plus a bit of headroom
  # Note key sharing events are bursty
  per_second: 0.5
  burst_count: 30

rc_delayed_event_mgmt:
  # This needs to match at least the heart-beat frequency plus a bit of headroom
  # Currently the heart-beat is every 5 seconds which translates into a rate of 0.2s
  per_second: 1
  burst_count: 20

app_service_config_files:
  - /data/mautrix-twitter-registration.yaml

# vim:ft=yaml
```

Note: I removed keys, passwords and secrets with XXX 

Reverse proxy **/etc/caddy/Caddyfile**

```
matrix.neupokoev.xyz {
    reverse_proxy /_matrix/* localhost:8008
    reverse_proxy /_synapse/* localhost:8008

    handle /.well-known/matrix/server {
        header Content-Type application/json
        respond `{"m.server": "matrix.neupokoev.xyz:443"}` 200
    }

    handle /.well-known/matrix/client {
        header Content-Type application/json
        header Access-Control-Allow-Origin "*"
        header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
        header Access-Control-Allow-Headers "X-Requested-With, Content-Type, Authorization"
        respond <<JSON
            {
              "m.homeserver": { "base_url": "https://matrix.neupokoev.xyz" },
              "org.matrix.msc4143.rtc_foci": [
                {
                  "type": "livekit",
                  "livekit_service_url": "https://rtc.neupokoev.xyz/livekit/jwt"
                }
              ]
            }
        JSON 200
    }
}
```

When no hairpinning on the router, you need to configure your local DNS server. I use CoreDNS, its config **/etc/coredns/Corefile**

```
. {
    hosts {
        192.168.0.54 matrix.neupokoev.xyz
        fallthrough
    }
    forward . 192.168.0.54:5553
    cache
    errors
}
```

Where `192.168.0.54:5553` is another local DNS server lol

Because I started with AdGuard Home (fully free and open source, don't confuse with AdGuard DNS or simple AdGuard) and I liked it, but nevertheless I need to disable it sometimes, but I do not want to lose the hosts configuration, hence AdGuard is what controls upstreams, and CoreDNS is what rules my local homelab names. I installed Adguard Home on Manjaro using an AUR package.

Audio and video calls will configure and test later (I know that I will need TURN for that)

## Starting steps

Apply new Proxy and DNS settings

```bash
sudo systemctl restart coredns
sudo systemctl restart caddy
# or maybe just reload?
# sudo systemctl reload caddy
```

Create you first user (admin)

```bash
docker exec -it <synapse_container_id> \
	register_new_matrix_user \
	-c /data/homeserver.yaml http://localhost:8008
```

And then boom!

```bash
docker compose up -d
```

## Admin panel

If you add this to your **docker-compose.yml**:

```yaml
  synapse-admin:
    image: ghcr.io/etkecc/synapse-admin
    restart: unless-stopped
    ports:
      - 192.168.0.54:8080:8080
```

Where `192.168.0.54` is my server local IP address.

```bash
docker compose up -d synapse-admin
```

So in my local network it will be accessible on http://192.168.0.54:8080.

You can also make sure that the internal port is right:

```bash
docker exec -it synapse-synapse-admin-1 sh -c "netstat -tlnp"
```

My output was:

```
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.11:43907        0.0.0.0:*               LISTEN      -
tcp        0      0 :::8080                 :::*                    LISTEN      1/static-web-server
```
## Audio and video calls

### Matrix 2 standard

I decided to follow the wild wild West tactic and adopt Matrix 2 that is in development and available in Element X (just because Element X has better interface on iOS and Android comparing to FluffyChat and Element Classic... I should try [Shildi](https://schildi.chat/next/) though)

So, using Oracle Free Tier I spin up one instance to setup RTC there.

Element HQ guide: [Self-Hosting Element Call](https://github.com/element-hq/element-call/blob/livekit/docs/self_hosting.md)

- [MSC4195](https://github.com/matrix-org/matrix-spec-proposals/pull/4195) - about livekit
- [MSC4143](https://github.com/matrix-org/matrix-spec-proposals/pull/4143) - how Element X wants to do RTC. Last comment (4/30/2026): "Element X is not yet Matrix 2 mode compatible."

### Config files

**livekit.yaml** (reference: [config-sample.yaml](https://github.com/livekit/livekit/blob/master/config-sample.yaml))

```yaml
logging:
  level: debug

port: 7880

rtc:
  # The port range for media traffic
  port_range_start: 50000
  port_range_end: 50500

  # LiveKit TCP Fallback
  tcp_port: 7881

  node_ip: 84.235.246.221
  turn_servers:
    - host: rtc.neupokoev.xyz
      port: 3478
      protocol: udp
      secret: XXX
      ttl: 86400
    - host: rtc.neupokoev.xyz
      port: 3478
      protocol: tcp
      secret: XXX
      ttl: 86400

turn:
  enabled: false
  domain: localhost
  cert_file: ""
  key_file: ""
  tls_port: 5349
  udp_port: 443
  external_tls: true

room:
  auto_create: false

# API keys for JWT signing
keys:
  YOUR_KEY: YOUR_SECRET
```

**docker-compose.yml**

```yaml
services:
  # maybe not needed - TODO
  coturn:
    image: coturn/coturn
    network_mode: host
    volumes:
      - ./coturn/turnserver.conf:/etc/coturn/turnserver.conf
      - ./coturn/certs:/etc/coturn/certs:ro

  livekit:
    image: livekit/livekit-server:latest
    restart: always
    network_mode: host
    volumes:
      - ./livekit.yaml:/etc/livekit.yaml
    command: --config /etc/livekit.yaml

  lk-jwt-service:
    image: ghcr.io/element-hq/lk-jwt-service:latest
    container_name: jwt
    restart: always
    network_mode: host
    environment:
      - LK_JWT_PORT=8080
      - LIVEKIT_URL=wss://rtc.neupokoev.xyz/livekit/sfu
      - LIVEKIT_FULL_ACCESS_HOMESERVERS=matrix.neupokoev.xyz
      - LIVEKIT_KEY=XXX
      - LIVEKIT_SECRET=XXX

  caddy:
    image: caddy:latest
    container_name: caddy
    network_mode: host
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
```

lk-jwt-service:
- [repo](https://github.com/element-hq/lk-jwt-service)
- also known as MAS (MatrixRTC Authorization Service)
- [why livekit served from /livekit/sfu](https://github.com/element-hq/lk-jwt-service/issues/161)

**Caddyfile**

```
# could be `matrix-rtc`
rtc.neupokoev.xyz {
    # Route for lk-jwt-service with livekit/jwt prefix
    # like /livekit/jwt/sfu/get /livekit/jwt/healthz
    @jwt_service path /livekit/jwt*
    handle @jwt_service {
      uri strip_prefix /livekit/jwt
      reverse_proxy http://[::1]:8080 {
        header_up Host {host}
        header_up X-Forwarded-Server {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
      }
    }

    # Default route for livekit
    handle_path /livekit/sfu* {
      reverse_proxy http://localhost:7880 {
        header_up Host {host}
        header_up X-Forwarded-Server {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
      }
    }
}
```


### Testing

[Python tester](https://codeberg.org/spaetz/testmatrix) that verifies what publicly available (additionally, user and token can be provided)

```bash
python3 -m venv venv
./venv/bin/pip install testmatrix
./venv/bin/testmatrix \
	--user @nikolay:matrix.neupokoev.xyz \
	--token XXX \
	matrix.neupokoev.xyz 
```

More or less good output you might observe:

```bash
Testing server matrix.neupokoev.xyz
  Federation url: https://matrix.neupokoev.xyz:443
✔ Server well-known exists
✔ Client well-known has proper CORS header
  Client url: https://matrix.neupokoev.xyz
  Adding livekit service URL: https://rtc.neupokoev.xyz/livekit/jwt
✔ Server version: Synapse (1.151.0)
✔ Federation API endpoints seem to work fine
✔ Client API endpoints seem to work fine
  Server oauth metadata endpoint failed (spec 1.15)
  QR code login is disabled (MSC 4108)
  Public room directory is disabled
✔ MatrixRTC SFU configured
  Adding livekit service URL: https://rtc.neupokoev.xyz/livekit/jwt
  JWTauth healtz url: https://rtc.neupokoev.xyz/livekit/jwt
✔ JWTauth healthz responds
✔ jwt /get_token without auth returns 405, good.
✔ /get_token succeeded. Use the below information to test your livekit SFU on https://livekit.io/connection-test
  {"url":"wss://rtc.neupokoev.xyz/livekit/sfu","jwt":"..."}

✔ MatrixRTC configured and delayed events work
✔ Room summaries (MSC3266) (unstable) support
✔ Direct registration and guest access forbidden per se 👍
```

### curl / ApiArk / Yakk

And some manual steps

1. What our Matrix server tells clients about where to find livekit jwt - **Check LiveKit URL (MSC4143)**

```bash
curl -v https://matrix.neupokoev.xyz/.well-known/matrix/client
```

My output

```json
{
  "m.homeserver": {
    "base_url": "https://matrix.neupokoev.xyz"
  },
  "org.matrix.msc4143.rtc_foci": [
    {
      "type": "livekit",
      "livekit_service_url": "https://rtc.neupokoev.xyz/livekit/jwt"
    }
  ]
}
```

2. Ping MAS (LiveKit JWT service)

```bash
curl -v https://rtc.neupokoev.xyz/livekit/jwt/healthz
```

3. Test that LiveKit is reachable (401 expected because we skip the token part)

```bash
curl -v -X POST \
	https://rtc.neupokoev.xyz/livekit/sfu/twirp/livekit.RoomService/CreateRoom
```


Also relevant: [Element Call](https://github.com/element-hq/element-call) readme



### coturn

It's a turn for a TURN server.


**docker-compose.yml**

```yaml
  coturn:
    image: coturn/coturn
    network_mode: host
    volumes:
      - ./coturn/turnserver.conf:/etc/coturn/turnserver.conf
      - ./coturn/certs:/etc/coturn/certs:ro
```

Generate a secret

```bash
openssl rand -hex 32
```

**coturn/turnserver.conf**

```
listening-port=3478
tls-listening-port=5349
#cert=/etc/coturn/certs/turn.crt
#pkey=/etc/coturn/certs/turn.key
no-tls
no-dtls

listening-ip=192.168.0.54
external-ip=50.159.133.243/192.168.0.54

realm=matrix.neupokoev.xyz
#server-name=matrix.neupokoev.xyz

# Synapse will authenticate TURN credentials
use-auth-secret
# Generate a secret with `openssl rand -hex 32`
static-auth-secret=XXX

# Restrict TURN to only relay to private/local ranges (security)
no-multicast-peers
denied-peer-ip=0.0.0.0-0.255.255.255
denied-peer-ip=10.0.0.0-10.255.255.255
denied-peer-ip=127.0.0.0-127.255.255.255
denied-peer-ip=172.16.0.0-172.31.255.255
denied-peer-ip=192.168.0.0-192.168.255.255
denied-peer-ip=::1
denied-peer-ip=64:ff9b::-64:ff9b::ffff:ffff
denied-peer-ip=::ffff:0.0.0.0-::ffff:255.255.255.255
denied-peer-ip=100::-100::ffff:ffff:ffff:ffff
denied-peer-ip=2001::-2001:1ff:ffff:ffff:ffff:ffff:ffff:ffff
denied-peer-ip=2002::-2002:ffff:ffff:ffff:ffff:ffff:ffff:ffff
denied-peer-ip=fc00::-fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff
denied-peer-ip=fe80::-febf:ffff:ffff:ffff:ffff:ffff:ffff:ffff
allowed-peer-ip=192.168.0.54

no-tcp-relay

# consider whether you want to limit the quota of relayed streams per user (or total) to avoid risk of DoS.
user-quota=12 # 4 streams per video call, so 12 streams = 3 simultaneous relayed calls per user.
total-quota=1200

min-port=49152
max-port=49200

log-file=stdout
simple-log
```

Each voice/video call needs around 4 ports (2 per participant), so for a family we will go with a big amount - almost 50

I tried to set port forwarding for these ports, but to no avail. Setting Coturn in Oracle free instance and these ports are still relevant, because I need to configure the firewall.

| Port        | Protocol  |
| ----------- | --------- |
| 3478        | TCP + UDP |
| 5349        | TCP + UDP |
| 49152-49200 | UDP       |

Run

```bash
docker compose up -d coturn
```

Test locally:

```bash
sudo ss -ulnp | grep 3478
```

Then use [Online TURN checker](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/) with your credentials that you need to obtain. Probably with `curl`:

```bash
# get a token
curl -X POST http://localhost:8008/_matrix/client/v3/login \
  -H "Content-Type: application/json" \
  -d '{
    "type": "m.login.password",
    "user": "nikolay",
    "password": "XXX"
  }'
# get login and password
curl http://localhost:8008/_matrix/client/v3/voip/turnServer \
  -H "Authorization: Bearer TOKEN" | jq
# in the output you will see temporary HMAC credentials that Synapse generates from your turn_shared_secret
# for example:
# Username: 1774225659:@nikolay:matrix.neupokoev.xyz
# Password: nrGz+M7TTXvs+IbLX6GO0X+WC1A=
```


## Reference

- github issue showing how it's confusing and 