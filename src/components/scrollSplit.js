import React from "react"

const ScrollSplit = ({
  children,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink,
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
      <div className="mobile-header">
        {children}
        {button}
        {secondButton}
      </div>
    </>
    
  )
}

export default ScrollSplit