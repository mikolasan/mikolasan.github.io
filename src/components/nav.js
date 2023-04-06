import React from "react"
import { Link } from "gatsby"

import LogoButton from "./logoButton"
import Search from "./search"
import * as styles from "./navigationBar.module.css"

const searchIndices = [{ name: `Pages`, title: `Pages` }]

const Nav = ({ active }) => (
  <nav className={styles.topnav}>
    <Link to="/" { ...(active === "root" && { className: [styles.activelink, styles.toplogo].join(' ') } || { className: styles.toplogo }) }>
      <LogoButton style={styles.toplogo} />
    </Link>
    <Link to="/make" { ...(active === "make" && { className: styles.activelink }) }>Make</Link>
    <Link to="/science" { ...(active === "science" && { className: styles.activelink }) }>Science</Link>
    <Link to="/code" { ...(active === "code" && { className: styles.activelink }) }>Coding</Link>
    <Link to="/blog" { ...(active === "blog" && { className: styles.activelink }) }>Blog</Link>
    <Search indices={searchIndices} />
  </nav>
)

export default Nav;