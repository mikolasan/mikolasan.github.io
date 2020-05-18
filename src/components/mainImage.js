import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => (
  <StaticQuery
    query={graphql`
      query IndexImageQuery {
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
      <div style={{minHeight:"350px", maxHeight: "400px"}}>
        <Img 
          fluid={data.file.childImageSharp.fluid}
          style={{minHeight:"350px", maxHeight: '400px'}} 
        />
      </div>
    )}
  />
)