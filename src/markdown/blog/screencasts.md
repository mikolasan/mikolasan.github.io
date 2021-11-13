---
date: 2021-04-13
title: Be ready to screencast!
---

## Setup OBS

If your video card is Nvidia, then the following settings will work for you. If you are using a laptop with Intel/Nvidia mix, then you will need to connect an external monitor in order to grab picture from Nvidia video card.

Later I reproduce setting descriptions from https://www.nvidia.com/en-us/geforce/guides/broadcasting-guide/

- Type: Standard.
- Recording Path: This is the directory where the videos will be saved. Make sure the hard drive you select has enough space!
- Recording Format: FLV; or MKV if you use multiple audio tracks.
- Audio Track: Leave it at 1 for default; you can add more audio tracks if you are using more sources.
- Encoder: NVIDIA NVENC H.264 (new).
- Rate Control: We recommend CQP, although VBR will also produce good results.
	- CQ Level (CQ): 15 (you can decrease the number to get higher quality).
	- Bitrate and Max Bitrate (VBR): 40,000 Bitrate; 60,000 Max bitrate. You can increase these to 100,000 and 200,000 (respectively) for higher quality.
- Keyframe Interval: 0 or 2.
- Preset: Select Quality. You can change this to Max-Quality to enable 2-pass encoding; this will provide you a minor quality increase but may cause problems in limited situations in maxed out GPUs.
- Profile: Set to High.
- Look-ahead: Checked.
- Psycho Visual Tuning: Checked.
- GPU: 0. If you have 2 GPUs in your system, you can select which one is used to encode.
- Max B-Frames: Set to 4. If you uncheck the Look-ahead option, reduce this to 2 B-Frames.

Install the latest codecs and a player

- https://k-lite-codec-pack.org.ua/k-lite-codec-pack/k-lite-codec-pack-full
- https://github.com/clsid2/mpc-hc/releases

## Remote OBS as Video Source

In another words: How to stream from one OBS to another?

May be not possible in these words, but very close [solution](https://obsproject.com/forum/resources/obs-studio-send-an-udp-stream-to-a-second-pc-using-obs.455/):

- You will need [VLC 64 bit](https://obsproject.com/forum/threads/obs-studio-how-to-get-vlc-video-source.72661/)
- Correct setup with [screenshots](https://obsproject.com/forum/threads/obs-studio-send-an-udp-stream-to-a-second-pc-using-obs.55379/page-3) (woaw, screenshots are helpful) 

And here's a [real question](https://obsproject.com/forum/threads/receive-stream-from-other-obs-instance-as-source.77657/) without answer :(

Next approach would be RTMP?
