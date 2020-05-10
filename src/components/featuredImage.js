import React from "react"
import Img from "gatsby-image"
import MainImage from "../components/mainImage"

export default (props) => {
  const featuredImgFluid = props.imgFluid;
  if (featuredImgFluid) {
    return (
      <div style={{ maxHeight: "400px" }}>
        <Img fluid={featuredImgFluid} style={{maxHeight: '400px'}} />
      </div>
    )
  } else {
    return <MainImage></MainImage>
  }
}