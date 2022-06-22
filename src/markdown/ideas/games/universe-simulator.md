---
path: "/ideas/universe-simulator"
date: "2020-05-16"
title: "Universe simulator"
tags: ["c++"]
idea: creative
published: 2021-10-13
lastModified: 2021-10-28
---

На занятиях по физике в университете я каждый урок думал как бы мне пригодились все эти формулы. И я думал о симуляторе вселенной, где можно просчитывать траектории движения, результаты столкновения и последствия взаимодействия. На реддите один человек, писал, что его тоже посетила такая грандиозная идея, но он ее не испугался и посвятил свою жизнь этому, что в итоге превратилось в бизнес.

## Liquid simulation

Using a cubic polynomial for cohesion/repulsion seems to work great; you can customize the cubic per fluid type just by storing the abcd of "a + b*x + c*x^2 + d*x^3", and get behaviors like slimy, clay-like, and porous/brittle. No if statements or LUTs needed.

It's particles and uses position-based dynamics, and it's simulated on the GPU :)

The fluid sim is PBF (Position-Based Fluids) with some modifications. PBF uses various ideas from SPH.

https://twitter.com/MytinoGames/status/1531462046449008641