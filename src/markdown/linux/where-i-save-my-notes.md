---
title: Where I save my notes
subtitle: which is not Evernote and not Notion
date: 2025-08-31
published: 2026-04-28
lastModified: 2026-04-28
---
## And not La suite Docs

I wanted to go with [La Suite Docs](https://github.com/suitenumerique/docs), but it is very heavy for my BOLT. Keycloak is a massive Java black hole. And the development build of frontend (nodejs and nextjs) engulfs 3-4 GB when you try to load the front page for the first time. 

Besides, the developers shifted gears to collaboration first experience very heavily, so the first page starts with all public notes from random people. Another annoying thing is that it cannot stay on the page for long. It either resets and scrolls to the top, or logs you out. Not my cup of pretzels. 

And they added AI agents 🤢 The same as the [service that provides a free alternative compatible with S3](https://docs.min.io/enterprise/aistor-object-store/) (term from AWS cloud infrastructure)

## Obsidian

I used Obsidian locally on my phone for some time already. And it was almost what I needed, just needed synchronization across my laptop and my phone.

### Obsidian self-hosted sync

Goes through CouchDB

```bash
cd /opt
sudo mkdir couchdb

sudo chown mikolasan:mikolasan -R couchdb/
cd couchdb/
mkdir local.d data
nano docker-compose.yml

### docker-compose.yml
services:
  couchdb:
    image: couchdb:latest
    container_name: obsidian-livesync
    environment:
      - COUCHDB_USER=admin
      - COUCHDB_PASSWORD=XXX
    volumes:
      - ./data:/opt/couchdb/data
      - ./local.d/:/opt/couchdb/local.d
    restart: unless-stopped
    ports:
      - 127.0.0.1:5984:5984/tcp
###

sudo docker compose up -d

nano Caddyfile

### Caddyfile
obsidian-sync.neupokoev.xyz {
    reverse_proxy localhost:5984
}
###

sudo docker restart caddy
```


## Daily agenda

How to collect a day agenda from notes in Obsidian. Notes will have a property - due date. And how to add a notification to Obsidian when such agenda is posted?

From the premise that I’m a developer and like decentralized system, you could conclude that we will explore an option of writing a Matrix bot. From my experience with Slack, the message might be well formatted and interactive. Does Matrix support this?

I have Synapse Matrix server running on Udo Bolt. I prefer to write the bot in Rust, C++, or C. I also open to languages like Elixir.

Maybe I don’t need interactivity, I will update my tasks in Obsidian directly. But I don’t think, I will be syncing my notes to that server. I already sync them to CouchDB, can we connect to that and do queries with it?
It’s encoded. And chunked, I assume. But when we connect to CouchDB with the proper credentials, it’s not a problem for queries, right?

When I was connecting the Twitter bridge, I didn’t need to specify bot’s username and password. It somehow created a space and sent me invites to required rooms. Should we do the same?

And also, continuously tracking changes from CouchDB is cool and all, but that’s very inconvenient for our task. We just need to run one Mango query at 8 am - that’s all

I believe the space and room must be created automatically. This will make less friction for other people if I were to share this bot

I would like to go with a local Obsidian instance on the server, but seems like obsidian-vault-cli doesn't support encryption

Seems like the fanselau version doesn't support full sync or mirror. So I'm trying the official one.

Maybe I want to use the daemon mode, or to pull only specific files or folders, we will figure this out. But while I successfully have done sync and mirror once, let’s see how we can determine the daily agenda. We started playing with dataview but we will need another CLI to evoke that. What will be better?


https://github.com/vrtmrz/obsidian-livesync/blob/5ffa7ec7ee70acd3262274948d43150f577a5f89/docs/settings.md#6-customization-sync-advanced