---
date: 2020-04-13
title: Why do I hate Java?
published: 2021-10-14
lastModified: 2021-10-14
---


I tried Java in university and it was very verbose comparing to previous experience with Pascal, C or even C++. Though it’s the main option for Android development, so maybe worth learning. 

And complexity lies not in the language, but in courses and tools.

Java is good for your career, but I don’t think there’s a course that will introduce programming without twisting your mind just to prepare for Hello World in Java 🙃 You must not forget to use abstract factory in [basic java hello world application](https://gist.github.com/lolzballs/2152bc0f31ee0286b722) 😆

My path was gradual: Basic→C→C++→Java. I think learning of Java should be coupled with an easy syntax language

## Why do I hate Java?

The most valuable part of this language is the garbage collector. Java provides very nice syntax to work with custom types, you treat them almost the same way as you do primitive types. 

But there is one thing about variable’s life-cycle. Objects usually are created in constructors or worse - in setter functions. In other words, somewhere after the variable is declared and initially assigned to null, but other functions can use the variable at any time just relying on the type. All these functions thus will possibly cause null pointer exception, because the order of calls is not under our control.

The main problem is a specific null value. It worth mentioning that the variable **is** defined, it cannot be undefined like in JavaScript. Every time before accessing the variable you must check if it is not equal to null. There is Kotlin that addresses this problem and gives us a solution. But may be you want to know why I do hate Kotlin?


## Random thughts about Java

My reason to abandon Java – it’s build system. Gradle, Maven, Ant? No thanks. Python: what’s a build system? 😃

Android developers use Gradle. But Java libraries tend to use anything but Gradle: Ant, Maven, and sometimes Bazel or make (just pure javac instructions!)

I cannot be silent about this pure Java fetish, but: An inner class can have another inner class inside of it.

I want to sleep after reading tutorials to Java libraries. Is it common to have a nap room for Java development team?

When you used to develop on Java (where every object has an intrinsic lock) and then your next app is on Python (let's say, with timers concurrently changing data) there is an occasion to forget about locks till the first unexplainable issue from your production server.

How do you do web dev in java? There’s a framework: GWT made by Google. It’s like React where you have Java class for any HTML component. It compiles to .war (not .jar) archive and you need Tomcat server to serve it. For example Blogger .com used it.

Why do people always think about Spring framework when it comes to Java? We deployed several network services and gui applications with just pure Java. And IT WORKS 🤷‍♂️ If someone prefers frameworks, then one should consider Akka.

I know that there are too many game engines nowadays, like tons of them. But have you heard about JGame? So today give respect to JGame - BSD licensed Java game engine from 2012 ✨ JGame is an open source 2D game engine brought to you by Boris van Schooten that makes multiplatform development easier. It runs on Java JRE 1.3+, J2ME mobile platform and Android 2.1+. There is also a Flash version (Actionscript 3). http://13thmonkey.org/~boris/jgame/ 

There are good alternatives: Kotlin, Scala and Clojure. But the enterprise still chooses Java.


## It is slow

I didn’t google this yet and I’m curious what you all think: In what language Java VM is written?

- C++
- C
- Pascal
- JavaScript

Surprisingly, Wikipedia articles about JVM development are very scarce to technical details and to chronology.

JVM docs were published in 1994. I believe first implementation was K virtual machine (KVM) written in C by Sun Microsystems. Then Sun Microsystems purchased HotSpot (C++, released in 1999). That is the answer to my original question.

"C" answer is more than correct 👍 By other options I tried to explain why Java is so slow.

There are many other JVMs, and many of them designed for embedded devices. But why does Java mainly used for server services (Elastic search) and web apps (Jira), but in Arduino we still use C?