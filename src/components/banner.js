import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Banner = ({
  children,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink,
  published,
  publishedText,
  lastUpdated,
  updatedText
}) => {
  const button = (buttonText && buttonLink) && (
    <div className="featured-action">
      <a href={buttonLink}>
        <button className="action-button">{buttonText}</button>
      </a>
    </div>
  ) || ''

  const secondButton = (secondButtonText && secondButtonLink) && (
    <div className="featured-second-action">
      <a href={secondButtonLink}>
        <button className="second-action-button">{secondButtonText}</button>
      </a>
    </div>
  ) || ''

  const timeBlock = (published, lastUpdated, addClass) => {
    const time = <>
      {published && <span>{publishedText}<time id="_datePublished3" itemProp="datePublished" content={published}>{published}</time></span>}
      {lastUpdated && <span>{updatedText}<time>{lastUpdated}</time></span>}
    </>
    return (published || lastUpdated) && <div className={addClass + " time-block"}>
      {time}
    </div> || ` `
  }

  return (
    <>
      <div className="banner">
        <div className="banner-background">
          <StaticImage 
            src="../images/index-7.jpg"
            alt="Car forest"
            placeholder="blurred"
            layout="constrained"
            breakpoints={[576, 768, 922, 1400]}
            transformOptions={{
              cropFocus: "attention",
              fit: "cover",
            }}
            quality={100}
            style={{minHeight:"300px", maxHeight: '300px'}}
          />
        </div>
        <div className="banner-text">
          <div className="featured-area">
            <div className="featured-text">
              {children}
            </div>
            {button}
            {secondButton}
          </div>
        </div>
      </div>
      <div className="mobile-header">
        {children}
        {timeBlock(published, lastUpdated, "mobile-time-block")}
        {button}
        {secondButton}
      </div>
    </>
    
  )
}

export default Banner