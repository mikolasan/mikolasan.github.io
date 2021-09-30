import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./navigationBar.module.css"
import MenuPopup from './menuPopup'

class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.active = props.active
    this.state = {
      menuOpen: false,
    }
    this.menuClicked = this.openMenu.bind(this)
    this.closeCallback = this.closeMenu.bind(this)
  }

  openMenu () {
    this.setState({ menuOpen: true })
  }

  closeMenu () {
    this.setState({ menuOpen: false })
  }

  render () {
    const active = this.active
    return (
      <>
        {this.state.menuOpen && (
          <MenuPopup
            language="en"
            closeCallback={this.closeCallback}
          />
        )}
        <nav className={styles.mobilenav}>
          <img className={styles.burgermenu} onClick={this.openMenu.bind(this)} src="/images/burger.svg" />
          <svg className={styles.mobilelogo} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 254 289" stroke="none" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
              d="M 254.00,289.00
                C 254.00,289.00 195.93,289.00 195.93,289.00
                  195.93,289.00 136.74,207.29 136.74,207.29
                  136.74,207.29 57.69,289.00 57.69,289.00
                  57.69,289.00 -0.00,289.00 -0.00,289.00
                  -0.00,289.00 -0.00,0.00 -0.00,0.00
                  -0.00,0.00 57.69,0.00 57.69,0.00
                  57.69,0.00 196.31,190.79 196.31,190.79
                  196.31,190.79 196.31,0.00 196.31,0.00
                  196.31,0.00 254.00,0.00 254.00,0.00
                  254.00,0.00 254.00,289.00 254.00,289.00 Z
                M 57.69,98.21
                C 57.69,98.21 57.69,205.04 57.69,205.04
                  57.69,205.04 102.65,160.06 102.65,160.06
                  102.65,160.06 57.69,98.21 57.69,98.21 Z" 
            />
          </svg>
          <img className={styles.searchmenu} src="" />
        </nav>
        <nav className={styles.topnav}>
          <Link to="/" { ...(active === "root" && { className: [styles.activelink, styles.toplogo].join(' ') } || { className: styles.toplogo }) }>
            <svg className={styles.toplogo} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 254 289" stroke="none" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                d="M 254.00,289.00
                  C 254.00,289.00 195.93,289.00 195.93,289.00
                    195.93,289.00 136.74,207.29 136.74,207.29
                    136.74,207.29 57.69,289.00 57.69,289.00
                    57.69,289.00 -0.00,289.00 -0.00,289.00
                    -0.00,289.00 -0.00,0.00 -0.00,0.00
                    -0.00,0.00 57.69,0.00 57.69,0.00
                    57.69,0.00 196.31,190.79 196.31,190.79
                    196.31,190.79 196.31,0.00 196.31,0.00
                    196.31,0.00 254.00,0.00 254.00,0.00
                    254.00,0.00 254.00,289.00 254.00,289.00 Z
                  M 57.69,98.21
                  C 57.69,98.21 57.69,205.04 57.69,205.04
                    57.69,205.04 102.65,160.06 102.65,160.06
                    102.65,160.06 57.69,98.21 57.69,98.21 Z" 
              />
            </svg>
          </Link>
          <Link to="/ideas/" { ...(active === "ideas" && { className: styles.activelink }) }>Ideas</Link>
          <Link to="/projects/" { ...(active === "projects" && { className: styles.activelink }) }>Projects</Link>
          <Link to="/science/" { ...(active === "science" && { className: styles.activelink }) }>Science</Link>
          <Link to="/blog/" { ...(active === "blog" && { className: styles.activelink }) }>Blog</Link>
          <Link to="/about/" style={{float: 'right'}} { ...(active === "about" && { className: styles.activelink }) }>About</Link>
          <Link to="/cv/" style={{float: 'right'}} { ...(active === "cv" && { className: styles.activelink }) }>CV</Link>
        </nav>
      </>
    )
  }
}

export default Navbar
