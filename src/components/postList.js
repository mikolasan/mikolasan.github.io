import React from "react"
import BlogPreview from "./blogPreview"
import Pagination from "./pagination"
import { absPathToUrl, formatDate } from "../nifty"
import * as styles from "./postList.module.css"

const PostList = ({ pageContext, posts, baseUrl }) => {
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
            date={formatDate(node.frontmatter.date)}
            readMore="Read more..."
          />
        ))}
      </div>
      <Pagination
        prevPageText="← Previous Page"
        nextPageText="Next Page →"
        currentPage={currentPage}
        numPages={numPages}
        path={baseUrl}
      />
    </>
  )
}

export default PostList