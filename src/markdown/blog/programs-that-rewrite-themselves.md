---
title: Programs that rewrite themselves
date: 2022-09-08
published: 2022-09-16
lastModified: 2022-09-16
---


## Preface

In computer science there’s an interesting exercise when you need to make a program that prints itself. In similar manner what about programs that can change themselves?


> I would like to see a non-trivial self-referencing program. That is, a program that can change itself, but its main purpose is NOT doing that...
>
> [Jorge Romero](https://twitter.com/jrlgs/status/1568728524688687107)


Researchers are talking about AI systems but we even haven’t established practices to allow programs alter its code.

I know that the first example that comes to mind is malware. It’s the malware that changes other programs and itself.


> I love Morphic, which is the GUI for smalltalk, but, all the companies loved the OOP in Smalltalk but couldn't do vendor-lockin, thats why c++ boomed, its compiled, no source code, opposed to Smalltalk. So, how can a program modify itself if the sourcecode isnt included ?
>
> [Mohamad Bo Hamad](https://twitter.com/mohjb/status/1568763661195550720)

Smalltalk doesn't have source files 😱 it's compiled into bytecode, but it has reflection which allows to do magic at runtime.

When we deal with machine code, then the field for change is narrow, but it's still possible. This is how all _cracks_ (programs that crack other programs) work. The crack overrides a few instructions in the original program that were suppose to check for a license. Then with new instructions in place the flow is redirected to the successful output when the license is verified, but possibly the license was never even entered.


> Self-modifying code was a big proponent in older game copy protection and DRMs. These were super non-trivial and a right mess.
>
> [Matt Jones](https://twitter.com/RubyNovaDev/status/1568762754533564417)


I’d like to defend rights of amok programs. They should be allowed to run at least in containers. Like a zoo of peculiar apps.


Not sure how good the advice is, but in order to achieve high level of security, then use algorithms that are less known. For xample instead of LZMA, bzip or XZ use brotli or zopfli. If you add custom compression algorithm to the kernel then no one will have a clue how to unpack your ramfs.


## Dynamic modules

But let's return back to programs that can modify its code at runtime. First, we start with simple examples where we illustrate that pointers refer to memory and in that memory specific functions are located. Once the pointer changes it value, then it refers to another memory location that can contain another function.

```cpp
#include <iostream>

// define two different algorithms as functions
void algorithm1(int x) {
  std::cout << "Using algorithm 1 with input " << x << std::endl;
}

void algorithm2(int x) {
  std::cout << "Using algorithm 2 with input " << x << std::endl;
}

int main() {
  int input = 5;
  void (*funcPtr)(int);  // declare a function pointer variable

  // set the function pointer to point to algorithm1
  funcPtr = algorithm1;
  funcPtr(input);   // call algorithm1 with the input

  // set the function pointer to point to algorithm2
  funcPtr = algorithm2;
  funcPtr(input);   // call algorithm2 with the input

  return 0;
}

```

Such technique is very simple, in more advanced applications one can use the strategy pattern or other design patterns and achieve similar behavior when algorithms are selected at runtime. Such algorithms can be loaded as dynamic modules, which means that they can be compiled later when the main program is already working. Of course it's not the full solution because the main program doesn't control what is contained in such dynamics modules.


## Interpreted languages

To eliminate complexity with compilation of the new modules I think we could use interpreting programming language. 

From C++ we can create files, and write code, let's say in Python, then load these new files into the interpreter and fetch results in the main C++ program. 

```cpp
#include <iostream>
#include <fstream>
#include <cstdlib>

int main() {
  // define the rules for determining what Python code to write
  bool useAlgorithm1 = true; // for example purposes only, this can be changed based on your desired rules

  // create a new Python file and write code to it based on the rules
  std::ofstream pythonFile("algorithm.py");
  if (useAlgorithm1) {
    pythonFile << "def algorithm(x):\n  return x * 2\n";
  } else {
    pythonFile << "def algorithm(x):\n  return x * 3\n";
  }
  pythonFile.close();

  // execute the Python interpreter and run the Python code
  std::system("python algorithm.py > output.txt");

  // read the results from the output file and use them in the C++ program
  std::ifstream outputFile("output.txt");
  double result;
  outputFile >> result;
  std::cout << "The result is: " << result << std::endl;
  outputFile.close();

  return 0;
}
```

Is there a framework that can help me convert from sentences in natural language into functions written in programming language? Let's take a look on **NLTK** example.

```python
import nltk

# Define the sentence we want to convert
sentence = "Add two numbers together"

# Define the grammar for the sentence
grammar = nltk.CFG.fromstring("""
    S -> VP
    VP -> V NP NP
    NP -> CD N
    V -> "Add"
    CD -> "two"
    N -> "numbers"
""")

# Define a function that generates code from a parse tree
def generate_code(parse_tree):
    if parse_tree.label() == "S":
        return generate_code(parse_tree[0])
    elif parse_tree.label() == "VP":
        operator = generate_code(parse_tree[0])
        operand1 = generate_code(parse_tree[1])
        operand2 = generate_code(parse_tree[2])
        return f"{operand1} {operator} {operand2}"
    elif parse_tree.label() == "V":
        return "+"
    elif parse_tree.label() == "CD":
        return "2"
    elif parse_tree.label() == "N":
        return "number"
    else:
        return parse_tree[0]

# Use the grammar to parse the sentence
parser = nltk.ChartParser(grammar)
trees = parser.parse_all(sentence.split())

# Generate code from the parse tree
for tree in trees:
    operands = []
    for i in range(2):
        operand = input("Please enter a number: ")
        operands.append(operand)
    result = eval(
      generate_code(tree),
      {'__builtins__':None},
      {'number': float, ' ':None}.update(dict(zip(['number', '+'],operands)))
      )
    print(f"The result is: {result}")

```

How to design the main module that will decide what Python code to write?


1. Define the grammar for the input sentences using a context-free grammar
1. Write a function that takes a parse tree of the input sentence and generates Python code from it.
1. Use NLTK's chart parser to parse the user input into a parse tree using the defined grammar.
1. If there are multiple valid parse trees, use a disambiguation method to select the most appropriate one.
1. Use the generated Python code to perform the desired actions.

```python
import nltk

# Define the grammar for arithmetic expressions
grammar = nltk.CFG.fromstring("""
    S -> NP VP
    NP -> "Please" "calculate" "the" "result" "of" NP1
    NP1 -> "adding" "two" "numbers" | "subtracting" "two" "numbers" | "multiplying" "two" "numbers" | "dividing" "two" "numbers"
    VP -> V NP NP
    V -> "add" | "subtract" | "multiply" | "divide"
""")

# Define a function that generates Python code from a parse tree
def generate_code(parse_tree):
    if parse_tree.label() == "VP":
        operator = generate_code(parse_tree[0])
        operand1 = generate_code(parse_tree[1])
        operand2 = generate_code(parse_tree[2])
        return f"{operand1} {operator} {operand2}"
    elif parse_tree.label() == "V":
        return {
            "add": "+",
            "subtract": "-",
            "multiply": "*",
            "divide": "/"
        }[parse_tree[0]]
    else:
        return parse_tree[0]

# Define a function that performs the desired action based on the generated code
def perform_action(code):
    try:
        result = eval(code)
        print(f"The result is: {result}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Use the grammar to parse the user input
def parse_input(input_str):
    parser = nltk.ChartParser(grammar)
    trees = parser.parse_all(input_str.split())
    return trees

# Disambiguate the parse trees and generate Python code from the selected tree
def process_input(input_str):
    trees = parse_input(input_str)
    if not trees:
        print("Invalid input.")
        return
    if len(trees) > 1:
        print("Ambiguous input. Selecting the first parse tree.")
    tree = trees[0]
    code = generate_code(tree)
    perform_action(code)

# Prompt the user for input and process it
while True:
    input_str = input("Please enter an arithmetic expression, or 'quit' to exit: ")
    if input_str == "quit":
        break
    process_input(input_str)

```


```python
import nltk

# Define the grammar for expressions
grammar = nltk.CFG.fromstring("""
    S -> NP VP
    NP -> "Please" "calculate" "the" "result" "of" NP1
    NP1 -> "adding" "two" "numbers" | "subtracting" "two" "numbers" | "multiplying" "two" "numbers" | "dividing" "two" "numbers" | "evaluating" "the" "expression"
    VP -> V NP NP | "assign" NP "to" VAR | "call" FUNC NP | "if" COND "then" STMT | "if" COND "then" STMT "else" STMT | "while" COND "do" STMT
    V -> "add" | "subtract" | "multiply" | "divide"
    VAR -> "x" | "y" | "z"
    FUNC -> "sqrt" | "sin" | "cos"
    COND -> "true" | "false" | NP OP NP
    OP -> "less than" | "greater than" | "equal to"
    STMT -> VP | "print" NP | "exit"
""")

# Define a function that generates Python code from a parse tree
def generate_code(parse_tree):
    if parse_tree.label() == "VP":
        if parse_tree[0].label() == "V":
            operator = generate_code(parse_tree[0])
            operand1 = generate_code(parse_tree[1])
            operand2 = generate_code(parse_tree[2])
            return f"{operand1} {operator} {operand2}"
        elif parse_tree[0].label() == "VAR":
            variable = generate_code(parse_tree[0])
            value = generate_code(parse_tree[2])
            return f"{variable} = {value}"
        elif parse_tree[0].label() == "FUNC":
            function = generate_code(parse_tree[0])
            argument = generate_code(parse_tree[2])
            return f"{function}({argument})"
        elif parse_tree[0].label() == "COND":
            condition = generate_code(parse_tree[0])
            then_clause = generate_code(parse_tree[2])
            else_clause = generate_code(parse_tree[4]) if len(parse_tree) > 4 else None
            if else_clause is not None:
                return f"{then_clause} if {condition} else {else_clause}"
            else:
                return f"{then_clause} if {condition} else None"
        elif parse_tree[0].label() == "STMT":
            return generate_code(parse_tree[0])
    elif parse_tree.label() == "V":
        return {
            "add": "+",
            "subtract": "-",
            "multiply": "*",
            "divide": "/"
        }[parse_tree[0]]
    elif parse_tree.label() == "VAR":
        return parse_tree[0]
    elif parse_tree.label() == "FUNC":
        return parse_tree[0]
    elif parse_tree.label() == "COND":
        if len(parse_tree) == 1:
            return {
                "true": "True",
                "false": "False"
            }[parse_tree[0]]
        else:
            operator = {
                "less than": "<",
                "greater than": ">",
                "equal to": "=="
            }[parse_tree[1]]

```

Let's say our program is a social media bot. We define states as a combination of several metrics: count of posts, amount of followers, unread DMs, comments to our posts. Also we can make these actions: "create a post", "write a comment", "add like", "reply to comment", "write a DM", "follow a user", "block user". The reward function is based on how many likes we received and how many followers increased

Additional factors that could be included in the MDP to make the decision-making more accurate and effective include:

- Time of day: Posting or interacting with users at certain times of day may be more effective than at other times. For example, if your bot is targeting users in a specific time zone, posting during peak activity hours may result in more engagement.
- User engagement: Your bot can track how engaged users are with your posts or interactions, such as likes, comments, and shares. The bot can use this data to decide which type of content or interaction to prioritize.
- User preferences: If your bot has data on users' preferences, such as topics they are interested in or content they engage with the most, the bot can use this information to personalize its actions and increase engagement.
- User sentiment: Your bot can analyze user sentiment, such as positive or negative feedback, to adjust its actions accordingly. For example, if a user has recently left a negative comment, the bot may avoid interacting with that user for a certain period of time.
- Competitor analysis: Your bot can monitor competitors' actions and engagement rates to adjust its own actions and remain competitive in the social media space.


## Change C++ code

- Is it possible to compile code right in the program using gcc, for example? [The answer is](https://softwareengineering.stackexchange.com/questions/189949/is-there-a-way-to-use-gcc-as-a-library): use clang
- 

## Next

Can I create new programming language that will be similar to human neural system in the way that will allow to execute operations in parallel?

## Links

- https://book.hacktricks.xyz/crypto-and-stego/cryptographic-algorithms#serpent-symmetric-crypt
- Address space layout randomization (ASLR) https://www.mandiant.com/resources/blog/six-facts-about-address-space-layout-randomization-on-windows