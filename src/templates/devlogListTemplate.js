import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, getSrc } from "gatsby-plugin-image"
import { absPathToUrl, formatDate } from "../nifty"
import Layout from "../components/layout"
import BlogPreview from "../components/blogPreview"
import Pagination from "../components/pagination"
import * as styles from "./blogListTemplate.module.css"

const DevlogIndex = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const {
    currentPage,
    numPages,
    breadcrumb: { crumbs },
  } = pageContext
  const anotherLanguageLink = '/ru/devlog'
  const languageName = "Switch to russian version"
  return (
    <Layout
      title="Devlog"
      section="blog"
      subsection="devlog"
      crumbs={crumbs}
      languageName={languageName}
      anotherLanguageLink={anotherLanguageLink}
    >
      <div className={styles.blogcards}>
        {posts.map(({ node }) => (
          <BlogPreview
            key={node.id} 
            path={absPathToUrl(node.fileAbsolutePath)}
            title={node.frontmatter.title}
            text={node.excerpt}
            date={formatDate(node.frontmatter.date)}
            readMore="Read more..."
            image={getImage(node.frontmatter.previewImage)}
            altImage="Some alt text for this picture"
          />
        ))}
      </div>
      <Pagination
        prevPageText="← Previous Page"
        nextPageText="Next Page →"
        currentPage={currentPage}
        numPages={numPages}
        path="/devlog"
      />
    </Layout>
  )
}

export default DevlogIndex

export const query = graphql`
  query DevlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { frontmatter: {date: DESC}},
      filter: {fileAbsolutePath: { regex: "/markdown\/devlog\//"}}
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

export { Head } from "../components/head"