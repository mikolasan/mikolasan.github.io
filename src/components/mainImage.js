import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => (
  <StaticQuery
    query={graphql`
      query IndexImageQuery {
        file(relativePath: { eq: "index-2.jpg" }) {
          childImageSharp {
            fixed(height: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <div style={{ maxHeight: "100%", height: "300px" }}>
        <Img fixed={data.file.childImageSharp.fixed} style={{maxHeight: '100%'}} />
      </div>
    )}
  />
)