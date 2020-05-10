import React from "react"
import { graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Layout from "../components/layout"
import FeaturedImage from "../components/featuredImage"
import styles from "./blogTemplate.module.css"

export default function Template ({ data, pageContext, location }) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const {
    breadcrumb: { crumbs },
  } = pageContext
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
      <FeaturedImage imgFluid={featuredImgFluid} />
      <section>
        <div className={styles.breadcrumbs}>
          <Breadcrumb
            crumbs={crumbs}
            crumbSeparator=">"
            title="//"
          />
        </div>
        <h1>{frontmatter.title}</h1>
        <p className={styles.postedon}>{frontmatter.date}</p>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        featuredImage {
          childImageSharp {
            fluid(
              srcSetBreakpoints: [576, 768, 922],
              maxHeight: 400,
              maxWidth: 1400,
              cropFocus: ATTENTION,
              fit: COVER,
              duotone: {
                highlight: "#f2f2f2",
                shadow: "#211a1d"
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
