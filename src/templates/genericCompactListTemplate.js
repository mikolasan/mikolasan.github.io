import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CompactList from "../components/compactList"
import { SEO } from "../components/seo"

const ListTemplate = ({ data, pageContext }) => {
  const banner = [
    <h1 key="title" id="_name1" itemProp="name">{pageContext.title}</h1>,
  ]
  return (
    <Layout
      mainConf="list"
      title={pageContext.title}
      section={pageContext.section}
      subsection={pageContext.subsection}
      bannerParagraph={banner}
    >
      <CompactList
        posts={data.allMarkdownRemark.edges}
        baseUrl={pageContext.baseUrl}
        pageContext={pageContext}
      />
    </Layout>
  )
}

export default ListTemplate

export const query = graphql`
  query CompactListQuery($skip: Int!, $limit: Int!, $regex: String!) {
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
            tags
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