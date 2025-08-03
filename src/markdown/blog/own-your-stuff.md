---
title: Own your stuff
date: 2025-02-07
published: 2025-02-07
lastModified: 2025-06-01
---
### Pinterest

Download all boards from pinterest

```bash
conda create --name gallery_env
conda activate gallery_env
conda install pip
pip install -U gallery-dl
pip install -U youtube-dl
conda install -c conda-forge ffmpeg
mkdir pinterest
cd pinterest
gallery-dl --cookies-from-browser firefox "<https://www.pinterest.com/mikolasan/>"

```

## Web browsers

### Firefox (history)

Export Firefox history (sqlite file) with

- [Nir Soft](https://www.nirsoft.net/utils/browsing_history_view.html) tool
- or simply **DB Browser for SQLite**

and export as CSV (ready for Excel... LIbreCalc ;) )

### Bookmarks, open tabs

Use [Readeck](https://readeck.org/en/) to retrieve web pages for offline reading. Just in case, if the link has changed, or the site went down, or AI has gone rogue and all networks vanished into oblivion, but you still would want to read that open tab that you set aside a long time ago.

## Mastodon

Search and view your posts from an exported archive with [MARL](https://github.com/s427/MARL)

## Other services

To be continued...