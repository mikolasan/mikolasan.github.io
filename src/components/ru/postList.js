import React from "react"
import BlogPreview from "../blogPreview"
import Pagination from "../pagination"
import { absPathToUrl, formatDate } from "../../nifty"
import * as styles from "../postList.module.css"

const RuPostList = ({ pageContext, posts, baseUrl }) => {
  const {
    currentPage,
    numPages
  } = pageContext
  return (
    <>
      <div className={styles.blogcards}>
        {posts.map(({ node }) => (
          <BlogPreview
            key={node.id} 
            path={absPathToUrl(node.fileAbsolutePath)}
            title={node.frontmatter.title}
            text={node.excerpt}
            date={formatDate(node.frontmatter.date, 'ru')}
            readMore="Читать дальше..."
          />
        ))}
      </div>
      <Pagination
        prevPageText="← Пред стр"
        nextPageText="След стр →"
        currentPage={currentPage}
        numPages={numPages}
        path={baseUrl}
      />
    </>
  )
}

export default RuPostList
