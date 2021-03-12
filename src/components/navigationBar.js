import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import styles from "./navigationBar.module.css"

const Navbar = ({ data, active }) => (
  <StaticQuery
    query={graphql`
      query LogoQuery {
        file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <div className={styles.topnav}>
        <Img fixed={data.file.childImageSharp.fixed} style={{float: 'left'}} />
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
