---
title: Sensor dashboard
date: 2022-08-21
previewImage: sensor-readings-rpi4-elastic-3.png
---

I had an ambitious plan for a long 3 day weekend. I stuck with the first item for a week. Then the next weekend I did a good progress striking out half of all that was planned. So here is the story how tiny plan stayed with me for 2 month.

![Current progress tracked in trello card](./plan-progress-in-trello.png)


## The plan

Plans for the weekend

- Install on Raspberry Pi some OS
- Connect [temperature sensor (BME280)](/make/temperature-sensor-rpi4)
- Collect data with ELK
- Send laptop sensors to Pi
- Display some nice dashboard
- Connect [Pi Camera](/make/raspberry-pi-camera)
- Stream camera feed
- Run object recognition on camera stream

![I just need to clear this pile on my table](./weekend-plan-in-the-beginning.jpg)


## Elasticsearch

Basic install of elasticsearch with only system metrics takes 2.3GB of memory.

I'm not saying that it created a nice dashboard, it could be better. But I like that the system is very modular, so maybe I should take a look at the sources and strip it.

Can Java VM be tiny?

> you didn‘t configure the heap size I assume? by default elasticsearch assumes that it‘s the only process running on that instance / VM / container and use all the resources. if you want to have this shared, you‘ll need to configure it
>
> unfortunately there is no easy "right" default setup. for many (we'd think most) people the full instance is right and what you want. but others want something minimal (though what is minimal also really depends on the use-case). so you'll need to configure at least a bit
>
> [Philipp Krenn](https://twitter.com/xeraa/status/1544988075683618816)

![elastic dashboard slide 1](./sensor-readings-rpi4-elastic-1.png)

Temperature spikes I can only explain by AC. I have plans to make the whole thing remote and transmit the data by radio. Outside temp will be more adequate I guess

![elastic dashboard slide 2](./sensor-readings-rpi4-elastic-2.png)


## Pi accessories

After few days sitting idle and only reading the sensor it started to raise the temperature. Then I started streaming blurry image from my camera, and it came to 80C 🔥

I should get better radiators and a fan.

The Pi requires so many accessories 😑

![Reading uptime, memory percentage, and drawing CPU load graph from Raspberry Pi](./dashboard-rpi4.png)


## Measuring the laptop temperature

For the next thing, CPU temperature monitoring, I was using fancy program pre-installed by Acer. I wonder, can I quickly rewrite it and add reports? My assumption is that they use some library, that gives all data and they simply draw it.

To collect some intel I will use Dependency Walker. It might tell what libraries are important for the program.

![dependency walker output on predator sense](./dependency-walker-predatorsense.png)

Where can I find the Intel Overclocking SDK? No plans for overclocking, I'm just looking for a library that gives CPU/GPU temperature. This is for Windows laptop where I'm going to run compilation, GPU computation. External device will receive sensor readings and will shutdown the laptop in case of overheating.

Tentatively C# language. I look at [this](https://github.com/openhardwaremonitor/openhardwaremonitor), but the absence of readme has dispirited me. That's why there's an active fork of **Open Hardware Monitor** - [Libre Hardware Monitor](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor)