---
date: 2022-05-02
title: Check CMake version in Bash
published: 2022-05-02
lastModified: 2022-05-02
---

You can check the major and minor numbers of the CMake version installed on your system using the following command in Bash:

```bash
CMAKE_VERSION=$(cmake --version | grep -o -P -e "\d+\.\d+.\d+")
CMAKE_VERSION_MAJOR=$(echo $CMAKE_VERSION | cut -d "." -f 1)
CMAKE_VERSION_MINOR=$(echo $CMAKE_VERSION | cut -d "." -f 2)
```

The `grep` options 

- `-o` is used to print only the matched pattern and not the entire line
- `-P` is used to enable Perl-compatible regular expressions

Should I use "positive lookbehind assertion": `'(?<=cmake version )\d+\.\d+'`?