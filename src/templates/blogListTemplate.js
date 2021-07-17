import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as styles from "./blogListTemplate.module.css"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    const {
      currentPage,
      numPages,
      breadcrumb: { crumbs },
    } = this.props.pageContext
    const anotherLanguageLink = '/ru/blog'
    const languageName = "Switch to russian version"
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    const onePage = isFirst && isLast
    return (
      <Layout
        title="Blog"
        section="blog"
        languageName={languageName}
        anotherLanguageLink={anotherLanguageLink}
        bannerParagraph={[
          <h1>Blog</h1>,
          <p>some text here...</p>
        ]}
      >
        <div className={styles.blogcards}>
          {posts.map(({ node }) => (
            <div key={node.id} className={styles.blogcard}>
              <Link to={node.frontmatter.path}><h3>
                {node.frontmatter.title}
              </h3></Link>
              <p className={styles.blogdate}>
                {new Date(Date.parse(node.frontmatter.date)).toLocaleDateString("en-US", { dateStyle: "full" })}
              </p>
              <p>{node.excerpt}{" "}
                <Link to={node.frontmatter.path}>Read more...</Link>
              </p>
            </div>
          ))}
        </div>
        <ul className={styles.blognavigation}>
          {!isFirst && (
            <Link to={`/blog/${prevPage}`} rel="prev">
              ← Previous Page
            </Link>
          ) || "← Previous Page"}
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}
            >
              <Link
                to={`/blog/${i === 0 ? '' : i + 1}`}
                style={{
                  padding: 5,
                  textDecoration: 'none',
                  color: i + 1 === currentPage ? '#ffffff' : '',
                  background: i + 1 === currentPage ? '#007acc' : '',
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link to={`/blog/${nextPage}`} rel="next">
              Next Page →
            </Link>
          ) || "Next Page →"}
        </ul>
      </Layout>
    )
  }
}

export default BlogIndex

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { fields: [frontmatter___date], order: DESC},
      filter: { frontmatter: { path: { regex: "/^\/blog*/" }}}
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            date
          }
          excerpt
        }
      }
    }
  }
`
