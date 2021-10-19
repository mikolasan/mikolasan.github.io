import React from "react"
import { Link } from "gatsby"
import * as styles from "./pagination.module.css"

const Pagination = ({ prevPageText, nextPageText, currentPage, numPages, path }) => {
  
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  
  return (
    <ul className={styles.blognavigation}>
      <li key="prev" className={styles.prevpage}>
        {!isFirst && (
          <Link className={styles.prevpage} to={`${path}/${prevPage}`} rel="prev">
            {prevPageText}
          </Link>
        ) || <span>{prevPageText}</span>}
      </li>
      {Array.from({ length: numPages }, (_, i) => (
        <li
          key={`pagination-number${i + 1}`}
          className={i + 1 === currentPage ? styles.currentpage : styles.numberpage}
        >
          <Link to={`${path}/${i === 0 ? '' : i + 1}`}>
            {i + 1}
          </Link>
        </li>
      ))}
      <li key="next" className={styles.nextpage}>
        {!isLast && (
          <Link to={`${path}/${nextPage}`} rel="next">
            {nextPageText}
          </Link>
        ) || <span>{nextPageText}</span>}
      </li>
    </ul>
  )
}

export default Pagination