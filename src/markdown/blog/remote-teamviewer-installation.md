---
path: /blog/remote-teamviewer-installation
date: 2021-04-21
title: "Remote TeamViewer installation"
published: 2021-10-14
lastModified: 2021-10-14
---

To succeed with this tutorial you will need to create an account in teamviewer first. It is better to do it from your host application.

Then goto teamviewer website https://www.teamviewer.com/en/download/linux/ download section and get a link like this 
https://download.teamviewer.com/download/linux/teamviewer_amd64.deb

- ssh to your target machine
- Download deb package

```
wget https://download.teamviewer.com/download/linux/teamviewer_amd64.deb
```

- Then install it

```
dpkg -i teamviewer_amd64.deb
```

- Go through configuration steps by running interactive wizard in the console. You will need your account credentials here

```
teamviewer setup
```

- Then you will see this message

> To ensure the continued security of your account, you need to first confirm this device is a trusted device.
> We have sent you a confirmation email containing a device authorization link. If you don't receive this verification email within a reasonable amount of time, please check your junk or spam folder.

- Goto your email and click that link.

- Enter your credentials on the target machine again

In the end message tells in details how to reach the target from the host.

> You have successfully added this device to your Computers & Contacts. You can now access it with a simple double click in your Computers & Contacts list.