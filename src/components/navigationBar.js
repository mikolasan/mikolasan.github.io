import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./navigationBar.module.css"

const query = graphql`
  {
    file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FIXED
        )
      }
    }
}
`

const Navbar = ({ data, active }) => (
  <StaticQuery
    query={query}
    render={data => (
      <div className={styles.topnav}>
        <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} style={{float: 'left'}} />
        <Link to="/" className={styles.titlelink} style={{backgroundColor: '#211a1d', color: '#f2f2f2'}}>Nikolay Neupokoev</Link>
        <Link to="/ideas/" { ...(active === "ideas" && { className: styles.activelink }) }>Ideas</Link>
        <Link to="/projects/" { ...(active === "projects" && { className: styles.activelink }) }>Projects</Link>
        <Link to="/science/" { ...(active === "science" && { className: styles.activelink }) }>Science</Link>
        <Link to="/blog/" { ...(active === "blog" && { className: styles.activelink }) }>Blog</Link>
        <Link to="/about/" style={{float: 'right'}} { ...(active === "about" && { className: styles.activelink }) }>About</Link>
        <Link to="/cv/" style={{float: 'right'}} { ...(active === "cv" && { className: styles.activelink }) }>CV</Link>
      </div>
    )}
  />
)

export default Navbar
