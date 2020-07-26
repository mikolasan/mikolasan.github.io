import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/ruLayout"
import FeaturedImage from "../components/featuredImage"
import Banner from "../components/banner"
import styles from "./blogTemplate.module.css"

export default function Template ({ data, pageContext, location }) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  let featuredImgFluid = null;
  if (frontmatter.featuredImage) {
    featuredImgFluid = frontmatter.featuredImage.childImageSharp.fluid
  }
  const linkPath = frontmatter.path
  let anotherLanguageLink = ''
  let languageName = ''
  if (linkPath.includes('/ru/blog')) {
    anotherLanguageLink = '/blog'
    languageName = "Switch to english version"
  } else if (linkPath.includes('/blog')) {
    anotherLanguageLink = '/ru/blog'
    languageName = "Switch to russian version"
  } else if (linkPath.includes('/ru')) {
    anotherLanguageLink = linkPath.replace('/ru', '/')
    languageName = "Switch to english version"
  } else {
    anotherLanguageLink = '/ru' + linkPath
    languageName = "Switch to russian version"
  }
  return (
    <Layout languageName={languageName} anotherLanguageLink={anotherLanguageLink}>
      {featuredImgFluid
        && (<FeaturedImage imgFluid={featuredImgFluid} />)
        || (<Banner><h1>{frontmatter.title}</h1><p dangerouslySetInnerHTML={{ __html: frontmatter.subtitle }} /></Banner>)
      }
      <section>
        {featuredImgFluid && (<h1>{frontmatter.title}</h1>)}
        <p className={styles.postedon}>{frontmatter.date}</p>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query RuBlogQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        subtitle
        featuredImage {
          childImageSharp {
            fluid(
              srcSetBreakpoints: [576, 768, 922],
              maxHeight: 400,
              maxWidth: 1400,
              cropFocus: ATTENTION,
              fit: COVER,
              duotone: {
                highlight: "#4B5043",
                shadow: "#211A1D"
              },
              quality: 100
            ) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
