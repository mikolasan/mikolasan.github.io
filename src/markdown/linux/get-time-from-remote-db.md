---
date: 2021-11-02
title: Get time from remote DB
published: 2021-11-02
lastModified: 2021-11-02
---

Getting time from a remote database can be a simple way to maintain consistency across distributed systems, which is important for ensuring accurate logging and auditing of system activity.

```bash
REMOTE_IP=192.168.1.2
POSTGRES_USER=user
POSTGRES_DB=db
CONNECTION_CONFIG="-h $REMOTE_IP -U $POSTGRES_USER -d $POSTGRES_DB"
until pg_isready $CONNECTION_CONFIG; do sleep 1; done
psql $CONNECTION_CONFIG -c "select timeofday();" \
| sed -n 3p \
| xargs -i date -s '{}'
```