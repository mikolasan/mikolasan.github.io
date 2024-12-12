---
title: Life of NPC (working title)
date: 2024-08-24
published: 2024-08-24
lastModified: 2024-08-24
---


## Resources

1. low poly medieval scene in/on the book https://sketchfab.com/3d-models/medieval-fantasy-book-06d5a80a04fc4c5ab552759e9a97d91a
1. Inn interior https://sketchfab.com/3d-models/fantasy-game-inn-192bf30a7e28425ab385aef19769d4b0
1. More houses https://sketchfab.com/3d-models/modular-lowpoly-medieval-environment-5bf0a1562b7e401e9e6d7758ec54d09c
1. Should we have characters like this? https://sketchfab.com/3d-models/smol-holomyth-halloween-costumes-1e2305d63e084c1e966630496b6deb5b
2. Modern people (kind of like doing their business on the street) stylized animated https://sketchfab.com/3d-models/populate-models-f93c7b439e6746f9a2d5963e628a5c4e#download

## 3D stylized world

1. find out how to work with a height map. There is a book surface, I need collision shape over it. Basically, programmatically only, and it makes sense https://www.youtube.com/watch?v=fEG_cnRQ1HI
1. Grass [https://stayathomedev.itch.io/stylized-grass-shader/download/eyJleHBpcmVzIjoxNzE5MTA0OTYwLCJpZCI6MjY3NjEzN30%3D.eeyYH0HeUmEFhALhivnqZ3dArGg%3D](https://stayathomedev.itch.io/stylized-grass-shader/download/eyJleHBpcmVzIjoxNzE5MTA0OTYwLCJpZCI6MjY3NjEzN30%3d%2eeeyYH0HeUmEFhALhivnqZ3dArGg%3d) and the video about it https://www.youtube.com/watch?v=3ftcGTp-Se8


### Godot addons

- Terrain 3d addon https://www.youtube.com/watch?v=YtiAI2F6Xkk
- Grass as addon https://github.com/IcterusGames/SimpleGrassTextured
- Inventory system 
  1. https://github.com/expressobits/inventory-system/issues/35 
  2. https://github.com/alfredbaudisch/GodotDynamicInventorySystem 
  3. https://github.com/peter-kish/gloot/tree/master
- Object random placing https://github.com/HungryProton/scatter
- [Main menu template](https://github.com/Maaack/Godot-Menus-Template)

### Sky

1. Clouds: terrible tutorial https://www.youtube.com/watch?v=sNXj0RN09ps
1. Day-night change: interesting but doesn’t explain much, so bad tutorial https://www.youtube.com/watch?v=_EeVDI-PVRw
1. Theory behind sky scattering and the shader example from NVIDIA https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-16-accurate-atmospheric-scattering


1. Water and water level https://www.youtube.com/watch?v=7L6ZUYj1hs8
1. For fireflies - boid AI https://github.com/beneater/boids/blob/4c8ab4d98d382d68fbe03bb94fd51f981530fc65/boids.js
1. Foliage shader for trees

I tried to chill in the evening and just play with a foliage shader, somehow make low poly trees fluffy. I found none reference. I tried to adopt the first step from [a Unity tutorial](https://youtu.be/flbnFFZWcsc?si=4ROO-tM0OvfIWsag), something about vertex displacement or quad scattering. And, I am not sure how to scale the whole quad. I don’t know if I need to, maybe that can be achieved by other means, but that’s how I spent my evening

But [this one](https://www.youtube.com/watch?v=iASMFba7GeI) has better explanations

## Portals

In Godot 4.

- [this](https://www.youtube.com/watch?v=ReMKWYmifN8) is what I need but it's Godot 3. So before we do that, look at the underlying implementation in [coding adventures](https://www.youtube.com/watch?v=cWpFZbjtSQg&t=0s). This is a [question from Godot forum](https://forum.godotengine.org/t/oblique-near-clipping-plane-for-camera/19388) that describes a port to Godot  And [more examples](https://www.youtube.com/watch?v=hchttF-iN7Y)
- And [Oblique plane](https://www.terathon.com/lengyel/Lengyel-Oblique.pdf) soon [will be in Godot](https://github.com/godotengine/godot/pull/89140)

And [this] is just a bonus