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
  return (
    <Layout>
      <FeaturedImage imgFluid={featuredImgFluid} />
      <section>
        <div className={styles.breadcrumbs}>
          [<Breadcrumb
            crumbs={crumbs}
            crumbSeparator="//"
            title=""
          />]
        </div>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
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
            fluid(maxHeight: 300, quality: 80, cropFocus: SOUTH) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
