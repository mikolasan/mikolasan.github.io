---
date: 2021-11-07
title: Blog with Metalsmith 
published: 2021-11-07
lastModified: 2021-11-07
---

I was looking for more flexible static site generator than Jekyll on [Jamstack](https://jamstack.org/generators/). Also I have read few posts where people were [switching to Metalsmith](https://keetology.com/blog/rebuilding-keetology) and [explaining how to mak it](http://blakeembrey.com/articles/2014/09/building-a-blog-with-metalsmith/).


## Metalsmith

A curated list of awesome Metalsmith resources. https://github.com/metalsmith/awesome-metalsmith/blob/master/README.md 

http://www.metalsmith.io/#the-community-plugins

### Plugins

- https://github.com/davidtimmons/metalsmith-preview A Metalsmith plugin for generating custom text previews.
- https://github.com/jocelynlecomte/metalsmith-series A metalsmith plugin to create series of articles
- https://github.com/anatoo/metalsmith-autotoc A metalsmith plugin for generating table of contents.
- https://github.com/totocaster/metalsmith-tags A metalsmith plugin to create dedicated pages for tags in posts or pages.
- https://github.com/majodev/metalsmith-word-count Metalsmith plugin to compute wordcount / average reading time http://ranf.tl/2014/10/01/extracting-libs-from-a-node-js-project/
- https://github.com/unstoppablecarl/metalsmith-navigation A Metalsmith plugin for navigation.


## Conclusion

Functionally it was okay, but I am a bad designer, so I abandoned Metalsmith. 

Now I use Gatsby for my portfolio. It was easy to setup comparing to Metalsmith. Before I used Jekyll, but it was too static for me. I had a feeling that I was spending more time in Jekyll's docs than really making changes to the site. 

Many things integrated in Jekyll just available as config (pagination, for example). Where in Gatsby I "wrote" my own pagination (just copied from official examples). I would not compare Gatsby vs Jekyll as easy/not easy to setup/configure/adjust to your needs. It seems like I have more freedom with Gatsby. 

I have created the same workflow with markdown files in Gatsby and combined it with React pages.