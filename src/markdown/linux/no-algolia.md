
Everyone else is so hyped about elastic search. I tried it. It's meh.  
It's not clear how to make it not to consume 100% of your memory. Oh yeah, it was designed to take 100% RAM of the container - super obvious, yeah.  
It's not easy to collect only basic CPU and RAM metrics from 50 machines and not exceed 200 GB of that data in 1 month.

What they don't tell, it's just a product built on top of open source project - Apache Lucene

[https://lucene.apache.org/core/10_3_2/index.html](https://lucene.apache.org/core/10_3_2/index.html "https://lucene.apache.org/core/10_3_2/index.html")

Could be a replacement for Algolia.