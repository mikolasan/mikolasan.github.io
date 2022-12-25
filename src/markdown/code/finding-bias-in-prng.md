---
title: Finding bias in PRNG
date: 2022-12-22
---

## Test 32 bit stream of numbers

- Test javascript in testU01 https://jtobin.io/crushing-isaac
- https://github.com/lemire/testingRNG

### TestU01 - BigCrush

http://simul.iro.umontreal.ca/testu01/tu01.html

### Dieharder

- test through file (when your engine is in javascript) https://gist.github.com/blixt/9abfafdd0ada0f4f6f26
- about results http://www.bitbabbler.org/test-data/dieharder.html

## String to binary output

```c++
// add code
```

- https://en.cppreference.com/w/cpp/io/basic_istream/ignore


## How to find bias in random number generator?

Bounded rands - how to avoid biased numbers https://www.pcg-random.org/posts/bounded-rands.html

### Mersenne Twister

MT is very predictable. [Here](https://cryptopals.com/sets/3/challenges/23) some steps to get it reversed.

### ISAAC

[official page](http://burtleburtle.net/bob/rand/isaacafa.html). [review](https://eprint.iacr.org/2006/438.pdf) weak starting points.

[original repo](https://github.com/rubycon/isaac.js), [npm package repo](https://github.com/StefanoBalocco/isaac.js)

