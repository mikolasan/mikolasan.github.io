---
path: /blog/python-threads
date: 2021-06-17
title: Threads in Python
twitter: https://twitter.com/mikolasan/status/1405495727116193792
tags: ["Python"]
---

Just a few links where I would start reading about Threads in Python.

1. Strange website domain, but very good content 🧡 https://bytes.yingw787.com/posts/2019/01/12/concurrency_with_python_threads_and_locks/
1. Many-many words in between the real code, but I like their cover images https://realpython.com/intro-to-python-threading/
1. There is nothing better than official Python docs. But. But only when you know what you are looking for https://docs.python.org/3/library/threading.html#thread-objects

When you used to develop in Java (where every object has an intrinsic lock) and then your next app uses Python (let's say, with timers concurrently changing data) there is an occasion to forget about locks till the first unexplainable issue from your production server.