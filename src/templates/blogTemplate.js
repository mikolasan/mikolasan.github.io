import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"

export default function Template ({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const renderFeaturedImg = () => {
    if (frontmatter.featuredImage) {
      const featuredImgFluid = frontmatter.featuredImage.childImageSharp.fluid
      return <Img fluid={featuredImgFluid} />
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
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
