import React from "react"
import { removeHtmlExtension, removeTrailingSlash } from "../nifty"

const siteUrl = `https://neupokoev.xyz`
const siteDescription = `Magazine, blog and knowledge base for embedded engineers, game developers and geeks`
const siteImageAlt = `A pink printed circuit board (PCB) design made in Autodesk Fusion 360.
The board looks like an Arduino shield with some connectors on it. 
The board is designed for connecting DC motors and sensors to Arduino board.`
const defaultImage = `https://neupokoev.xyz/images/image-7.jpg`
const defaultImageAlt = `Probably no text description for this placeholder picture, but I will work on that`

export const SEO = ({ children, path, data, frontmatter, pageContext, title }) => {
  const metaType = `website`
  const lang = path.startsWith("/ru") ? "ru" : "en"
  const pagination = !!pageContext?.baseUrl // noindex, canonical to main
  const sourceMarkdown = !!frontmatter // other source - JS pages
  // const frontmatter = data?.markdownRemark?.frontmatter
  const socialCard = data?.markdownRemark?.fields?.socialcard
  let description = siteDescription
  let image = !!socialCard ? `${siteUrl}/${socialCard}` : defaultImage
  let imageAlt = siteImageAlt
  // from blog template
  if (pagination) {
    title = pageContext.title
  } else if (sourceMarkdown) {
    title = frontmatter.title
    description = frontmatter.description || `TODO: add description for this article`
    imageAlt = frontmatter.featuredImageAlt || defaultImageAlt
  }

  let root = removeHtmlExtension(path) === "/"
  let siteName = `N | Robots Science Gamedev`
  let author = `Nikolay Neupokoev`
  
  if (lang === `ru`) {
    root = removeTrailingSlash(removeHtmlExtension(path)) === "/ru"
    siteName = `Лаборатория Н`
    author = `Николай Неупокоев`
  }
  
  let url = siteUrl
  if (pagination) {
    url = `${siteUrl}${pageContext.baseUrl}`
  } else if (path !== "/") {
    url = `${siteUrl}${path}`
  }

  if (Object.hasOwn(pageContext, "currentPage") && pageContext.currentPage > 1) {
    title += ` - Page ${pageContext.currentPage}`
  }
  title += ` - ${siteName}`

  const canonicalUrl = removeTrailingSlash(removeHtmlExtension(url))
  
  // property = RDF / HTML5
  // itemProp = Microdata
  const meta = [
    { name: `author`, content: author },
    { name: `description`, itemProp: `description`, content: description },
    { name: `image`, itemProp: `image`, content: image },
    { property: `og:description`, content: description },
    { property: `og:image`, content: image },
    { property: `og:image:alt`, content: imageAlt },
    { property: `og:locale`, content: `en_US` },
    { property: `og:title`, itemProp: `name`, content: title },
    { property: `og:type`, content: metaType },
    { property: `og:url`, content: canonicalUrl },
    // Twitter cards use `name` and `content`.
    // Though Twitter’s parser will fall back to using `property` and `content`
    // https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started
    { name: `twitter:creator`, content: `@mikolasan` },
    { name: `twitter:card`, content: image ? `summary_large_image` : `summary` },
    { name: `twitter:url`, content: canonicalUrl },
    { name: `twitter:title`, content: title },
    { name: `twitter:description`, content: description },
    { name: `twitter:image`, content: image },
    { name: `twitter:image:alt`, content: imageAlt },

    { name: `fediverse:creator`, content: `@mikolasan@mastodon.social` },
  ]

  if (pagination) {
    meta.push({ name: `robots`, content: `noindex`})
  } else {
    // https://developers.google.com/search/docs/advanced/robots/robots_meta_tag
    meta.push({ name: `robots`, content: `noarchive, max-image-preview:large` })
  }

  if (!root) {
    meta.push({ property: `og:site_name`, content: siteName })
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

      <title>{title}</title>

      <link rel="canonical" href={canonicalUrl} />

      <script defer src="https://cloud.umami.is/script.js" data-website-id="f315aad6-83df-4cfe-aa66-8322fce95327"></script>
      
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>

      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;700&display=swap" rel="stylesheet" />
      
      {/* Text */}
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap" rel="stylesheet"></link>

      {/* Titles */}
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@600&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap" rel="stylesheet"></link>
         
      {children}
    </>
  )
}