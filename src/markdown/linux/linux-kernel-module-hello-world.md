---
title: Linux kernel module
subtitle: Hello World
date: 2023-06-04
published: 2025-02-23
lastModified: 2025-02-23
---

Let’s make a hello-world type Linux kernel module.

## Get Linux kernel sources

First we need to integrate a Makefile, such as **hello.mk** into the Linux kernel source tree. Thus you'll first need to obtain the Linux kernel source code from [the official website](https://www.kernel.org/) or your distribution's package manager and get it extracted.

Here's an example for Arch (or Manjaro)

```bash
sudo pacman -S base-devel git xmlto cpio pahole
mkdir ~/kernel_build/
cd kernel_build
git clone https://gitlab.manjaro.org/packages/core/linux612.git
cd linux612
makepkg --nobuild
KERNEL_SRC=~/kernel_build/linux612/src/linux-6.12
ln -s /usr/lib/modules/$(uname -r)/build/Module.symvers "$KERNEL_SRC/"
zcat /proc/config.gz > "$KERNEL_SRC/.config"
make -C "$KERNEL_SRC" modules_prepare
# build a kernel module (usbip) example
make --directory="$KERNEL_SRC" M=drivers/usb/usbip/
```

## Add driver directory

So, one thing is if you want to make changes to an existing module, but we will be creating a totally fresh one. 
For that, navigate to the `drivers` directory and create a new directory for your module. For example, if your module is named "hello," you create a directory called `hello`.

```bash
cd $KERNEL_SRC
mkdir $KERNEL_SRC/drivers/hello

nano $KERNEL_SRC/drivers/hello/hello.c
nano $KERNEL_SRC/drivers/hello/hello.mk
nano $KERNEL_SRC/drivers/hello/Kconfig
```

Create a Kconfig file if you want your module to be selectable through the kernel configuration menu, create a file named `Kconfig` inside your module directory (`drivers/hello/Kconfig`). The Kconfig file should define the configuration options for your module.

```sh
nano $KERNEL_SRC/drivers/hello/Kconfig
```

with this content

```
config HELLO_MODULE
    tristate "Hello Module"
    default m
    help
        This is a sample kernel module.

config HELLO_MODULE_OPTION
    bool "Enable additional option"
    depends on HELLO_MODULE
    default n
    help
        Enable an additional option for Hello Module.

```

2. Add module information to the top-level Kconfig (`drivers/Kconfig`). Open the file

```jsx
nano $KERNEL_SRC/drivers/Kconfig
```

3. and add an `source` entry pointing to your module's Kconfig file.

```makefile
source "drivers/hello/Kconfig"

```

A simple `hello.c` kernel module that prints a message to the kernel log using `printk` at log level 3:

```c
#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Your Name");
MODULE_DESCRIPTION("A simple hello world kernel module");

static int __init hello_init(void)
{
    printk(KERN_INFO "Hello, world!\n");
    return 0;
}

static void __exit hello_exit(void)
{
    printk(KERN_INFO "Goodbye, world!\n");
}

module_init(hello_init);
module_exit(hello_exit);
```

The `module_init` and `module_exit` macros are used to specify the module initialization and cleanup function accordingly (`hello_init`, `hello_exit`).

Makefile for building the `hello.c` kernel module, `hello.mk`:

```makefile
obj-m += hello.o

KERNELDIR ?= /lib/modules/$(shell uname -r)/build
PWD := $(shell pwd)

default:
	$(MAKE) -C $(KERNELDIR) M=$(PWD) modules

clean:
	$(MAKE) -C $(KERNELDIR) M=$(PWD) clean
```


## What kernel modules can do?

- Device Drivers
- Filesystems
- Network Protocols (such as TCP/IP stack, IP routing protocols (like OSPF or BGP)), network packet filtering (firewalling)
- Virtualization (such as Kernel-based Virtual Machine (KVM), Xen, or containerization technologies like Docker or LXC)
- Security and encryption
- Performance Monitoring
- Debugging and Tracing
- Modify system calls
- Power Management

## Simple example of Kernel-based Virtual Machine (KVM)

KVM has the capability to emulate different CPU architectures with their respective instruction sets. For example, we can create a virtual machine with an ARM CPU architecture as the guest, even if the host CPU architecture is x86.

------

// to be continued //

## Reference

- [https://forum.manjaro.org/t/how-to-build-a-kernel-module/74113/4](https://forum.manjaro.org/t/how-to-build-a-kernel-module/74113/4)
- [https://docs.legato.io/17_07/yoctoOutofTreeKernelModule.html](https://docs.legato.io/17_07/yoctoOutofTreeKernelModule.html)
- [https://ebpf.io/applications/](https://ebpf.io/applications/)