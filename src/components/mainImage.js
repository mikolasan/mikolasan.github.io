import React from "react"
import { StaticImage } from "gatsby-plugin-image"

export default () => (
  <div style={{minHeight:"300px", maxHeight: "300px"}}>
    <StaticImage 
      src="../images/index-7.jpg"
      alt="Car forest"
      placeholder="blurred"
      layout="constrained"
      breakpoints={[576, 768, 922, 1400]}
      transformOptions={{
        cropFocus: "attention",
        fit: "cover",
      }}
      quality={100}
      style={{minHeight:"300px", maxHeight: '300px'}}
    />
  </div>
)
