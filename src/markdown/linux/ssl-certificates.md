---
date: 2022-01-30
title: SSL Certificates
published: 2022-01-30
lastModified: 2022-01-30
---

## Fingerprint / thumbprint

```
openssl x509 -noout -fingerprint -sha1 -inform pem -in api.crt
```

## Serial number

```
openssl x509 -noout -serial -in api.crt
```

## Expiration date

```
openssl x509 -enddate -noout -in api.crt
```

## Convert to Java keystore

```bash
# Convert the x.509 cert and key to a pkcs12 file
openssl pkcs12 -export -in server.crt -inkey server.key \
  -out server.p12 -name <server-name> \
  -CAfile ca.pem -caname root

# Convert the pkcs12 file to a Java keystore
keytool -importkeystore \
    -destkeystore server.jks \
    -deststoretype jks \
    -deststorepass <password> \
    -destkeypass <another password> \
    -srckeystore server.p12 \
    -srcstoretype pkcs12 \
    -srcstorepass <password from previous step> \
    -alias <short-name-for-the-server>
```

Verify

```
keytool -list -keystore server.jks
```

Code exaples:

- [Java TCP secure server socket](/code/java/java-tcp-secure-server-socket)