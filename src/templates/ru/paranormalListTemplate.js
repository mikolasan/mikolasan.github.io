import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/ru/layout"
import PostList from "../../components/ru/postList"

const RuParanormal = ({ data, pageContext }) => (
  <Layout
    title="Паранормальные экспедиции"
    section="paranormal"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to english version"
    anotherLanguageLink="/"
    bannerParagraph={[
      <h1>Паранормальные экспедиции</h1>,
      <p>Есть ли в Новосибирске haunted места? Такие, с чертовщинкой, 
        как например Бирмингемский металлургический завод буржуя Слосса или как «Пойма» в национальном заповеднике Блэкуотер</p>
    ]}
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/ru/paranormal"
      pageContext={pageContext}
    />
  </Layout>
)

export default RuParanormal

export const query = graphql`
  query RuParanormalListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {date: DESC}},
      filter: {fileAbsolutePath: { regex: "/\/ru\/paranormal\//"}}
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