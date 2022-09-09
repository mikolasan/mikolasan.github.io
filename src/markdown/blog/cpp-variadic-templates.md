---
date: 2022-07-28
title: Variadic templates in C++
twitter: https://twitter.com/mikolasan/status/1552758594344390656
---

I found a use of variadic templates in C++. This is `constexpr` max function that finds the max element in the list of arguments at compile time. Very strange that the standard library doesn't have it. 

```cpp
#include <iostream>

template<typename T>
constexpr T max(T a) {
    return a;
}

template<typename T, typename... Rest>
constexpr T max(T a, Rest... rest) {
    T b = max(rest...);
    return a < b ? b : a;
}

int main(int argc, char const *argv[])
{
    constexpr auto max_value_1 = max(1,2,3,4,9);
    std::cout << max_value_1 << std::endl;
    std::cout << max(9,1,2,3,4) << std::endl;
    std::cout << max(1,9,2,3,4) << std::endl;
    return 0;
}
```

What I find strange is that variadic templates are not similar to variadic functions in C. I wanted to rewrite a C example with templates, but cannot figure this out. So here is just a C example.

```cpp
#include <cstdarg>
#include <iostream>

enum class Hint {
    COOL_ONE,
    COOL_TWO,
    COOL_THREE,
};

void cool_function(Hint hint, ...) {
    va_list ap;
    va_start(ap, hint);

    switch (hint) {
    case Hint::COOL_ONE:
    {
        unsigned int x = va_arg(ap, unsigned int);
        std::cout << "COOL ONE: " << x << std::endl;
        break;
    }
    case Hint::COOL_TWO:
    {
        double x = va_arg(ap, double);
        double y = va_arg(ap, double);
        std::cout << "COOL TWO: " << x << ", " << y << std::endl;
        break;
    }
    case Hint::COOL_THREE:
    {
        char* c_string = va_arg(ap, char*);
        size_t size = va_arg(ap, size_t);
        std::cout << "COOL THREE: " << c_string << std::endl;
        break;
    }
    default:
        std::cout << "Impossible!" << std::endl;
        break;
    }
    
    va_end(ap);
}


int main(int argc, char const *argv[])
{
    cool_function(Hint::COOL_ONE, 42);
    cool_function(Hint::COOL_TWO, 1.23, 4.56);
    const char* test_string = "array of data";
    cool_function(Hint::COOL_THREE, test_string, sizeof test_string);
    return 0;
}
```

As usual all code for your experiments and slides are in [**cpp-skill** repository](https://github.com/mikolasan/cpp-skill/tree/master/variadic).


## Similar posts

- ["Pointing" arguments](/blog/cpp-pointing-arguments)
- [const in C++](/blog/cpp-const)
- [C++ question: exec](/blog/cpp-question-exec)
- [C++ State Machine](/blog/cpp-state-machine)
- [Virtual call in C++](/blog/cpp-virtual-call)
- [Leak in std::map](/blog/cpp-leak-in-std-map)