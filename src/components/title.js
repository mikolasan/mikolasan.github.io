import React from "react"
import { Helmet } from "react-helmet"

const Title = ({ title}) => (
  <Helmet>
    <title>{title}</title>

    {/* <!-- HTML Meta Tags --> */}
    <meta name="description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />

    {/* <!-- Google / Search Engine Tags --> */}
    <meta itemprop="name" content="Developer, traveler, snob - Nikolay Neupokoev" />
    <meta itemprop="description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />
    <meta itemprop="image" content="https://mikolasan.github.io/images/index-7.jpg" />

    {/* <!-- Facebook Meta Tags --> */}
    <meta property="og:url" content="https://mikolasan.github.io" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Developer, traveler, snob - Nikolay Neupokoev" />
    <meta property="og:description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />
    <meta property="og:image" content="https://mikolasan.github.io/images/index-7.jpg" />

    {/* <!-- Twitter Meta Tags --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Developer, traveler, snob - Nikolay Neupokoev" />
    <meta name="twitter:description" content="Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other nerdy stuff" />
    <meta name="twitter:image" content="https://mikolasan.github.io/images/index-7.jpg" />

    {/* <!-- Meta Tags Generated via http://heymeta.com --> */}

    <link href="https://fonts.googleapis.com/css2?family=Literata:wght@700&family=Manrope:wght@300&family=Nunito:wght@300&display=swap" rel="stylesheet" />
  </Helmet>
)

export default Title