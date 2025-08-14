---
title: Ultra planar theory
date: 2024-09-10
published: 2024-09-10
lastModified: 2024-09-10
article: main
---
This theory is about hierarchical structure of neural networks, regardless of whether they are spiking or simple feedforward networks.

**Every specific feature tends to get a high activation rate on a single plane.**

Where a _plane_ is a group of neurons highly correlated in many different aspects with a feature, resulting in it being represented by the plane.


So every plane corresponds to a specific feature. One plane can represent blue colors only, another one only horizontal lines, etc. 

Then perception and decisions work like this.
When a new pattern is observed, it works like a clusterization problem, we try to match all pattern features with features we already know.

Let's illustrate this on a hard problem of brown curly dogs and fried chicken. It's a visual recognition task between two categories when colors are the same, texture is the same, but people can easily spot the difference. For example, because there is no eyes. Let’s put a googly eyes on the fried chicken. That could pass as a dog. But now, we closely review shapes of the fried chicken pieces and they don’t form a face.

When only one plane gives a contradictive result, this puts other good matches into question.

## Further questions

- Why does it need to be a plane? Can one neuron represent a feature?
