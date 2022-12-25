import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { absPathToUrl } from "../nifty"

const BrainModelPage = ({ data }) => {
  const aiNodes = data.aiNodes.nodes

  return (
    <Layout 
      title="Brain model"
      section="ai"
    >
      <h1>Brain model</h1>
      <h2>Big topics A-Z</h2>
      {aiNodes.map(node => {
        return (
          <div>
            <Link to={absPathToUrl(node.fileAbsolutePath)}><h3>{node.frontmatter.title}</h3></Link>
            <p>{node.frontmatter?.description}</p>
          </div>
        )})
      }

    </Layout>
  )
}

export default BrainModelPage

export const query = graphql`
  query SitemapQuery {
    aiNodes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/ai\//"},
        frontmatter: {topic: {eq: true}}
      }
      sort: {order: ASC, fields: fileAbsolutePath}
    ) {
      nodes {
        frontmatter {
          title
          description
        }
        fileAbsolutePath
        id
      }
    }
  }
`