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

  return (
    <>
      <div className="banner">
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
    </>
    
  )
}

export default Banner