import React from "react"
import { graphql, } from "gatsby"
import Layout from "../components/ruLayout"
import PostList from "../components/ruPostList"

const RuBlogIndex = ({ data, pageContext }) => (
  <Layout
    title="Остальное"
    section="blog"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/blog"
    bannerParagraph={[
      <h1>Остальное</h1>,
      <p>А всё остальное, что пишется в блоге – остается в этом блоге</p>
    ]}
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/ru/blog"
      pageContext={pageContext}
    />
  </Layout>
)

export default RuBlogIndex

export const query = graphql`
  query RuBlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {date: DESC}},
      filter: {fileAbsolutePath: { regex: "/\/ru\/blog\//"}}
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

export { Head } from "./../components/head"