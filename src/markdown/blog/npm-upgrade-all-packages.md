---
path: /blog/npm-upgrade-all-packages
date: 2021-06-28
title: npm - upgrade all packages
twitter: https://twitter.com/mikolasan/status/1409464729072963589
tags: ["JavaScript"]
published: 2021-10-14
lastModified: 2021-10-26
---

How often do you find an actual answer on StackOverflow that works for you only at the bottom and it has 0 votes?

For example, very important for every web developer question, how to upgrade all packages to their latest versions with **npm**?

All other answers do not work for me, because I'd like to have a pure approach when I don't need to install any extra package (especially global), and if I need to remember a new command, then let it be the command from the **npm** itself.
Good news, there is such solution!

## 1.

Discover dependencies that are out of date

```
npm outdated
```

## 2.

Update your dependencies with

```
npm install <package-name-1>@latest <package-name-2>@latest ...
```

Seems like a tedious handwork, but bear with me.

## Pros

Some pros of updating packages manually or one by one:
- after each package update you run tests, if tests fail, you know what package brings breaking changes
- you have time to think if you really need this package. probably it is good time for refactoring 

I hope you always scroll through all answers on StackOverflow. Even just out of curiosity.

## Alternative

Use **yarn**

```
yarn upgrade --latest
```

**yarn** has other perks comparing to **npm**.