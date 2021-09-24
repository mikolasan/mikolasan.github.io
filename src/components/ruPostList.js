import React from "react"
import { Link } from "gatsby"
import * as styles from "../templates/blogListTemplate.module.css"

class RuPostList extends React.Component {
  render() {
    const { posts, pageContext } = this.props
    const {
      currentPage,
      numPages,
      breadcrumb: { crumbs },
    } = pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    return (
      <>
        <div className={styles.blogcards}>
          {posts.map(({ node }) => (
            <div key={node.id} className={styles.blogcard}>
              <Link to={node.frontmatter.path}><h3>
                {node.frontmatter.title}
              </h3></Link>
              <p className={styles.blogdate}>
                {new Date(Date.parse(node.frontmatter.date)).toLocaleDateString("ru-RU", { dateStyle: "full" })}
              </p>
              <p>{node.excerpt}{" "}
                <Link to={node.frontmatter.path}>Читать дальше...</Link>
              </p>
            </div>
          ))}
        </div>
        <ul className={styles.blognavigation}>
          {!isFirst && (
            <Link to={`/ru/blog/${prevPage}`} rel="prev">
              ← Пред стр
            </Link>
          ) || "← Пред стр"}
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0,
              }}
            >
              <Link
                to={`/ru/blog/${i === 0 ? '' : i + 1}`}
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
            <Link to={`/ru/blog/${nextPage}`} rel="next">
              След стр →
            </Link>
          ) || "След стр →"}
        </ul>
      </>
    )
  }
}

export default RuPostList
