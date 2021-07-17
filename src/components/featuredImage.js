import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import MainImage from "../components/mainImage"
import * as styles from './featuredImage.module.css'

export default (props) => {
  const featuredImgFluid = props.imgFluid;
  if (featuredImgFluid) {
    return (
      <div className={styles.featuredimage}>
        <GatsbyImage image={featuredImgFluid} style={{minHeight:"300px", maxHeight: '400px'}} alt="Featured image" />
      </div>
    )
  } else {
    return <MainImage />
  }
}
