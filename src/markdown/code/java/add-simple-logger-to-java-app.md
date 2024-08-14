---
title: Add simple logger
subtitle: to Java application
date: 2021-11-23
published: 2021-11-23
lastModified: 2021-11-28
---

Gradle snippet:

**build.gradle**

```groovy
dependencies {
    implementation 'org.slf4j:slf4j-api:1.7.30'
    implementation 'org.slf4j:slf4j-simple:1.7.30'
}
```

Add to your code (where the Test class is your code):

**Test.java**

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class Test {
    private static final Logger logger = LoggerFactory.getLogger(Test.class);
```

### Log levels 

From the [manual](http://www.slf4j.org/manual.html):

- trace
- error
- warn
- info
- debug

No "panic", no "warning"!


### SLF4J and LOGBACK

TODO

- [Configuration](http://logback.qos.ch/manual/configuration.html)
- [Layouts](http://logback.qos.ch/manual/layouts.html#coloring)
- [Groovy](http://logback.qos.ch/manual/groovy.html)

