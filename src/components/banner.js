import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Banner = ({
  children,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink,
  published,
  lastUpdated
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
  const timeBlock = (published && lastUpdated) && (<div className="absolute-time-block time-block">
      <span>Published: <time>{published}</time></span>
      <span>Updated: <time>{lastUpdated}</time></span>
    </div>
  ) || ''

  return (
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
          <div className="featured-text">{children}</div>
          {timeBlock}
          {button}
          {secondButton}
        </div>
      </div>
    </div>
  )
}

export default Banner