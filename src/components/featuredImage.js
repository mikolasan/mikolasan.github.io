import React from "react"
import Img from "gatsby-image"
import MainImage from "../components/mainImage"

export default (props) => {
  const featuredImgFluid = props.imgFluid;
  if (featuredImgFluid) {
    return (
      <div>
        <Img fluid={featuredImgFluid} />
      </div>
    )
  } else {
    return <MainImage></MainImage>
  }
}