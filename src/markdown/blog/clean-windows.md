---
path: /blog/clean-windows
date: 2020-09-23
title: Clean Windows
published: 2021-03-27
lastModified: 2025-02-24
---

## Services I disabled

I grouped services by software.

**Corsair**

- Corsair LLA Service
- Corsair Service

**Adobe Acrobat Reader DC, Adobe Creative Cloud, Adobe Flash Player 32 NPAPI, Adobe XD**

- Adobe Acrobat Update Service
- Adobe Genuine Monitor Service
- Adobe Genuine Software Integrity Service
- AdobeUpdateService

**GoPro Quik**

- GoPro Device Detection Service

**Houdini**

- HoudiniLicenseServer
- HoudiniServer


Windows like a phone

- AllJoyn Router Service
- Application Layer Gateway Service
- BitLocker Drive Encryption Service
- Bluetooth Audio Gateway Service
- Downloaded Maps Manager
- Parental Controls
- Windows Insider Service
- Phone Service
- Payments and NFC/SE Manager
- Cellular Time
- Fax
- Radio Management Service
- Retail Demo Service
- Smart Card
- Smart Card Device Enumeration Service
- Smart Card Removal Policy
- Telephony


## Virtual Box or Docker

Very sad conclusion for Windows users: you can only use one thing. Transition from Virtual Box to Docker (or from Docker to Virtual Box) requires a change of system settings and from 2 to 3 system reboots.

- Win + R
- optionalfeatures
- enable/disable **Virtual Machine Platform and Windows Subsystem for Linux (WSL)**

Source: https://superuser.com/questions/1442766/virtualbox-fails-to-start-with-verr-nem-vm-create-failed

## DAX2

Does my laptop need a special dolby audio software that has no controls in its control panel to playback music as perfect as it can? Is it even safe to have it installed on my computer?

*Still under investigation...*

- https://www.shouldiremoveit.com/Dolby-Audio-X2-Windows-APP-166073-program.aspx
- https://www.cvedetails.com/cve/CVE-2017-7293/
- https://www.exploit-db.com/exploits/41933
- https://github.com/tyranid/ExploitDotNetDCOM

## compattelrunner

I think it's _the thing_ that kicks off the fans once in a while when your computer sits idle. [Disable it](https://superuser.com/questions/1613932/how-to-disable-compattelrunner-exe-microsoft-compatibility-telemetry) because it's just spying on you.

## Cool software

- [Win Dir Stat](https://windirstat.net/download.html) - visually estimate what on your drive takes so much space.
- [Beyond Compare](https://www.scootersoftware.com/download) (Standard version is totally capable!) - helped me in a case when I was copying >400GB from one drive to another and it got stuck at ninety something percent leaving 10GB not copied. Do I just try to copy all folders again? It will probably fail again because of some corrupted file in some folder. So let's be smart and review what is missing from the backup location.
- [Tera Copy](https://www.codesector.com/teracopy) - then to prevent something like in the story above, use a better (more controllable, even I must say, palpable) ways to copy files.
- [Greenshot](https://getgreenshot.org/downloads/) - screenshots
- 