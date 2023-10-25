import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/ru/layout"
import PostList from "../../components/ru/postList"
import { SEO } from "./../../components/seo"

const RuBlogIndex = ({ data, pageContext }) => (
  <Layout
    title={pageContext.title}
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

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
  >

  </SEO>
)
