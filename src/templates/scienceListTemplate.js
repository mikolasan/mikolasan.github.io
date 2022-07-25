import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"

const Science = ({ data, pageContext }) => (
  <Layout
    title="Science"
    section="science"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/neural-networks"
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/science"
      pageContext={pageContext}
    />

  </Layout>
)

export default Science

export const query = graphql`
  query ScienceListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { fields: [frontmatter___date], order: DESC},
      filter: { fileAbsolutePath: { regex: "/markdown\/science\//"} }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          excerpt
          fileAbsolutePath
        }
      }
    }
  }
`