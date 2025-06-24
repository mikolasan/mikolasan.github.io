---
title: Negative training
date: 2024-12-07
published: 2024-12-07
lastModified: 2024-12-07
mastodon: https://mastodon.social/@mikolasan/113613042797723417
---
Negative lessons are very important. And they supposed to be stored very specifically in its own categories. These categories will provide only negative feedback during inference obviously.  
Standard ANNs allow mixed weights but they heavily rely on gradient descent to keep the process stable.

In ANNs those random negative weights don’t really make sense. They cannot have “reasoning” about what part of the signal should be suppressed. Maybe it could get such adjustments from the back propagation. But how often in order to produce a strong memory? We don’t create training sets with negative expectations.

We can consider fully unsupervised learning where the negative observation will just go to another category. But that category would never have a color of undesirable event/object. In the recent Reinforcement Learning development researchers, indeed, try to give “colors” to such undesirable categories (maybe vectors or areas in the latent space).