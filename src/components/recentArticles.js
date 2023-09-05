import React from "react"
import { absPathToUrl, formatDate } from "../nifty"
import BlogPreview from "./blogPreview"
import * as styles from "./recentArticles.module.css"

const RecentArticles = ({ nodes, section, subsection }) => {
  return nodes && (
    <aside className={styles.recentarticles}>
      <h2>Recently posted in "{section}"</h2>
      <div className={styles.blogcards}>
        {nodes.map(node => (
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
    </aside>
  ) || <div className={styles.norecentarticles}></div>
}

export default RecentArticles
