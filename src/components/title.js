import React from "react"
import { Helmet } from "react-helmet"

const defaultImageUrl = "https://neupokoev.xyz/images/index-7.jpg";
const defaultDescription = "Software app ideas, game development blog, tips for embedded engineers, DIY projects with Arduino and other geek stuff";

const Title = ({ title, imageUrl, pageUrl, description }) => (
  <Helmet>
    <title>{title}</title>

    {/* <!-- HTML Meta Tags --> */}
    <meta name="description" content={description && description || defaultDescription} />

    {/* <!-- Google / Search Engine Tags --> */}
    <meta itemprop="name" content={title} />
    <meta itemprop="description" content={description && description || defaultDescription} />
    <meta itemprop="image" content={imageUrl ? imageUrl : defaultImageUrl} />

    {/* <!-- Facebook Meta Tags --> */}
    <meta property="og:url" content={pageUrl && pageUrl || "https://neupokoev.xyz"} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description && description || defaultDescription} />
    <meta property="og:image" content={imageUrl && imageUrl || defaultImageUrl} />

    {/* <!-- Twitter Meta Tags --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description && description || defaultDescription} />
    <meta name="twitter:image" content={imageUrl && imageUrl || defaultImageUrl} />

    {/* <!-- Meta Tags Generated via http://heymeta.com --> */}

    <link href="https://fonts.googleapis.com/css2?family=Literata:wght@700&family=Manrope:wght@300&family=Nunito:wght@300&display=swap" rel="stylesheet" />

    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
  </Helmet>
)

export default Title