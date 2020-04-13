import React from "react"
import Img from "gatsby-image"
import MainImage from "../components/mainImage"

export default (props) => {
  const featuredImgFluid = props.imgFluid;
  if (featuredImgFluid) {
    return (
      <div style={{ maxHeight: "100%", height: "300px" }}>
        <Img fluid={featuredImgFluid} style={{maxHeight: '100%'}} />
      </div>
    )
  } else {
    return <MainImage></MainImage>
  }
}