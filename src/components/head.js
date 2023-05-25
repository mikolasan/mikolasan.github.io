import React from "react"

const siteUrl = `https://neupokoev.xyz`
const siteTitle = `Robots, science, gamedev`
const siteDescription = `Magazine, blog and knowledgebase for embedded engineers, game developers and geeks`
const siteImageUrl = `https://neupokoev.xyz/images/preview.jpg`
const siteImageAlt = `A pink printed circuit board (PCB) design made in Autodesk Fusion 360. The board looks like an Arduino shield with some connectors on it. The board is designed for connecting DC motors and sensors to Arduino board.`
const defaultImage = `https://neupokoev.xyz/images/image-7.jpg`
const defaultImageAlt = `Probably no text description for this placeholder picture, but I will work on that`

export const Head = ({ location, params, data, pageContext }) => {
  let metaType = `website`

  const pageUrl = location.pathname // pageContext.url
  if (pageUrl === "/") {
    metaType = `website`
  }
  let checkFrontmatter = data?.markdownRemark?.frontmatter // from blog template
  if (checkFrontmatter) {
    metaType = `article`
  }

  // if (metaType === `website`)
  let url = siteUrl
  let title = siteTitle
  let description = siteDescription
  let image = siteImageUrl
  let imageAlt = siteImageAlt

  if (metaType === `article`) {
    url = `${siteUrl}${pageUrl}`
    title = data?.markdownRemark?.frontmatter?.title
    description = data?.markdownRemark?.frontmatter?.description || `TODO: add description for this article`
    image = data?.markdownRemark?.frontmatter?.featuredImage || defaultImage
    imageAlt = data?.markdownRemark?.frontmatter?.featuredImageAlt || defaultImageAlt
  }
  
  title += ` - N`
  
  // property = RDF / HTML5
  // itemProp = Microdata
  const meta = [
    {
      // https://developers.google.com/search/docs/advanced/robots/robots_meta_tag
      name: `robots`,
      content: `noarchive, max-image-preview:large`,
    },
    {
      name: `author`,
      content: `Nikolay Neupokoev`,
    },
    {
      name: `description`,
      itemProp: `description`,
      property: `og:description`,
      content: description,
    },
    {
      name: `image`,
      itemProp: `image`,
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
      content: url,
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
      content: url,
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
  
  if (metaType === `article`) {
    meta.push({
      property: `og:site_name`,
      content: `Neupokoev XYZ`
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
      {meta.map(({ name, property, itemProp, content }) => (
        <meta name={name} property={property} itemProp={itemProp} content={content} />
      ))}

      {/* <meta name="test input location" content={JSON.stringify(location)} />
      <meta name="test input params" content={JSON.stringify(params)} />
      <meta name="test input data" content={JSON.stringify(data)} />
      <meta name="test input pageContext" content={JSON.stringify(pageContext)} /> */}

      <title>{title}</title>

      <link rel="canonical" href={url} />
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