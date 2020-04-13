import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styles from "./navigationBar.module.css"

export default () => (
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
        <Link to="/" style={{backgroundColor: '#211a1d', color: '#f2f2f2'}}>Nikolay Neupokoev</Link>
        <Link to="/everything/">Everything</Link>
        <Link to="/science/">Science</Link>
        <Link to="/projects/">Projects</Link>
        <Link to="/gamedev/">Gamedev</Link>
        <Link to="/about/" style={{backgroundColor: '#211a1d', color: '#f2f2f2', float: 'right'}}>About</Link>
      </div>
    )}
  />
)
