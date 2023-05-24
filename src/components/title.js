import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

const defaultImageUrl = "https://neupokoev.xyz/images/preview.jpg";
const defaultDescription = "Magazine, blog and knowledgebase for embedded engineers, game developers and geeks";
const siteUrl = "https://neupokoev.xyz"

const Title = ({ title, lang, imageUrl, pageUrl, description, meta }) => {
  const metaDescription = description || defaultDescription
  const defaultTitle = ``
  const metaImage = imageUrl ? `${siteUrl}${imageUrl}` : defaultImageUrl
  const metaUrl = pageUrl ? `${siteUrl}${pageUrl}` : siteUrl

  return (
    <Helmet 
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
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
      ].concat(meta)}
    >
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
    </Helmet>
  )
}

Title.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  lang: PropTypes.string,
  imageUrl: PropTypes.string,
  pageUrl: PropTypes.string,
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
}

export default Title