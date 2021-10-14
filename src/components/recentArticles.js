import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import BlogPreview from "./blogPreview"
import * as styles from "./recentArticles.module.css"

const RecentArticles = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        limit: 3,
        sort: { order: DESC, fields: [frontmatter___date]},
        filter: { frontmatter: { path: { regex: "/^\/blog*/" }}}
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              path
              date
            }
            excerpt
          }
        }
      }
    }
  `)
  const posts = data.allMarkdownRemark.edges
  return (
    <aside className={styles.recentarticles}>
      <h2>Recent articles</h2>
      <div className="blogcards">
        {posts.map(({ node }) => (
          <BlogPreview
            key={node.id} 
            path={node.frontmatter.path}
            title={node.frontmatter.title}
            text={node.excerpt}
            date={new Date(Date.parse(node.frontmatter.date)).toLocaleDateString("en-US", { dateStyle: "full" })}
            readMore="Читать дальше..."
          />
        ))}
      </div>
    </aside>
  )
}

export default RecentArticles
