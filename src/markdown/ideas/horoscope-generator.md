---
date: "2020-05-16"
title: "Horoscope generator"
subtitle: "Speaks for itself"
tags: ["artificial intelligence"]
featuredImage: horoscope-generator.jpg
previewImage: horoscope-generator-preview.jpg
idea: innovative
published: 2022-06-21
lastModified: 2022-08-02
---

## App design

This application tries to guess user's birthday. It has 365 attempts to do that because it will not ask any questions that normally narrow down an interval of possible answers. The app deliberately chooses the hard way. It gives broad descriptions of what should happen in person's life pretending that life is defined by the Universe, stars, and the zodiac. Thereby every day (week) the user receives a new prophecy and, depending on when it must happen, only after that moment he or she can rate the prophecy, discard it and take a new one.

It is not important when the birthday will be determined by the app. Mainly we generate interesting prophecies and the user finds out if he or she belongs to his (her) zodiac.

The huge problem with this idea is that you will not find free and more or less good services generating horoscopes. So the only way is to generate text using machine learning techniques.

## Theory

There are two ways to generate sentences (in natural language) that I found:

- build a tree structure using A* search
- sequence to sequence (seq2seq) using Recurrent Neural Networks

And I prefer more controllable A*-search-based generation. [Training a Natural Language Generator From Unaligned Data](https://aclanthology.org/P15-1044.pdf)