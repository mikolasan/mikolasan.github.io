import React from "react"
import { Link } from "gatsby"
import BlogPreview from "./blogPreview"
import Pagination from "./pagination"
import { absPathToUrl } from "../nifty"
import * as styles from "./postList.module.css"

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
            date={new Date(Date.parse(node.frontmatter.date)).toLocaleDateString("ru-RU", { dateStyle: "full" })}
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
