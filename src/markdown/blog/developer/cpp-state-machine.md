---
path: /blog/cpp-state-machine
date: 2021-10-01
title: C++ State Machine
---

So state machine in C++. Obviously I go to StackOverflow and find https://stackoverflow.com/questions/14676709/c-code-for-state-machine. 
Which leads me to this repository https://github.com/hbarcelos/cpp-state-machine.
I like the structure, but I want to contribute. I add CMake build, I switch to smart pointers, I add `override` keywords https://en.cppreference.com/w/cpp/language/override. All here https://github.com/mikolasan/cpp-state-machine

And... I hate smart pointers, because it left me stymied when I defined base destructor as virtual **protected**.

But I realize, that I need a _dynamic_ state machine, because I don't know how many nodes I need in it before compilation time.

Some good finding that looks good, but didn't help https://sii.pl/blog/implementing-a-state-machine-in-c17/

For factory class I used `...`-feature (https://en.cppreference.com/w/cpp/language/parameter_pack) which in simple words does: and the rest just pass to the next interested party.

Wait for updates on my Github, I will post dynamic state machine there.