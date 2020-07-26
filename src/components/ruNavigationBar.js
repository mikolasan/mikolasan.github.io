import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import styles from "./navigationBar.module.css"

export default (props) => (
  <StaticQuery
    query={graphql`
      query RuLogoQuery {
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
        <Link to="/ru" className={styles.titlelink} style={{backgroundColor: '#211a1d', color: '#f2f2f2'}}>Николай Неупокоев</Link>
        <Link to="/ru/ideas/">Идеи</Link>
        <Link to="/ru/projects/">Проекты</Link>
        <Link to="/ru/science/">Наука</Link>
        <Link to="/ru/blog/">Блог</Link>
        <Link to="/ru/about/" style={{float: 'right'}}>О себе</Link>
        <Link to="/ru/cv/" style={{float: 'right'}}>Резюме</Link>
      </div>
    )}
  />
)
