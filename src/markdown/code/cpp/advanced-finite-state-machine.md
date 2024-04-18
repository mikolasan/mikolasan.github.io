---
path: /code/cpp-state-machine
date: 2021-10-01
title: Advanced Finite State Machine
published: 2021-10-14
lastModified: 2022-09-08
---

In one project, I decided to navigate through the steps of the installation wizard using a state machine. 


## First example

Obviously the first thing to do is go to Stack Overflow and find [this answer](https://stackoverflow.com/questions/14676709/c-code-for-state-machine) with finite state machine code example. It simulates a vending machine.

I visit [this repository](https://github.com/hbarcelos/cpp-state-machine). I like the code style, structure, and I want to contribute ❤️

I add CMake build system.

```cmake
cmake_minimum_required(VERSION 3.10)

project(cpp-state-machine VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(PROJECT_SOURCES
    main.cpp
    Machine.cpp
    MachineStates.cpp
)

add_executable(vending-machine ${PROJECT_SOURCES})
```

I switch to smart pointers, the state now is held by the `unique_ptr` and destructors become empty. You can check all changes in [my fork](https://github.com/mikolasan/cpp-state-machine/tree/test).

```cpp
class Machine {
public:
  Machine(unsigned int _stock);
  ~Machine() = default;
private:
  std::unique_ptr<AbstractState> state;
};

Machine::Machine(unsigned int _stock) : stock(_stock) {
  state = stock > 0 ? std::unique_ptr<AbstractState>{std::make_unique<Normal>()}
                    : std::make_unique<SoldOut>();
}

void AbstractState::setState(Machine &machine, AbstractState *state) {
  machine.state.reset(state);
}
```

I add [`override` keywords](https://en.cppreference.com/w/cpp/language/override). I check that the base destructor is virtual, because [that's how it must be](/code/cpp/5-cpp-mistakes-you-should-avoid/#skipping-virtual-destructor-in-base-class), and it is the trivial destructor which I mark using the [`default` keyword](https://en.cppreference.com/w/cpp/keyword/default).

```diff
-  virtual void sell(Machine &machine, unsignd int quantity);
-  virtual void refill(Machine &machine, unsigned int quantity);
-  virtual void fix(Machine &machine);
-  virtual ~Normal();
+  virtual void sell(Machine &machine, unsigned int quantity) override;
+  virtual void refill(Machine &machine, unsigned int quantity) override;
+  virtual void fix(Machine &machine) override
```

But I want to push it further. Do you know the trick how to restrict users of your interface from using destructors directly? You make the destructor protected. Protected, but not virtual [this time](https://stackoverflow.com/questions/8970466/is-there-a-use-for-making-a-protected-destructor-virtual).

```cpp
#include <iostream>

class ProtectedDestructor {
public:
    ProtectedDestructor() {
        std::cout << "[ProtectedDestructor] constructor" << std::endl;
    }
protected:
    ~ProtectedDestructor() {
        std::cout << "[ProtectedDestructor] destructor" << std::endl;
    }
};

int main(int argc, char const *argv[])
{
    ProtectedDestructor* obj = new ProtectedDestructor();
    delete obj; // error: "ProtectedDestructor::~ProtectedDestructor()" (declared at line 9) is inaccessible
    return 0;
}
```

But it left me stymied.




## Dynamic state machine

But I realize, that I need a _dynamic_ state machine, because I don't know how many nodes I need in it before compilation time.

Some [good finding](https://sii.pl/blog/implementing-a-state-machine-in-c17/) that looks good, but didn't help.

For factory class I used `...`-feature ([parameter pack](https://en.cppreference.com/w/cpp/language/parameter_pack)) which in simple words does: and the rest just pass to the next interested party.

```cpp
#ifndef STATEFACTORY_H
#define STATEFACTORY_H

#include <memory>
#include "stagestate.h"

class StateFactory
{
public:
    template<typename... Types>
    std::shared_ptr<State> create(Types ... args) {
        return std::make_shared<State>(args...);
    }
};

#endif // STATEFACTORY_H
```

Base state

```cpp
#ifndef BASESTATE_H
#define BASESTATE_H

#include <memory>
#include <string>

class BaseState
{
public:
    BaseState() = delete;
    BaseState(int id, const std::string& stateName) :
        id(id),
        name(stateName)
    {}
    virtual ~BaseState() {}

    int getId() const;
    std::string getName() const;

    void next();
    void back();
    void error();
    static std::shared_ptr<BaseState> errorState;

protected:
    virtual void doNext(std::shared_ptr<BaseState>& state) {};
    virtual void doBack(std::shared_ptr<BaseState>& state) {};
    void setState(std::shared_ptr<BaseState> state);

private:
    int id;
    std::string name;
};

#endif // BASESTATE_H
```

```cpp
#ifndef STATE_H
#define STATE_H

#include <memory>
#include <string>
#include "basestate.h"

class State : public BaseState
{
public:
    State(int id, const std::string& name) :
        BaseState(id, name)
    {}

    std::shared_ptr<State> prevState;
    std::shared_ptr<State> nextState;

protected:
    virtual void doNext(std::shared_ptr<BaseState>& state) override;
    virtual void doBack(std::shared_ptr<BaseState>& state) override;
};

#endif // STATE_H
```

And implementation

```cpp
std::list<std::shared_ptr<State>> stages;

auto factory = std::make_unique<StateFactory>();
    std::shared_ptr<State> prevState;
    for () {
    std::shared_ptr<State> state = factory->create(stepId, names.first);
    if (stages.empty()) {
            prevState = state;
        } else {
            state->prevState = prevState;
            if (new_group) {
                prevState = state;
            }
            stages.back()->nextState = state;
        }
        stages.push_back(state);
    }
```

// TODO: create a list of bars to visit and the final state where you go home

----

## Similar posts

- ["Pointing" arguments](/code/cpp/pointing-arguments)
- [const in C++](/code/cpp/const-ness)
- [C++ question: exec](/code/cpp/exec-function)
- [C++ State Machine](/code/cpp/advanced-finite-state-machine)
- [Variadic templates in C++](/code/cpp/variadic-templates)
- [Leak in std::map](/code/cpp/leak-in-std-map)