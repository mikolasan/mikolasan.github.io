import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ children, buttonText, buttonLink, secondButtonText, secondButtonLink }) => (
  <StaticQuery
    query={graphql`
      query BannerImageQuery {
        file(relativePath: { eq: "index-7.jpg" }) {
          childImageSharp {
            fluid(
              srcSetBreakpoints: [576, 768, 922, 1400],
              maxHeight: 400,
              maxWidth: 1920,
              cropFocus: CENTER,
              fit: COVER,
              quality: 100
            ) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <div class="container">
        <div style={{minHeight:"350px", maxHeight: "400px"}}>
          <Img 
            fluid={data.file.childImageSharp.fluid}
            style={{minHeight:"350px", maxHeight: '400px'}} 
          />
        </div>
        <div class="container-text">
          <div class="featured-area">
            <div class="featured-text">{children}</div>
            {(buttonText && buttonLink) && (
              <div class="featured-action">
                <a href={buttonLink}>
                  <button class="action-button">{buttonText}</button>
                </a>
              </div>
            ) || ''}
            {(secondButtonText && secondButtonLink) && (
              <div class="featured-second-action">
                <a href={secondButtonLink}>
                  <button class="second-action-button">{secondButtonText}</button>
                </a>
              </div>
            ) || ''}
          </div>
        </div>
      </div>
    )}
  />
)