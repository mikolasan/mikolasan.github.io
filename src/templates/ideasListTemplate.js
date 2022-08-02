import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"

const Ideas = ({ data, pageContext }) => (
  <Layout
    title="Ideas"
    section="ideas"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru"
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/ideas"
      pageContext={pageContext}
    />

  </Layout>
)

export default Ideas

export const query = graphql`
  query IdeasListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { fields: [frontmatter___date], order: DESC},
      filter: { fileAbsolutePath: { regex: "/markdown\/ideas\//"} }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            previewImage {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH,
                  breakpoints: [278],
                  transformOptions: {
                    cropFocus: ATTENTION,
                    fit: COVER
                  },
                  quality: 70
                )
              }
            }
          }
          excerpt
          fileAbsolutePath
        }
      }
    }
  }
`