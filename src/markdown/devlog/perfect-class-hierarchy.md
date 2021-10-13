---
path: /blog/perfect-class-hierarchy
date: 2021-08-31
title: Perfect class hierarchy
twitter: https://twitter.com/mikolasan/status/1432756005352480771
tags: ["Python", "game development"]
---

A story about perfect class hierarchy that is easy to think of, but hard to implement.

We all do it. The easiest way to understand how programs work is to add print statements. 

When we create games, we usually start with a text mode version by just printing game state into stdout. Add user input and we have a fully playable game prototype. Surely though?

At least game logic is in place. This part is so easy and fast that you can even enjoy it. A little. But then you think about appealing graphical representation. How to add 2D sprites, animations, music, menus and HUD to the logic that we already tested?

If you'd think about it in object oriented paradigm, then you'd see a good opportunity to inherit from classes used in the text version and make them display 2D graphics while still use the same underlying game logic.

That's why people like OOP: you can reuse old codebase and extend functionality just adding new classes.

In theory. (It's possible when you design classes knowing about two version beforehand) 
But usually it doesn't work like that when we develop iteratively.

If you start writing classes without a plan, if you focus only on small pieces separately, if you design interfaces for the text version first, then everything is going to be refactored after you review main loop specifics and inherent architecture of graphical applications.

For example, you need to take into account animations. If before objects were changing states momentarily, then now they do it with a delay and stay in intermediate state for some time. To resolve that you introduce callbacks/events, but they are not compatible with text version.
In the end you will abandon the text version and you will rewrite game logic for new graphical classes.

And that is totally fine. The text version was the first iteration of the final application/game. It created a good foundation for more complex forthcoming system.

I believe that text and graphical versions can coexist and be written with beautiful class inheritance, but not in the workflow when you start playing with data structures and prints. It should start on the white board with a detailed class diagram.