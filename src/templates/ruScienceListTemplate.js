import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/ruLayout"
import PostList from "../components/ruPostList"

const RuScience = ({ data, pageContext }) => (
  <Layout
    title="Паранормальные экспедиции"
    section="science"
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
      baseUrl="/ru/science"
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
      sort: { fields: [frontmatter___date], order: DESC},
      filter: {fileAbsolutePath: { regex: "/\/ru\/science\//"}}
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