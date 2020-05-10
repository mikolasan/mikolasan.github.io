import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => (
  <StaticQuery
    query={graphql`
      query IndexImageQuery {
        file(relativePath: { eq: "index-4.jpg" }) {
          childImageSharp {
            fluid(
              srcSetBreakpoints: [576, 768, 922],
              maxHeight: 400,
              maxWidth: 1400,
              cropFocus: ATTENTION,
              fit: COVER,
              duotone: {
                highlight: "#f2f2f2",
                shadow: "#211a1d"
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
      <div style={{ maxHeight: "400px" }}>
        <Img 
          fluid={data.file.childImageSharp.fluid}
          style={{maxHeight: '400px'}} 
        />
      </div>
    )}
  />
)