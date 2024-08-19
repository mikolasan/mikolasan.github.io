---
date: 2024-08-15
title: PXE custom bootloader
published: 2024-08-15
lastModified: 2024-08-15
---

I like [bootloaders](/linux/bootloaders). And I already [compiled GRUB](/linux/build-grub-from-source) and edk2.

But now, how to build **grub2/i386-pc/core.0** ([ref](https://linuxguideandhints.com/el/pxeboot/#dhcp-isc))?


From [PXE protocol](https://web.archive.org/web/20131102003141id_/http://download.intel.com/design/archives/wfm/downloads/pxespec.pdf):

> PXE is defined on a foundation of industry-standard Internet protocols and services that are widely deployed in the industry, namely TCP/IP, DHCP, and TFTP. These standardize the form of the interactions between clients and servers. To ensure that the meaning of the client-server interaction is standardized as well, certain vendor option fields in DHCP protocol are used, which are allowed by the DHCP standard. The operations of standard DHCP and/or BOOTP servers (that serve up IP addresses and/or NBPs) will not be disrupted by the use of the extended protocol. Clients and servers that are aware of these extensions will recognize and use this information, and those that do not recognize the extensions will ignore them.
>
> In brief, the PXE protocol operates as follows. The client initiates the protocol by broadcasting a DHCPDISCOVER containing an extension that identifies the request as coming from a client that implements the PXE protocol. Assuming that a DHCP server or a Proxy DHCP server implementing this extended protocol is available, after several intermediate steps, the server sends the client a list of appropriate Boot Servers. The client then discovers a Boot Server of the type selected and receives the name of an executable file on the chosen Boot Server. The client uses TFTP to download the executable from the Boot Server. Finally, the client initiates execution of the downloaded image. At this point, the client’s state must meet certain requirements that provide a predictable execution environment for the image. Important aspects of this environment include the availability of certain areas of the client’s main memory, and the availability of basic network I/O services.