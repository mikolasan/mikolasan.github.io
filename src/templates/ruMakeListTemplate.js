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
    buttonText="Гидропоника"
    buttonLink="/ru/make/hydroponics"
    secondButtonText="Ютюб"
    secondButtonLink="/ru/youtube"
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

    <p>
      * Все ссылки в разделе Мастерская, ведущие на товары с Али, - это аффилированные ссылки. У меня нет какой-либо заинтересованности в продвижении определенных продавцов,
      я просто делюсь результатми своего поиска по Али. Это те товары, которые я выбрал для себя, прочитав отзывы, сравнив цену и качество среди других вариантов.
      Используя данные ссылки, тем самым вы мотивируете меня создавать больше интересных проектов и оформлять их на этом сайте.
    </p>
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