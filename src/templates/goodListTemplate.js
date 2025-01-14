import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"
import { SEO } from "../components/seo"

const GoodListTemplate = ({ data, pageContext }) => {
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
      <PostList
        posts={data.allMarkdownRemark.edges}
        baseUrl={pageContext.baseUrl}
        pageContext={pageContext}
      />
    </Layout>
  )
}

export default GoodListTemplate

export const query = graphql`
  query GoodListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {date: DESC}},
      filter: {
        fileAbsolutePath: { regex: "/markdown/"},
        frontmatter: { quality: {eq: "good"}}
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            quality
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