import React from "react"
import PropTypes from "prop-types"
import { getImage, getSrc } from "gatsby-plugin-image"

import Banner from "../components/banner"
import FeaturedImage from "../components/featuredImage"
import MainBase from "./mainBase"
import MenuPopup from "./menuPopup"
import Footer from "./footerBase"
import Header from "./header"
import Search from "./allPagesSearch"

class LayoutNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.errorCallback = this.errorCallback.bind(this)
    this.menuClicked = this.menuClicked.bind(this)
    this.closeCallback = this.closeMenu.bind(this)
    this.searchClicked = this.searchClicked.bind(this)
    this.state = {
      menuOpen: false,
      searchOpen: false,
      errorMessage: ""
    }
  }

  errorCallback(errorMessage) {
    this.setState({
      errorMessage: errorMessage
    })
  }
  
  menuClicked() {
    this.setState({
      menuOpen: !this.state.menuOpen,
      searchOpen: false
    })
  }

  openMenu() {
    this.setState({ menuOpen: true })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  searchClicked() {
    if (this.state.menuOpen) return

    this.setState({ searchOpen: !this.state.searchOpen})
  }

  render() {
    const {
      children,
      section,
      subsection,
      mainConf,
      languageName
    } = this.props
    
    const header = (
      <Header
        section={section}
        subsection={subsection}
        language={languageName}
        menuOpen={this.state.menuOpen}
        menuClickedCallback={this.menuClicked}
        searchOpen={this.state.searchOpen}
        searchClickedCallback={this.searchClicked}
      />
    )

    const fullscreenMenu = (
      <>
        {header}
        <MenuPopup
          language={languageName}
          closeCallback={this.closeCallback}
        />
      </>
    )

    const fullPage = (
      <div className={"language-" + languageName}>
        {header}
        {this.state.searchOpen && (
          <div className="searchline">
            <Search />
          </div>
        )}
        <MainBase
          mainConf={mainConf}
          errorCallback={this.errorCallback}
          errorMessage={this.state.errorMessage}
          {...this.props}
        >
          {children}
        </MainBase>
        <Footer language={languageName} />
      </div>
    )

    const isMenuOpen = this.state.menuOpen
    const currentLayout = isMenuOpen && fullscreenMenu || fullPage
    return currentLayout
  }
}

LayoutNavigation.propTypes = {
  children: PropTypes.node.isRequired,
  languageName: PropTypes.string.isRequired,
  publishedText: PropTypes.string.isRequired,
  updatedText: PropTypes.string.isRequired,
}

export default LayoutNavigation
