---
title: Local Debian mail
date: 2025-08-18
published: 2025-08-18
lastModified: 2025-08-19
subtitle: Send mail from one user to another
---
Probably it all starts when I get lonely.

```bash
apt install mailutils
dpkg-reconfigure exim4-config

nano /etc/pam.d/sshd
# Print the status of the user's mailbox upon successful login.
#session    optional     pam_mail.so standard noenv # [1]

nano /etc/pam.d/login
#session    optional   pam_mail.so standard

nano /etc/update-motd.d/90-mail

#!/bin/sh

mbox=$(whoami)
if [ "$mbox" = "root" ]; then
    mbox=mail
fi

box_file=/var/mail/$mbox
[ -e "$box_file" ] || exit 0
count=$(grep -c '^From ' "$box_file")
[ "$count" -gt 0 ] && echo; echo "📬 You have $count mail message(s). Type 'mail -f /var/spool/mail/$mbox' to read."; echo

echo "Hello Tony, this is a test." | mail -s "Test subject" tony
echo "I just installed 'mail' (mailutils). This is a test to check a new motd script :)" | mail -s "Test motd on root" hostmaster
```