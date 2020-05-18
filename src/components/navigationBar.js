import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import styles from "./navigationBar.module.css"

export default (props) => (
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
        <Link to="/ideas/">Ideas</Link>
        <Link to="/projects/">Projects</Link>
        <Link to="/gamedev/">Gamedev</Link>
        <Link to="/blog/">Blog</Link>
        <Link to="/about/" style={{float: 'right'}}>About</Link>
        <Link to="/cv/" style={{float: 'right'}}>CV</Link>
      </div>
    )}
  />
)
