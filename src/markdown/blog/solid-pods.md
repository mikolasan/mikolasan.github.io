---
date: 2023-05-05
title: Solid pods
published: 2023-05-05
lastModified: 2023-05-05
twitter: https://twitter.com/mikolasan/status/1654727941308452866
---

I studied Solid Pods carefully yesterday and I don't like what I found.

First I don't see C/C++/Rust implementation of [Solid servers](https://solidproject.org//self-hosting/css). I see some ([solid.rs (Rust)](https://github.com/open-marketplace-applications/solid.rs), [RawPod (C)](https://github.com/SpectralCascade/RawPod)), but there is no finished one. At the very least Java or Go can work too. ([Java client](https://github.com/crmepham/solid-java-client))

Adding _decentralized_ in the description, they just throw dust in your eyes. Pods use the same old shitty Internet, no magic.

Another main selling point is _privacy_. We can store our data where we want, not at some Google's data center. And we decide who can access it.

Okay, this sounds interesting. But it means that I need to buy more drives, connect them in a RAID array and make backups every month. I probably will install Btrfs* for that. (* I [still remember](/linux/important-lesson-about-btrfs) how I installed OpenSuse on our new server and... PostgreSQL. All good, but Btrfs uses 'copy on write' which means that performance degrades drastically when some application like a DB starts writing like crazy. And we used spinners. And in addition to that OpenSuse had a hidden timer to start hard filesystem check every Saturday night in the end of month. You know what, I want to find that developer and look him in the eye…)

Maybe "our data" is not so important and we can neglect all precautions. But anyway, I don't think that the Solid architecture improves user's privacy. We store data, but when some application want to operate with the data, we give it access. When the app receives our data, how can we control what the app can do with it? Can it share our data with someone else? Can it save a copy of our data?

To improve privacy we must design applications in a new way. Applications may be permitted to provide services in compiled form, but these functions will be executed in some local limited containers. Containers will have access to our data, but the app can only compute a result that can be displayed locally (or shared if we are fancy). This way data definitely will not leave our sandbox. This way we are talking about privacy. Other approaches are only imitation.

So what not-decentralized, not-protecting-privacy Pod is?

It's a storage of data in RDF format. What is this cool format? you ask. In short, if you are amused how people still use XML, then meet your future - more bloated format without any justification of its advantages.

And about security (encryption of our data). TLS is not enough. I want this RDF-type-of-crap to be encrypted preferably in a way supported by the specification and not just on the end-sides.

I honestly don't understand prefixes. And purpose of URLs (URI, IRI, whatever) too. This makes sense if I create a clone of Wikipedia where all cross-references build relations. But let's say I have some files on a Solid Pod. IRI represents either object, subject or relationship. These files = my data = RDF nodes. Do I need to specify relations?

> Where in a pod should I store [this particular piece of] data? = How does the way we write data impact others’ ability to reuse that data?
> 
> [Let’s talk about pods](https://ruben.verborgh.org/blog/2022/12/30/lets-talk-about-pods/) by Ruben Verborgh


The following two examples show where I see RDF format to be relevant

**Example 1.** A city could use RDF data to represent various aspects of urban life, such as traffic patterns, energy usage, public safety, and social services. By using RDF, the city could integrate data from different sources and systems, such as sensor networks, social media, and city databases. This integrated data could be used to create smart city applications that improve the quality of life for residents, such as traffic management systems, energy optimization tools, and emergency response systems.

**Example 2.** A cat owner could use RDF data to represent various aspects of feline life, such as hunting patterns, food preferences, health conditions, and social interactions. By using RDF, the cat owner could integrate data from different sources and systems, such as GPS trackers, cat food reviews, veterinary records, and online forums. This integrated data could be used to create smart cat applications that improve the quality of life for cats, such as prey detection systems, food recommendation tools, and wellness monitoring systems.

To be concluded...