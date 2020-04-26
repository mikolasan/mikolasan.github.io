---
path: /gamedev/java
date: 2020-04-13
title: Java
---

## Why do I hate Java?

The most valuable part of this language is the garbage collector. It provides syntax so it is easy to work with custom types, you treat them almost the same way as you do with primitive types. 

But there is one thing about variable’s life-cycle. Objects usually created in constructors or setter functions, in other words somewhere after the variable is declared, but other functions can use the variable at any time just relying on the type. All these functions thus will possibly cause null pointer exception in the flow that you have not been able to predict.

It worth mentioning that the variable **is** defined, it cannot be undefined like in JavaScript, the only problem is a specific null value. Every time before accessing the variable you must check if it is not equal to null. There is Kotlin that addresses this problem and gives us solution. But may be you want to know why do I hate Kotlin?