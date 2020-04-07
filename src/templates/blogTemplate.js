import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Layout from "../components/layout"
import styles from "./blogTemplate.module.css"

export default function Template ({ data, pageContext, location }) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const {
    breadcrumb: { crumbs },
  } = pageContext
  const { frontmatter, html } = markdownRemark
  const renderFeaturedImg = () => {
    if (frontmatter.featuredImage) {
      const featuredImgFluid = frontmatter.featuredImage.childImageSharp.fluid
      return (
        <div style={{ maxHeight: "100%", height: "400px" }}>
          <Img fluid={featuredImgFluid} style={{maxHeight: '100%'}} imgStyle={{objectFit: 'contain'}} />
        </div>
      )
    } else {
      return ""
    }
  }
  const customCrumbLabel = "boo"
  return (
    <Layout>
      <div className={styles.breadcrumbs}>
        <Breadcrumb
          crumbs={crumbs}
          crumbSeparator=" > "
          title=">>>"
        />
      </div>
      <h1>{frontmatter.title}</h1>
      {renderFeaturedImg()}
      <p>{frontmatter.date}</p>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
