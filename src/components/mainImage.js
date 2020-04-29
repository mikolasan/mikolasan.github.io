import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => (
  <StaticQuery
    query={graphql`
      query IndexImageQuery {
        file(relativePath: { eq: "index-4.png" }) {
          childImageSharp {
            fluid(quality: 100, fit: COVER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <div style={{ maxHeight: "100%", height: "300px" }}>
        <Img 
          fluid={data.file.childImageSharp.fluid}
          style={{maxHeight: '100%'}}
        />
      </div>
    )}
  />
)