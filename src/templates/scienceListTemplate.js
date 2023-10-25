import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"
import SectionCard from "../components/sectionCard"
import { SEO } from "../components/seo"

const Science = ({ data, pageContext }) => (
  <Layout
    mainConf="list" 
    title={pageContext.title}
    section="science"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/neural-networks"
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/science"
      pageContext={pageContext}
    />
    <div className="ideacards">
      <h2>Topics</h2>
      <SectionCard
        title="AI"
        url="/ai"
      >
        <p>
          Research about current development in Artificial Intellegence, crytical analysis and new ideas
        </p>
      </SectionCard>
    </div>
  </Layout>
)

export default Science

export const query = graphql`
  query ScienceListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {date: DESC}},
      filter: {
        fileAbsolutePath: { regex: "/markdown\/science\//"},
        frontmatter: { topic: {ne: true}, article: {ne: true}}
      }
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