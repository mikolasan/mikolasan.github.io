import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./navigationBar.module.css"

const RuNavbar = ({ data, active }) => (
  <StaticQuery
    query={graphql`
      query RuLogoQuery {
        file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
            )
          }
        }
      }
    `}
    render={data => (
      <div className={styles.topnav}>
        <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} style={{float: 'left'}} />
        <Link to="/ru" className={styles.titlelink} style={{backgroundColor: '#211a1d', color: '#f2f2f2'}}>Николай Неупокоев</Link>
        <Link to="/ru/ideas/" { ...(active === "ideas" && { className: styles.activelink }) }>Идеи</Link>
        <Link to="/ru/projects/" { ...(active === "projects" && { className: styles.activelink }) }>Проекты</Link>
        <Link to="/ru/science/" { ...(active === "science" && { className: styles.activelink }) }>Наука</Link>
        <Link to="/ru/blog/" { ...(active === "blog" && { className: styles.activelink }) }>Блог</Link>
        <Link to="/ru/about/" style={{float: 'right'}} { ...(active === "about" && { className: styles.activelink }) }>О себе</Link>
        <Link to="/ru/cv/" style={{float: 'right'}} { ...(active === "cv" && { className: styles.activelink }) }>Резюме</Link>
      </div>
    )}
  />
)

export default RuNavbar
