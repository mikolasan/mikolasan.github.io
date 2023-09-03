import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"

const Prints = ({ data, pageContext }) => (
  <Layout
    title="3D Prints"
    section="make"
    subsection="3d-prints"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru"
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/make/3d-prints"
      pageContext={pageContext}
    />

  </Layout>
)

export default Prints

export const query = graphql`
  query PrintsListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {date: DESC}},
      filter: { fileAbsolutePath: { regex: "/markdown\/make\/3d-prints\//"} }
    ) {
      totalCount
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

export { Head } from "./../components/head"