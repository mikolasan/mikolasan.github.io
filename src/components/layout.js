import React from "react"
import PropTypes from "prop-types"
import Reactions from "./reactions"
import Footer from "./footer"
import Header from "./header"
import Title from "./title"
import RelatedArticles from "./recentArticles"
import "./layout.css"

const Layout = ({ 
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
}) => { 
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
    <main>
      <div className="left-section"></div>
      <div className="main-section">
        {!featuredImage && (
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
        )}
        {children}
        {showLikes && (
          <section>
            <Reactions />
          </section>
        )}
      </div>
      <RelatedArticles query={recentArticles} />
    </main>

    <Footer languageName={languageName} languageLink={anotherLanguageLink} />
  </>
)}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
