---
title: Elegant C code
date: 2022-12-24
---



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

https://godbolt.org/z/b3j9n853K