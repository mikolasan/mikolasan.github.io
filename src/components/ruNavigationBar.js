import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./navigationBar.module.css"
import MenuPopup from './menuPopup'

const query = graphql`
query RuLogoQuery {
  file(relativePath: { eq: "logo.png" }) {
    childImageSharp {
      gatsbyImageData(
        layout: FIXED
      )
    }
  }
}
`

class RuNavbar extends React.Component {
  constructor (props) {
    super(props)
    this.active = props.active
    this.state = {
      menuOpen: false,
    }
    this.menuClicked = this.openMenu.bind(this)
    this.closeCallback = this.closeMenu.bind(this)
  }

  openMenu() {
    this.setState({ menuOpen: true })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  render () {
    const active = this.active
    return (
      <StaticQuery
        query={query}
        render={data => (
          <>
            {this.state.menuOpen && (
              <MenuPopup
                language="ru"
                closeCallback={this.closeCallback}
              />
            )}
            <nav className={styles.mobilenav}>
              <img className={styles.burgermenu} onClick={this.openMenu.bind(this)} src="/images/burger.svg" />
              <GatsbyImage className={styles.logomenu} image={data.file.childImageSharp.gatsbyImageData} alt="N stands for Nikolay Neupokoev"/>
              <img className={styles.searchmenu} src="" />
            </nav>
            <nav className={styles.topnav}>
              <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} style={{float: 'left'}} alt="N означает либо Николай, либо Неупокоев, либо и то и другое"/>
              <Link to="/ru" className={styles.titlelink} style={{backgroundColor: '#211a1d', color: '#f2f2f2'}}>Николай Неупокоев</Link>
              <Link to="/ru/ideas/" { ...(active === "ideas" && { className: styles.activelink }) }>Идеи</Link>
              <Link to="/ru/projects/" { ...(active === "projects" && { className: styles.activelink }) }>Проекты</Link>
              <Link to="/ru/science/" { ...(active === "science" && { className: styles.activelink }) }>Наука</Link>
              <Link to="/ru/blog/" { ...(active === "blog" && { className: styles.activelink }) }>Блог</Link>
              <Link to="/ru/about/" style={{float: 'right'}} { ...(active === "about" && { className: styles.activelink }) }>О себе</Link>
              <Link to="/ru/cv/" style={{float: 'right'}} { ...(active === "cv" && { className: styles.activelink }) }>Резюме</Link>
              </nav>
          </>
        )}
      />
    )
  }
}

export default RuNavbar
