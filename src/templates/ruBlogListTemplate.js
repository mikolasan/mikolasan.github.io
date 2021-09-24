import React from "react"
import { graphql, } from "gatsby"
import Layout from "../components/ruLayout"
import PostList from "../components/ruPostList"

const BlogIndex = ({ data, pageContext }) => (
  <Layout
    title="Остальное"
    section="blog"
    languageName="Switch to english version"
    anotherLanguageLink="/blog"
    bannerParagraph={[
      <h1>Остальное</h1>,
      <p>И всё остальное остается в этом блоге.</p>
    ]}
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      pageContext={pageContext}
    />
  </Layout>
)

export default BlogIndex

export const query = graphql`
  query RuBlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { fields: [frontmatter___date], order: DESC},
      filter: { frontmatter: { path: { regex: "/\/ru\/blog*/" }}}
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            date
          }
          excerpt
        }
      }
    }
  }
`
