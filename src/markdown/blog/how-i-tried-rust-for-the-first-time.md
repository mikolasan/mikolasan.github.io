---
title: How I tried Rust for the first time
date: 2022-07-19
draft: true
---


# Get the books

There are many online books about Rust. Here is my top 5:

1. [The Book](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html) - start here
2. [Rust by example](https://doc.rust-lang.org/rust-by-example/std/result/question_mark.html) - the same concepts from the book, but oriented more to practice examples
3. [Cookbook](https://rust-lang-nursery.github.io/rust-cookbook/file/read-write.html) - about using crates in real life problems, solutions, best practices
4. [Rustonomicon](https://doc.rust-lang.org/nomicon/send-and-sync.html) - when you are ready for something spicy
5. [Learning Rust](https://learning-rust.github.io/docs/e6.combinators.html#ok-or-and-ok-or-else) - back to origin


# Have a fun project

It's never late to get a grasp on another programming language

One cheesy project pop into my head—I must do it. I believe that it boils down into several small tasks. Think about each of them as solving kata.
I [opened replit](https://replit.com/@stakanmartini/GithubBrush#src/main.rs) and start experimenting

At the first day I learned basic types and control flow.

I installed Rust on Windows, first time in years updated MSYS2 retrying many times until I updated the keyring, I installed cairo, and when I decided to tweet about it, Twitter went down!


... a few weeks later ...

I [finished my project](/projects/github-activity-brush). I like how the code looks. I was afraid that it will be mix of Ruby with Java call chaining, but it actually look very neat. HTTP requests do not take many lines, it's far from monstrosity in Java. All json conversion back and forth is seamless.


# Other links to sort

- https://stackoverflow.com/questions/1710922/how-to-install-pkg-config-in-windows
- https://sourceforge.net/projects/pkgconfiglite/
- https://github.com/msys2/MSYS2-packages/issues/2343
- https://www.gtk.org/docs/installations/windows/#using-gtk-from-msys2-packages
- https://rust-analyzer.github.io/manual.html#rust-analyzer-language-server-binary
- https://gist.github.com/ChrisWellsWood/84421854794037e760808d5d97d21421
- https://gtk-rs.org/gtk-rs-core/stable/latest/docs/cairo_sys/constant.STATUS_WRITE_ERROR.html?search=
- https://doc.rust-lang.org/cargo/reference/features.html
- https://stevedonovan.github.io/rustifications/2018/08/13/using-rust-like-c.html
- https://tokio.rs/tokio/tutorial/spawning
- raw pointers https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/raw-pointers.html
- more about ffi https://blog.guillaume-gomez.fr/articles/2021-07-29+Interacting+with+data+from+FFI+in+Rust
- https://imolodetskikh.wordpress.com/2018/07/16/gsoc-2018-safe-shared-access-to-cairo-image-surfaces/
- https://github.com/rayon-rs/rayon
- https://smallcultfollowing.com/babysteps/blog/2015/12/18/rayon-data-parallelism-in-rust/
- Rust cheatsheet ?
- idiomatic Rust for handling Result as return value
- https://learning-rust.github.io/docs/e6.combinators.html#ok-or-and-ok-or-else
- https://programming-idioms.org/

## Cairo alternatives

- https://crates.io/crates/cairo-rs
- https://docs.rs/embedded-graphics/0.5.0/embedded_graphics/
- https://github.com/image-rs/imageproc
- https://github.com/image-rs/imageproc/blob/master/examples/font.rs


## c/c++ code cairo examples

- https://zetcode.com/gfx/cairo/cairotext/
- https://cairographics.org/tutorial/#L1understandingtext
- https://cpp.hotexamples.com/site/file?hash=0x93852e41a43231ccbb8588101a712592ffc7cc49c9fb67b4a5f34c8fb22bc301&fullName=Gadgets-master/deps/cairo/imagediff.c&project=jwmcglynn/Gadgets



## Iterators

- https://aloso.github.io/2021/03/09/creating-an-iterator
- https://depth-first.com/articles/2020/06/22/returning-rust-iterators/
- https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#device-flow
- https://docs.github.com/en/rest/repos/repos#delete-a-repository
