import React from "react"
import { removeHtmlExtension, removeTrailingSlash } from "../nifty"

const siteUrl = `https://neupokoev.xyz`
const siteName = `N Tech Lab`
const rootTitle = `Robots, science, gamedev`
const siteDescription = `Magazine, blog and knowledge base for embedded engineers, game developers and geeks`
const siteImageUrl = `https://neupokoev.xyz/images/preview.jpg`
const siteImageAlt = `A pink printed circuit board (PCB) design made in Autodesk Fusion 360.
The board looks like an Arduino shield with some connectors on it. 
The board is designed for connecting DC motors and sensors to Arduino board.`
const defaultImage = `https://neupokoev.xyz/images/image-7.jpg`
const defaultImageAlt = `Probably no text description for this placeholder picture, but I will work on that`

export const Head = ({ location, params, data, pageContext }) => {
  const metaType = `website`
  const lang = location.pathname.startsWith("/ru") ? "ru" : "en"
  const pageUrl = location.pathname // pageContext.url
  const pagination = !!pageContext?.baseUrl
  const fromMarkdown = !!data?.markdownRemark?.frontmatter 
  
  let url = siteUrl
  if (pagination) {
    url = `${siteUrl}${pageContext.baseUrl}`
  } else if (pageUrl !== "/") {
    url = `${siteUrl}${pageUrl}`
  }
  const canonicalUrl = removeTrailingSlash(removeHtmlExtension(url))

  let title = rootTitle
  let description = siteDescription
  let image = siteImageUrl
  let imageAlt = siteImageAlt
  // from blog template
  if (pagination) {
    title = pageContext.title
  } else if (fromMarkdown) {
    title = data?.markdownRemark?.frontmatter?.title
    description = data?.markdownRemark?.frontmatter?.description || `TODO: add description for this article`
    image = data?.markdownRemark?.frontmatter?.featuredImage || defaultImage
    imageAlt = data?.markdownRemark?.frontmatter?.featuredImageAlt || defaultImageAlt
  }
  
  title += ` - ${siteName}`
  
  // property = RDF / HTML5
  // itemProp = Microdata
  const meta = [
    {
      name: `author`,
      content: `Nikolay Neupokoev`,
    },
    {
      name: `description`,
      itemProp: `description`,
      content: description,
    },
    {
      name: `image`,
      itemProp: `image`,
      content: image,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:image`,
      content: image,
    },
    {
      property: `og:image:alt`,
      content: imageAlt
    },
    {
      property: `og:locale`,
      content: `en_US`,
    },
    {
      itemProp: `name`,
      property: `og:title`,
      content: title,
    },
    {
      property: `og:type`,
      content: metaType,
    },
    {
      property: `og:url`,
      content: canonicalUrl,
    },
    // Twitter cards use `name` and `content`.
    // Though Twitter’s parser will fall back to using `property` and `content`
    // https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started
    {
      name: `twitter:creator`,
      content: `@mikolasan`,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:url`,
      content: canonicalUrl,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
    {
      name: `twitter:image`,
      content: image,
    },
  ]

  if (pagination) {
    meta.push({
      name: `robots`,
      content: `noindex`
    })
  } else {
    meta.push({
      // https://developers.google.com/search/docs/advanced/robots/robots_meta_tag
      name: `robots`,
      content: `noarchive, max-image-preview:large`,
    })
  }

  if (pageUrl !== "/") {
    meta.push({
      property: `og:site_name`,
      content: siteName
    })
  }

  // TODO:
  // article:published_time - datetime - When the article was first published.
  // article:modified_time - datetime - When the article was last changed.
  // article:expiration_time - datetime - When the article is out of date after.
  // article:author - profile array - Writers of the article.
  // article:section - string - A high-level section name. E.g. Technology
  // article:tag - string array - Tag words associated with this article.

  return (
    <>
      <html lang={lang} />

      {meta.map(({ name, property, itemProp, content }, i) => (
        <meta 
          key={i}
          name={name}
          property={property}
          itemProp={itemProp}
          content={content}
        />
      ))}

      {/* <meta name="test input location" content={JSON.stringify(location)} />
      <meta name="test input params" content={JSON.stringify(params)} />
      <meta name="test input data" content={JSON.stringify(data)} />
      <meta name="test input pageContext" content={JSON.stringify(pageContext)} /> */}

      <title>{title}</title>

      <link rel="canonical" href={canonicalUrl} />
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300&display=swap" rel="stylesheet" />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>

      {/* Text */}
      <link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap" rel="stylesheet"></link>

      {/* Titles */}
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@600&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap" rel="stylesheet"></link>
    </>
  )
}