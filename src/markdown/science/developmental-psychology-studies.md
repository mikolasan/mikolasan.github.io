---
title: Developmental psychology
subtitle: Studies, edge cases
date: 2022-09-25
published: 2022-12-16
lastModified: 2022-12-16
twitter: https://twitter.com/mikolasan/status/1574087978493702144, https://twitter.com/mikolasan/status/1578611661849579520, https://twitter.com/mikolasan/status/1578276136554930176
---

_Based on the discussion with Jorge Romero on Twitter_


## Proprioception

A long-standing puzzle from developmental psychology: **how infants imitate facial expression they cannot see themselves perform?**

Lets try to describe similar problem in a scientific form. There are motors connected to random pins. There are sensors also connected to random pins, and they receive information about the environment. **How to figure out which motor you need to actuate in order to move the whole system in one specific direction?** I consider SNN and RNN, but looking for alternative training methods. That’s how I ended up with Piaget’s stages.

But first, to answer this question some research is made under these titles: dynamical systems, embodied cognition, cognitive robotics.

Jorge tends to think that the question is inherently flawed. He believes that movements are not achieved by applying torque on a set of motors. Instead it is more like a controlled fall, when the tension of muscles is dynamically updated based on the online feedback from the environment. And there is no central computer calculating movement based on input, instead the cause of movement is proprioception, the force of gravity, and thoughts combined. This is described in [coordination dynamics](https://www.semanticscholar.org/paper/Cortical-coordination-dynamics-and-cognition-Bressler-Kelso/1a10508b6fdc44a2f1cc0a62659b0c87e46f8642) by Scott Kelso [[PDF](http://www.ccs.fau.edu/~bressler/pdf/TICS01.pdf)].


## Infantile amnesia

Why I don’t remember a thing before 4-5 years old? **How is it explained by cognitive neuroscience?**

Scientific term for this _infantile amnesia_ - the difficulty adults have in accessing memories from the first years of life

I’ve read one article where scientists tried to disprove one hypothesis that infant’s brain is too simple to remember things. They brought 1 yo toddlers to an empty room with white walls, black table, and box with toys. They demonstrate what in the box and test if kids remember it after 2 months. Despite creepy lab environment they were using original objects and actions. For example, touching a small box with a forehead in order to switch the light inside. Nevertheless the results were good.

Experiments, show deferred imitation - so called one-shot learning in robotics (opposed to reinforcement learning or evolutionary algorithm). But the provided research doesn’t answer what happens in the following years thus they propose another hypotheses.

One is claimed obvious. At 18 months old the “language explosion” occurs, which divides all memories on nonverbal and verbal, but then authors reject this idea and call infantile amnesia to be a paradox.

Hence Piagetian theory mentioned in the introduction holds a favor, but as I know it gives only psychological standpoint. In this theory a brain develops in stages and one stage depends on the previous one, thus previous state (memories) can be “erased”.

Jorge point out that there are three paths to explain this phenomenon. 

1. Evolutionary psychology. Pretty straightforward to grasp but difficult to prove.
2. Computational cognition. It will offer some computations to achieve that.
3. Embodied cognition. His favorite approach, it tightly linked with locomotion and [hippocampus development](https://www.frontiersin.org/articles/10.3389/fpsyg.2016.00010/full).


📘 Meltzoff AN. What infant memory tells us about infantile amnesia: long-term recall and deferred imitation. J Exp Child Psychol. 1995


## Astral projections

**Is it possible for neuromorphic computing explain phenomena of astral projections?** _Neuromorphic computation_ referred to spiking neural networks "implemented in silicon" or other biologically plausible models. Also there can be found [papers](https://www.frontiersin.org/articles/10.3389/fnhum.2014.00070/full) setting astral projections as something that is a subject of scientific study.

This formulation may imply psychophysical dualism, but we don't want to criticize Descartes and Leibniz with their mind-body theory, and it is usually a no go. Why shouldn't we prefer monistic theories, functionalism in particular? Let's take Anokhin's theory of functional systems as a base and analyze if "motor imagery" fits into.


> As a preamble, I can say that we may take two broad approaches. First, asking "what IS this stuff"? And second "what can we REASONABLY SAY about this stuff"? 
>
> I think that the second question is more useful. And almost always ends up with monism being the best option for being able to explain as much as possible, while dualism makes certain phenomena basically untouchable by science. Which, as scientists, is something we obviously don't want! 
>
> It may sound odd, but I don't have any grand philosophical argument about the nature of cognition. I just have a pragmatic argument for choosing the nice epistemic route. It just allows us to do better science. That simple.
> 
> Having THAT said, there is a way I think of marrying functionalism, which can be dualistic, with monism. One of my friends was doing his PhD thesis on 'enactive functionalism'… In enactivism, "the brain" does symbolic computation or whatever. Motion and sensing is an active 'online' process in which the individual, their brain, and their immediate environment are coupled together. This defines mental representations.
> 
> Another route would be something around structuralism I think. Find a way to describe some structure in the real world in abstract enough terms (cough… Category theory… cough) and make an argument that such structure is "cognitive" or rather cognition emerges there 🤯🤯🤯 So maybe, MAYBE, with such argument we could do away with the dualism-monism problem altogether. But with this approach we lose the need and the justification of representation or imagery. Either we don't care at all or they could not exist.
>
> One of the reasons we "settled" for a symbolic computation view of cognition on the 60s (the cognitive revolution) was because it made possible at the time to actually frame questions about the mind in terms amenable for doing science.
> Enactivism and "embodied cognition" in general broadly fit into the "dynamical systems" view of cognition. But we have to break away from almost 60 years of cognitive psychology to start seriously doing science with this! That is how I come up to "embodied cognition" ideas.
>
> _slightly redacted explanation by Jorge_

To be continued...

----

- https://www.britannica.com/topic/mind-body-dualism
- https://en.m.wikipedia.org/wiki/Epiphenomenalism
- https://en.m.wikipedia.org/wiki/Functionalism_(philosophy_of_mind)
- https://link.springer.com/article/10.1007/BF02688634
- https://edisciplinas.usp.br/pluginfile.php/4283976/mod_folder/content/0/19_-_Teoria_dos_sistemas_funcionais_na_escola_cient%C3%ADfica_de_P._K._Anokhin%20%282%29.pdf?forcedownload=1
- https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.121.5549&rep=rep1&type=pdf