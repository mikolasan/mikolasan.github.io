
## Certificates

Let's setup a secure communication with our own CA and self-signed certificates between a Go game server and Godot game that uses **WebSocketClient**. 

We setup TLS in Godot:

```python
var err = _cert.load("res://keys/ca.crt") as int
if err != OK:
    push_error("load cert " + err)
_client.set_trusted_ssl_certificate(_cert)
_client.set_verify_ssl_enabled(true)
```

**ca.crt** is a CA certificate in PEM format.

And the server works like this:

```go
certFile := "keys/web-server.crt"
keyFile := "keys/web-server.key"
err := http.ListenAndServeTLS(l, certFile, keyFile, h)
```

**web-server.crt** is a CA certificate and web server certificate together. They are in PEM format.

```
web-server.crt = [ server cert ]
                 [ CA cert ]
```

Even in this config Godot can reject this perfect key configuration with an error

```
TLS handshake error from [::1]:36736: remote error: tls: bad certificate
```

Then, in my case, it was missing _subject name_ in the certificate. And that's two steps:

Specify `subjectAltName` in the request:

```sh
openssl req -new \
		-subj XXX \
		-addext "subjectAltName = DNS:localhost, IP:127.0.0.1, IP:::1" \
		-key web-server.key \
		-out web-server.csr
```

And also carry that to the certificate (with `-copy_extensions copy`)

```sh
openssl x509 -req \
    -in web-server.csr \
    -CA $CA_CERT -CAkey $PRIVATE_KEY \
    -out web-server.crt \
    -days 90 \
    -sha512 \
    -copy_extensions copy
```

## Test connection

```sh
curl -i -k \
    -H "Connection: Upgrade" \
    -H "Upgrade: websocket" \
    -H "Sec-WebSocket-Version: 13" \
    -H "Sec-WebSocket-Key: 4IslX2Iw6XDS1GfT2N5/9Q==" \
    -H "Sec-WebSocket-Protocol: game,status" \
    wss://localhost:7777/api/ws
```

where base64 secure key created with

```sh
openssl rand -base64 16
```

Read about subprotocols [here](https://websocket.org/guides/websocket-protocol/#subprotocols)
