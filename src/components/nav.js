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
    <div className={[styles.featuredlink, styles.tooltip].join(' ')}>
      <Link to="/make/robot" { ...(active === "robot" && { className: styles.activelink }) }>
        <img src="/robot.png" alt="Robot" title="" />
        <span className={styles.tooltiptext}>Robot</span>
      </Link>
    </div>
    <Link to="/science" { ...(active === "science" && { className: styles.activelink }) }>Science</Link>
    <div className={[styles.featuredlink, styles.tooltip].join(' ')}>
      <Link to="/brain-model" { ...(active === "ai" && { className: styles.activelink }) }>
        <img src="/brain.png" alt="Brain model" title="" />
        <span className={styles.tooltiptext}>Brain model</span>
      </Link>
    </div>
    <Link to="/code" { ...(active === "code" && { className: styles.activelink }) }>Code</Link>
    <Link to="/gamedev" { ...(active === "gamedev" && { className: styles.activelink }) }>Gamedev</Link>
    <Link to="/blog" { ...(active === "blog" && { className: styles.activelink }) }>Blog</Link>
    <Search indices={searchIndices} />
  </nav>
)

export default Nav;