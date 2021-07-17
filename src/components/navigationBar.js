import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./navigationBar.module.css"
import MenuPopup from './menuPopup'

const query = graphql`
  {
    file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
        )
      }
    }
}
`

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
                language="en"
                closeCallback={this.closeCallback}
              />
            )}
            <nav className={styles.mobilenav}>
              <img className={styles.burgermenu} onClick={this.openMenu.bind(this)} src="/images/burger.svg" />
              <GatsbyImage className={styles.logomenu} image={data.file.childImageSharp.gatsbyImageData} alt="N stands for Nikolay Neupokoev"/>
              <img className={styles.searchmenu} src="" />
            </nav>
            <nav className={styles.topnav}>
              <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} style={{float: 'left', height: '100%'}} alt="N stands for Nikolay Neupokoev"/>
              <Link to="/" className={styles.titlelink} style={{backgroundColor: '#211a1d', color: '#f2f2f2'}}>Nikolay Neupokoev</Link>
              <Link to="/ideas/" { ...(active === "ideas" && { className: styles.activelink }) }>Ideas</Link>
              <Link to="/projects/" { ...(active === "projects" && { className: styles.activelink }) }>Projects</Link>
              <Link to="/science/" { ...(active === "science" && { className: styles.activelink }) }>Science</Link>
              <Link to="/blog/" { ...(active === "blog" && { className: styles.activelink }) }>Blog</Link>
              <Link to="/about/" style={{float: 'right'}} { ...(active === "about" && { className: styles.activelink }) }>About</Link>
              <Link to="/cv/" style={{float: 'right'}} { ...(active === "cv" && { className: styles.activelink }) }>CV</Link>
            </nav>
          </>
        )}
      />
    )
  }
}

export default Navbar
