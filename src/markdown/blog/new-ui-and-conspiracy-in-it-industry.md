---
title: New UI
date: 2025-06-21
published: 2025-06-21
lastModified: 2025-06-21
subtitle: and conspiracy in IT industry
---
Yes, developers add new features, refactor other parts to get rid of technical debt. This often changes API, which usually triggers avalanche of changes in all projects that depend on this project. 

Why maintaining a project is so important? Because new hardware, new operating systems become incompatible with your project. (Yeah, they will say that it’s _your project_ is incompatible with the OS, but it’s a wrong perspective)

This even happened in Linux ecosystem and systemd booting process. When I installed docker, the boot hang on the old kernel 4.14, but it worked on 6.12. Systemd complained on every boot that the kernel is below supported version.

So let’s ask the **what if** question. What if some changes and full framework rewrites are designed to break compatibility to force developers around the world spend time for this mandatory update? 

To force everyone to switch to TypeScript from JavaScript because it has types and henceforth more secure. But what about time spent on writing or understanding this mess. And if you really need types, then you would use a compiled language anyway.

That’s is why companies throw big projects into open source. Of course you will use this popular library instead of writing your own and reinventing the wheel. But then you have to keep up with new versions, migrations, depreciations.

Despite many many cool libraries and frameworks, one important component of many applications is not solved yet. It’s UI. 

Have you seen any open source project, really independent project that tries to replace ecosystem from Microsoft, Google, Meta? And these big tech companies only think how to make their products shiny , this way hey can hide what their real intent is. It’s not about convenience, it’s about confusion.

Though AI is a new frontier for hardware requirements but I think we can utilize some recent developments and make a framework where UI is created on the fly dictated by logic at current moment.