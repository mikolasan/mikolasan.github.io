---
path: /gamedev/python
date: 2020-06-06
title: Python
---

## Why do I hate Python?

I actually like Python, because it gives you a chance to prototype your idea really fast.

However, try to predict an output for the next simple examples?

```
class SimpleStructure(object):
    x = []

obj1 = SimpleStructure()
obj1.x.append(1)
obj2 = SimpleStructure()
obj2.x.append(2)

print(obj1.x, obj2.x)
# Guess here
```

Any difference if we add a constructor?

```
class SimpleStructureWithConstructor(object):
    def __init__(self):
        self.x = []

obj1 = SimpleStructureWithConstructor()
obj1.x.append(1)
obj2 = SimpleStructureWithConstructor()
obj2.x.append(2)

print(obj1.x, obj2.x)
# Guess here
```

It is not just an object, it is an instance. So instance and class variables, my friends.

Another example takes a peek at some unclear if statements

```
x=None
print("TRUE" if x else "FALSE")
print("TRUE" if x is not None else "FALSE")
x=0
print("TRUE" if x else "FALSE")
print("TRUE" if x > 0 else "FALSE")
x=''
print("TRUE" if x else "FALSE")
print("TRUE" if len(x) > 0 else "FALSE")
x=[]
print("TRUE" if x else "FALSE")
print("TRUE" if len(x) > 0 else "FALSE")
```