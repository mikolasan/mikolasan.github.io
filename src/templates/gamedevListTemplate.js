import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"

const Gamedev = ({ data, pageContext }) => (
  <Layout
    title="Gamedev"
    section="gamedev"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/devlog"
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/gamedev"
      pageContext={pageContext}
    />

  </Layout>
)

export default Gamedev

export const query = graphql`
  query GamedevListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { fields: [frontmatter___date], order: DESC},
      filter: { fileAbsolutePath: { regex: "/markdown\/gamedev\//"} }
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