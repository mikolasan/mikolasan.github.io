import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./blogPreview.module.css"

const BlogPreview = ({
  path,
  title,
  date,
  text,
  readMore,
  image,
  altImage
}) => (
  <article className={styles.blogcard}>
    {image && (
    <Link to={path}>
      <GatsbyImage
        image={image}
        alt={altImage}
        placeholder="blurred"
        layout="constrained"
        transformOptions={{
          cropFocus: "attention",
          fit: "cover",
        }}
        quality={60}
        className={styles.blogimage}
      />
    </Link>)}
    <Link to={path}>
      <h3>
        {title}
      </h3>
    </Link>
    <time className={styles.blogdate}>
      {date}
    </time>
    <p>{text}</p>
    <Link className={styles.readmore} to={path}>{readMore}</Link>
  </article>
)

export default BlogPreview