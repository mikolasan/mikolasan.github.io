import React from "react"
import PropTypes from "prop-types"
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
  
  render() {
    const {
      children,
      title,
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
    return (
      <>
        <Title title={title + " - N"} />
        <Header section={section}
          buttonText={buttonText}
          buttonLink={buttonLink}
          secondButtonText={secondButtonText}
          secondButtonLink={secondButtonLink}
          featuredImage={featuredImage}
          bannerParagraph={bannerParagraph}
          title={title}
          published={published}
          lastUpdated={lastUpdated}
          crumbs={crumbs}
        />
        <main className="centered">
          <div className="left-section"></div>
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
            {(published && lastUpdated) && (<div className="mobile-time-block">
              <span>Published: <time>{published}</time></span>
              <span>Updated: <time>{lastUpdated}</time></span>
            </div>) || ''}
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
