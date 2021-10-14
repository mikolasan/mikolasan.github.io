import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import MainImage from "../components/mainImage"

const FeaturedImage = ({ imgFluid, title, published, lastUpdated }) => {
  if (imgFluid) {
    return (
      <div className="banner">
        <div className="banner-background">
          <GatsbyImage
            image={imgFluid}
            style={{minHeight:"300px", maxHeight: '400px'}}
            alt="Featured image"
          />
        </div>
        <div className="banner-text">
          <div className="featured-area">
            <div className="featured-text">
              <h1>{title}</h1>
            </div>
            <div className="time-block">
              <span>Published: <time>{published}</time></span>
              <span>Updated: <time>{lastUpdated}</time></span>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <MainImage />
  }
}

export default FeaturedImage