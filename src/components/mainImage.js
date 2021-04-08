import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default () => (
  <StaticQuery
    query={graphql`
      query IndexImageQuery {
        file(relativePath: { eq: "index-7.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED,
              breakpoints: [576, 768, 922, 1400],
              transformOptions: {
                cropFocus: CENTER,
                fit: COVER,
              },
              quality: 100
            )
          }
        }
      }
    `}
    render={data => (
      <div style={{minHeight:"350px", maxHeight: "400px"}}>
        <GatsbyImage 
          image={data.file.childImageSharp.gatsbyImageData}
          style={{minHeight:"350px", maxHeight: '400px'}}
          alt="Car forest"
        />
      </div>
    )}
  />
)
