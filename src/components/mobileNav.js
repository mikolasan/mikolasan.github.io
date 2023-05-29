import React from "react"
import { Link } from "gatsby"

import LogoButton from "./logoButton"
import * as styles from "./navigationBar.module.css"

const MobileNav = ({ language, menuOpen, menuClickedCallback }) => (
  <nav className={styles.mobilenav}>
    <div className={[styles.burgermenu, menuOpen && styles.burgermenuopen || ""].join(" ")} onClick={menuClickedCallback}>
      <svg id="burgericon" className={menuOpen && "open" || ""} viewBox="0 0 100 100" width="100%" height="100%">
        <rect className="frstbar" y="10" width="100" height="20"></rect>
        <rect className="scndbar" y="40" width="100" height="20"></rect>
        <rect className="thrdbar" y="70" width="100" height="20"></rect>
      </svg>
    </div>
    <div className={styles.logobutton}>
      <Link to={language === "en" ? "/" : "/ru"}>
        <LogoButton style={styles.mobilelogo} />
      </Link>
    </div>
    <div className={styles.mobilelanguage}>
      <Link to={language === "en" ? "/about" : "/ru/about"}>
        <img alt="User icon navigates to About Me page" src="/user.png" className={styles.userbutton} />
      </Link>
    </div>
  </nav>
)

export default MobileNav;