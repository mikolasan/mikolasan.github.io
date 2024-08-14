---
date: 2022-01-01
title: Java TCP secure server socket
published: 2022-01-01
lastModified: 2022-01-01
---

Java TCP Server Socket with certificate and private key (TLS).

Let's delve into the specifics of how to use Java's built-in security libraries to create a secure server socket, using the Secure Sockets Layer (SSL) and Transport Layer Security (TLS) protocols. 

To load a Java keystore from resources, we'll be using the `getResourceAsStream()` method. This method allows us to load a file from the classpath, which is the set of directories where Java looks for class files. By loading the keystore from resources, we can avoid hardcoding the keystore path in our code, making it more portable and secure.

```java
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLServerSocketFactory;
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.security.KeyStore;

public class MyServer {
    private static final int SERVER_PORT = 8686;
    private ServerSocket serverSocket;
    
    public MyServer() {
        serverSocket = null;
        try {
            SSLServerSocket socket = (SSLServerSocket)initSSLServerSocketFactory()
                .createServerSocket(SERVER_PORT);
            serverSocket = socket;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static SSLServerSocketFactory initSSLServerSocketFactory() {
        try {
            InputStream inputStream = MyServer.class
                .getClassLoader()
                .getResourceAsStream("server.jks");
            KeyStore keyStore = KeyStore.getInstance("JKS");
            keyStore.load(inputStream, "<store password>".toCharArray());

            KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance("SunX509");
            keyManagerFactory.init(keyStore, "<key password>".toCharArray());

            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(keyManagerFactory.getKeyManagers(), null, null);
            return sslContext.getServerSocketFactory();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // ...
```

See how to create the key store [here](/linux/ssl-certificates)


## Reference

- https://docs.oracle.com/javase/10/security/sample-code-illustrating-secure-socket-connection-client-and-server.htm#JSSEC-GUID-3561ED02-174C-4E65-8BB1-5995E9B7282C
- https://stackoverflow.com/questions/906402/how-to-import-an-existing-x-509-certificate-and-private-key-in-java-keystore-to
- https://stackoverflow.com/questions/67766268/ioexception-in-java-8-when-reading-pkcs12-keystore-created-with-keytool-from-ope
- https://stackoverflow.com/questions/11905682/keymanagerfactory-cannot-recover-key-yet-it-opens-in-keytool