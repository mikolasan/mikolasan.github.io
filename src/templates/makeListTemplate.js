import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"
import SectionCard from "../components/sectionCard"

const Make = ({ data, pageContext }) => (
  <Layout
    title="Make"
    section="make"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru/make"
  >
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/make"
      pageContext={pageContext}
    />
    <div className="ideacards">
      <h2>Topics</h2>
      <SectionCard
        title="Robot"
        url="/make/robot"
      >
        <p>
          Developing unique robot constructor with modular design
        </p>
      </SectionCard>

      <SectionCard
        title="3D prints"
        url="/make/3d-prints"
      >
        <p>
          Nice models, settings for slicers
        </p>
      </SectionCard>
    </div>
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

export { Head } from "./../components/head"