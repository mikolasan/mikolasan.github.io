import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/ru/layout"
import PostList from "../../components/ru/postList"
import { SEO } from "./../../components/seo"

const RuScience = ({ data, pageContext }) => (
  <Layout
    title={pageContext.title}
    section="neural-networks"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/"
    bannerParagraph={[
      <h1>Наука</h1>,
      <p>Попытка людей понять себя и формализовать свои маленькие нейрончики в надежде, 
        что все элеметарное - просто, а в совокупности они могут создавать невероятные выводы</p>
    ]}
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/ru/neural-networks"
      pageContext={pageContext}
    />
  </Layout>
)

export default RuScience

export const query = graphql`
  query RuScienceListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {date: DESC}},
      filter: {fileAbsolutePath: { regex: "/\/ru\/neural-networks\//"}}
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