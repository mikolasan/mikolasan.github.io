import React from "react"
import { Link } from "gatsby"

import LogoButton from "./logoButton"
import GlobeButton from "./globeButton"
import Search from "./search"
import * as styles from "./navigationBar.module.css"

const searchIndices = [{ name: `Pages`, title: `Pages` }]

const RuNav = ({ active }) => (
  <nav className={styles.topnav}>
    <Link to="/ru" { ...(active === "root" && { className: [styles.activelink, styles.toplogo].join(' ') } || { className: styles.toplogo }) }>
      <LogoButton style={styles.toplogo} />
    </Link>
    <Link to="/ru/neural-networks" { ...(active === "neural-networks" && { className: styles.activelink }) }>Наука</Link>
    <div className={[styles.featuredlink, styles.tooltip].join(' ')}>
      <Link to="/ru/make/hydroponics" { ...(active === "hydroponics" && { className: styles.activelink }) }>
        <img src="/hydroponics.png" alt="Гидропоника" title="" />
        <span className={styles.tooltiptext}>Гидропоника</span>
      </Link>
    </div>
    <div className={[styles.featuredlink, styles.tooltip].join(' ')}>
      <Link to="/ru/make" { ...(active === "make" && { className: styles.activelink }) }>
        <img src="/make.png" alt="Мастерская" title="Мастерская" />
        <span className={styles.tooltiptext}>Мастерская</span>
      </Link>
    </div>
    <div className={[styles.featuredlink, styles.tooltip].join(' ')}>
      <Link to="/ru/paranormal" { ...(active === "paranormal" && { className: styles.activelink }) }>
        <img src="/paranormal.png" alt="Паранормальное" title="" />
        <span className={styles.tooltiptext}>Паранормальное</span>
      </Link>
    </div>
    <Link to="/ru/devlog" { ...(active === "devlog" && { className: styles.activelink }) }>Девлог</Link>
    <div className={[styles.featuredlink, styles.tooltip].join(' ')}>
      <Link to="/ru/board-games" { ...(active === "board-games" && { className: styles.activelink }) }>
        <img src="/board-games.png" alt="Настольные игры" title="" />
        <span className={styles.tooltiptext}>Настолки</span>
      </Link>
    </div>
    <Link to="/ru/blog" { ...(active === "blog" && { className: styles.activelink }) }>Блог</Link>
    <Link to="/ru/about" style={{float: 'right'}} { ...(active === "about" && { className: styles.activelink }) }>О себе</Link>

    <div className={styles.language}>
    <Link to="/" title="English">EN</Link>
    </div>
    <Search indices={searchIndices} />
  </nav>
)

export default RuNav;