---
path: "/science/cat-breeds-ontology"
date: "2020-07-11"
title: "Cat breeds ontology"
draft: true
section: science
published: 2020-07-26
lastModified: 2021-10-05
---

First of all, what is an ontology? Does it exist like a file, or a database? Do you need special software to create it? What is the purpose of ontologies, can they do predictions, deductions?

## What is an ontology?

Just read it [here](https://medium.com/sciforce/ontologies-and-semantic-annotation-part-1-what-is-an-ontology-1de10caf2c77).

One quote from there

> We can describe a task of configuring a product from its components according to a required specification and implement a program that does this configuration independent of the products and components themselves.

makes me think that with ontologies one can make an application to make custom PC from what is available on Amazon to fit expected requirements from a game specification.

## Does it exist like a file?

Ontologies will help to structure data not more. But why I cannot use some DB instead?

There are specific formats for ontologies depending in what program it was created.

- RDF - Sparql
- OWL
- TTL - Turtle

## Do you need special software?

From the next [article](https://medium.com/@vindulajayawardana/ontology-generation-and-visualization-with-prot%C3%A9g%C3%A9-6df0af9955e0) we can use [Protégé editor](https://protege.stanford.edu/products.php#desktop-protege) to create an ontology. And [VOWL plugin](http://vowl.visualdataweb.org/protegevowl.html) for it will help us to visualize it in the end.

Also I have found the same functionality in [Mobi](https://mobi.inovexcorp.com/features/#download), [Jena](https://jena.apache.org/tutorials/sparql_optionals.html)

But as a cool guy I need a JS library. So here is an overview https://www.w3.org/community/rdfjs/wiki/Comparison_of_RDFJS_libraries

## What is the purpose?

Professor Robert Stevens [says](http://www.cs.man.ac.uk/~stevensr/menupages/background.php)

> ... an ontology describes those objects and sometimes defines what is needed to be known in order to recognise one of those objects within the information being processed by an application

Recognition you say?

After we create an ontology we can use a query language to finally get benefits from it. For example SPARQL is the query language of the Semantic Web. It lets us:

- Pull values from structured and semi-structured data
- Explore data by querying unknown relationships
- Perform complex joins of disparate databases in a single, simple query
- Transform RDF data from one vocabulary to another

https://www.w3.org/2009/Talks/0615-qbe/

http://www.iro.umontreal.ca/~lapalme/ift6281/sparql-1_1-cheat-sheet.pdf



## Try it now

Here is the plan.

- Make a test query in Sparkl and run it in JS library.


## And more!

Did you know about DBpedia? It is a Large-scale, Multilingual Knowledge Base Extracted from Wikipedia. Check this out http://svn.aksw.org/papers/2013/SWJ_DBpedia/public.pdf
