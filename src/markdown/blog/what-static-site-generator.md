---
date: 2021-11-07
title: What static site generator does this site use?
published: 2021-11-07
lastModified: 2022-08-23
---

I was looking for more flexible static site generator than Jekyll on [Jamstack](https://jamstack.org/generators/). 


## Wordpress

When you think about blogging, first thing pops in your mind is WordPress, right? 

Oh, this platform like a dinosaur - very old and very impressive 🦕 It’s a goto platform for any person who wants to blog with no code. So I think you click-click-click and have everything setup, but of course there are some questions left.

For example, what hosting to choose? Is it possible to transform Wordpress to static website and use a free service like GitHub Pages while running DB locally for CMS?

Good to have a curated list of essential plugins for creating programmer's blog: syntax highlighting, gist embedding, comments, upvoting and Unicorn reactions 🦄,  probably something else ? I’ve heard rumors that some people make money by building plugins for WordPress. Can I afford buying a MacBook Pro if I start writing WordPress plugins today?


## Metalsmith

I actually started my search from the opposite direction: blog, but very light and minimalistic. JavaScript - yes, but minimal. I have read few posts where people were [switching to Metalsmith](https://keetology.com/blog/rebuilding-keetology) and [explaining how to make it](http://blakeembrey.com/articles/2014/09/building-a-blog-with-metalsmith/).

I found curated list of [awesome Metalsmith resources](https://github.com/metalsmith/awesome-metalsmith/blob/master/README.md) and have compiled a list of plugins for myself.

### Plugins

- http://www.metalsmith.io/#the-community-plugins
- https://github.com/davidtimmons/metalsmith-preview A Metalsmith plugin for generating custom text previews.
- https://github.com/jocelynlecomte/metalsmith-series A metalsmith plugin to create series of articles
- https://github.com/anatoo/metalsmith-autotoc A metalsmith plugin for generating table of contents.
- https://github.com/totocaster/metalsmith-tags A metalsmith plugin to create dedicated pages for tags in posts or pages.
- https://github.com/majodev/metalsmith-word-count Metalsmith plugin to compute wordcount / average reading time http://ranf.tl/2014/10/01/extracting-libs-from-a-node-js-project/
- https://github.com/unstoppablecarl/metalsmith-navigation A Metalsmith plugin for navigation.


## Gatsby

Functionally it was okay, but I am a bad designer, so I abandoned Metalsmith. 

Now I use Gatsby for my portfolio. It was easy to setup comparing to Metalsmith. Before I used Jekyll, but it was too static for me. I had a feeling that I was spending more time in Jekyll's docs than really making changes to the site. 

Many things integrated in Jekyll just available as config (pagination, for example). Where in Gatsby I "wrote" my own pagination (just copied from official examples). I would not compare Gatsby vs Jekyll as easy/not easy to setup/configure/adjust to your needs. It seems like I have more freedom with Gatsby. 

I have created the same workflow with markdown files in Gatsby and combined it with React pages.