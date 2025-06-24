---
title: AGI vs SOI
date: 2024-10-30
published: 2024-10-30
lastModified: 2024-10-30
---

Well, everyone is building artificial general intelligence or AGI. But I’m going to build SOI. 
Which, of course, means _speckles of intelligence_ and not soy beans.

Everyone is so obsessed with LLMs. They use it to create high-level plans and then apply them to some random technique like reinforcement learning or search in graph or to write some code.  

Transformers and attention is a good technique, but one doesn’t need to use language for every possible tasks. This will inevitably lead to low accuracy, because of the back and forth conversion between domains. Instead of teaching from the beginning in one domain optimal for the task. 

Although one little problem has arisen. Where to find gigabytes of training data?
## Algorithms write algorithms 

First, we need a driving force - [emotions](/ai/agent-emotion-model). When inference matches expected output, then the sequence of events is memorized and can be retrieved as an algorithm. In case of a failure, it spans another copy of current algorithm and checks every step for an improvement.
- If the output is known and we are playing a game of finding a difference or transformation process, could an output play role of an input?
- How helpful [to work it out by pixels](/blog/intelligent-work-with-pixels) or steps?
- We need high level concepts like lines. Do we learn them from one example? Probably not. But [we need invariants](/ai/understanding-invariants-in-ann): seeing a line in one position should not limit us to find a line in another position or even another scale of pixels (4 pixels as 1).

The learning loop.
1. Take input and output.
2. Compare some regions (focus on some details)
3. Try to find a known transform or come up with a new operation 
4. Apply the operation 
5. Compare with the expected result 
6. Remember this operation for this input and output pair.
7. Find next operation if transformation is not complete 
8. Or adjust transformation based on expected and actual results difference.


Transformation: draw a line

No matter what neurons will be used, it will be a flow that activates neurons one by one that corresponds to adding pixels one by one with verification of the direction this construction is going and by verifying where the border is in order to stop. Verification makes it a process with constant feedback.
Let’s think for a moment how it would work without the verification. All information would be required to be collected and prepared ahead of time, analyzed and some plan to be prepared. 
This plan is what right now called reasoning. But it actually is not different from the verification process. It just happens virtually in the brain when the response to actions is estimated from a world model. And a world model is a set of memories, maybe not exact memories but close enough by associations.

Very big and philosophical question is how do you know your goal? If you are hungry then you don’t imagine precisely what is on the plate and how you eat it. It’s more indirect: when you are hungry, you know that you need to eat, and then you have options where to get food and how to cook and how to serve it. You just know some sets of steps. (And you would want to take shortcuts. Or maybe try new steps.)
And then there’s something simple like finding a book on a shelf when you know how the cover looks and what is the title. It’s just a simple match. (maybe not so simple) Only in similar weird cases it boils down to simple inference.
So what is going on in all the other cases?

Obviously some chemicals inducing dissatisfaction—that’s the constant input that stimulates us to take actions. And it will stop when the problem that originated it is resolved.

If we return back to the example with drawing a line, it’s a simple statement as it seems but to understand what is line, one needs to learn about that subject. And it might take many examples. It can learn from one correct example but it will need many negative examples for comparison. Like, seeing lines in real life images and then get geometric drawing of lines. And because that is drawn on a paper or displayed on a screen, we can apply transformations like rotation and scale and some distortion, but technically they are not applied to the line itself but to the object carrying it.

## Steps for ARC

Receptive field is bigger than any input. Every input is randomly moved (probably no rotation or scaling required for this task) to create another copy of input. This is required for hierarchical network that will generalize the concept. This simulates eye saccades.
Also because we need to work with objects placed in a specific location but make transformations absolutely unlinked from the coordinates (though the borders are very important). Transformations must happen on the layer of concepts and for a specific position it would be determined when “the signal” goes down to more positional encoding.

I think that the signal going down is very important for recognizing patterns from memory and to reject unknown patterns. So, with the new pattern we would want to activate the feature, and use that feature to verify that it contains most of the current input. But it’s not just a flow one way and then back. On the way back it also uses the previous ascending activations in order to guide the proper restoration (remember that this architecture collapses different pictures into one concept).
So inverse or autoencoding? [or pseudo inverse](https://ai.stackexchange.com/questions/17566/can-we-get-the-inverse-of-the-function-that-a-neural-network-represents)
