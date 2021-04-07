import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import MainImage from "../components/mainImage"

export default (props) => {
  const featuredImgFluid = props.imgFluid;
  if (featuredImgFluid) {
    return (
      <div style={{minHeight:"300px", maxHeight: "400px"}}>
        <GatsbyImage image={featuredImgFluid} style={{minHeight:"300px", maxHeight: '400px'}} />
      </div>
    )
  } else {
    return <MainImage />
  }
}
