---
title: 3D printer lessons
date: 2022-12-15
published: 2022-12-16
lastModified: 2022-12-16
---

_Calibration is important_ - this is the lesson if to put it short. 

But let me explain to you what happened. I sliced the model (slicing means - you load a 3d model into a program that knows your 3d printer configuration and it has many settings for how you want this model to print) checked visually every layer in preview, adjusted infill settings (infill is this curly lines inside), enabled a **skirt**, and set it to print. 

The first thing my printer did, it failed the first skirt line that was supposed to be a ring around the model. I printed yellow PLA wheels before and had many similar problems before. I don't think I understand how to eliminate them. So here we go again, on the same circle of hell. 

The object must stick to the printing platform. PLA filament usually sticks very well to this sheet. And I printed with this filament already many things. It is perfectly sticky. 

But when it failed the first circle line I adjusted the calibration settings live. I believe it caused all my future problems. I needed to stop the print, calibrate it a few times, and then proceed again. But I crossed my fingers and continued. 

The bottom surface warped, therefore it lost traction with the platform. Apparently this happened because the first level failed. It's impossible to continue the print after this happens.

I sliced again adding a brim and feeding more filament to the first layer. But because my calibration was ruined before, it failed before it started to do the model, and it failed to print the brim (a brim - a wide surface added to the model to make the area touching the printer bigger).

## First layer

I incorrectly assumed that I did the calibration right. Later I found that printing one square layer is a better test. ([cube](https://www.thingiverse.com/thing:1278865)? no! just one layer. make a cube in blender 0.075m x 0.075m x 0.0002m, export to stl)

Because I saw this advice:

> Usually when I get the nozzle too close to the bed it will start to ball up and stick to the nozzle.

And I raised the nozzle. But then I reviewed the first layer surface on my prints and was not satisfied how individual lines are visible and there is no rough texture from the bed.

If you can see between the lines of filament - **nozzle is too high**. First layer should be pushed down on the bed, and not be nice round laying on top of the bed. Start lowering (more negative) the level until there are no gaps between layers. You should not be able to peel the lines apart after printing, but the top should be regular. 

To get first layer good: (So it sticks good, and you do not get a ball of filament sticking to the nozzle) I lowered Z from -0.850 to -1.038. During this test tried also -1.020 (that’s where the desk shines through) using live adjust.



problem https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/weird-first-layer-issues/
[cube](https://www.thingiverse.com/thing:1278865)? no! just one layer. make a cube in blender 0.075m x 0.075m x 0.0002m, export to stl
testing https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-assembly-and-first-prints-troubleshooting/life-adjust-z-my-way/
extra info (i didn't read, but seems related) https://forum.prusa3d.com/forum/original-prusa-i3-mk3s-mk3-others-archive/different-first-layer-results-every-new-print/

## Warping, curling

If the "vase" touches only with narrow edge the heated bed, and it grows with controlled overhangs—they can warp because less tempereture is transfered from the base.

If the bottom layer warps and the object pops up from the bed, then increase bed temperature, first layer height, add brim.

What if the brim flies out itself? (brim curling) Then the print head is too close to the bed or it's overextruding.


## Stringing

Increase retraction (5mm distance), lower nozzle temperature (200C PLA)

## Tips

- Review slice layer by layer. Pay attention to overhangs (might need supports, different orientation on bed, or changes in 3d model) and bridge infills (might need higher infill percentage or another fill pattern or maybe not :) )