import React from "react"
import { Link } from "gatsby"
import BlogPreview from "./blogPreview"
import * as styles from "../templates/blogListTemplate.module.css"

const RuPostList = ({ pageContext, posts, baseUrl }) => {
  const {
    currentPage,
    numPages
  } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  return (
    <>
      <div className={styles.blogcards}>
        {posts.map(({ node }) => (
          <BlogPreview
            key={node.id} 
            path={node.frontmatter.path}
            title={node.frontmatter.title}
            text={node.excerpt}
            date={new Date(Date.parse(node.frontmatter.date)).toLocaleDateString("ru-RU", { dateStyle: "full" })}
            readMore="Читать дальше..."
          />
        ))}
      </div>
      <ul className={styles.blognavigation}>
        <li className={styles.prevpage}>
          {!isFirst && (
            <Link to={`${baseUrl}/${prevPage}`} rel="prev">
              ← Пред стр
            </Link>
          ) || <span>← Пред стр</span>}
        </li>
        {Array.from({ length: numPages }, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            className={i + 1 === currentPage ? styles.currentpage : ''}
          >
            <Link to={`${baseUrl}/${i === 0 ? '' : i + 1}`}>
              {i + 1}
            </Link>
          </li>
        ))}
        <li className={styles.nextpage}>
          {!isLast && (
            <Link to={`${baseUrl}/${nextPage}`} rel="next">
              След стр →
            </Link>
          ) || <span>След стр →</span>}
        </li>
      </ul>
    </>
  )
}

export default RuPostList
