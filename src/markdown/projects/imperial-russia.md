---
date: 2020-03-26
title: "Imperial Russia: Historic unit converter"
tags:
  - mobile
  - kotlin
featuredImage: imperial-russia-screen.png
coverImage: imperial-russia.jpg
published: 2020-03-27
lastModified: 2021-10-13
---

**Imerial Russia** is a historic unit converter app for Android. It also includes simple arithmetic calculator. Written in Kotlin. Minimum supported Android version is 4.4.

![Russian landscape](./imperial-russia-feature.png)


## Roadmap

- Another unit types: volume, weight
- Slavic calendar
- ...

## Download

<a href="https://play.google.com/store/apps/details?id=io.github.mikolasan.imperialrussia">
<img alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" height="80">
</a>


## About

If you are reading a literary book about 18th century, or studying history, or you feel limited with the standard units of measurements, or by any other means find yourself curious about historic units used one or two centuries ago, like when it was time of Russian Empire, then this app might take you interest.

Jump into the new world measured by arshin, versta, sazhen. Measure like Russian.


## Privacy policy

See [this privacy policy](https://neupokoev.xyz/projects/imperial-russia/privacy-policy) for details.


## For developers

### Architecture

- [Kotlin](https://kotlinlang.org/)
- [KotlinPoet](https://square.github.io/kotlinpoet/) for genereting complete graph of conversions
- ViewPager
- RecyclerView
- Simple [recursive descent parser](https://en.wikipedia.org/wiki/Recursive_descent_parser) in the calculator
- SharedPreferences for persistancy
- [Markwon](https://noties.io/Markwon/) Markdown library without WebView requirement
- [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) used in the Main Activity. Child fragments call method in the activity and depending on the layout if other fragments exist, then the message will be delivered to them.
- Different layouts: landscape (no main panels), tablet landscape (additional info panel), portrait, spacious portrait (additional info panel). Smart watch and auto layouts are in the roadmap.


## Next

Apply [this tutorial](https://jakewharton.com/shrinking-a-kotlin-binary/) to reduce the app size.