---
title: Prototype 3
date: 2023-07-17
published: 2023-07-17
lastModified: 2023-07-17
subtitle: Is it doable?
---
Imagine having a robot coach that is always by your side, helping you to get things done quicker and easier. A robot coach that is not just a boring app in your phone, but a small and cute companion that you can take with you to your job place. It syncs with your favorite task manager (Asana, Trello, Jira) and keeps track of your progress and goals. It asks what you are doing and reminds you what you should do next. You can smack it in the nose and it will be angry, or you can finish the task and it will be happy for you. A robot coach that motivates you, cheers you up, and celebrates your achievements. Possibly it will make your work life more fun and productive.

### Components

- connect to task managers (wifi module + plugins for online services API)
- **[listen and recognize speech](/ai/voice-recognition-ai-model)** - convert to text
- **[LLM model](/ai/the-smallest-transformer)** to process questions and generate answers
- speech synthesizer for audible responses
- [motors for interactive appearance](/ai/solve-cartpole-with-spiking-neural-networks) (probably not much movement out of its position, more like gestures)
- display with [a face drawn as a sketch from real photos expressing different emotions](/ai/agent-emotion-model)
- emotional model that changes emotions over time
  
### Limited version

- connect to task managers (wifi module + plugins for online services API)
- speech synthesizer for audible responses
- motors for interactive appearance (probably not much movement out of its position, more like gestures)
- display with a face drawn as a sketch from real photos of different emotions
- emotional model that changes emotions over time

## Hardware

### Exploring the market

- [Qualcomm AI Engine](https://www.mouser.com/datasheet/2/224/Lantronix_Open_Q_5165RB_SOM_Product_Brief_1-2578682.pdf) - Portable but expensive ( >$700)

