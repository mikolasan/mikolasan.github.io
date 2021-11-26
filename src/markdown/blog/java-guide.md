---
title: Java Guide
date: 2021-11-23
draft: true
published: 2021-11-23
lastModified: 2021-11-23
---

## Java Guide to Classes

- TCP server socket - [ServerSocket](https://docs.oracle.com/javase/7/docs/api/java/net/ServerSocket.html)
- TCP client socket - [Socket](https://docs.oracle.com/javase/7/docs/api/java/net/Socket.html)

## Gradle short snippets

### Add simple logger

**build.gradle**

```groovy
dependencies {
    implementation 'org.slf4j:slf4j-api:1.7.30'
    implementation 'org.slf4j:slf4j-simple:1.7.30'
}
```

**Test.java**

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class Test {
    private static final Logger logger = LoggerFactory.getLogger(Test.class);
```

Log levels ([manual](http://www.slf4j.org/manual.html)):

- trace
- error
- warn
- info
- debug

No "panic", no "warning"!


### SLF4J and LOGBACK

// TODO

## Plugin system in Java

- PF4J https://pf4j.org/doc/getting-started.html
- OSGI
- Custom https://stackoverflow.com/questions/465099/best-way-to-build-a-plugin-system-with-java (+ jar loading https://stackoverflow.com/questions/60764/how-to-load-jar-files-dynamically-at-runtime)

## Sandboxing

> Basically, you need to set a Policy and a SecurityManager. The Policy is responsible for assigning (or not assigning) Permissions to a CodeSource.

https://blog.pterodactylus.net/2013/07/19/sandboxing/
