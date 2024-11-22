---
title: Update initramfs
subtitle: in Ubuntu
date: 2023-06-02
published: 2024-11-22
lastModified: 2024-11-22
---

In one of my custom linux distors I use a read-only version of the Ubuntu operating system. So, a normal install was copied and compressed into a squashfs image and then `dd`-ed onto the partition.

It's possible to verify the integrity of that image very quickly during boot with [verity](https://www.chromium.org/chromium-os/chromiumos-design-docs/verified-boot-crypto/).


## Verity

Before we start, here's an important note that may change your objective and you may not need to all the future steps with altering the initramfs.

Note: dm-verity is possible without initramfs if the kernel supports it. ([Reference](https://www.timesys.com/security/dm-verity-without-an-initramfs/). Check it with

```bash
grep CONFIG_DM_VERITY_VERIFY_ROOTHASH_SIG .config
# CONFIG_DM_VERITY_VERIFY_ROOTHASH_SIG is not set
```

And now, let's proceed with integrating the verity check 

1. Install `cryptsetup` package (includes `veritysetup`) on the host system

```bash
sudo apt update
sudo apt install cryptsetup-bin
```

2. Add `dm-verity` kernel module to **/etc/initramfs-tools/modules**

```
dm-verity
```

3. Tell `initramfs-tools` to pack `veritysetup` into the image. Create a file **/etc/initramfs-tools/hooks/veritysetup**

```bash
# !/bin/sh

PREREQ=""

prereqs()
{
    echo "$PREREQ"
}

case $1 in
    prereqs)
        prereqs
        exit 0
        ;;
esac

. /usr/share/initramfs-tools/hook-functions

# Include veritysetup
copy_exec /sbin/veritysetup /sbin

exit 0
```

4. When a kernel with the appropriate modules will be loaded, the `init` script start executing scripts. Let's define our script that is going to verify the intergrity of the OS. We will use the [open](https://dashdash.io/8/veritysetup) operation for in-kernel verification. 

```bash
mkdir -p /etc/initramfs-tools/scripts
nano /etc/initramfs-tools/scripts/local-top/verity
chmod +x /etc/initramfs-tools/scripts/local-top/verity
```

**/etc/initramfs-tools/scripts/local-top/verity**

```bash
# !/bin/sh

PREREQ=""

prereqs()
{
    echo "$PREREQ"
}

case $1 in
    prereqs)
        prereqs
        exit 0
        ;;
esac

. /scripts/functions

# Open the root partition with veritysetup
ROOT_DEV=""
VERITY_DEV=""
VERITY_HASH=""

for x in $(cat /proc/cmdline); do
        case ${x} in
        systemd.verity_root_data=*)
                value=${x#*=}
                ROOT_DEV=/dev/disk/by-uuid/${value#UUID=}
        ;;
        systemd.verity_root_hash=*)
                value=${x#*=}
                VERITY_DEV=/dev/disk/by-uuid/${value#UUID=}
        ;;
        roothash=*)
                VERITY_HASH=${x#*=}
        ;;
        esac
done

[ -b "$ROOT_DEV" ] || panic "Unable to determine root device."
[ -b "$VERITY_DEV" ] || panic "Unable to find verity device."
[ -n "$VERITY_HASH" ] || panic "No verity hash."

veritysetup open "$ROOT_DEV" rootfs "$VERITY_DEV" "$VERITY_HASH"

[ -b /dev/mapper/rootfs ] || panic "Verity did not map rootfs."

exit 0
```

Be carefull and pay attention that `veritysetup` != `systemd-veritysetup`. systemd version uses the [attach](https://www.freedesktop.org/software/systemd/man/systemd-veritysetup@.service.html) command ([man](https://man.archlinux.org/man/systemd-veritysetup%40.service.8)

5. Now we are ready to repack the image

```bash
update-initramfs -k $(uname -r) -u
```

## Reference

- [A tutorial](https://www.ullright.org/ullWiki/show/initramfs-tools) for Ubuntu 18.04
- [Add programs to init fs](https://serverfault.com/questions/152959/configure-initramfs-tools-to-add-curl-to-the-initramfs-and-run-curl-in-a-script)
- [Add programs #2](https://askubuntu.com/questions/1075079/ubuntu-18-04-on-kernel-4-15-0-34-generic-boots-to-busybox) - cryptsetup

### dm-verity

- [Verified boot specification](https://www.chromium.org/chromium-os/chromiumos-design-docs/verified-boot-crypto/) by Chromium project
- [dm-verity on Arch wiki](https://wiki.archlinux.org/title/Dm-verity)
- [cryptsetup FAQ](https://gitlab.com/cryptsetup/cryptsetup/-/wikis/FrequentlyAskedQuestions#9-the-initrd-question) on gitlab
- [veritytab manpage](https://www.freedesktop.org/software/systemd/man/veritytab.html)