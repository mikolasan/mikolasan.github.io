import React from "react"
import { Link } from "gatsby"
import * as styles from "../templates/blogListTemplate.module.css"

const BlogPreview = ({
  path,
  title,
  date,
  text,
  readMore
}) => (
  <article className={styles.blogcard}>
    <Link to={path}><h3>
      {title}
    </h3></Link>
    <time className={styles.blogdate}>
      {new Date(Date.parse(date)).toLocaleDateString("en-US", { dateStyle: "full" })}
    </time>
    <p>{text}</p>
    <Link className={styles.readmore} to={path}>{readMore}</Link>
  </article>
)

export default BlogPreview