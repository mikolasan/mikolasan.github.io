import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => (
  <StaticQuery
    query={graphql`
      query IndexImageQuery {
        file(relativePath: { eq: "index-3.jpg" }) {
          childImageSharp {
            fluid(
              srcSetBreakpoints: [576, 768, 922],
              maxHeight: 400,
              maxWidth: 1400,
              cropFocus: ATTENTION,
              fit: COVER,
              duotone: {
                highlight: "#4B5043",
                shadow: "#211A1D"
              },
              quality: 100
            ) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <div style={{minHeight:"300px", maxHeight: "400px"}}>
        <Img 
          fluid={data.file.childImageSharp.fluid}
          style={{minHeight:"300px", maxHeight: '400px'}} 
        />
      </div>
    )}
  />
)