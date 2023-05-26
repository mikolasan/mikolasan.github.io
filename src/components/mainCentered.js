import React from "react"

import Reactions from "./reactions"
import RelatedArticles from "./recentArticles"

const MainCentered = ({
  publishedText,
  published,
  updatedText,
  lastUpdated,
  bannerParagraph,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink,
  children,
  showLikes,
  recentArticles,
  errorCallback,
  errorMessage
}) => {
  const timeBlock = (published, lastUpdated, addClass) => {
    const time = <>
      {published && <span>{publishedText}<time id="_datePublished3" itemprop="datePublished" content={published}>{published}</time></span>}
      {lastUpdated && <span>{updatedText}<time>{lastUpdated}</time></span>}
    </>
    return (published || lastUpdated) && <div className={addClass + " time-block"}>
      {time}
    </div> || ` `
  }
  
  return (
    <main className="centered">
      <div className="left-section">
        {timeBlock(published, lastUpdated, "left-time-block")}
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
        {timeBlock(published, lastUpdated, "mobile-time-block")}
        {children}
        {showLikes && (
          <>
            <Reactions errorCallback={errorCallback} />
            <div>{errorMessage}</div>
          </>
        )}
      </div>
      <RelatedArticles query={recentArticles} />
    </main>
  )
}

export default MainCentered;