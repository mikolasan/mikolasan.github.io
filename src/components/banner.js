import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const query = graphql`
  query BannerImageQuery {
    file(relativePath: { eq: "index-7.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED,
          breakpoints: [576, 768, 922, 1400],
          transformOptions: {
            cropFocus: CENTER,
            fit: COVER,
          },
          quality: 100
        )
      }
    }
  }
`

const Banner = ({
  children,
  buttonText,
  buttonLink,
  secondButtonText,
  secondButtonLink
}) => (
  <StaticQuery
    query={query}
    render={data => (
      <div className="banner">
        <div className="banner-background">
          <GatsbyImage
            image={data.file.childImageSharp.gatsbyImageData}
            style={{height: '400px'}}
            alt="Car forest"
          />
        </div>
        <div className="banner-text">
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

export default Banner