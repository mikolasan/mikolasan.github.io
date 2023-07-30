---
date: 2023-06-14
title: Bootloaders
published: 2023-06-14
lastModified: 2023-06-14
---

## Boot process

Have you ever wondered how inefficient the boot process in our computers? It requires 3 different protocol implementations. But why?

Let’s first review how the boot happens in a BIOS systems. 

- The BIOS finds connected devices. Which means it knows about IDE and SATA protocols and how to find the Master Boot Record. 
- In the MBR it finds the bootloader. 
- Then GRUB finds a bootable drive and passes execution to the kernel. 
- Kernel has modules where SATA/IDE protocols are implemented.

A common thing in Linux world is GRUB. GRUB has modules that also understand SATA and IDE. And partition tables, and filesystems, and more. Funny part is that the order of drives in BIOS can be different than the order detected by GRUB. And BIOS and GRUB don’t know about each other. They are not designed to exchange information.


## Bootloader is minimalistic OS

The minimal example of a **simplest operating system** is typically referred to as a "bare-metal" or "bootloader" operating system. It provides the basic functionality required to boot a computer and execute code. It typically consists of a small amount of code that initializes the hardware, sets up the CPU and memory, and then loads and executes a kernel or application program.

One example of a bare-metal operating system is the Little Kernel (LK), which is an open-source operating system designed for embedded systems and mobile devices. Another example is the Bootboot bootloader, which is a minimal bootloader designed for x86-64 architecture and used for bootstrapping operating systems.

It's important to note that while these bare-metal operating systems can provide the basic functionality required to boot a computer, they do not include many of the features that are typically associated with modern operating systems such as device drivers, memory management, and multi-tasking.


## History of PE File Format

_by [Mark Pelf](https://www.codeproject.com/Articles/5356568/PE-Format-Illustrated-Part-1)_

PE stands for ‘Portable Executable” and the format is invented in the 1980s. The dominant format then was MZ MS-DOS format, which has a special marker at the beginning of file to identify itself, letters “MZ” which by the way are initials of Mark Zbikowski, one of the MS-DOS developers. PE format was about to target Window platform, and they preserved backward compatibility with MZ format (.exe files) and enabled PE format (.exe files) if accidentally run on MS-DOS to report “This program cannot be run in DOS mode”, which was an important issue for Microsoft at the time. Therefore, you will see still that PE format contains MS-DOS style header, meaning it starts with the magic letters “MZ” and also a DOS-Stub that prints that message. That part is unnecessary today but has become part of the standard.
PE format originates from Unix COFF format.
Today, PE format is extended to host .NET code.
