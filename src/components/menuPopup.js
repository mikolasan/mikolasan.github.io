import React from 'react'
import PropTypes from "prop-types"
import * as styles from './menuPopup.module.css'

class MenuPopup extends React.Component {
  constructor(props) {
    super(props)
    this.items = [
      {link: "/", label: "Home"},
      {link: "/ideas/", label: "Ideas"},
      {link: "/projects/", label: "Projects"},
      {link: "/science/", label: "Science"},
      {link: "/blog/", label: "Blog"},
      {link: "/about/", label: "About"},
      {link: "/cv/", label: "CV"},
    ]
    this.ruItems = [
      {link: "/ru/", label: "Главная"},
      {link: "/ru/neural-networks", label: "Нейронные сети"},
      {link: "/ru/make", label: "Мастерская"},
      {link: "/ru/devlog", label: "Девлог"},
      {link: "/ru/paranormal", label: "Паранормальное"},
      {link: "/ru/board-games", label: "Настольные игры"},
      {link: "/ru/blog", label: "Остальное"},
      {link: "/ru/about", label: "О себе"},
    ]
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
        <div className={styles.topline}>
          <img
            className={styles.close}
            onClick={this.props.closeCallback}
            src="/images/cross.svg"
          />
        </div>
        
        <div className={styles.back}>
          {(this.language === "en" ? this.items : this.ruItems).map(i => <div className={styles.menuitem} key={i.link}>
            <a
              href={i.link}
              onClick={this.props.closeCallback}>
              {i.label}
            </a>
          </div>)}
          {this.language === "en" && (
            <p className={styles.hint}>There is also a <a href="#" onClick={this.openRuVersion.bind(this)}>Russian version</a> of this website</p>
          ) || (
            <p className={styles.hint}>There is also an <a href="#" onClick={this.openEnVersion.bind(this)}>English version</a> of this website</p>
          )}
        </div>
      </div>
    )
  }
}

MenuPopup.propTypes = {
  closeCallback: PropTypes.func.isRequired,
  languange: PropTypes.string.isRequired
}

export default MenuPopup