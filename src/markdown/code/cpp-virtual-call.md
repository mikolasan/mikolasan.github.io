---
date: 2022-07-07
title: Virtual call in C++
twitter: https://twitter.com/mikolasan/status/1545085274438262784
published: 2022-08-24
lastModified: 2022-09-08
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

Let's now play around with a base class that has const and non-const versions. You may want to review [what const pointer means](/code/cpp-const)

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

As usual all code for your experiments and slides are in [**cpp-skill** repository](https://github.com/mikolasan/cpp-skill/tree/master/virtual_call).


## Similar posts

- ["Pointing" arguments](/code/cpp-pointing-arguments)
- [const in C++](/code/cpp-const)
- [C++ question: exec](/code/cpp-question-exec)
- [C++ State Machine](/code/cpp-state-machine)
- [Variadic templates in C++](/code/cpp-variadic-templates)
- [Leak in std::map](/code/cpp-leak-in-std-map)