import React from "react"
import { Link } from "gatsby"

import LogoButton from "./logoButton"
import Search from "./search"
import * as styles from "./navigationBar.module.css"

const searchIndices = [{ name: `Pages`, title: `Pages` }]

const Nav = ({ section }) => (
  <nav className={styles.topnav}>
    <Link to="/" { ...(section === "root" && { className: [styles.activelink, styles.toplogo].join(' ') } || { className: styles.toplogo }) }>
      <LogoButton style={styles.toplogo} />
    </Link>
    <Link to="/make" { ...(section === "make" && { className: styles.activelink }) }>Make</Link>
    <Link to="/science" { ...(section === "science" && { className: styles.activelink }) }>Science</Link>
    <Link to="/code" { ...(section === "code" && { className: styles.activelink }) }>Coding</Link>
    <Link to="/blog" { ...(section === "blog" && { className: styles.activelink }) }>Blog</Link>
    <Search indices={searchIndices} />
  </nav>
)

export default Nav;