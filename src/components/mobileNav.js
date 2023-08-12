import React from "react"
import { Link } from "gatsby"

import LogoButton from "./logoButton"
import * as styles from "./navigationBar.module.css"

const MobileNav = ({
  language,
  menuClickedCallback,
  menuOpen,
  searchClickedCallback,
  searchOpen
}) => (
  <nav className={["mobilenav", "language-" + language, styles.mobilenav].join(" ")}>
    <button
      className={[styles.burgermenu, menuOpen && styles.burgermenuopen || ""].join(" ")}
      onClick={menuClickedCallback}
    >
      <svg id="burgericon" className={menuOpen && "open" || ""} viewBox="0 0 100 100" width="100%" height="100%">
        <rect className="frstbar" y="10" width="100" height="20"></rect>
        <rect className="scndbar" y="40" width="100" height="20"></rect>
        <rect className="thrdbar" y="70" width="100" height="20"></rect>
      </svg>
    </button>
    <div className={styles.logobutton}>
      <Link to={language === "en" ? "/" : "/ru"}>
        <LogoButton style={styles.mobilelogo} />
      </Link>
    </div>
    <button
      className={[styles.searchbutton, searchOpen && styles.searchbuttonopen || ""].join(" ")}
      onClick={searchClickedCallback}
    >
      <img alt="A magnifier lens" src="/magnifier.png" className={styles.searchbutton} />
    </button>
  </nav>
)

export default MobileNav;