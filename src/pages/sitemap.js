import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { absPathToUrl } from "../nifty"

const SitemapPage = ({ data }) => {
  const scienceNodes = data.scienceNodes.nodes
  const codingNodes = data.codingNodes.nodes

  return (
    <Layout 
      title="Sitemap"
    >
      <h1>Sitemap</h1>
      <h2>Cognitive science topics</h2>
      {scienceNodes.map(node => {
        return (
          <div>
            <Link to={absPathToUrl(node.fileAbsolutePath)}><h3>{node.frontmatter.title}</h3></Link>
            <p>{node.frontmatter?.description}</p>
          </div>
        )})
      }
      <h2>Development topics</h2>
      {codingNodes.map(node => {
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

export default SitemapPage

export const query = graphql`
  query SitemapQuery {
    scienceNodes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/science\//"},
        frontmatter: {topic: {eq: true}}
      }
      sort: {fileAbsolutePath: ASC}
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
    codingNodes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/coding\//"},
        frontmatter: {topic: {eq: true}}
      }
      sort: {fileAbsolutePath: ASC}
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

export { Head } from "./../components/head"