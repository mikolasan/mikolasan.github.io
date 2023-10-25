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

class LayoutBase extends React.Component {
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
      title,
      published,
      publishedText,
      lastUpdated,
      updatedText,
      section,
      subsection,
      crumbs,
      buttonText,
      buttonLink,
      secondButtonText,
      secondButtonLink,
      featuredImage,
      bannerParagraph,
      mainConf,
      languageName
    } = this.props
    
    const imageData = getImage(featuredImage);
    const imageSrc = getSrc(featuredImage);

    const wideImage = (
      <FeaturedImage
        image={imageData}
        title={title}
        buttonText={buttonText}
        buttonLink={buttonLink}
        secondButtonText={secondButtonText}
        secondButtonLink={secondButtonLink}
        published={published}
        lastUpdated={lastUpdated}
      >
        {bannerParagraph}
      </FeaturedImage>
    )

    const banner = bannerParagraph && (
      <Banner
        buttonText={buttonText}
        buttonLink={buttonLink}
        secondButtonText={secondButtonText}
        secondButtonLink={secondButtonLink}
        published={published}
        publishedText={publishedText}
        lastUpdated={lastUpdated}
        updatedText={updatedText}
      >
        {bannerParagraph}
      </Banner>
    ) || ``

    const header = (
      <Header
        section={section}
        subsection={subsection}
        crumbs={crumbs}
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
        {featuredImage && wideImage || banner}
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

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  languageName: PropTypes.string.isRequired,
  publishedText: PropTypes.string.isRequired,
  updatedText: PropTypes.string.isRequired,
}

export default LayoutBase
