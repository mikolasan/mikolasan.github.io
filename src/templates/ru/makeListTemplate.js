import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/ru/layout"
import PostList from "../../components/ru/postList"

const RuMake = ({ data, pageContext }) => (
  <Layout
    title="Мастерская"
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

export { Head } from "../../components/ru/head"