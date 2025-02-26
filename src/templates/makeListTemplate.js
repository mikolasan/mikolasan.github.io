import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"
import SectionCard from "../components/sectionCard"
import { SEO } from "../components/seo"

const Make = ({ data, pageContext }) => (
  <Layout
    mainConf="list"
    title={pageContext.title}
    section="robots"
    bannerParagraph={pageContext.currentPage > 1 ? [
      <h1 key="title" id="_name1" itemProp="name">Make</h1>,
    ] : undefined}
  >
    {pageContext.currentPage === 1 && (
    <>
      <div className="ideacards">
        <SectionCard
          className="wide-card"
          title="3D prints"
          url="/make/3d-prints"
        >
          <p>
            Have you tried this mantra: I have more filament than nerves
          </p>
        </SectionCard>
      </div>
      <div className="list-name">
        <h1 key="title" id="_name1" itemProp="name">Make</h1>
      </div>
    </>) || ``}
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/make"
      pageContext={pageContext}
    />
  </Layout>
)

export default Make

export const query = graphql`
  query MakeListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {lastModified: DESC}},
      filter: { fileAbsolutePath: { regex: "/markdown\/make\/(?!robot|3d-prints)/"} }
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