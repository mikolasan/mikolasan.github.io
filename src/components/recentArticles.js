import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { absPathToUrl, formatDate } from "../nifty"
import BlogPreview from "./blogPreview"
import * as styles from "./recentArticles.module.css"

const RecentArticles = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        limit: 3,
        sort: { order: DESC, fields: [frontmatter___date]},
        filter: {
          fileAbsolutePath: {regex: "/^(?!.*\/ru\/.*)/"},
          frontmatter: { topic: {ne: true}, article: {ne: true}}
        }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date
            }
            excerpt
            fileAbsolutePath
          }
        }
      }
    }
  `)
  const posts = data.allMarkdownRemark.edges
  return (
    <aside className={styles.recentarticles}>
      <h2>Recent articles</h2>
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
    </aside>
  )
}

export default RecentArticles
