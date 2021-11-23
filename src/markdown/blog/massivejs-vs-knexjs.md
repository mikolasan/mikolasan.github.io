---
path: /blog/massivejs-vs-knexjs
date: 2021-06-23
title: Massive.js vs knex.js
twitter: https://twitter.com/mikolasan/status/1407645468042145796
tags: ["JavaScript"]
published: 2021-10-14
lastModified: 2021-10-14
---

In the field of ORM's for JavaScript there is a dominance of knex.js and Objection.js, don't you think?  

In this thread I have few arguments that convinced me to use Massive.js.

## Supportet DB

"Write code once, and then it works with any DB". It is very alluring promise. But different DBs, not like different flavors of coffee. They can have some unique quirks: types, statements, stored procedure languages, jsonb.

So tell me any reason why not to use PostgreSQL?

## Documentation

knex.js and Objection.js both have extensive docs, many examples. With Massive.js they are a little bit scattered:

- http://massivejs.org
- http://massive-js.readthedocs.io
- search in comments https://gitlab.com/dmfay/massive-js/-/issues

## API

Personally I feel Massive.js fits nicely into my JavaScript code, whereas knex.js heavily uses Java-style chains.

## Table creation and migrations

Do not use ORM for this purpose. This is another huge topic about automatic database migration with CI/CD, and the answer is out there.

## Bonus

Do you like blazing fast prototyping with MongoDB? So do I. But do you know that Massive.js provides similar interface while it's still working with PostgreSQL under the hood? Check out section "Working with documents" in the docs.