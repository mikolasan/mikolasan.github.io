import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

export default function Template ({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
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
  return (
    <Layout>
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
