---
title: 3D printer lessons
date: 2022-12-15
published: 2022-12-16
lastModified: 2022-12-16
---

## Warping, curling

If the "vase" touches only with narrow edge the heated bed, and it grows with controlled overhangs—they can warp because less tempereture is transfered from the base.

If the bottom layer warps and the object pops up from the bed, then increase bed temperature, first layer height, add brim.

What if the brim flies out itself? (brim curling) Then the print head is too close to the bed or it's overextruding.


## Stringing

Increase retraction (5mm distance), lower nozzle temperature (200C PLA)

## First layer

https://twitter.com/mikolasan/status/1705748330771292478

I incorrectly assumed that I did the calibration right. Later I found that printing one square layer is a better test.

Lowered Z from -0.850 to -1.038. During this test tried also -1.020 (that’s where the desk shines through) using live adjust.

Usually when I get the nozzle to close to the bed it will start to ball up and stick to the nozzle.

Your first layer is to high. You can see between the lines of filament.

First layer should be pushed down on the bed, and not be nice round laying on top of the bed.

To get first layer good: (So it sticks good, and you do not get a ball of filament sticking to the nozzle).

start lowering (more negative) the level until there are no gaps between layers. You should not be able to peel the lines apart after printing, but the top should be regular. 

problem https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/weird-first-layer-issues/
cube? https://www.thingiverse.com/thing:1278865
no! just one layer. make a cube in blender 0.075m x 0.075m x 0.0002m, export to stl
testing https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/life-adjust-z-my-way/
extra info (i didn't read, but seems related) https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-others-archive/different-first-layer-results-every-new-print/