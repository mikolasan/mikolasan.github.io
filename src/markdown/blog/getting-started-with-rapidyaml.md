---
title: Getting started with rapidyaml
date: 2021-10-13
---

gist link: https://gist.github.com/mikolasan/d9306a03b23a9a85e4166e69810414b1
StackOverflow answer: https://stackoverflow.com/a/69552155/1104612

1. Add the lib into your repository as a submodule `git submodule add https://github.com/biojppm/rapidyaml rapidyaml`
2. Recursively initialize this submodule `git submodule update --init --recursive rapidyaml`
3. Alternatively (instead of 1. and 2.)
   - clone repository `git clone --recursive https://github.com/biojppm/rapidyaml`,
   - remove `.git`,
   - then cut and paste into your source tree
4. Update your CMakeLists.txt
   - build the library `add_subdirectory(rapidyaml)`
   - find headers `target_include_directories(test PRIVATE rapidyaml/src)`
   - link the lib `target_link_libraries(test ryml)`

## CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.14)

project(rapidyaml_getting_started VERSION 0.0.1 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_subdirectory(rapidyaml)

add_executable(test main.cpp)
target_include_directories(test PRIVATE rapidyaml/src)
target_link_libraries(test ryml)
```

## main.cpp

```cpp
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

#include <ryml_std.hpp>
#include <ryml.hpp>

std::string get_file_contents(const char *filename)
{
    std::ifstream in(filename, std::ios::in | std::ios::binary);
    if (!in) {
        std::cerr << "could not open " << filename << std::endl;
        exit(1);
    }
    std::ostringstream contents;
    contents << in.rdbuf();
    return contents.str();
}

int main(int argc, char const *argv[]) 
{
    std::string contents = get_file_contents("config.yml");
    ryml::Tree tree = ryml::parse(ryml::to_csubstr(contents));
    ryml::NodeRef show_mapping = tree["foo"];
    for (ryml::NodeRef const& child : show_mapping.children()) {
        std::cout << "key: " << child.key() << " val: " << child.val() << std::endl;
    }
}
```