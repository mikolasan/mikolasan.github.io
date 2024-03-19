---
title: In search of Robotic Operating System
twitter: https://twitter.com/mikolasan/status/1706527808883978380
date: 2023-09-25
published: 2023-09-25
lastModified: 2023-09-25
---
Can you explain what do you find in ROS that is missing in regular Linux? (I’ve never used ROS, but it’s mentioned regularly, and I’m curious what is it, though official website doesn’t explain much)

[Lake](https://twitter.com/robotempire1) says:

> ROS is a backend framework for robotics that allows you to easily communicate between robot hardware, leverage existing robotics packages, and simulate robot behaviours with the aid of robot simulators like [@GazeboSim](https://twitter.com/GazeboSim). ROS is mainly built for some Linux-based OS.

First, it's strange to call some framework as Robot Operating System. If it's designed for embedded systems, how small is it? 50MB or so? Usually if I connect a sensor, I write a python script. How does it work with ROS?

> It's designed for (embedded) linux which has enough space to run it. The microcontroller variant, micro-ROS, is lightweight and can run on RTOS enabled MCUs. The sensor probably has a ROS package that makes processing its data easier. ROS has tools that'll make writing that script less hassle free. For example, if your sensor is an encoder, ROS can use the information from the encoder to keep track of the transformation between the encoder and any connected link. If you have an IMU and GPS on a robot, ROS can help you fuse these sensors for state estimation or localization with writing any code. The ROS mantra is "don't reinvent the wheel."

If documentation is complete with examples and API is nice and clean, then why not. I’ll give it a try with a soil moisture sensor. But can I later use their libraries on Arduino board?

I'm reading [one example](https://wiki.ros.org/rosserial_arduino/Tutorials/Measuring%20Temperature) of using ROS and I'm confused even more. It feels like ROS is not intended to be installed on RPi as an operating system. It's bizarre. I think I need to install ROS on my computer and I'll get the Arduino libraries.

It may sound that I mix Raspberry Pi and Arduino and that I want to install some OS on Arduino. Haha, no, no, no. I hear ROS, ROS! ROS!!! from everywhere and I'm working on robotics project, thus I'm very interested in tools used in the community.

My first assumption is that to control a robot you need powerful MCU. So, 32 bit processor at least, not 8 bit. Support of floating point operations, and, I believe, it's faster overall. Hence, I think about Raspberry Pi, because why not, I can prototype on it

On Raspberry Pi I can install any Linux distribution compiled for ARM. For some reason Ubuntu or Debian are very popular, but they require like 2GB of space. I don't want to compile my custom OS because that way I will lose all precompiled packages from Ubuntu

I'm familiar with [buildroot](https://buildroot.org/downloads/manual/manual.html#_buildroot_quick_start). I know that busybox, Python 3, Qt, video drivers (NVIDIA, AMD, Intel) and Wayland together make only 70MB in compressed ramfs.

Probably someone already went trough that process. I've heard about Yocto Project, OpenEmbedded, Boot2Qt. And ROS. Right? On their website I read: ROS 2 is based on Ubuntu 22 (it actually says that it installs *on* Ubuntu, which doesn't make sense if it's an OS by itself)

Originally, I was expecting ROS to be an OS with libraries that cover all basic protocols, with set in stone architecture that defines how data flows from sensors, how commands are sent to actuators, and many other things happening asynchronously that should be organized

And here's the transition to Arduino, much less power intensive brain for some simple operations. Though, even in a big robot project some subsystems may not require heavy compute powers and will be okay on 8 bit MCU.

C (and C++) libraries can be easily adopted for Arduino projects. That's how I assumed that ROS can support Arduino as well. And maybe such libraries do exist in the first place (I see ros.h is included in one tutorial). But this name just doesn't live up to my expectations.

And if ROS just works for Arduino, then I would like to find Real Robot OS at some point.

Next, I'll try to [figure out what is ROS](https://docs.ros.org/en/rolling/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html) suitable for and what it is not. Stay tuned, I guess