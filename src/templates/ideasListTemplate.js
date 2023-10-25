import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostList from "../components/postList"
import { SEO } from "../components/seo"

const Ideas = ({ data, pageContext }) => (
  <Layout
    mainConf="list"
    title={pageContext.title}
    section="code"
    subsection="ideas"
    crumbs={pageContext.breadcrumb.crumbs}
    languageName="Switch to russian version"
    anotherLanguageLink="/ru"
  >
    <p>
      Ready to embark on the journey of app development? 
      You're in the right place. 
      The road to creating a fantastic app begins with a single spark of inspiration. 
      And guess what? We've got a treasure trove of free ideas waiting just for you.
    </p>
    <PostList
      posts={data.allMarkdownRemark.edges}
      baseUrl="/ideas"
      pageContext={pageContext}
    />

  </Layout>
)

export default Ideas

export const query = graphql`
  query IdeasListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {date: DESC}},
      filter: { fileAbsolutePath: { regex: "/markdown\/ideas\//"} }
    ) {
      totalCount
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