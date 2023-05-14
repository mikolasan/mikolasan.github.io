---
date: 2023-05-13
title: 5 C++ mistakes you should avoid
published: 2023-05-13
lastModified: 2023-05-13
---

## Using raw pointers

Most often leads to the problem of not following the rule of three/five/zero. Also easy to skip the initialization step and start accessing private fields while the object is still `nullptr`.

## Skipping virtual destructor in base class

```cpp
class Base {
public:
    Base() { }
    ~Base() { }
};

class Derived : public Base {
public:
    Derived() { }
    ~Derived() { }
};

int main() {
    Base* b = new Derived();
    delete b; // only base class destructor called
    return 0;
}
```

The fix is easy. Add the `virtual` keyword to the destructor of the base class.

```cpp
virtual ~Base() { }
```

Now when we call `delete` on `b`, both the destructor for `Base` and the destructor for `Derived` are called, 

## Return a reference from method

The problem with returning a reference from a method is that the reference may become invalid or even refer to an object that no longer exists

```cpp
class Example {
public:
    Example(int value) : m_value(value) { }
    int& getValue() { return m_value; }
private:
    int m_value;
};

int main() {
    int init = 0
    int& value = init;
    {  
        Example ex(42);
        value = ex.getValue();
        cout << value << endl; // prints 42
    }
    // ex goes out of scope, m_value is destroyed
    cout << value << endl; // undefined behavior!
    return 0;
}
```

## Pointer parameter in a function

If you pass a pointer to a function as a parameter then you cannot assign it to another pointer within the function.

```cpp
void assignPointer(int* ptr) {
    int* newPtr = new int(42); // dynamically allocate memory for new integer
    ptr = newPtr; // assign new pointer to function parameter
}

int main() {
    int* ptr = nullptr;
    assignPointer(ptr); // pass pointer to function
    // ptr still points to nullptr, memory leak occurs
    delete ptr; // undefined behavior, as ptr was never assigned a valid address
    return 0;
}
```

## +1 for null terminated strings

The null character `\0'` is used to indicate the end of the string. When we allocate memory for a string, we must make sure to allocate enough space for the string and one extra byte for the null character.

```cpp
#include <cstring> // for std::memcpy and std::strlen
#include <iostream> // for std::cout and std::endl

int main()
{
    const char* str = "Hello, world!";
    const std::size_t len = std::strlen(str);
    char* buf = new char[len]; // error
    std::memcpy(buf, str, len); // missing the null character
    std::cout << "Copied string: " << buf << std::endl; // length will extend to the first 0 found in memory
    delete[] buf;
    return 0;
}
```