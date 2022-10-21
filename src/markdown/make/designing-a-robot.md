---
title: Designing a robot
date: 2022-07-23
draft: true
---


## The look

![uncanny valley graph by Mori](./uncanny-valley-1.jpg)

I'm convinced that any robot should have a creepy aspect. Like big tracking you eyes that can drive people crazy.

> MacDorman and Alexander Diel, a psychology researcher at Cardiff University in Wales, published a paper that organized the current explorations [of the "uncanny valley"] into nine categories.
>
> Discover magazine

- [Paper 1](https://www.semanticscholar.org/paper/Creepy-cats-and-strange-high-houses%3A-Support-for-in-Diel-Macdorman/da9f0e4fdd00d32c58d44308f312b487563dd52c) - 9 theories
- [Paper 2](https://www.researchgate.net/publication/353373476_A_Meta-analysis_of_the_Uncanny_Valley%27s_Independent_and_Dependent_Variables) - the latest paper probably mentioned in the article


![picture from the article shows very disturbing robot](./uncanny-valley-2.jpg)


## Electrical components

Motors normally require higher voltage (6V, 12V, 24V) and current, and it's a good practice to keep motors, LEDs, switches electronically seperated from the logic (3.3V). But how do you decouple it when the whole project should work from the battery? 

Do you use two batteries? Just imagine what a headache is to keep two separate batteries charged. I can only think about sophisticated system where assumed that motors can kill the battery often, but at the same time the main brain must continue operating therefore it remains only the option to send signal about help to other robots. But I've never seen such design.

So what normal people use instead? 

Power supply needs to be protected from Back EMF when motors abruptly stop or reverse the rotation direction. But rechargeable battery only wins from this effect. The only concern is values above maximum ratings (li-poly batteries very sensitive)