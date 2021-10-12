import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/ruLayout"
import PostList from "../components/ruPostList"

const RuMake = ({ data, pageContext }) => (
  <Layout
    title="Мастерская"
    section="make"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/"
    bannerParagraph={[
      <h1>Мастерская</h1>,
      <p>Встраиваемые системы, маленькие компьютеры, пайка компонентов, 3Д печать - вот это всё</p>
    ]}
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/ru/make"
      pageContext={pageContext}
    />
  </Layout>
)

export default RuMake

export const query = graphql`
  query RuMakeListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { fields: [frontmatter___date], order: DESC},
      filter: {fileAbsolutePath: { regex: "/\/ru\/make\//"}}
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