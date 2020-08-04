---
path: /blog/homebrew-like-system
date: 2020-08-01
title: Homebrew like system
---

I realized that Google Analytics does not give me information that I want to have about my articles.
Plus when I search for a solution in a day to day software developer problems I usually end up on StackOverflow, where I vote up the answer that helped me. Rarely I go to personal blogs, but I had a few examples where content on them was several levels better than I see on StackOverflow. But there is nothing to mark the website as great. I want such feature on my website. 

For every page I am going store votes in the datadase. How to get current page URL in GatsbyJS code?
There is great article [here](https://css-tricks.com/how-to-the-get-current-page-url-in-gatsby/), but it uses function components, while I stick with class-based components ([good article](https://www.robinwieruch.de/react-function-component) about transition between them).

[Solution 2](ttps://github.com/gatsbyjs/gatsby/issues/8787)

But as we live in Node.js world in the search for a simple solution you have to install more and more dependencies fom npm. Here [it is](https://github.com/gatsbyjs/gatsby/issues/8787#issuecomment-427216043) that can be [nicely wrapped](https://stackoverflow.com/a/54288059/1104612) for any component.

To remember user's votes I need to get information from them. Some personal information like their IP address, information about their browser

Get IP address
https://stackoverflow.com/a/35123097/1104612