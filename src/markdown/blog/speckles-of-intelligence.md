---
title: AGI vs SOI
date: 2024-10-30
published: 2024-10-30
lastModified: 2024-10-30
---

Well, everyone is building artificial general intelligence or [AGI](/ai/arc) these days. But I’m going to build SOI. 
Which, of course, means _Speckles of Intelligence_ and not soy beans.

Everyone is so obsessed with LLMs. They use it to create high-level plans and then apply them to some random technique like reinforcement learning or search in graph or to write some code.  

[Transformers](/ai/the-smallest-transformer) and attention is a good technique, but one doesn’t need to use a language model for every possible tasks. This will inevitably result in low accuracy, because of the back and forth conversion between domains. Instead we should be teaching from one domain optimal for the task from the beginning. 

Although, there was one little problem that came up. Where to find gigabytes of training data?

## Algorithms write algorithms 

First, we need a driving force - [emotions](/ai/agent-emotion-model). When [inference matches expected output](/ai/active-inference), then the sequence of events is memorized and can be retrieved as an _algorithm_. In case of a failure, it spans another copy of the current algorithm and checks every step for an improvement.

- If the output is known and we are looking for a transformation process, then could output play the role of input?
- How helpful [to split work by each pixel transformation](/blog/intelligent-work-with-pixels)  or by steps in time?

We need high level concepts like lines. Do we learn them from one example? Probably not. But [we need invariants](/ai/understanding-invariants-in-ann): seeing a line in one position should not limit us to find a line in another position or even another scale of pixels (4 pixels as 1).

Let's review a proposed learning loop.

1. Take input and expected output after transformation.
2. Compare some regions (focus on some details)
3. Try to find a known transform or come up with a new operation 
4. Apply the operation 
5. Compare with the expected result 
6. Remember this operation for this input and output pair.
7. Find next operation if transformation is not complete 
8. Or adjust transformation based on expected and actual results difference.


**Transformation: draw a line**

No matter what neurons will be used, it will be a flow that activates neurons one by one that corresponds to adding pixels one by one with verification of the direction this construction is going and by verifying where the border is in order to stop. Verification forces this process to use constant feedback.

Let’s think for a moment how it would work without the verification. It would be required for all information to be collected and prepared ahead of time. And the network in its architecture should encompass some plan how the data is processed through it. 
This plan is what the network should extract from data itself because it will implement reasoning.  

Reasoning actually is not different from the verification process. Verification happens virtually in the brain when the response to actions is evaluated from a world model. Where the world model is a set of memories, maybe not exact memories but close enough, grouped by associations.

Very big and philosophical question is **how do you know your goal?**

Consider real life examples. If you are hungry, then you don’t imagine precisely what you want to see on a plate and how you eat it. It’s more indirect: when you are hungry, you know that you need to eat, and then you have options where to get food and how to cook and how to serve it. You just know some sets of steps. (And you would want to take shortcuts. Or maybe try new steps.)
And then there’s something simple like finding a book on a shelf when you know how the cover looks and what is the title. It’s just a simple match. Maybe is is not so simple but only in similar ultra-specific cases it boils down to simple inference.

So what is going on in all the other cases?
Obviously some chemicals inducing dissatisfaction—that’s the input that stimulates us to take actions. And it will subside when the problem, which originated the stimulus, is resolved.

If we return back to the example with drawing a line, it’s a simple statement as it seems, but to understand what is a line, one needs to learn about that subject. And it might take many examples. (Technically it could learn from one correct example, but it would need many negative examples otherwise. We will not go this route yet, we will keep it more conventional.)

Now, our data will include straight lines in shapes in photographs and geometric line drawings. But here is a thing. Because it is drawn on a paper or displayed on a screen, **we can apply transformations like rotation and scale and some distortion**, but technically they are not applied to the line itself but to the object carrying it.

## Steps for ARC

Virtually the receptive field is bigger than any input. The borders are important for completing tasks but detrimental in perception

In the classic approach, for example for YOLO, every input is randomly moved (probably no rotation or scaling required for this task) to create another copy of input. This is required for hierarchical network that will generalize the concept. This simulates eye saccades. 

Because we have to work with objects placed in specific locations, and this is how it comes in the training data. So that is why we make these transformations, to "unlink" objects from the absolute coordinates. 

As we go along the layers deeper (or higher up) that's where the layer of concepts will be. That is where no matter what the original transformation was, here we only know about the line concept.

Ans so there are many different inputs that vary by different transformations but they all come to the same concept. This means that we have information about transformations only in the lower layers.

We need more than that. We want to have transformation concepts on this layer too.

How to do it? If transformations must happen there, on the layer of concepts. 
If transformations are going to be controlled from the concepts, then information about transformations itself will be carried to this level.

This is what I called a verification process before, and I think that the signal going down is very important for recognizing patterns from memory and to reject unknown patterns. 

So, with the new pattern we would want to activate the feature, and use that feature to verify that it contains most of the current input. But the feedback is not just a signal flowing back. On the way back the signal also uses the previous ascending activations in order to guide the proper restoration.

What architecture can support this process? Inverse or autoencoding? [or pseudo inverse](https://ai.stackexchange.com/questions/17566/can-we-get-the-inverse-of-the-function-that-a-neural-network-represents)
