---
title: Local Debian mail
date: 2025-08-18
published: 2025-08-18
lastModified: 2025-08-19
subtitle: Send mail from one user to another
---
Probably it all starts when I get lonely.

## Install

Install GNU mail

```bash
apt install mailutils
dpkg-reconfigure exim4-config
```

## Add notifications

Remove the mail check from ssh greeting editing **/etc/pam.d/sshd**

```
# Print the status of the user's mailbox upon successful login.
#session    optional     pam_mail.so standard noenv # [1]
```

Also remove the mail check from pam config (not when you login via ssh?) editing **/etc/pam.d/login**

```
#session    optional   pam_mail.so standard
```

And finally create our super greeting via _message of the day_ script

```sh
# nano /etc/update-motd.d/90-mail

#!/bin/sh

mbox=$(id -un $(cat /proc/self/loginuid))
if [ "$mbox" = "root" ]; then
    mbox=mail
fi

#echo "whoiam: "$(whoiam)
#echo "id    : "$(id -un)
#echo "USER  : $USER"
#echo "SSH_USER : $SSH_USER"
#echo "loginuid: "$(id -un $(cat /proc/self/loginuid))

box_file=/var/mail/$mbox
[ -e "$box_file" ] || exit 0
count=$(grep -c '^From ' "$box_file")
[ "$count" -gt 0 ] && echo "\n📬 You have $count mail message(s). Type 'mail -f /var/spool/mail/$mbox' to read.\n"
```

## Quick send

```bash
echo "Hello Tony, this is a test." | mail -s "Test subject" tony
echo "I just installed 'mail' (mailutils). This is a test to check a new motd script :)" | mail -s "Test motd on root" root
```

## `mail` interactive commands Cheat Sheet

Usually you don't need to specify the file for your user. But just in case, this is where you can find it:

```bash
mail -f /var/spool/mail/nikolay
```


- `t <n>` – Type (show) message _n_.
- `n` – Show next message.
- `h` – List message headers (current screenful).
- `z` – Show next screenful of headers.
- `z-` – Show previous screenful of headers.
- `p` – Print current message again.
- `d <n>` – Delete message _n_ (marks for deletion).
- `u <n>` – Undelete message _n_.
- `s <n> file` – Save message _n_ to a file (usually in `mbox` format).
- `w <n> file` – Write message _n_ to a file (just body, no headers).
- - `x` – Exit without making changes (abort session).
- `q` – Quit, saving changes (deleted messages removed, saved ones moved).
- `file filename` – Switch to another mailbox file.
- `/string` – Search for messages containing _string_.
- `?` – Print help for commands.

### Sending / Replying

- `m address` – Mail a message to `address`.
- `r` – Reply to sender.
- `R` – Reply to sender **and all recipients**.
- `f` – Forward (resend) current message.

### Special Notes

- Messages are numbered within the current mailbox.
- You can give ranges: e.g., `d 1-5` deletes messages 1 through 5.
- Deleted messages aren’t removed until you quit (`q`).