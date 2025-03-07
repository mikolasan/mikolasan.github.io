---
date: "2020-05-16"
title: "Word clock"
tags: ["hardware", "embedded", "laser cut"]
coverImage: "word-clock.jpg"
published: 2021-10-13
lastModified: 2022-12-16
---

I followed instructions from Make magazine (Volume 67) and I made a word clock.

I also started a code project for discovering ways to place words on a grid. With all possible optimization like shaping words in a form of crossword. Check out code in the of this post.

![Acryl is ready](./word-clock-1.jpg)

## Why

It will stay on the table and will show time when I need to head out of the office.

## Process

Ordered laser cut

![Peel it](./word-clock-2.jpg)

Bought screws and adafruit boards. In the original instructions it used [Trinket Pro 5V](https://www.adafruit.com/product/2000) (ATmega328), but I followed the deprecation warning and chose [Adafruit ItsyBitsy 32u4 - 5V 16MHz](https://www.adafruit.com/product/3677) (Atmega32u4). Imprtant difference between them: the latter is missing mount holes which is the only way to attach the board to the acrylic case inside. I put it inside the case loosely, thus the USB connector become impossible to connect back once you unplug it, so one USB cable took roots in this build for a long time.

![The case parts](./word-clock-3.jpg)

How do you call screen that does not display time with digits, but tells it with words?

## Result

![The case is assembled](./word-clock-4.jpg)

The clock is working.

![It shows words](./word-clock-5.jpg)


## Links

- Laser cut layouts, Arduino code: https://github.com/andydoro/WordClock-NeoMatrix8x8
- [Add ItsyBitsy to Arduino IDE](https://learn.adafruit.com/introducting-itsy-bitsy-32u4/arduino-ide-setup). Additional Boards Manager URL: `https://adafruit.github.io/arduino-board-index/package_adafruit_index.json`

## Code experiments

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <iterator>
#include <algorithm>
#include <random>

using BagOfWords = std::vector<std::string>;

BagOfWords sort_words_by_length(const BagOfWords& w) {
    BagOfWords x(w);
    std::sort(
        std::begin(x),
        std::end(x),
        [](const std::string& a, const std::string& b){
            return a.length() < b.length();
        });
    return x;
}

std::vector<BagOfWords> groups_in_length(const BagOfWords& words, int max_length) {
    auto sorted = sort_words_by_length(words);
    std::vector<BagOfWords> groups;
    for (const auto& w : sorted) {
        BagOfWords group;
        group.push_back(w);
        auto total_length = w.length();
        for (const auto& w2 : sorted) {
            if (total_length + w2.length() <= max_length) {
                groups.push_back(group);
                groups.back().push_back(w2);
            }
        }
    }
    return groups;
}

int main() {
  const int side = 9;
  std::vector<BagOfWords> clock(side, BagOfWords(side, "_"));
  
  BagOfWords words = {
    "quarter", "half", "past", "to",
    
    "twenty", "ten", "five", "twelve",
    "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine", "ten",
    "eleven"
  };
  
  auto sorted = sort_words_by_length(words);
  auto it = sorted.begin();
  for (int i = 0; i < side; ++i) {
    for (int j = 0; j < side; ++j) {
      if (it->length() < side - j) {
        auto c = clock[i].begin();
        std::advance(c, j);
        std::copy(it->begin(), it->end(), c);
        j+=it->length() - 1;
        ++it;
      }
    }
  }

  for (int i = 0; i < side; ++i) {
    for (int j = 0; j < side; ++j) {
      std::cout << clock[i][j] << " ";
    }
    std::cout << std::endl;
  }

//   auto groups = groups_in_length(words, side);
//   std::random_device device;
//   std::mt19937 generator(device());
//   std::shuffle(std::begin(groups), std::end(groups), generator);
//   auto it = groups.begin();
//   BagOfWords clock2;
//   for (int i = 0; i < side; ++i) {
//       std::string s = std::accumulate(it->begin(), it->end(), std::string());
//       clock2.push_back(s);
//   }

//   for (int i = 0; i < side; ++i) {
//     for (int j = 0; j < side; ++j) {
//       std::cout << clock2[i][j] << " ";
//     }
//     std::cout << std::endl;
//   }

  return 0;
}
```