import React from "react"
import { Link } from "gatsby"
import * as styles from "./blogPreview.module.css"

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
      {date}
    </time>
    <p>{text}</p>
    <Link className={styles.readmore} to={path}>{readMore}</Link>
  </article>
)

export default BlogPreview