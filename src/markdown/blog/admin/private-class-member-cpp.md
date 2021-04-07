---
path: /blog/private-class-member-cpp
date: 2021-04-07
title: "C++: private class member and inheritance"
---

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