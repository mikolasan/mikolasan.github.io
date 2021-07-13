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
      {link: "/ru/ideas/", label: "Идеи"},
      {link: "/ru/projects/", label: "Проекты"},
      {link: "/ru/science/", label: "Наука"},
      {link: "/ru/blog/", label: "Блог"},
      {link: "/ru/about/", label: "О себе"},
      {link: "/ru/cv/", label: "Резюме"},
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
        <div className={styles.back}>
          {(this.language === "en" ? this.items : this.ruItems).map(i => <div className={styles.menuitem} key={i}>
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
        <img
          className={styles.close}
          onClick={this.props.closeCallback}
          src="/images/cross.svg"
        />
      </div>
    )
  }
}

MenuPopup.propTypes = {
  closeCallback: PropTypes.func.isRequired,
  languange: PropTypes.string.isRequired
}

export default MenuPopup
