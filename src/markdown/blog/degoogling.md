---
title: Degoogling
date: 2024-03-11
published: 2025-03-08
lastModified: 2025-03-08
---


I've got the following table from [here](https://www.tbray.org/ongoing/When/202x/2024/03/09/DeGoogling) but later tested some options and found other (better?)  solutions. So I edited the original table and extended.

| Need             | Say No to                    | Good alternatives                                                                                                                                                                                         | Notes                                                                                                                                                                                                                     |
| ---------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E-Mail           | GMail                        | Proton Mail, [Tuta](https://tuta.com/)                                                                                                                                                                    | The storage and sorting/filtering functionality is limited on free plans but I changed my habits a bit - both services allow to export all messages, which I load into Thunderbird, and there sort how I want and backup. |
| Office           | Google Docs                  | [LibreOffice](https://www.libreoffice.org/), OnlyOffice, [Docs](https://github.com/suitenumerique/docs)                                                                                                   |                                                                                                                                                                                                                           |
| Data sharing     | Google Drive                 | Dropbox, [Filen](https://filen.io/)                                                                                                                                                                       | Look at document management with [Paperless-ngx](https://www.xda-developers.com/host-paperless-ngx-on-your-home-lab/)                                                                                                     |
| Photo storage    | Google Photos                | Immich ([https://immich.app/docs/install/docker-compose](https://immich.app/docs/install/docker-compose), [https://github.com/imagegenius/docker-immich/](https://github.com/imagegenius/docker-immich/)) |                                                                                                                                                                                                                           |
| Video meetings   | Google Meet                  | [dino](https://github.com/dino/dino) ? (XMPP based)                                                                                                                                                       |                                                                                                                                                                                                                           |
| Maps             | Google Maps                  | Magic Earth, Here, something OSM-based (OpenStreetMap) - Organic Maps (iOS)                                                                                                                               |                                                                                                                                                                                                                           |
| Browser          | Safari, Edge, Google Chrome  | Floorp (Firefox based)                                                                                                                                                                                    | Firefox account is compatible with Floorp                                                                                                                                                                                 |
| Search           | Google, Bing                 | [Qwant](https://www.qwant.com) (basically Bing), [SearXNG](https://searx.space/)                                                                                                                          |                                                                                                                                                                                                                           |
| Chat             | WhatsApp, Slack              | Signal, Matrix, [IRC](/linux/install-irc-server), [Zulip](https://zulip.com/self-hosting/)                                                                                                                |                                                                                                                                                                                                                           |
| Photo editing    | Adobe Lightroom, Photoshop   | Capture One, Darktable, ? GIMP, Affinity                                                                                                                                                                  |                                                                                                                                                                                                                           |
| Play my music    | Spotify, YouTube Music       | AIMP                                                                                                                                                                                                      |                                                                                                                                                                                                                           |
| Discover music   | YouTube Music                | Movie soundtracks                                                                                                                                                                                         |                                                                                                                                                                                                                           |
| TV shows, Movies | Amazon Prime, Apple, Netflix | Read books                                                                                                                                                                                                |                                                                                                                                                                                                                           |
| Sport tracker    | Nike Run Club, Runna, Strava | [Running Page](https://github.com/yihong0618/running_page)                                                                                                                                                |                                                                                                                                                                                                                           |
| Videos           | YouTube, Vimeo               | PeerTube (For example [MakerTube](https://makertube.net/videos/browse?scope=local&sort=-publishedAt))                                                                                                     | See a sidenote below                                                                                                                                                                                                      |


## Big sidenote about YouTube

- You can "improve" YouTube experience with a browser addon [Unhook](https://addons.mozilla.org/en-US/firefox/addon/youtube-recommended-videos/) 
- see honest titles and thumbnails with [DeArrow](https://dearrow.ajay.app/)
- or try another "front-ends" like [Invidious](https://invidious.io/) or [FreeTube](https://freetubeapp.io/) 
- and when you embed youtube links on social platforms [you can do it nicely](https://muratcorlu.github.io/better-youtube-embed/)

## Other big company services

- Reddit -> Lemmy ([List](https://lemmy.fediverse.observer/list))
- Jira / Asana / Trello -> [Taiga](https://community.taiga.io/t/taiga-30min-setup/170) or [Tenzu](https://tenzu.net/en/) (there is no way to import from Jira Cloud)
- Asana -> [Task Warrior](/linux/task-management-with-taskwarrior) or Obsidian ([with a bit of self-hosting shenanigans](/linux/where-i-save-my-notes))
- Notion / Evernote -> [Docs](https://github.com/suitenumerique/docs) (?), Obsidian + [Notebook Navigator](https://notebooknavigator.com/)
- GitHub -> [tangled](https://tangled.sh/) (probably this is [how a social coding platform should look like](/blog/how-github-should-work))

## Other free tools

Something less known is that GIMP or blender and others, not specifically Google's counterparts, but some remarkable free software that frees you from online services.

- [KeeWeb](https://github.com/keeweb/keeweb) is a browser and desktop password manager or [bitwarden](https://bitwarden.com/pricing/)
- [Donetick](https://github.com/donetick/donetick) - todolist
- [Scribus](https://wiki.scribus.net/canvas/Category:Contents) - for making booklets and magazines

## Other steps

- Even though, you can keep using familiar to you services but in much cleaner way with [LibRedirect](https://libredirect.github.io/faq.html)
- View data offline, have a local backup by following the notes from [Own your stuff](/blog/own-your-stuff)
- While you export all your data from services you may need some extra steps: [cobalt](https://github.com/imputnet/cobalt) - media downloader.

## Other blogs doing the same

- [The Opt Out Project](https://www.optoutproject.net/control-collaborations/) - challenge and reward based. Cons - gives strange alternatives sometimes, either paid services or poor software while there are another amazing homelab solutions and/or free/libre software
- [Comment j’ai dégooglisé ma vie](https://www.frandroid.com/marques/google/2605293_comment-jai-degooglise-ma-vie-episode-1-les-applications-et-les-outils-indispensables) - mentioning Immich, kSuite, Notesnook
- 