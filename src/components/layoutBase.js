import React from "react"
import PropTypes from "prop-types"
import { getImage, getSrc } from "gatsby-plugin-image"

import Banner from "../components/banner"
import FeaturedImage from "../components/featuredImage"
import MainBase from "./mainBase"
import MenuPopup from "./menuPopup"
import Footer from "./footerBase"
import Header from "./header"

class LayoutBase extends React.Component {
  constructor(props) {
    super(props)
    this.errorCallback = this.errorCallback.bind(this)
    this.menuClicked = this.menuClicked.bind(this)
    this.closeCallback = this.closeMenu.bind(this)
    this.state = {
      menuOpen: false,
      errorMessage: "null"
    }
  }

  errorCallback(errorMessage) {
    this.setState({
      errorMessage: errorMessage
    })
  }
  
  menuClicked() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  openMenu() {
    this.setState({ menuOpen: true })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }

  render() {
    const {
      children,
      title,
      description,
      pageUrl,
      published,
      publishedText,
      lastUpdated,
      updatedText,
      section,
      showLikes,
      crumbs,
      anotherLanguageLink,
      buttonText,
      buttonLink,
      secondButtonText,
      secondButtonLink,
      featuredImage,
      bannerParagraph,
      recentArticles
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
        lastUpdated={lastUpdated}
      >
        {bannerParagraph}
      </Banner>
    ) || ``

    return (
      <>
        {this.state.menuOpen && (
          <>
            <Header
              crumbs={crumbs}
              language={this.props.languageName}
              menuOpen={this.state.menuOpen}
              menuClickedCallback={this.menuClicked}
              section={section}
            />
            <MenuPopup
              language={this.props.languageName}
              closeCallback={this.closeCallback}
            />
          </>
        ) || (
          <>
            <Header
              crumbs={crumbs}
              language={this.props.languageName}
              menuClickedCallback={this.menuClicked}
              section={section}
            />
            {featuredImage && wideImage || banner}
            <MainBase
              children={children}
              mainConf={this.props.mainConf}
              errorCallback={this.errorCallback}
              errorMessage={this.state.errorMessage}
              {...this.props}
            />
            <Footer language={this.props.languageName} />
          </>
        )}
      </>
    )
  }
}

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  languageName: PropTypes.string.isRequired,
  publishedText: PropTypes.string.isRequired,
  updatedText: PropTypes.string.isRequired,
  titleEnding: PropTypes.string.isRequired,
}

export default LayoutBase
