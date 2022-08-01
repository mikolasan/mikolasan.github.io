---
path: /blog/add-ca-certificate-to-java-https-client
date: 2021-04-20
title: "Add CA certificate to Java HTTPS client"
published: 2021-10-14
lastModified: 2021-10-14
---

Consider you have a HTTPS server with ssl certificate, and you do want to use the certificate on your client side.
How to write HTTPS client in [Java](/blog/why-do-i-hate-java)?

Normally for HTTPS connections **One way SSL server authentication** is used when the client has CA certificate from the server and it's enough to verify the server and to establish secure connection.

SSL context  must have a file with certificate loaded either using [pure java libraries](https://docs.oracle.com/javase/7/docs/api/javax/net/ssl/TrustManagerFactory.html#init(java.security.KeyStore)) or Apache httpclient. See more examples in [SO answers](https://stackoverflow.com/questions/2893819/accept-servers-self-signed-ssl-certificate-in-java-client).

As a test server I'm going to use simple HTTPS server in [Python](/blog/why-do-i-hate-python):

```python
from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler
import ssl

httpd = HTTPServer(('localhost', 443), SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket, certfile='./server.pem', server_side=True)
httpd.serve_forever()
```

Note that if you run the client with any other https server or with other certificate, then you will get this error:

```
Caused by: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
```

So here it is, implementation in pure java approach, no external libraries. Just minimal functionality.

```java
import javax.naming.ldap.LdapName;
import javax.net.ssl.*;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.security.KeyStore;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

public class CaCertHttpsClient {

    private static final SSLSocketFactory sslSocketFactory = initSSLSocketFactory();
    private static final HostnameVerifier hostnameVerifier = new GrumpyHostnameVerifier();

    private final String BASE_URL = "https://localhost/";
    private final String LOGIN = "login";
    private final int SEND_TIMEOUT = 2000; // milliseconds
    private final int RESPONSE_TIMEOUT = 3000; // milliseconds

    public void login() {
        HttpURLConnection http = null;
        try {
            http = createHttpRequest(LOGIN, SEND_TIMEOUT, RESPONSE_TIMEOUT);
            http.connect();
        } catch (SocketTimeoutException e) {
            System.out.println("Timeout.");
        } catch (Exception e){
            e.printStackTrace();
        } finally {
            System.out.println("Connect successful");
            if (http != null) {
                http.disconnect();
            }
        }
    }

    private HttpURLConnection createHttpRequest(String procedure, int connectTimeout, int readTimeout) throws IOException {
        URL url = new URL(BASE_URL + procedure);
        HttpsURLConnection https = (HttpsURLConnection)url.openConnection();
        https.setSSLSocketFactory(sslSocketFactory);
        https.setHostnameVerifier(hostnameVerifier);
        https.setRequestMethod("POST");
        https.setRequestProperty("Content-Type", "application/json");
        https.setRequestProperty("Accept", "application/json");
        https.setConnectTimeout(connectTimeout); // timeout before the connection can be established
        https.setReadTimeout(readTimeout); // timeout before there is data available for read
        https.setDoOutput(true); // Setting the doOutput flag to true indicates that the application intends to write data to the URL connection
        return https;
    }

    /*
        During handshaking, if the URL's hostname and the server's identification hostname mismatch, the verification
        mechanism can call back to implementers of this interface to determine if this connection should be allowed.

        These callbacks are used when the default rules for URL hostname verification fail.
     */
    private static class GrumpyHostnameVerifier implements HostnameVerifier {
        @Override
        public boolean verify(String hostname, SSLSession session) {
            try {
                Certificate[] certificates = session.getPeerCertificates();
                // TODO: what if there are more than one certificate ?!
                if (certificates.length > 0) {
                    if (certificates[0] instanceof X509Certificate) {
                        X509Certificate certificate = (X509Certificate) certificates[0];
                        String dn = certificate.getSubjectX500Principal().getName();
                        String commonName = new LdapName(dn)
                                .getRdns()
                                .stream()
                                .filter(rdn ->
                                        rdn.getType().equalsIgnoreCase("CN"))
                                .findFirst()
                                .get()
                                .getValue()
                                .toString();
                        System.out.println("Certificate is signed for '" + commonName + "', but real hostname is '" + hostname + "'. Be aware of possible MITM attack");
                    }
                }
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            return false;
        }
    }

    private static SSLSocketFactory initSSLSocketFactory() {
        try {
            InputStream stream = End2EndClient.class.getClassLoader().getResourceAsStream("ca.crt");
            Certificate certificate = CertificateFactory
                    .getInstance("X.509")
                    .generateCertificate(stream);

            KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
            keyStore.load(null, null);
            keyStore.setCertificateEntry("mikolasan", certificate);

            TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            trustManagerFactory.init(keyStore);

            SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
            sslContext.init(null, trustManagerFactory.getTrustManagers(), null);
            return sslContext.getSocketFactory();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
```

## References

- You can find minimal working example on GitHub: https://github.com/mikolasan/java-https-client-example
- Code above is based on this [SO answer](https://stackoverflow.com/a/57046889/1104612)
- [SO: Accept server's self-signed ssl certificate in Java client](https://stackoverflow.com/questions/2893819/accept-servers-self-signed-ssl-certificate-in-java-client)
- [SO: Java HTTPS client certificate authentication](https://stackoverflow.com/questions/1666052/java-https-client-certificate-authentication)