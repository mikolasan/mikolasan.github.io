---
date: 2022-07-31
title: Graph of inbound links
published: 2022-08-22
lastModified: 2022-08-22
---

I'm having a depression and I've been working on my website this weekend 😑 I post different stuff, but it definitely lacks interconnections. I'm going to visialize the current situation and later I will use it as a site map (something like a brain map, but for navigation).

Thus we need to find all links on the home page, filter them and keep only the ones that point to another pages of our site, but not any that lead us outside. Then use the list of links from the home page and on every page repeat the same thing. Sometimes links will direct us back to the home page, or to another page that we already visited on the step before - remember such things otherwise we will go circles. 


## Scraping

I was thinking do crawl my site [with JavaScript](https://github.com/rchipka/node-osmosis) first, but then looked on API and changed my mind. 

I'm building a graph of interlinks, using **Scrapy** for that. I found something interesting about [generators in Python](/code/generators-in-python). After such experiments one can better understand the example from scrapy's main page. 

![Scrapy's home page](./scrapy-home-page.png)

I'd recommend to ignore it. Instead go to [the docs](https://docs.scrapy.org/en/latest/intro/tutorial.html#our-first-spider) and run a spider [from a script](https://docs.scrapy.org/en/latest/topics/practices.html#run-scrapy-from-a-script)

Note: about text response https://docs.scrapy.org/en/latest/topics/request-response.html?highlight=htmlresponse#scrapy.http.TextResponse


## Drawing

In [my historical unit converter app](/projects/imperial-russia) I used [GraphStream](https://graphstream-project.org/). Nevertheless for drawing here we are going to use a JS library. There are so many of them, and I don't have any preference, so my choice it more or less random here.

It's goint to be **Cytoscape**.

I check [their examples](https://github.com/cytoscape/cytoscape.js-popper/blob/master/demo.html) and from there I see how the result should be formatted on its way of recursive search

I found 9017 nodes, 8703 edges, total of 17720 elements. It took Cytoscape 4 minutes in the browser (on the client) to draw the graph

![data prepared for js library](./graph-data.png)

After a little bit of cleaning of my algorithm and fixing dozens of broken links, I clearly see 3 clusters. Also pagination makes very strong connections, which should be replaced by categories.

![graph representation where you see how links on my website form 3 distinct clusters](./graph-links-between-pages.png)