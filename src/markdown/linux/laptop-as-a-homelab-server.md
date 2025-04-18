---
title: Laptop as a server
subtitle: Ultra-budget homelab
date: 2025-02-24
published: 2025-02-24
lastModified: 2025-02-24
---

## Upgrade Plan

Besides the Linux journey, what is the main use of my laptop (Samsung 305u1a)?

- It can [have internet access](/linux/linksys-wusb6100m-wifi-adapter) (possibly), but the web browser is really slow
- Any Java app or docker service will kill it
- Python or Lua REPL should be fine
- Sandstorm? (also, read [more about degoogling](/blog/degoogling))

### Specs

[Here](https://www.productindetail.com/pn/samsung-series-3-305u1a)

- Screen: 11.6" (1366x768)
- Processor: AMD E-450 1.65 GHz (Dual-Core)
- Storage: SATA revision 2.0 (3 Gbit/s, 300 MB/s, Serial ATA-300)
- RAM: PC3-10600, Memory Speed 1333 MHz, DDR3 SDRAM (SO-DIMM 204-pin), Max Supported Size 8 GB, 1 slot
- Wireless: 802.11b/g/n, Bluetooth 3.0 HS

### BIOS vs UEFI

I installed the "majordomo" distribution with an Arch flavor on my SSD. Being a modern distribution, it detected that UEFI would be suitable for me and only installed that bootloader. I had seen the word UEFI in my laptop's BIOS, so I thought it would work fine. However, my laptop refused to boot in this format.

So I needed to revert to legacy mode, as that's probably the only way it can boot. For this, I needed to create a special BIOS partition and install GRUB with a specific target (target=i386-pc). The motherboard refused to recognize this option just like the previous one.

Something tells me that my laptop doesn't understand GPT partitioning either, and I need to convert the disk to MBR (msdos), preferably without reinstalling. ** Screams in binary **

## Be a Server

Auto login was done with `agetty`.

Turn off the monitor with the vbetool

```sh
sudo pacman -S vbetool
sudo vbetool dpms off && read -s -n 1 && sudo vbetool dpms on
```

Reduce brightness

```sh
echo "10" | sudo tee /sys/class/backlight/radeon_bl0/brightness
```

Lid?

```sh
cat /proc/acpi/wakeup
```

Seems like it doesn't trigger
But it hibernates! Say _no_ to that silly technique

```sh
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

And it turns off the monitor automatically

Radeon is broken after updating Arch from 2020 in 2025

```sh
radeon.si_support=1 radeon.cik_support=1 amdgpu.si_support=0 amdgpu.cik_support=0
```

https://www.x.org/wiki/RadeonFeature/
