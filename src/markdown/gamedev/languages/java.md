---
path: /gamedev/java
date: 2020-04-13
title: Java
---

## Why do I hate Java?

The most valuable part of this language is the garbage collector. Java provides very nice syntax to work with custom types, you treat them almost the same way as you do primitive types. 

But there is one thing about variable’s life-cycle. Objects usually are created in constructors or worse - in setter functions. In other words, somewhere after the variable is declared and initially assigned to null, but other functions can use the variable at any time just relying on the type. All these functions thus will possibly cause null pointer exception, because the order of calls is not under our control.

The main problem is a specific null value. It worth mentioning that the variable **is** defined, it cannot be undefined like in JavaScript. Every time before accessing the variable you must check if it is not equal to null. There is Kotlin that addresses this problem and gives us a solution. But may be you want to know why I do hate Kotlin?