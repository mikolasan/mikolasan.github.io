---
title: Mount a USB
date: 2024-11-05
published: 2024-11-05
lastModified: 2024-11-05
---


Most likely that this case is very specific and not everyone will find it useful as it is, but this example can show what interesting subsystems do exist in Linux operationg systems and how one can approach to automatic execution of scripts.


## Original bash script

For example, in this very specific case, we look for one USB flash drive that is connected, then check if we are want to mount it by checking for hidden information on the drive, then actually mount the first partition, and that's it. So this is not about automatically mount USB drives, but quite the oppsite, we want to avoid any untrusted USB drives.

```bash
#!/bin/bash

set -x

USB_DEVICE=$(lsblk -o NAME,TRAN -l -n | grep usb | awk '{ print $1 }')
USB_DEVICE_PATH=/dev/${USB_DEVICE}

MOUNT_PATH=/mnt
UTIL_DIR=/etc

if [ ! -n "${USB_DEVICE_PATH}" ]; then
    echo "No USB device"
    exit 1
fi

echo
echo "USB device found (${USB_DEVICE_PATH})"

if sudo dd if=$USB_DEVICE_PATH bs=512 skip=2044 count=4 2>/dev/null | cmp -s - $UTIL_DIR/usb_drive.sign; then
    echo "Signature is correct"
else
    echo "Wrong signature"
    exit 2
fi

sudo mkdir -p $MOUNT_PATH

MOUNT_POINT=$(lsblk -o NAME,MOUNTPOINTS -l -n | grep ${USB_DEVICE}1 | awk -F ' ' '{print $2}')
if [ ! -n "$MOUNT_POINT" ]; then
    sudo mount ${USB_DEVICE_PATH}1 $MOUNT_PATH
    if [ $? -ne 0 ]; then
        echo "Mount failed"
        exit 1
    fi
elif sudo [ -d "$MOUNT_POINT" ]; then
    echo "Already mounted"
    exit 0
fi

echo "Done"
```

If you run that script manually, then it will work as intended. All those hours of hard work were truly fruitful. Right?


## mount with udev rules

Now, to automate this process, we create an udev rule **/etc/udev/rules.d/90-smart-usb-mount.rules**

```
ACTION=="add", SUBSYSTEMS=="usb", SUBSYSTEM=="block", KERNEL=="sd[b-z][0-9]", RUN+="/etc/smart_usb_mount.sh"
```

But it would fail on the `mount` command because **udev** cannot mount devices. Not directly but it can call `systemd-mount`

```
ACTION=="add", SUBSYSTEMS=="usb", SUBSYSTEM=="block", ENV{ID_FS_USAGE}=="filesystem", RUN{program}+="/usr/bin/systemd-mount --no-block --automount=yes --collect $devnode /mnt"
```

(of course we update rules after the change)

```bash
sudo udevadm control --reload-rules
```

(and to see rules in action we can temporarily change log level for udev)

```bash
sudo udevadm control --log-priority=debug
sudo journalctl -f
```


## mount from systemd service

Let's use a systemd service because systemd can mount devices and trigger other services after. 

So we define a systemd unit (in **/etc/systemd/system/smart-usb-mount.service**)

```ini
[Unit]
Description=Smart USB mount
After=mnt.automount

[Service]
Type=forking
ExecStart=/etc/smart_usb_mount.sh

[Install]
WantedBy=multi-user.target
```

enable the new service

```bash
sudo systemctl enable smart-usb-mount
```



## Reference

- [Udev tips and tricks](https://wiki.archlinux.org/title/Udev#Mounting_drives_in_rules)
- [udisksctl and udev](https://unix.stackexchange.com/questions/217265/udevudisks2-udisksctl-gives-error-looking-up-object-for-device) are not friends (and the `mount` from udev [too](https://unix.stackexchange.com/questions/612877/mount-a-usb-disk-with-udev-permission-denied), use systemd instead)
- [Mount with systemd](https://github.com/systemd/systemd/issues/11982#issuecomment-472529566)