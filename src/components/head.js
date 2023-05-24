import React from "react"

export const Head = ({ location, params, data, pageContext }) => {
  // data.page.description
  // location.pathname
  const title = pageContext.title
  const defaultImageUrl = "https://neupokoev.xyz/images/preview.jpg";
  const defaultDescription = "Magazine, blog and knowledgebase for embedded engineers, game developers and geeks";
  const siteUrl = "https://neupokoev.xyz"
  const metaDescription = description || defaultDescription
  const defaultTitle = ``
  const metaImage = imageUrl ? `${siteUrl}${imageUrl}` : defaultImageUrl
  const metaUrl = pageUrl ? `${siteUrl}${pageUrl}` : siteUrl
  const meta=[
    {
      // https://developers.google.com/search/docs/advanced/robots/robots_meta_tag
      name: `robots`,
      content: `noarchive, max-image-preview:large`,
    },
    {
      name: `description`,
      content: metaDescription,
    },
    {
      name: `image`,
      content: metaImage,
    },
    {
      property: `og:url`,
      content: metaUrl,
    },
    {
      property: `og:type`,
      content: `article`,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      name: `og:image`,
      content: metaImage,
    },
    {
      name: `twitter:site`,
      content: `@mikolasan`,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:url`,
      content: metaUrl,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: `twitter:image`,
      content: metaImage,
    },
    {
      itemprop: `name`,
      content: title,
    },
    {
      itemprop: `description`,
      content: metaDescription,
    },
    {
      itemprop: `image`,
      content: metaImage,
    },
  ]

  return (
    <>
      {meta.map(({ name, content }) => (
        <meta name={name} content={content} />
      ))}

      <title>{title}</title>

      <link rel="canonical" href={metaUrl} />
      <link href="https://fonts.googleapis.com/css2?family=Literata:wght@700&family=Manrope:wght@300&family=Nunito:wght@300&display=swap" rel="stylesheet" />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>

      {/* Text */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Cardo&display=swap" rel="stylesheet"></link>

      {/* Titles */}
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@600&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Patua+One&display=swap" rel="stylesheet"></link>
    </>
  )
}