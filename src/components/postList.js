import React from "react"
import { getImage } from "gatsby-plugin-image"
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
            image={getImage(node.frontmatter.previewImage)}
            altImage="Some alt text for this picture"
            developing={node.frontmatter.developing}
            tags={node.frontmatter.tags}
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
