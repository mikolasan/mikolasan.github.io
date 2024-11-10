---
title: Ansible grimoire
date: 2024-09-26
published: 2024-10-04
lastModified: 2024-10-04
---
You have tasks defined in a file (note: check [crontab-guru](https://crontab.guru/#5_*_*_*_*) for easy crontab syntax editing, verifying, and maybe understanding)

```bash
# Daily
0 5 * * * /usr/lib/db_maintenance_1.sh >> /var/log/db_maintenance.log 2>&1

# Weekly
0 5 * * 1 /usr/lib/db_maintenance_2.sh >> /var/log/db_maintenance.log 2>&1

# Monthly
0 5 1 * * /usr/lib/db_maintenance_3.sh >> /var/log/db_maintenance.log 2>&1
```

And manually you would add them with this command

```jsx
cat cron_tasks | crontab -
```

But in Ansible you can read file content into a variable and assign that variable to stdin easily like this

```jsx
- name: Add cron tasks
    command: "crontab -"
    args:
      stdin: "{{ lookup('ansible.builtin.file', 'files/cron_tasks') }}"
```

Just make sure that these tasks are the only one that you want for that user (previous tasks will be deleted)