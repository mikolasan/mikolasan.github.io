import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as styles from "./blogListTemplate.module.css"

const BlogIndex = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const {
    currentPage,
    numPages,
    breadcrumb: { crumbs },
  } = pageContext
  const anotherLanguageLink = '/ru/blog'
  const languageName = "Switch to russian version"
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  const onePage = isFirst && isLast
  return (
    <Layout
      title="Blog"
      section="blog"
      crumbs={crumbs}
      languageName={languageName}
      anotherLanguageLink={anotherLanguageLink}
    >
      <div className={styles.blogcards}>
        {posts.map(({ node }) => (
          <article key={node.id} className={styles.blogcard}>
            <Link to={node.frontmatter.path}><h3>
              {node.frontmatter.title}
            </h3></Link>
            <time className={styles.blogdate}>
              {new Date(Date.parse(node.frontmatter.date)).toLocaleDateString("en-US", { dateStyle: "full" })}
            </time>
            <p>{node.excerpt}</p>
            <Link className={styles.readmore} to={node.frontmatter.path}>Read more...</Link>
          </article>
        ))}
      </div>
      <ul className={styles.blognavigation}>
        <li className={styles.prevpage}>
          {!isFirst && (
            <Link className={styles.prevpage} to={`/blog/${prevPage}`} rel="prev">
              ← Previous Page
            </Link>
          ) || <span>← Previous Page</span>}
        </li>
        {Array.from({ length: numPages }, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            className={i + 1 === currentPage ? styles.currentpage : ''}
          >
            <Link to={`/blog/${i === 0 ? '' : i + 1}`}>
              {i + 1}
            </Link>
          </li>
        ))}
        <li className={styles.nextpage}>
          {!isLast && (
            <Link to={`/blog/${nextPage}`} rel="next">
              Next Page →
            </Link>
          ) || <span>Next Page →</span>}
        </li>
      </ul>
    </Layout>
  )
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
