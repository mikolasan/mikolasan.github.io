---
title: Elegant C code
date: 2022-12-24
published: 2022-12-25
lastModified: 2023-05-14
---

What the result of this code will be?

```c
#include <stdio.h>

void P(const char *str) {
    printf("%c", *str);
}

int main() {
    int e;
    char *u = "11111111111111";
    int R = 3;
    int C = 5;
    for (; P("\n"), R--; P("|"))
        for (e = C; e--; P("_" + (*u++ / 8) % 2))
            P("| " + (*u / 4) % 2);
    return 0;
}
```


## Answer

The output of this program will be a rectangular grid of ASCII characters, where each character is either an underscore, a space, a vertical bar, or a newline character, depending on the values in the `u` string. The grid will have `R` rows and `C` columns.

https://godbolt.org/z/b3j9n853K