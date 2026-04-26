Maybe add symbolic AI methods to RL.

Watching a video about agent in 2D env hunting for circles and avoiding x-es.

Monet- unsupervised scene decomposition.
Predinet- uses attention after cnn to extract sub elements 

Towards deep symbolic reinforcement learning 

## and some ideas 
When RL is used  the environment where there’s a final bad outcome, does it start from the beginning after that or only rewinds back to find a cause to why it went wrong? Call it peculiar agent.
Will it speed up the learning process?
Will it make it more accurate?

On some philosophical topic today about meticulous design and fine-tuning.
I started with code that doesn’t work properly in order to avoid the most painful part of writing stuff from scratch. It had environment visualization with Pygame, graphs with matplotlib and DQN with PyTorch. So, it seemed very straightforward. If actions can be learned with RL then NN is going to add approximation by essentially providing the same values. There is an inaccuracy somewhere and I’m inspecting tensors. Interpreting such values, from another side, is not so obvious. They are affected by gameplay sessions and rewards. It might depend on the learning rate, how fast significant rewards make an effect to network weights. Also what values do you choose to represent the world to neurons (input)? How spatial connections reflected in the first layers?
There are so many things, so many factors that you need to make right. And if you don’t then the process doesn’t converge. But could it detect that it’s doing something wrong? If the research can spot it, then why the agent cannot see that for itself?


Try tanh activation function. Or Leaky ReLu
