import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"

const ListTemplate = ({ data, pageContext }) => {
  return (
    <Layout
      mainConf="list"
      title={pageContext.title}
      section={pageContext.section}
      subsection={pageContext.subsection}
      crumbs={pageContext.breadcrumb.crumbs}
      languageName="Switch to russian version"
      anotherLanguageLink="/ru"
    >
      <PostList
        posts={data.allMarkdownRemark.edges}
        baseUrl={pageContext.baseUrl}
        pageContext={pageContext}
      />
    </Layout>
  )
}

export default ListTemplate

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!, $regex: String!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {date: DESC}},
      filter: {fileAbsolutePath: { regex: $regex}}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            developing
            previewImage {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH,
                  breakpoints: [278],
                  transformOptions: {
                    cropFocus: ATTENTION,
                    fit: COVER
                  },
                  quality: 70
                )
              }
            }
          }
          excerpt
          fileAbsolutePath
        }
      }
    }
  }
`

export { Head } from "../components/head"