import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CompactList from "../components/compactList"
import SectionCard from "../components/sectionCard"
import { SEO } from "../components/seo"

const Linux = ({ data, pageContext }) => (
  <Layout
    mainConf="list"
    title={pageContext.title}
    section="code"
    subsection="linux"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/devlog"
  >
    <CompactList
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

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
  >

  </SEO>
)