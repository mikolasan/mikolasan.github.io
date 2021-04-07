---
path: /blog/parallel-ssh
date: 2021-04-06
title: How to update 30 ubuntu machines connected to one network
---

I usually test on one machine, ensuring that all steps can be executed unnatended and then replicate them with parallel-ssh. For that thing we will need a list of all machines, but we will talk about it later (down the road).

Be advised that all commands here are run from a root user. So first update the system. 

```shell
apt -y update
apt -y upgrade
```

And here is the first obstacle when dpkg tries to interactively configure packages. It usually does that when you have a change in configuration file which is a part of that package. We want to keep our changes.

At this point my ssh connection to the server died leaving configuration process running in the background. Remove all locks

```shell
rm /var/lib/dpkg/lock-frontend
rm /var/lib/dpkg/lock
rm /var/cache/apt/archives/lock
```

If I run again `apt upgrade` or `dpkg --configure -a` or `apt-get --fix-broken install` I get this error message

```shell
debconf: DbDriver "config": /var/cache/debconf/config.dat is locked by another process: Resource temporarily unavailable
```

Find that process and stop it:

```shell
fuser -v /var/cache/debconf/config.dat
kill PID
```

Reference:

- https://askubuntu.com/questions/136881/debconf-dbdriver-config-config-dat-is-locked-by-another-process-resource-t

But this time we will try to make configuration automatic by passing our choice "keep the local version currently installed" to dpkg

```shell
DEBIAN_FRONTEND=noninteractive apt-get -o Dpkg::Options::="--force-confold" -yq upgrade
```

Reference:

- https://unix.stackexchange.com/questions/332909/update-upgrade-debian-and-skip-any-interactions
- man dpkg

Then clean some old kernels

```shell
apt -y autoremove
```

Then install NVidia proprietary video driver

```shell
ubuntu-drivers autoinstall
```

As a result on all other machines I will run

```shell
rm -f /var/lib/dpkg/lock-frontend /var/lib/dpkg/lock /var/cache/apt/archives/lock
apt update
DEBIAN_FRONTEND=noninteractive apt-get -o Dpkg::Options::="--force-confold" -yq upgrade
apt -y upgrade  # explained later
apt -y autoremove
```

### List of hosts

Now let's get a list of hosts. On all our clients I have ssh server on and running, so port 22 should be open:

```shell
nmap -p 22 10.0.0.0/24
```

Add some bash magic to get a nice list suitable for `parallel-ssh`:

```shell
nmap -oG - -p 22 10.0.0.0/24 | grep "Ports: 22/open" | sed -r -e 's/^Host: ([0-9\.]+) \(.*/\1/' > list.txt
parallel-ssh -h list.txt -t 0 -O IdentityFile=my_key -O StrictHostKeyChecking=no -l root 'apt update'
```

### Release file is not valid yet

On some machines time was incorrect. How do I now that? I've got error code 100 from apt update. I ran apt update manually to see

```shell
Get:1 http://security.ubuntu.com/ubuntu bionic-security InRelease [88.7 kB]
Hit:2 http://us.archive.ubuntu.com/ubuntu bionic InRelease
Get:3 http://us.archive.ubuntu.com/ubuntu bionic-updates InRelease [88.7 kB]
Reading package lists... Done
E: Release file for http://security.ubuntu.com/ubuntu/dists/bionic-security/InRelease is not valid yet (invalid for another 1h 38min 45s). Updates for this repository will not be applied.
E: Release file for http://us.archive.ubuntu.com/ubuntu/dists/bionic-updates/InRelease is not valid yet (invalid for another 2h 48min 36s). Updates for this repository will not be applied.
```

But I knew how to fix that. I get correct time from the server and update it on all machines making sure that timezone is correct and fixing BIOS time 

```shell
parallel-ssh -h list.txt -t 0 -O IdentityFile=my_key -O StrictHostKeyChecking=no -l root "timedatectl set-ntp 1; timedatectl set-timezone America/Chicago; date -s \"$(date '+%b %d %T %Y')\"; hwclock -w"
parallel-ssh -i -h list.txt -t 0 -O IdentityFile=my_key -O StrictHostKeyChecking=no -l root 'printf "%s %s\n" "$(hwclock -r)" "$(date)"'
```

After that I still get 25 packages that were kept back not upgraded. For some reason apt-get ignored them. Because it already did all noninteractive work I tried its wrapper - apt

```shell
apt -y upgrade
```
