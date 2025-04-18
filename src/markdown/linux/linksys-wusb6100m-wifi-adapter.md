---
title: Fast internet on an ancient laptop (2008)
subtitle: Story when a specific device support has never reached the mainstream kernel
date: 2025-02-24
published: 2025-02-24
lastModified: 2025-02-24
---

## Kernel patch

[https://github.com/erstrom/linux-ath/wiki/Firmware](https://github.com/erstrom/linux-ath/wiki/Firmware)

This patch series adds usb support to ath10k: [maillist](http://lists.infradead.org/pipermail/ath10k/2017-January/009008.html) [weib git](https://wireless.wiki.kernel.org/en/users/drivers/ath10k/sources)

ath.git contains multiple branches, упорядочил по свежести: pending, master-pending, master, ath-next, ath-current.

## Generate ath10k firmware files

With [Swiss knife](https://github.com/qca/qca-swiss-army-knife.git). More details in this question: [Unable to get Linksys WUSB6100M wireless adapter to work](https://askubuntu.com/questions/799104/unable-to-get-linksys-wusb6100m-wireless-adapter-to-work)


**/etc/mkinitcpio.conf**

```conf
# vim:set ft=sh
# MODULES
# The following modules are loaded before any boot hooks are
# run.  Advanced users may wish to specify all system modules
# in this array.  For instance:
#     MODULES="piix ide_disk reiserfs"
MODULES="radeon backlight samsung_laptop"

# BINARIES
# This setting includes any additional binaries a given user may
# wish into the CPIO image.  This is run last, so it may be used to
# override the actual binaries included by a given hook
# BINARIES are dependency parsed, so you may safely ignore libraries
BINARIES=""

# FILES
# This setting is similar to BINARIES above, however, files are added
# as-is and are not parsed in any way.  This is useful for config files.
FILES="/etc/modprobe.d/wifi.conf /etc/modprobe.d/ath10k.conf"

# HOOKS
HOOKS="base udev plymouth resume autodetect modconf block filesystems keyboard fsck"

# COMPRESSION
# Use this to compress the initramfs image. By default, gzip compression
# is used. Use 'cat' to create an uncompressed image.
#COMPRESSION="gzip"
#COMPRESSION="bzip2"
#COMPRESSION="lzma"
#COMPRESSION="xz"
#COMPRESSION="lzop"
#COMPRESSION="lz4"

# COMPRESSION_OPTIONS
# Additional options for the compressor
#COMPRESSION_OPTIONS=""
```

## Network services

Ditch the Network Manager

```sh
sudo systemctl stop NetworkManager
sudo systemctl disable NetworkManager
```


We will use a simple conjunction of DHCP client and `wpa_supplicant`

So let's make it manually first, then we will automate (and we will need internet to download and install some packages `sudo pacman -S dhcpcd`)

```sh
wpa_passphrase Insomnia pass | sudo tee /etc/wpa_supplicant/wpa_supplicant-wlan0.conf
sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant-wlan0.conf
sudo ip addr add 192.168.0.74/24 dev wlan0
sudo ip route add default via 192.168.0.1 dev wlan0
sudo nano /etc/resolv.conf # nameserver 8.8.8.8
```

```sh
sudo systemctl enable wpa_supplicant@wlan0.service
sudo pacman -S dhcpcd
sudo systemctl start dhcpcd@wlan0.service
sudo systemctl enable dhcpcd@wlan0.service
sudo ln -s /usr/share/dhcpcd/hooks/10-wpa_supplicant /usr/lib/dhcpcd/dhcpcd-hooks/
```



## Reference

Based on 

- https://wiki.archlinux.org/title/Network_configuration/Wireless
- https://wiki.archlinux.org/title/Wpa_supplicant#Advanced_usage
- https://wiki.archlinux.org/title/Dhcpcd


## Other

dmesg:

```log
[ 2098.119548] usb 1-2: WARNING: ath10k USB support is incomplete, don't expect anything to work!
[ 2098.119976] usb 1-2: Direct firmware load for ath10k/pre-cal-usb-1-2.bin failed with error -2
[ 2098.119999] usb 1-2: Direct firmware load for ath10k/cal-usb-1-2.bin failed with error -2
[ 2098.120020] usb 1-2: Direct firmware load for ath10k/QCA9377/hw1.0/firmware-usb-6.bin failed with error -2
[ 2098.120033] usb 1-2: qca9377 hw1.1 usb target 0x05020001 chip_id 0x00000000 sub 0000:0000
[ 2098.120037] usb 1-2: kconfig debug 1 debugfs 1 tracing 0 dfs 0 testmode 0
[ 2098.120897] usb 1-2: firmware ver  api 5 features ignore-otp crc32 d735f7dc
[ 2098.159134] usb 1-2: Direct firmware load for ath10k/QCA9377/hw1.0/board-2.bin failed with error -2
[ 2098.159167] usb 1-2: board_file api 1 bmi_id N/A crc32 49b8e459
[ 2099.196469] ath: EEPROM regdomain: 0x8348
[ 2099.196476] ath: EEPROM indicates we should expect a country code
[ 2099.196482] ath: doing EEPROM country->regdmn map search
[ 2099.196485] ath: country maps to regdmn code: 0x3a
[ 2099.196489] ath: Country alpha2 being used: US
[ 2099.196491] ath: Regpair used: 0x3a
[ 2099.196521] usb 1-2: invalid hw_params.n_cipher_suites 0
[ 2099.341687] IPv6: ADDRCONF(NETDEV_UP): wlan0: link is not ready
[ 2102.376283] wlan0: authenticate with 8c:76:3f:36:83:91
[ 2102.399298] wlan0: send auth to 8c:76:3f:36:83:91 (try 1/3)
[ 2102.399879] usb 1-2: received tx completion for invalid msdu_id: 0
[ 2102.400654] wlan0: authenticated
[ 2102.402258] wlan0: associate with 8c:76:3f:36:83:91 (try 1/3)
[ 2102.404963] usb 1-2: received tx completion for invalid msdu_id: 0
[ 2102.408465] wlan0: RX AssocResp from 8c:76:3f:36:83:91 (capab=0x1011 status=0 aid=4)
[ 2102.411817] wlan0: associated
[ 2102.411950] IPv6: ADDRCONF(NETDEV_CHANGE): wlan0: link becomes ready
[ 2102.461101] wlan0: Limiting TX power to 30 (30 - 0) dBm as advertised by 8c:76:3f:36:83:91
[ 2191.330838] usb 1-2: Got RX ind from invalid peer: 65535
[ 2191.330849] usb 1-2: MPDU range status: 10
[ 2191.450960] usb 1-2: Got RX ind from invalid peer: 65535
[ 2191.450971] usb 1-2: MPDU range status: 10
[ 2192.282033] usb 1-2: Got RX ind from invalid peer: 65535
[ 2192.282044] usb 1-2: MPDU range status: 10
```