import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"

const Projects = ({ data, pageContext }) => (
  <Layout
    title="Projects"
    section="projects"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru"
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/projects"
      pageContext={pageContext}
    />

  </Layout>
)

export default Projects

export const query = graphql`
  query ProjectsListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { fields: [frontmatter___date], order: DESC},
      filter: { fileAbsolutePath: { regex: "/markdown\/projects\//"} }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
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