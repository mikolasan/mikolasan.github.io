---
title: LLVM library example
date: 2025-02-24
published: 2025-02-24
lastModified: 2025-02-24
---

Here we will write a program that takes code from a `std::string` (need to find API that doesn't read files from local filesystem) and compiles it.
The output is an assembly code will be saved in another buffer that can be passed to another function or sent over the network etc.

```cpp
int main(int argc, char const *argv[]) {
  std::string code = R"CODE(
#include <iostream>
int main() {
  std::cout << "hello wroRLDL" << std::endl;
  return 0;
}
)CODE";

  std::string assembly = compileToAssembly(code);
  std::cout << "assembly: " << assembly << std::endl;
  std::cout << std::endl;
  return 0;
}
```

Also we will compile LLVM library on Windows.

This is my CMake

```cmake
set(CMAKE_CXX_STANDARD 20)

if(WIN32)
  set(LLVM_DIR ${CMAKE_SOURCE_DIR}/thirdparty/windows/LLVM/lib/cmake/llvm)
endif()

find_package(LLVM REQUIRED CONFIG)

message(STATUS "Found LLVM ${LLVM_PACKAGE_VERSION}")
message(STATUS "Using LLVMConfig.cmake in: ${LLVM_DIR}")

add_definitions(${LLVM_DEFINITIONS})
  
add_executable(code-to-assembly compile-to-asm.cpp)
# add_executable(code-to-assembly code-to-assembly.cpp)

# Link against LLVM libraries
target_include_directories(code-to-assembly PRIVATE ${LLVM_INCLUDE_DIRS})
target_link_directories(code-to-assembly PRIVATE ${LLVM_LIBRARY_DIRS})

# https://llvm.org/docs/CMake.html#embedding-llvm-in-your-project
# https://stackoverflow.com/questions/25782537/cmake-and-clang-tooling-linking-error-out-of-tree/25783251#25783251
#
# $ thirdparty/windows/LLVM/bin/llvm-config.exe --components

llvm_map_components_to_libnames(llvm_libs
  core
  targetparser
  x86info
  )

target_link_libraries(code-to-assembly 
  PRIVATE
  clangAnalysis
  clangAST
  clangASTMatchers
  clangBasic
  clangCodeGen
  clangDriver
  clangEdit
  clangFrontend
  clangLex
  clangParse
  clangSema
  clangSerialization
  clangSupport
  clangTooling
  ${llvm_libs}
  Version
  )

# Version.lib - https://learn.microsoft.com/en-us/windows/win32/api/winver/nf-winver-getfileversioninfosizew
```

/ to be continued... /