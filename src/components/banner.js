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
      <div className="container">
        <div style={{height: "400px"}}>
          <Img
            fluid={data.file.childImageSharp.fluid}
            style={{height: '400px'}}
          />
        </div>
        <div className="container-text">
          <div className="featured-area">
            <div className="featured-text">{children}</div>
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
        </div>
      </div>
    )}
  />
)
