import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"
import SectionCard from "../components/sectionCard"

const Linux = ({ data, pageContext }) => (
  <Layout
    title="Linux"
    section="linux"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/devlog"
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/linux"
      pageContext={pageContext}
    />
    
  </Layout>
)

export default Linux

export const query = graphql`
  query LinuxListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {lastModified: DESC}},
      filter: { fileAbsolutePath: { regex: "/markdown\/linux\//"} }
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