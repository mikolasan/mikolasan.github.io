import React from "react"
import { Link } from "gatsby"
import styles from "./navigationBar.module.css"

export default () => (
  <div className={styles.bar}>
    <div className={styles.logo}>
      <Link to="/">Nikolay Neupokoev</Link>
      <p><Link to="/developer/">developer</Link> • traveler • snob</p>
    </div>
    <div className={styles.menu}>
      <ul className={styles.sections}>
        <li><Link to="/everything/">Everything</Link></li>
        <li><Link to="/science/">Science</Link></li>
        <li><Link to="/projects/">Projects</Link></li>
        <li><Link to="/gamedev/">Gamedev</Link></li>
        <li className={styles.right_section}><Link to="/about/">About</Link></li>
      </ul>
    </div>
  </div>
)
