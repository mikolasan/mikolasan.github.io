import React from "react"
import { Link } from "gatsby"
import { absPathToUrl } from "../nifty"
import * as styles from "./prevNextPagination.module.css"

const PrevNextPagination = ({ prevPage, nextPage, currentPagePath }) => {
  const re = new RegExp(/\/(.*)\//s);
  const match = currentPagePath.match(re);
  const currentSection = match && match[1] || ``;
  
  let prevTitle = `Previous post`
  let nextTitle = `Next Post`

  let prevPath = null
  if (prevPage) {
    prevTitle = prevPage.frontmatter.title || `Previous post`
    prevPath = absPathToUrl(prevPage.fileAbsolutePath)
    const match = prevPath.match(re);
    const prevSection = match && match[1];
    if (currentSection !== prevSection) {
      prevPage = null;
    }
  }
  let nextPath = null
  if (nextPage) {
    nextTitle = nextPage.frontmatter.title || `Next Post`
    nextPath = absPathToUrl(nextPage.fileAbsolutePath)
    const match = nextPath.match(re);
    const nextSection = match && match[1];
    if (currentSection !== nextSection) {
      nextPage = null;
    }
  }

  return (
    <ul className={styles.blognavigation}>
      <li key="prev" className={styles.prevpage}>
        {prevPage && (
          <Link to={prevPath} rel="prev">
            <span className={styles.arrow}>←</span> {prevTitle}
          </Link>
        ) || <span className={styles.prevpage}>←</span>}
      </li>
      <li key="next" className={styles.nextpage}>
        {nextPage && (
          <Link className={styles.nextpage} to={nextPath} rel="next">
            {nextTitle} <span className={styles.arrow}>→</span>
          </Link>
        ) || <span className={styles.nextpage}>→</span>}
      </li>
    </ul>
  )
}

export default PrevNextPagination