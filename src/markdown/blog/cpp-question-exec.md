---
path: /blog/cpp-question-exec
date: 2021-07-06
title: "C++ question: exec"
twitter: https://twitter.com/mikolasan/status/1412463032379248641
tags: ["C++", "puzzle"]
published: 2021-10-14
lastModified: 2022-09-08
---

Today I found this code extremely confusing.

![code with execvp](./cpp-question-exec.png)

## C/C++ question

What output do you expect? (disregard output from the long_process.sh script)

## Answer

If you have never dealt with exec() before, then you would wait for 2 lines of "parent done".

Believe me, I ran this code many times today, and it prints "parent done" only once 😱

## Explanation

The exec() function replaces new child process with whatever is in the long_process.sh script. So at line 11 the child fully transforms into another program.


## Similar posts

- ["Pointing" arguments](/blog/cpp-pointing-arguments)
- [const in C++](/blog/cpp-const)
- [C++ State Machine](/blog/cpp-state-machine)
- [Variadic templates in C++](/blog/cpp-variadic-templates)
- [Virtual call in C++](/blog/cpp-virtual-call)
- [Leak in std::map](/blog/cpp-leak-in-std-map)