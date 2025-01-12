---
title: Simple video editing
date: 2024-12-24
published: 2024-12-24
lastModified: 2024-12-24
subtitle: with ffmpeg
---
## Trim video


trim 3 seconds from start and 3 seconds from end. which means that from the total duration (this is how to check video length:

```
D:\Programs\video-tools>ffprobe -i d:\position_interpolation_with_curve.mp4 -show_entries format=duration -v quiet -of csv="p=0" -sexagesimal
```

58 seconds) we need to subtract 3 seconds and that will be the value for the `-t` option

```
ffmpeg -t 00:00:55 -i d:\position_interpolation_with_curve.mp4 -ss 00:00:03 -async 1 d:\position_interpolation_with_curve_trimmed.mp4
```

- `-ss` is used to seek to a part in the video and 
- `-t` is the duration of the playback