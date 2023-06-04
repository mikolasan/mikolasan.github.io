import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import MainImage from "../components/mainImage"

const FeaturedImage = ({
  children,
  image,
  title,
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

  if (image) {
    return (
      <div className="banner">
        <div className="banner-background">
          <GatsbyImage
            image={image}
            style={{minHeight:"300px", maxHeight: '300px'}}
            alt="Featured image"
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
    )
  } else {
    return <MainImage />
  }
}

export default FeaturedImage