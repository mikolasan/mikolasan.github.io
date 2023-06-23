---
title: Sudoku 16x16
date: 2020-03-26
published: 2020-05-17
lastModified: 2023-06-21
featuredImage: sudoku-game-2.png
previewImage: sudoku-game-2.png
---

Today I want to talk about sudoku 16x16, a variation of the popular logic puzzle game that uses a larger grid size. If you are a fan of sudoku 9x9, you might be curious about what sudoku 16x16 has to offer. Let me tell you some of the challenges and benefits of playing this game, as well as some of the issues that developers face when creating sudoku 16x16 apps for mobile devices.

![Game screen](./sudoku-game-2.png)

## 9x9 VS 16x16

First of all, sudoku 16x16 is more difficult than sudoku 9x9, because it has more cells to fill in and more possible values to choose from. Instead of using digits from 1 to 9, sudoku 16x16 uses digits from 1 to 9 and letters from A to G, but digits from 1 to 16 also popular. Anyway, you have to pay more attention to the symbols and their positions in the grid. You also have to use more advanced strategies and techniques to solve the puzzle, such as x-wing, swordfish, [coloring](https://www.taupierbw.be/SudokuCoach/SC_SimpleColoring.shtml), and so on.

Secondly, sudoku 16x16 can also be more fun and enjoyable than sudoku 9x9, because it offers more variety and diversity. You can find different types of sudoku 16x16 puzzles, such as diagonal sudoku, killer sudoku, samurai sudoku, and so on. These puzzles have additional rules and constraints that make them more interesting and complex.

Thirdly, sudoku 16x16 poses some challenges for developers who want to [create apps for mobile devices](/blog/android-development-for-starters). One of the main problems is how to fit a large grid on a small screen without compromising the readability and usability. Developers have to find ways to optimize the layout, the font size, the contrast, and the zooming features of their apps. And as always, they have to consider how to make their apps compatible with different screen sizes and resolutions. Sudoku 16x16 apps require more design and development efforts than sudoku 9x9 apps.

## Developer's questions

When I decided to write sudoku 16x16 in Godot I've got many implementation related questions such as

- Does it have $16\times 16=256$ buttons?
- Does it save each player's step?
- Does it generate puzzles, or download them from the server?
- Is it possible to rate puzzles?
- What features are available to help solving this gigantic puzzles?



## My app

![Menu screen](./sudoku-menu-1.png)

Where to get it? It is not yet published to Play Store or App Store, because...

- it is possible to see numbers only on big screens like tablets, but I want to support all resolutions;
- there is no icon that correlates with game design;

and it is not open sourced, because...

- private repositories on Bitbucket are free;
- private repositories on GitHub are free too.


## Conclusion

In conclusion, sudoku 16x16 is not for everyone, but it is definitely worth a try if you are looking for a new challenge.

I [tried to finish my app](https://twitter.com/mikolasan/status/1486754571779203084), but stuck with a liquid blood shader...

Check out [my another puzzle game](/gamedev/overload-godot) in Godot instead. Or [this card game](/gamedev/evolution-card-game).