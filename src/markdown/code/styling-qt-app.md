---
path: /blog/styling-qt-app
date: 2021-07-23
title: Styling Qt app
published: 2021-10-14
lastModified: 2021-10-14
---

You have few approaches for styling your Qt app.

## QSS Stylesheet

### Reference

- https://doc.qt.io/archives/qt-4.8/stylesheet-reference.html#border-style-prop
- https://doc.qt.io/archives/qt-4.8/stylesheet-reference.html#spacing-prop

### Examples

- https://doc.qt.io/archives/qt-4.8/stylesheet-examples.html#customizing-qlistview
- https://doc.qt.io/qt-5/qtwidgets-itemviews-stardelegate-example.html
- https://programmer.help/blogs/use-style-sheet-qss-in-qtoolbar-to-set-three-state-qtoolbutton-button.html

QListView was a tough one

- http://qtcoder.blogspot.com/2019/04/qtreeview-items-spacing.html
- https://stackoverflow.com/questions/38418402/align-icons-and-text-in-qlistview-centered

I will need to review my code, because I have managed to make a decent layout, but not sure if it addresses problems from the above links.

## Custom widget

And if nothing works from stylesheets, then just create a new widget. It's not that hard as you may think.

https://zetcode.com/gui/qt5/customwidget/

