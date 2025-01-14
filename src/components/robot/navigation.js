import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

const Navigation = () => {
  const data = useStaticQuery(graphql`
    query NavigationQuery {
      navNodes: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/NAV.md/"}}
      ) {
        nodes {
          excerpt
          fileAbsolutePath
          id
          html
        }
      }
    }
  `)
  return (
    <>
      <nav 
        className="side-navigation" 
        dangerouslySetInnerHTML={{ __html: data.navNodes.nodes[0].html }}
      >
      </nav>
    </>
  )
}

export default Navigation

// export const query = graphql`
//   query NavigationQuery {
//     navNodes: allMarkdownRemark(
//       filter: {fileAbsolutePath: {regex: "/NAV.md/"}}
//     ) {
//       nodes {
//         excerpt
//         fileAbsolutePath
//         id
//       }
//     }
//   }
// `