import React from 'react'
import PropTypes from "prop-types"
import Search from "./allPagesSearch"
import * as styles from './menuPopup.module.css'

const items = [
  {link: "/", label: "Home", description: "Main news feed updated frequently"},
  {link: "/make", label: "Make", description: "DIY stuff, Raspberry Pi, Arduino projects"},
  {link: "/make/robot", label: "Robot", description: "Developing my platform, PCB and software, all open source"},
  {link: "/science", label: "Science", description: "Popularizing articles about math"},
  {link: "/ai", label: "AI", description: "Honest review of current methods. No BS"},
  {link: "/code", label: "Code", description: "Software developer corner"},
  {link: "/gamedev", label: "Gamedev", description: "My game projects"},
  {link: "/projects", label: "Projects", description: "Just interesting stuff, possible startup ideas"},
  {link: "/ideas", label: "Ideas", description: "More wild ideas"},
  {link: "/blog", label: "Blog", description: "Different topics from my personal perspective"},
  {link: "/about", label: "About", description: "Short introduction"},
  {link: "/cv", label: "CV", description: "My experience in one page"},
]

const ruItems = [
  {link: "/ru/", label: "Главная", description: ""},
  {link: "/ru/neural-networks", label: "Нейронные сети", description: ""},
  {link: "/ru/make", label: "Мастерская", description: ""},
  {link: "/ru/devlog", label: "Девлог", description: ""},
  {link: "/ru/paranormal", label: "Паранормальное", description: ""},
  {link: "/ru/board-games", label: "Настольные игры", description: ""},
  {link: "/ru/blog", label: "Остальное", description: ""},
  {link: "/ru/about", label: "О себе", description: ""},
]

class MenuPopup extends React.Component {
  constructor(props) {
    super(props)
    this.language = this.props.language
  }

  openRuVersion() {
    this.language = "ru"
  }

  openEnVersion() {
    this.language = "en"
  }

  render() {
    return (
      <div className={styles.menu}>
        <Search />
        <div className={styles.back}>
          {this.language === "ru" ? (
            <div className={styles.featuredlink}>
              <a href="/ru/make/hydroponics">
                <div className={styles.featuredspace}>
                  <img className={styles.newtag} src="/new.png" alt="tag saying NEW" />
                  <img className={styles.featuredimage} src="/hydroponics.png" alt="plant in the pot" />
                </div>
              </a>
            </div>) : ""}
          {(this.language === "en" ? items : ruItems).map(i =>
            <div className={styles.menuitem} key={i.link}>
              <h2>
                <a
                  href={i.link}
                  onClick={this.props.closeCallback}
                >
                  {i.label}
                </a>
              </h2>
              <p>{i.description}</p>
            </div>
          )}
          {this.language === "en" && (
            <p className={styles.hint}>
              There is also a <a href="/ru" onClick={this.openRuVersion.bind(this)}>Russian version</a> of this website
            </p>
          ) || (
            <p className={styles.hint}>
              There is also an <a href="/" onClick={this.openEnVersion.bind(this)}>English version</a> of this website
            </p>
          )}
        </div>
      </div>
    )
  }
}

MenuPopup.propTypes = {
  closeCallback: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
}

export default MenuPopup
