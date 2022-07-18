import React from "react"
import PropTypes from "prop-types"
import Reactions from "./reactions"
import Footer from "../components/ruFooter"
import Header from "../components/ruHeader"
import Title from "../components/title"

const RuLayout = ({
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
}) => (
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
        {(published && lastUpdated) && (<div className="mobile-time-block time-block">
          <span>Опубликовано: <time>{published}</time></span>
          <span>Последние правки: <time>{lastUpdated}</time></span>
        </div>) || ''}
        {children}
        {showLikes && (
          <aside>
            <Reactions />
          </aside>
        )}
      </div>
    </main>
    <Footer languageName={languageName} languageLink={anotherLanguageLink} />
  </>
)

RuLayout.propTypes = {
  children: PropTypes.node.isRequired,
  languageName: PropTypes.node.isRequired,
  anotherLanguageLink: PropTypes.node.isRequired,
}

export default RuLayout
