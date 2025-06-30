---
title:
date: 2025-06-23
published: 2025-06-23
lastModified: 2025-06-23
---
Based on this thread [https://mastodon.social/@mikolasan/112683492516943241](https://mastodon.social/@mikolasan/112683492516943241)

I think I like having a dialogue with someone who knows about the topic, even with students who just obtained knowledge from canonical sources. They are eager to prove that these new ideas and their understanding do match up.

So, on Discord I chimed in into a conversation about Q learning and changing environments. Changing environments in RL seems to be a common concern. And it’s not surprising because the whole ML/AI field doesn’t consider continuous training. Although without any conspiracy there is an explanation to it. If one needs to deploy a stable product that provides predictable results then one cannot allow any alterations when the system is live. Especially if such changes could be caused by a user—that is indisputable security breach. However, if such systems could be interpreted and stability (convergence) could be proven then we would advance with adjustable training methods.

Here, I wanted to put my thoughts together before replying to one message. Well, it’s not that I plan to say something behind their back. I just have so many thoughts to unwrap. So I decided to write it down. And later figure out what should be in my concise reply.

Why? Have you ever written an email asking two or three questions (each in separate sentences, so one can count question marks) and received back an answer only to the last question?

So, on Discord channel I was complaining.

> Yeah, these skills require a lot of tinkering from the agent’s side. But when I hear about changing environments, I think about a simple navigation problem when (for some reason) Q algorithm works as a random walk except for the key points. It’s like learning how to ride a bike using a genetic algorithm—wasting hundreds of epochs just to brute force to the correct answer. Did anyone merge RL with reasoning?

And Alaik answered this.

> Again, maybe I was not clear since I am learning too, even in a non stationary environment(a changing environment if you will), the agent would still learn how to behave in such environment, but your observation of the environment (which you feed to your agent) must represent the changes. The premise of RL is trial and error learning, which is one of the many ways we learn, that’s the approach babies use to walk (or anything else really), after many fails(many iteration), they eventually learn. Yes it is brute force, yes, it is not effective for more complex tasks, you would not learn rubik’s cube that way, it could take years to solve it. What do you mean by reasoning ?

So, the first thing would be about babies. I find it unconvincing when researchers refer to the development of living organisms. Like, yes, I see similarities but what does it explain?

In this example, let’s talk about locomotion. (And I will need to fact-check some of the following things but the overall sketch is based on articles I’ve read.) For this task, I prefer to avoid dealing with neocortex complexity. I think we can extract smooth and precise locomotion methods from simple animals.

Despite the fact that human babies are weird. Seriously, they are the only species that require several years to become a self-sufficient organism. Which maybe implies that human learning process is very flexible but nevertheless, we all walk the same way.

Then, how for example lizards know how to move their feet? Do they have that knowledge already developed when they hatch out of the eggs?

I gave up searching about the embryonic stages of development of lizards on Google. However, I learned that temperature can affect what gender the hatchlings are going to be. I switched to Yandex and searched in Russian. There are many more scientific books shared online there. Mostly scans from the 60s-80s but that is like the best quality research time, right?

From what I found, it seems like the brain and other parts of the lizard develop in the egg (from nothing and some proto stages into a small copy of a real organism), it’s not interacting with the environment regarding perception or other training stuff, this happens in 30-45 days and then it breaks the eggshell and after an hour or a few days, it’s good to go.

I wanted to say that locomotion development is the same as vision—it’s already wired in. But our vision starts getting somewhere by 3 months of age [1](https://www.ncbi.nlm.nih.gov/pmc/articles/). Though I couldn’t find any timeline for lizards.

Maybe vision is a bad metaphor anyway. But the point is: **we should get rid of network weights that start from Gaussian noise**.

I mentioned vision because it is modeled with convolution kernels. I bet they are usually the same. I want to load some models with U-net like GANs and collect statistics about kernels in use in those models.

But going back to locomotion, it’s actually more interesting than just predefined weights. (Also just forget about weights, it’s probably binary stuff: there’s a connection or not.)

Gaits are predefined too. They are controlled by a central pattern generator. Moreover, quadrupedal locomotion is controlled by four CPGs [2](https://elifesciences.org/articles/310). Cats are able to walk on split-belt treadmills with limbs stepping at different speeds.

A diagram with four CPGs from the article

If we go back to that message on Discord, the guy was saying that to reflect changes in changing environment, “observations must represent the change”. Which I think means that instead of saving an exact position in the grid environment, we should use relative (to RL agent) positions. For example, if a wall is on the left, don’t turn left. Which is bizarre. We need to have this conversation because someone created a course where exact positions represent a state.

When I was writing code while following a post on Medium about policy improvements in the Markov Decision Process, it was using an example from Russel and Norvig’s “Artificial Intelligence A Modern Approach”, but I refused even to try to code that in. I don’t think there is much to simplification in viewing the states as permanent locations. The agent learns only one disposition, only current size, and “rules” for actions are solely position-based.

And more about navigating in the grid environment. Later in the discussion, someone mentioned that positions of important objects (like obstacles and goals) should be provided to the agent in observations. Thus, in order to prevent random walk behavior, movement actions should be evaluated by observations of more than one adjacent cell. We need to add distant vision to our agent. But will this new information (measured distance) added to states thereby inflate the amount of states?

ivan_267 said

> It's similar if you use e.g. PPO. The observations need to contain sufficient information to solve the problem. In a static grid-like environment, the current position can be sufficient to know the best action for the next step. If the environment changes, as you already mentioned the observations should reflect these changes, it's not enough to know the current position in a changing environment.

If we are talking about a simple grid environment and an agent that can locate one target object and measure distance to it, then such distance does not directly affect how the future path is chosen. I would assume that an angle and two-state distance flag should do the trick. By angle I mean the next adjacent cell that is on the path of a direct line between the agent and the target. And, the exact distance should be converted into a variable that can influence the closest agent's maneuvers: 1) if the target is in the next cell pointed by the angle or 2) more than one cell (which means that the direct usage of angle might not be the best solution). And, this process repeats in every cell. Limitations of the grid may make diagonal movements a bit zigzaggy but I would use the same approach in the open world too but with more radial sectors. That all may sound interesting but I didn't think (yet) about incorporating obstacle avoidance into that method.

I have ideas about improving the grid environment problem but I have never read about continuous variables in state space. Why? I’m so ashamed. I start researching the topic.

## Reference

At what age do lizards develop "vision" cortex:

- [Эволюционная морфология нервной системы позвоночных: Учебник для студентов вузов.](https://evolution.powernet.ru/library/morphology_ns/morphology_ns.html)  Андреева Н.Г., Обухов Д.К.
- [Incubation environment impacts the social cognition of adult lizards](https://royalsocietypublishing.org/doi/10.1098/rsos.170742)
- [Processing of Visual and Social Stimuli in the Green Anole Lizard Brain](https://digitalcommons.trinity.edu/cgi/viewcontent.cgi?article=1023&context=bio_honors)
- [Lizards – Measuring Cognition: Practical Challenges and the Influence of Ecology and Social Behaviour](https://publicationslist.org/data/daniel.noble/ref-37/9781108420327c12_p266-285.pdf)
- [The Diversity and Adaptive Evolution of Visual Photopigments in Reptiles](https://www.frontiersin.org/journals/ecology-and-evolution/articles/10.3389/fevo.2019.00352/full)