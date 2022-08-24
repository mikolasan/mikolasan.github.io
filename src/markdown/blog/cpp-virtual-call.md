---
date: 2022-07-07
title: Virtual call in C++
twitter: https://twitter.com/mikolasan/status/1545085274438262784
---


What will happen if I remove the virtual specifier from the class A?

What will happen if I remove the virtual specifier from the classes A and B?

What will happen if I remove the virtual specifier from the class B?

```cpp
#include <iostream>

class A {
public:
    virtual void call() const
    {
        std::cout << "A" << std::endl;
    }
};

class B : public A {
public:
    virtual void call() const override
    {
        std::cout << "B" << std::endl;
    }
};

class C : public B {
public:
    void call() const override
    {
        std::cout << "C" << std::endl;
    }
};

int main(int argc, char const *argv[])
{
    A* a = new A();
    B* b = new B();
    C* c = new C();

    a->call();
    b->call();
    c->call();
    
    return 0;
}
```

Let's now play around with a base class that has const and non-const versions. You may want to review [what const pointer means](/blog/cpp-const)

```cpp
#include <iostream>

class A {
public:
    void call()
    {
        std::cout << "A" << std::endl;
    }
    virtual void call() const
    {
        std::cout << "Ac" << std::endl;
    }
};

class B : public A {
public:
    virtual void call() const final
    {
        std::cout << "Bc" << std::endl;
    }
};

class C : public B {
public:
    void call() 
    {
        std::cout << "C" << std::endl;
    }
};

int main(int argc, char const *argv[])
{
    const A* a = new A();
    const A* b = new B();
    A* c = new C();

    a->call();
    b->call();
    c->call();
    
    return 0;
}
```