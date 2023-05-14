---
date: 2022-01-12
title: HTTPS client in C#
published: 2022-01-12
lastModified: 2022-01-12
---

- Check [this page](/linux/ssl-certificates) on how to get a thumbprint for a certificate

```csharp
using TortoiseUWP.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace TortoiseUWP
{
    internal class TortoiseCommunication
    {
        CertificateStore appStore = CertificateStores.GetStoreByName(StandardCertificateStoreNames.Personal);
        private static HttpClient client;
        public static X509Certificate2 webCertificate;
        public static Certificate winCertificate;
        public delegate void StatusCallback(string status);

        TortoiseCommunication()
        {
            var handler = new HttpClientHandler();
            handler.ClientCertificateOptions = ClientCertificateOption.Manual;
            handler.ClientCertificates.Add(App.webCertificate);
            handler.ServerCertificateCustomValidationCallback = ServerCertificateCustomValidation;
            client = new HttpClient(handler);
        }
        
        public async Task<SystemStatus> getSystemStatus(string host, StatusCallback statusCallback)
        {
            statusCallback($"Connecting to {host}");
            try
            {
                string json = await Get(host + "/status");
                var status = JsonConvert.DeserializeObject<Status>(json);
                
                statusCallback("");
                return status.System;
            }
            catch (HttpRequestException ex)
            {
                statusCallback(ex.Message + "\n" + ex.InnerException);
            }
            catch (Exception ex)
            {
                statusCallback(ex.Message);
            }
            return null;
        }

        public async Task<bool> setSetting(string host, string name, string value, StatusCallback statusCallback)
        {
            statusCallback($"Connecting to {host}");
            try
            {
                string json = await Patch($"{host}/settings/{name}",
                    $"{{\"value\":{value}}}",
                    "application/json");
                dynamic stuff = JsonConvert.DeserializeObject(json);
                bool saved = stuff.saved;
                statusCallback($"Setting {name} saved: {saved}");
                return saved;
            }
            catch (Exception ex)
            {
                statusCallback(ex.Message);
            }
            return false;
        }

        public async Task<int> getSetting(string host, string settingName, StatusCallback statusCallback)
        {
            statusCallback($"Connecting to {host}");
            try
            {
                string json = await Get($"{host}/settings/{settingName}");
                dynamic stuff = JsonConvert.DeserializeObject(json);
                int value = stuff.value;
                statusCallback($"Setting {settingName} = {value}");
                return value;
            }
            catch (Exception ex)
            {
                statusCallback(ex.Message);
            }
            return -1;
        }

        private static bool ServerCertificateCustomValidation(HttpRequestMessage requestMessage, X509Certificate2 certificate, X509Chain chain, SslPolicyErrors sslErrors)
        {
            //System.Diagnostics.Debug.WriteLine($"Requested URI: {requestMessage.RequestUri}");
            //System.Diagnostics.Debug.WriteLine($"Effective date: {certificate.GetEffectiveDateString()}");
            //System.Diagnostics.Debug.WriteLine($"Exp date: {certificate.GetExpirationDateString()}");
            //System.Diagnostics.Debug.WriteLine($"Issuer: {certificate.Issuer}");
            //System.Diagnostics.Debug.WriteLine($"Subject: {certificate.Subject}");

            // uncomment this line if commercial CAs are allowed to issue certificate for your service.
            //if ((sslErrors & (SslPolicyErrors.None)) > 0) { return true; }

            if (
                (sslErrors & (SslPolicyErrors.RemoteCertificateNameMismatch)) > 0 ||
                (sslErrors & (SslPolicyErrors.RemoteCertificateNotAvailable)) > 0
            ) { return false; }
            // get last chain element that should contain root CA certificate
            // but this may not be the case in partial chains
            X509Certificate2 projectedRootCert = chain.ChainElements[chain.ChainElements.Count - 1].Certificate;
            if (projectedRootCert.Thumbprint != "072BD03B877F056D444E8A3986B60B925ECD3F4E")
            {
                return false;
            }
            // execute certificate chaining engine and ignore only "UntrustedRoot" error
            X509Chain customChain = new X509Chain
            {
                ChainPolicy = {
                    VerificationFlags = X509VerificationFlags.AllowUnknownCertificateAuthority,
                    RevocationMode = X509RevocationMode.NoCheck
                }
            };
            bool retValue = customChain.Build(chain.ChainElements[0].Certificate);
            // RELEASE unmanaged resources behind X509Chain class.
            customChain.Reset();
            return retValue;
        }

        private async Task<string> Get(string uri)
        {
            HttpResponseMessage response = await client.GetAsync(uri);
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            return responseBody;
        }
        
        private async Task<string> Patch(string uri, string data, string contentType)
        {
            var stringContent = new StringContent(data, Encoding.UTF8, contentType);
            HttpResponseMessage response = await client.PatchAsync(uri, stringContent);
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            return responseBody;
        }

        private async Task<string> Post(string uri, string data, string contentType)
        {
            var stringContent = new StringContent(data, Encoding.UTF8, contentType);
            HttpResponseMessage response = await client.PostAsync(uri, stringContent);
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            return responseBody;
        }
    }
}
```

## References

- https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-6.0
- https://docs.microsoft.com/en-us/windows/uwp/networking/httpclient
- https://stackoverflow.com/questions/26218764/patch-async-requests-with-windows-web-http-httpclient-class
- https://docs.microsoft.com/en-us/uwp/api/windows.storage.applicationdatacontainer?view=winrt-22000#methods
- https://docs.microsoft.com/en-us/answers/questions/4410/accessing-certificate-in-code-with-thumbprint.html
- https://stackoverflow.com/questions/9810887/export-x509certificate2-to-byte-array-with-the-private-key


## Port UWP to Linux

- https://platform.uno/docs/articles/get-started-with-linux.html#setting-up-for-archlinux-5814-or-later--manjaro
- https://ian.bebbs.co.uk/posts/UnoLinux