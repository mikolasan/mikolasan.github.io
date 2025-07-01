---
title: Local music server
subtitle: on Raspberry Pi and Debian Bookworm
date: 2024-04-12
published: 2024-04-12
lastModified: 2024-04-12
---

I guess you can install raspberry jukebox and do not worry about conflicting dependencies and a pile of configuration. But if you want to build the system that works for your special case then you have to reserve a few days of struggle. But then you will be proud of yourself. Maybe it will be another OS distribution for Raspberry!

Note: I will be using `192.168.0.130` here - IP address of my Raspberry Pi. Do not forget to update it for your configuration.

## Mopidy

I think a good plan will be to install Mopidy, connect to YouTube, read my playlists there, cache music to local storage (only music, no video). Then we will need several extensions 

- [mpd]() for ... what? I forgot.
- [youtube](https://mopidy.com/ext/youtube/) (DO NOT read docs from the [develop branch](https://github.com/natumbri/mopidy-youtube) because they might have changes in the config).
- [ytmusic](https://mopidy.com/ext/ytmusic/) and [search for cookie](https://ytmusicapi.readthedocs.io/en/stable/setup/browser.html)
- Also I have some tracks on Yandex Music. [yamusic](https://pypi.org/project/mopidy-yamusic/)

Frontends to choose

- [iris](https://mopidy.com/ext/iris/)
- [RompЯ](https://fatg3erman.github.io/RompR/Rompr-And-Mopidy)


### Install

```bash
sudo mkdir -p /etc/apt/keyrings
sudo wget -q -O /etc/apt/keyrings/mopidy-archive-keyring.gpg https://apt.mopidy.com/mopidy.gpg
sudo wget -q -O /etc/apt/sources.list.d/mopidy.list https://apt.mopidy.com/bullseye.list
sudo apt update
sudo apt-get install \
  alsa-utils \
  mpd \
  mopidy \
  mopidy-mpd \
  flac \
  gstreamer1.0-plugins-bad

wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux_aarch64
chmod +x yt-dlp_linux_aarch64
sudo mv yt-dlp_linux_aarch64 /usr/local/bin/yt-dlp
sudo apt install python3-websockets
sudo python3 -m pip install --break-system-packages Mopidy-YTMusic
sudo python3 -m pip install --break-system-packages Mopidy-YouTube
sudo python3 -m pip install --break-system-packages ytmusicapi==0.25.2
/home/nikolay/.local/bin/ytmusicapi browser
sudo python3 -m pip install --break-system-packages Mopidy-Iris
pip list | grep -i mopidy

sudo nano /etc/mpd.conf
sudo mopidyctl config # check default config
sudo nano /etc/mopidy/mopidy.conf
sudo nano /lib/systemd/system/mopidy.service
sudo systemctl daemon-reload
sudo systemctl restart mopidy
```

**/etc/mpd.conf**

```
music_directory         "/home/nikolay/Music"
connection_timeout     "120"
```

**/etc/mopidy/mopidy.conf**

```
[audio]
#output = lamemp3enc ! shout2send async=false mount=mopidy ip=127.0.0.1 port=8000 password=hackme
output = audioresample ! audioconvert ! audio/x-raw,rate=48000,channels=2,format=S16LE ! filesink location=/tmp/snapfifo

[mpd]
enabled = true
hostname = 0.0.0.0
port = 6600
max_connections = 30
connection_timeout = 120

[http]
enabled = true
hostname = 0.0.0.0
port = 6680
csrf_protection = false

[youtube]
enabled = true
allow_cache = true
youtube_dl_package = yt_dlp
channel_id = UCKWaOgMnVIqwNcXXuRANo6w
musicapi_enabled = true
musicapi_cookie = <<< Read instruction where to get this >>>
#musicapi_browser_authentication_file = /home/nikolay/browser.json
playlist_max_videos = 2000
```

### RompR

```bash
sudo apt-get install \
  nginx \
  php-curl php-json php-xml php-mbstring php-sqlite3 php-gd php-fpm php-intl \
  imagemagick
sudo nano /etc/php/8.2/fpm/php.ini # see the content in the next blocks
sudo systemctl restart php8.2-fpm.service

wget https://github.com/fatg3erman/RompR/releases/download/2.14/rompr-2.14.zip
unzip rompr-2.14.zip
cd rompr/
mkdir -p prefs albumart
sudo chown www-data:www-data prefs/
sudo chown www-data:www-data albumart/
cd ../
sudo mv rompr /var/www/
sudo nano /etc/nginx/sites-available/rompr # see the content in the next blocks
sudo ln -s /etc/nginx/sites-available/rompr /etc/nginx/sites-enabled/rompr
sudo systemctl restart nginx
```

**/etc/php/8.2/fpm/php.ini**

```ini
```

**/etc/nginx/sites-available/rompr**

```
server {
    listen 80;
    listen [::]:80;

    root /var/www/rompr;
    index index.php index.html index.htm;

    server_name raspberrypi;

    client_max_body_size 256M;

    # This section can be copied into an existing default setup
    location / {
        allow all;
        index index.php;
        location ~ \.php {
                try_files $uri index.php =404;

                # This line for Debian / Ubuntu
                fastcgi_pass unix:/run/php/php-fpm.sock;

                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME $request_filename;
                include /etc/nginx/fastcgi_params;
                fastcgi_read_timeout 1800;
        }

        error_page 404 = /rompr/404.php;
        try_files $uri $uri/ =404;
        location ~ /albumart/* {
                expires -1s;

        }
    }
}
```

### Iris

Go to [http://192.168.0.130:6680/iris](http://192.168.0.130:6680/iris)


## Save playlists

### With yt-dlp

Mostly everything explained in [the docs](https://github.com/yt-dlp/yt-dlp?tab=readme-ov-file#format-selection-examples).

To transfer your cookie to Raspberry Pi use [this extension](https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/).

And this is well crafted a complete command to download one private playlist:

```bash
yt-dlp \
-P /home/nikolay/Music \
-o "%(playlist_index)s_%(title)s.%(ext)s" \
--cookies /home/nikolay/cookies.txt \
--ffmpeg-location "/usr/bin/" \
--extract-audio \
--write-thumbnail \
--restrict-filenames \
--newline \
--audio-format flac \
--audio-quality 0 \
--embed-thumbnail \
--format bestvideo*+bestaudio/best \
https://music.youtube.com/playlist?list=PL8PzFN20ieZF8Q_-PuQSeiaXBjEqrtpTV
```

### In RompR

The `youtube` extension allows to send YouTube playlist to Mopidy. Just go to [http://192.168.0.130:6680/youtube/](http://192.168.0.130:6680/youtube/) and insert your playlist like `https://music.youtube.com/playlist?list=PL8PzFN20ieZF8Q_-PuQSeiaXBjEqrtpTV` and press **Submit Query**.

Then open Rompr, the playlist from YouTube should be in the right column. Above the list find "Save playlist" button - this way you can restore/reload your playlist into the list of playing tracks.

But what we need now is to press on three lines after any track in that playlist and select "Add Album to Music collection" which will actually add all tracks from the list to the collection, so do not worry about albums.

Now on the left top bar the second button must be the Music Collection. Again by pressing on three lines after any track will open a dropdown that can be applied to all tracks, select "Download All YouTube Tracks".

### From Yandex

I found that the best way will be [a standalone tool](https://github.com/llistochek/yandex-music-downloader)

```
conda create --name music
conda activate music
conda install pip
pip install https://github.com/llistochek/yandex-music-downloader/archive/main.zip
yandex-music-downloader --help
```

There are some [tricks how to get a token](https://github.com/MarshalX/yandex-music-api/discussions/513), but once you get that use it like this:

```
yandex-music-downloader --token "<token>" --quality 1 --delay 3 --url https://music.yandex.ru/users/<user>/playlists/<playlist_id>
```


## Snapcast

Now it's time to play our collection. We are not going to play music on Raspberry Pi (which is possible through the audio jack or HDMI) but instead we will be playing _from_ Raspberry Pi by streaming in home network.

Seems like [Icecast](https://docs.mopidy.com/latest/icecast/) doesn't work, so we will use Snapcast. For Mopidy you just need to change one line ([docs](https://github.com/badaix/snapcast/blob/develop/doc/player_setup.md#mopidy))

```bash
sudo apt install snapserver
sudo nano /etc/snapserver.conf
sudo chown -R mopidy /tmp/snapfifo # or sudo sysctl fs.protected_fifos=0 ???
```

**/etc/snapserver.conf**

```ini
[http]
doc_root = /usr/share/snapserver/dist

[stream]
source = pipe:///tmp/snapfifo?name=default
```

### Web client

Probably super simple official web client [snapweb](https://github.com/badaix/snapweb) but you will need some heavy tools in order to make it

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 21

wget https://github.com/badaix/snapweb/archive/refs/tags/v0.7.0.tar.gz
tar xf v0.7.0.tar.gz
cd snapweb-0.7.0/

npm ci
npm run build

sudo mv dist/ /usr/share/snapserver/
```

Now we are almost ready!

```bash
sudo systemctl restart snapserver
sudo systemctl restart mopidy
sudo journalctl -u mopidy -f
```

Go to [http://192.168.0.130/](http://192.168.0.130/) and press play (it starts streaming but no sound)!
Then go to [http://192.168.0.130:1780/](http://192.168.0.130:1780/) and press play (it starts playing the stream from this tab)!

## Reference

- [a guide](https://ideatrash.net/2020/06/weekend-project-whole-house-and-streaming-audio-for-free-with-mpd.html)
- other [recommendations on how to use AIMP](https://www.reddit.com/r/selfhosted/comments/hiy7gs/guide_to_using_mpd_for_whole_house_audio_and/)

## More music stuff

- [smart shuffle](https://github.com/uriel1998/mpdq)
- [mpd clients](https://www.musicpd.org/clients/)
- [fediverse](https://docs.funkwhale.audio/user/index.html#set-up-your-funkwhale-account)
- [self-hosted ? music player](https://github.com/jeffvli/feishin)