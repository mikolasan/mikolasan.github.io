---
path: /code/cpp/private-class-member
date: 2021-04-07
title: "About template method pattern in C++"
subtitle: Private abstract class method. Wat?
published: 2021-10-14
lastModified: 2021-10-14
---

I usually find myself using inheritance when I need to store objects with different qualities in one place and process them later in similar manner. Probably iterating through all of them.

When I first heard about object oriented concepts I thought that the most common use of it would be in the sharing common functionality from a base class by derived classes which in their turn have just small quirks. Consider canonical example about geometrical figures like rectangle and square.

I stumbled upon one implementation from my coworkers where a subclass was extending operations from the base class, but it was strongly coupled with base class by order of execution. For each operation the base class is doing its thing, then calls private virtual function, moreover a pure abstract function, thus redirecting execution to its subclass.

```cpp
class Base {
public:
  void thing() { some_thing(); do_thing(); }
private:
  void some_thing() {}
  virtual void do_thing() = 0;
};
```

To make such system run, one needs at least one dummy class that allows the base to do the thing and then do its dummy part - nothing and stop. Or make the second step customizable by subclasses. 

```cpp
class Subclass: public Base {
private:
  void do_thing() { std::cout << "Subclass call\n"; }
};
```

I hope you see how public interface can stay clear, while the second step is defined by private abstract functions. 

```cpp
int main(int argc, char const *argv[])
{
  Base* t = new Subclass();
  t->thing();
  return 0;
}
```

Wait. Private virtual? Does it make sense? Maybe protected virtual?


[Apparently](https://stackoverflow.com/questions/40615470/using-private-abstract-method-in-derived-class), this is the Template Method pattern.

Then I asked myself just a theoretical question. If in similar fashion a have private members and I need a getter, where this getter should be defined? Base class? Add virtual keyword?

My iterations went to a dead end, my thought experiment is over, I knew from the beginning that for my purpose a `protected` member must be used.

```cpp
#include <iostream>

class Base {
public:
    Base() = delete;
    Base(int x) : _x(x) {}
    virtual int get() const { return _x; }
private:
    int _x;
};

class Child : public Base {
public:
    Child(int x, int base_x = 0) : Base(base_x), _x(x) {}
    virtual int get() const { return _x; }
    int get_base() const { return Base::get(); }
private:
    int _x;
};

int main(int argc, char const *argv[])
{
    Base b(1);
    Child c(2, 3);
    std::cout << "Base: " << b.get() << std::endl;
    std::cout << "Child: " << c.get() << std::endl;
    std::cout << "Base (from Child): " << c.get_base() << std::endl;
    return 0;
}
```

Did you get any interesting thoughts for youself?