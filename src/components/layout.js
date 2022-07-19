import React from "react"
import PropTypes from "prop-types"
import { getImage, getSrc } from "gatsby-plugin-image"
import Reactions from "./reactions"
import Footer from "./footer"
import Header from "./header"
import Title from "./title"
import RelatedArticles from "./recentArticles"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.errorCallback = this.errorCallback.bind(this)
    this.state = {
      errorMessage: "null"
    }
  }

  errorCallback(errorMessage) {
    this.setState({
      errorMessage: errorMessage
    })
  }
  
  timeBlock(published, lastUpdated, addClass) {
    const timeBlock = <>
      {published && <span>Published: <time>{published}</time></span>}
      {lastUpdated && <span>Updated: <time>{lastUpdated}</time></span>}
    </>
    return (published || lastUpdated) && <div className={addClass + " time-block"}>
      {timeBlock}
    </div> || ` `
  }

  render() {
    const {
      children,
      title,
      description,
      pageUrl,
      published,
      lastUpdated,
      section,
      showLikes,
      crumbs,
      languageName,
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
    return (
      <>
        <Title
          title={title + " - N"}
          imageUrl={imageSrc}
          pageUrl={pageUrl}
          description={description}
          meta={[]}
        />
        <Header section={section}
          buttonText={buttonText}
          buttonLink={buttonLink}
          secondButtonText={secondButtonText}
          secondButtonLink={secondButtonLink}
          featuredImage={imageData}
          bannerParagraph={bannerParagraph}
          title={title}
          crumbs={crumbs}
        />
        <main className="centered">
          <div className="left-section">
            {this.timeBlock(published, lastUpdated, "left-time-block")}
          </div>
          <div className="main-section">
            <div className="mobile-header">
              {bannerParagraph}
              {(buttonText && buttonLink) && (
                <div className="featured-action">
                  <a href={buttonLink}>
                    <button className="action-button">{buttonText}</button>
                  </a>
                </div>
              ) || ''}
              {(secondButtonText && secondButtonLink) && (
                <div className="featured-second-action">
                  <a href={secondButtonLink}>
                    <button className="second-action-button">{secondButtonText}</button>
                  </a>
                </div>
              ) || ''}
            </div>
            {this.timeBlock(published, lastUpdated, "mobile-time-block")}
            {children}
            {showLikes && (
              <>
                <Reactions errorCallback={this.errorCallback} />
                <div>{this.state.errorMessage}</div>
              </>
            )}
          </div>
          <RelatedArticles query={recentArticles} />
        </main>

        <Footer languageName={languageName} languageLink={anotherLanguageLink} />
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
