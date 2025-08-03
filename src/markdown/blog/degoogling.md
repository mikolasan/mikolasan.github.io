---
title: Degoogling
date: 2024-03-11
published: 2025-03-08
lastModified: 2025-03-08
---


I've got the following table from [here](https://www.tbray.org/ongoing/When/202x/2024/03/09/DeGoogling) but later tested some options and found other (better?)  solutions. So I edited the original table and extended.

| Need             | Say No to                    | Good alternatives                                                                                                                                                                                         | Notes                                                                                                                                                                                                           |
| ---------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E-Mail           | GMail                        | Proton Mail, [Tuta](https://tuta.com/)                                                                                                                                                                    | The storage and sorting/filtering functionality is limited on free plans but I changed my habits a bit - both services allow to export all messages, which I load into Thunderbird, sort how I want and backup. |
| Office           | Google Docs                  | [LibreOffice](https://www.libreoffice.org/), OnlyOffice, [Docs](https://github.com/suitenumerique/docs)                                                                                                   |                                                                                                                                                                                                                 |
| Data sharing     | Google Drive                 | Dropbox, [Filen](https://filen.io/)                                                                                                                                                                       |                                                                                                                                                                                                                 |
| Photo storage    | Google Photos                | Immich ([https://immich.app/docs/install/docker-compose](https://immich.app/docs/install/docker-compose), [https://github.com/imagegenius/docker-immich/](https://github.com/imagegenius/docker-immich/)) |                                                                                                                                                                                                                 |
| Video meetings   | Google Meet                  | [dino](https://github.com/dino/dino) ? (XMPP based)                                                                                                                                                       |                                                                                                                                                                                                                 |
| Maps             | Google Maps                  | Magic Earth, Here, something OSM-based (OpenStreetMap) - Organic Maps (iOS)                                                                                                                               |                                                                                                                                                                                                                 |
| Browser          | Safari, Edge, Google Chrome  | Floorp (Firefox based)                                                                                                                                                                                    | Firefox account is compatible with Floorp                                                                                                                                                                       |
| Search           | Google, Bing                 | [Qwant](https://www.qwant.com) (basically Bing), [SearXNG](https://searx.space/)                                                                                                                          |                                                                                                                                                                                                                 |
| Chat             | WhatsApp, Slack              | Signal, Matrix, IRC*, Zulip                                                                                                                                                                               |                                                                                                                                                                                                                 |
| Photo editing    | Adobe Lightroom, Photoshop   | Capture One, Darktable, ? GIMP, Affinity                                                                                                                                                                  |                                                                                                                                                                                                                 |
| Play my music    | Spotify, YouTube Music       | AIMP                                                                                                                                                                                                      |                                                                                                                                                                                                                 |
| Discover music   | YouTube Music                | Movie soundtracks                                                                                                                                                                                         |                                                                                                                                                                                                                 |
| TV shows, Movies | Amazon Prime, Apple, Netflix | Read books                                                                                                                                                                                                |                                                                                                                                                                                                                 |
| Sport tracker    | Nike Run Club, Runna, Strava | [Running Page](https://github.com/yihong0618/running_page)                                                                                                                                                |                                                                                                                                                                                                                 |


IRC: Kiwi IRC [https://hybridirc.com/embedding/](https://hybridirc.com/embedding/) [https://github.com/kiwiirc/kiwiirc/wiki/Configuration](https://github.com/kiwiirc/kiwiirc/wiki/Configuration)

## Other big company services

- Reddit -> Lemmy ([List](https://lemmy.fediverse.observer/list))
- Jira / Asana / Trello -> [Taiga](https://community.taiga.io/t/taiga-30min-setup/170) or [Tenzu](https://tenzu.net/en/) (there is no way to import from Jira Cloud)
- Asana -> [Task Warrior](/linux/task-management-with-taskwarrior)
- Notion / Evernote -> [Docs](https://github.com/suitenumerique/docs)

## Other free tools

Something less known as GIMP or blender and not specifically a Google's counterpart but some remarkable free software that frees you from online services.

- [KeeWeb](https://github.com/keeweb/keeweb) is a browser and desktop password manager or [bitwarden](https://bitwarden.com/pricing/)
- [Donetick](https://github.com/donetick/donetick) - todolist

## Other steps

- View data offline, have a local backup by following the notes from [Own your stuff](/blog/own-your-stuff)
- TODO

## Other blogs doing the same

- [The Opt Out Project](https://www.optoutproject.net/control-collaborations/) - challenge and reward based. Cons - gives strange alternatives sometimes, either paid services or poor software while there are another amzing homelab solutions and/or free/libre software
- [Comment j’ai dégooglisé ma vie](https://www.frandroid.com/marques/google/2605293_comment-jai-degooglise-ma-vie-episode-1-les-applications-et-les-outils-indispensables) - mentioning Immich, kSuite, Notesnook
- 