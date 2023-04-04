import React from "react"
import { Link } from "gatsby"

import LogoButton from "./logoButton"
import GlobeButton from "./globeButton"
import * as styles from "./navigationBar.module.css"

const MobileNav = ({ menuClickedCallback }) => (
  <nav className={styles.mobilenav}>
    <img className={styles.burgermenu} onClick={menuClickedCallback} src="/images/bars.png" />
    <LogoButton style={styles.mobilelogo} />
    <div className={styles.mobilelanguage}>
      <Link to="/ru">
        <GlobeButton style={styles.globe} />
      </Link>
    </div>
  </nav>
)

export default MobileNav;