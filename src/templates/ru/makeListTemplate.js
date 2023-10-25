import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/ru/layout"
import PostList from "../../components/ru/postList"
import { SEO } from "./../../components/seo"

const RuMake = ({ data, pageContext }) => (
  <Layout
    title={pageContext.title}
    section="make"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/"
    buttonText="Гидропоника"
    buttonLink="/ru/make/hydroponics"
    secondButtonText="Кубики"
    secondButtonLink="/ru/make/resin-dice"
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
      sort: { frontmatter: {date: DESC}},
      filter: { fileAbsolutePath: { regex: "/\/ru\/make\/(?!hydroponics)/"} }
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