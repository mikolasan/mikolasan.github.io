import React from "react"
import { getImage } from "gatsby-plugin-image"
import ShortPreview from "./shortPreview"
import Pagination from "./pagination"
import { absPathToUrl, formatDate } from "../nifty"
import * as styles from "./compactList.module.css"

const CompactList = ({ pageContext, posts, baseUrl }) => {
  const {
    currentPage,
    numPages
  } = pageContext
  return (
    <>
      <div className={styles.blogcards}>
        {posts.map(({ node }) => (
          <ShortPreview
            key={node.id} 
            path={absPathToUrl(node.fileAbsolutePath)}
            title={node.frontmatter.title}
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

export default CompactList
