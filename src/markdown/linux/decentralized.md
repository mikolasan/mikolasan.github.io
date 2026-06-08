---
title: Decentralized World
date: 2025-12-01
published: 2025-12-01
lastModified: 2025-12-01
---
I have read a description how we can make web usable again from [Charlotte Aten](https://mathstodon.xyz/@caten/115578447741419733):

> Here's a totally off-the-cuff pitch for the [#p2p](https://cupoftea.social/tags/p2p) web: I just want to be able to load a webpage from a [#bittorrent](https://cupoftea.social/tags/bittorrent) swarm by leeching, and then click an "I approve" button if it looks non-sketchy and I want to seed the page. I want to bookmark magnet links to make human-readable URLs and allow collisions between actual names/content to be decided socially (e.g. click to accept a new version of this page from this new swarm). I don't want a bunch of new protocols. No [#crypto](https://cupoftea.social/tags/crypto) for domain names or donations. No vibe-coded corporate-sponsored AI BS. No [#GitHub](https://cupoftea.social/tags/GitHub) repos. Just give me the wild west with everything visible and no default seeding so that bad actors don't bother with it so much. Run it through a [#VPN](https://cupoftea.social/tags/VPN) or something if you want privacy.


When I discussed with Tony the new web, he had a vision of secure and fast web. He was thinking about direct connections provided by new routers that by default use IPv6 and then we will not need to worry about silly NAT traversal. He also believed into Solid Pods - a weird thing the creator of HTTP proposed for giving users the control over their data. For me it's weird because of two things. First, the querying protocol. It's not something modern. It's very old, very XML-like protocol used in some symbolic machine learning where researchers tried to materialize relations between objects and concepts, in other words, give textual representation to connections that only 


- Decentralized websites - [ZeroNet](https://github.com/HelloZeroNet/ZeroNet?tab=readme-ov-file)
- Chats (instant messages) - XMPP
	- [RFCs](https://xmpp.org/rfcs/#6120)
	- [awesome](https://github.com/bluszcz/awesome-xmpp?tab=readme-ov-file)
	- No Rust server? :( [One that seems fast and good for small usage](https://docs.ejabberd.im/admin/configuration/file-format/#yaml-file-format)
	- end-to-end encryption is not standardized? Deferred extension document [XEP-0416](https://xmpp.org/extensions/xep-0416.html)
- Torrents in web browsers - https://webtorrent.io/
- Decentralized git (mainly repository search) - [tangled](https://tangled.sh/) (new url? https://tangled.org/)
- Social networks - fediverse. [Top Instances by Number of Emotes](https://emotes.cc/toplist)
- I found out about P2P encrypted chat [Tox](https://tox.chat/faq.html) that uses DHT (Distributed Hash Tables) to find peers behind NAT using [Kademlia](https://codethechange.stanford.edu/guides/guide_kademlia.html) (something about search trees)
- [Parallel file system lustre](https://www.lustre.org/) - probably a bit off, but it fits the topic of Internet and compute
- Though the alternative Internet is _gemini_ (not Gemini from Google). Although not many browsers support it (lol, gemini is kinda like a restricted version of HTTP, where it's restricted on purpose). Example in our normal browser - https://warmedal.se/~wobbly/