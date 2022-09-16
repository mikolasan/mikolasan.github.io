---
title: Programs that rewrite themselves
date: 2022-09-08
---

In computer science there’s an interesting exercise when you need to make a program that prints itself. In similar manner what about programs that can change themselves?


> I would like to see a non-trivial self-referencing program. That is, a program that can change itself, but its main purpose is NOT doing that...
>
> [Jorge Romero](https://twitter.com/jrlgs/status/1568728524688687107)


Researchers are talking about AI systems but we even haven’t established practices to allow programs alter its code.

I know that the first example that comes to mind is malware. It’s the malware that changes other programs and itself.


> I love Morphic, which is the GUI for smalltalk, but, all the companies loved the OOP in Smalltalk but couldn't do vendor-lockin, thats why c++ boomed, its compiled, no source code, opposed to Smalltalk. So, how can a program modify itself if the sourcecode isnt included ?
>
> [Mohamad Bo Hamad](https://twitter.com/mohjb/status/1568763661195550720)

Smalltalk doesn't have source files 😱 it's compiled into bytecode, but it has reflection which allows to do magic at runtime.

When we deal with machine code, then the field for change is narrow, but it's still possible. This is how all cracks work: they override few instructions that check for a license and redirect to the successful output from the function.


> Self-modifying code was a big proponent in older game copy protection and DRMs. These were super non-trivial and a right mess.
>
> [Matt Jones](https://twitter.com/RubyNovaDev/status/1568762754533564417)


I’d like to defend rights of amok programs. They should be allowed to run at least in containers. Like a zoo of peculiar apps.


Not sure how good this advice is, but if you want hard to hack security, then implement algo that’s not in a wide use. For example ramfs can be compressed with xz, lzma, zstd. If you add custom compression algo to the kernel then no one will have a clue how to unpack such ramfs.