---
path: /code/cpp-question-exec
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


----

## Similar posts

- ["Pointing" arguments](/code/cpp/pointing-arguments)
- [const in C++](/code/cpp/const-ness)
- [C++ question: exec](/code/cpp/exec-function)
- [C++ State Machine](/code/cpp/advanced-finite-state-machine)
- [Variadic templates in C++](/code/cpp/variadic-templates)
- [Leak in std::map](/code/cpp/leak-in-std-map)