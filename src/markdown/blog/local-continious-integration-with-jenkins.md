---
date: 2022-02-01
title: Local Continuous Integration with Jenkins
---

By Local Continuous Integration I mean starting a build after specific commit in local repository in order to check the compilation output, look at test results and and use the build result for any other purpose. Changes not required to be pushed, and CI is triggered manually (or somehow when commit is done), but build is produced not in the repo, this way you can continue working and keep changin and saving files right after the build starts.

## Why

What benefits I see in this approach for my small local development. Does it worth time spent on configuration you will ask.

But I often notice that I spend time on switching between code editor and console terminal where I run the build and wait for result to appear.