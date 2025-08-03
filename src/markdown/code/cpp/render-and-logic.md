---
title: Keep render and logic separate
date: 2025-06-24
published: 2025-07-08
lastModified: 2025-07-08
---
I need to visualize dynamic spiking neuron activity. I want to use C++ with OpenGL via a scene graph/engine layer with easy camera navigation and object selection.

I have nodes and a graph class that defines connections between nodes, and I think there’s a choice here—a render class that includes logic (like in any game engine) or the logic includes rendering functions (which makes rendering optional).

So let's say we have Neuron and Network classes. How to add optional rendering functionality in such a way that these classes would allow creation of objects without defining rendering functionality?

I'm thinking about composition (school books about inheritance were so naïve…). But it should work in a way that the network can be defined (neurons added to it and connections configured) and just passed to a class that has bgfx initialized.

Where either rendering data is added to the original classes

```cpp
void setup_scene(SNN& net) {
    int N = net.neurons.size();
    for (int i = 0; i < N; ++i) {
        float angle = i * 2.0f * M_PI / N;
        float x = cos(angle) * 5.0f;
        float y = sin(angle) * 5.0f;
        net.neurons[i].position = {x, y, 0.0f};
    }
}
```

or in a separate context 

```cpp
SNNVisualContext generate_positions(const SNN& net) {
    SNNVisualContext ctx{net};
    for (int i = 0; i < net.neurons.size(); ++i) {
        float angle = i * 2 * M_PI / net.neurons.size();
        ctx.positions.emplace_back(cos(angle) * 5, sin(angle) * 5, 0);
        ctx.colors.emplace_back(0.0f, 0.0f, 1.0f);
    }
    return ctx;
}
```

So you add the logic class to renderer class. This way I cannot create pure logic neurons and add them to the net and be done with it. We will have neurons and a net and visual neurons and visual net, and this will require initializing them twice. 

Is there a way to define an interface that will add `draw` and `update` functions to Neuron and Network (SNN) and then when we call `net.draw()` and go through all neurons and call `draw()` on each neuron?

We can do it with the strategy pattern.