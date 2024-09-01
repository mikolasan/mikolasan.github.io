---
path: "/projects/my-drum-machine"
date: "2020-05-16"
title: "My Drum Machine"
tags: ["laser cut", "mobile"]
published: 2021-10-28
lastModified: 2021-10-28
---

After I finished a project with an acrylic case that was laser cut by a layout that I simply downloaded from the Internet, I decided to find a new project where I will design a case, split it into parts, and prepare my layout. As usual, I have started looking into Pinterest boards to find suitable design ideas. My search was around arcade machines, arcade button consoles, and custom enclosures for Raspberry Pi and such. Not many cases are made out of plywood. I found some boxes with interesting engravings, but I focused on a combination of shapes and materials, while the comfortable layout of buttons can be arranged on it.

A box with buttons is a beautiful thing by itself, nevertheless, I expected to make a MIDI controller that can be connected to my computer for producing drum sounds in the DAW. 

But the idea is going crazy here. Instead of adding MIDI logic to buttons with Arduino or Raspberry board, the plan is to connect buttons with a USB cable to the mobile device as an OTG device, get inputs from button deck or user interface, and send it as MIDI signal out. I tried MIDI piano on my tablet and can recommend one application: MIDI Keyboard from Dreamhound Studios. So learning USB protocol was an appealing bonus in this project, although it can be done without the mobile application.

## Links

- [DMach](https://github.com/simonnorberg/dmach)
- [G-Stomper VA-Beast Synth](https://play.google.com/store/apps/details?id=com.planeth.vabeastdemo&hl=en)
