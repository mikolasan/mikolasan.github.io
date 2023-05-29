import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { absPathToUrl } from "../nifty"

const BrainModelPage = ({ data }) => {
  const topicNodes = data.topicNodes.nodes
  const articleNodes = data.articleNodes.nodes

  return (
    <Layout 
      title="AI"
      section="ai"
    >
      <h1>Brain model</h1>
      <h2>Big research</h2>
      <div>
        <Link to="/ai/reinforcement-learning-using-artificial-neural-networks">
          <h3>
            Reinforcement Learning using ANN
          </h3>
        </Link>
      </div>
      <div>
        <Link to="/ai/">
          <h3>
            Markov Chains going wild
          </h3>
        </Link>
      </div>
      <h2>Big topics A-Z</h2>
      {topicNodes.map(node => {
        return (
          <div>
            <Link to={absPathToUrl(node.fileAbsolutePath)}><h3>{node.frontmatter.title}</h3></Link>
          </div>
        )})
      }

      <h2>Article review</h2>
      {articleNodes.map(node => {
        return (
          <div>
            <Link to={absPathToUrl(node.fileAbsolutePath)}>
              <h3>{node.frontmatter.title}</h3>
            </Link>
            <h4>{node.frontmatter.subtitle}</h4>
            <p>({node.frontmatter.year}) - by {node.frontmatter.authors}</p>
          </div>
        )})
      }

    </Layout>
  )
}

export default BrainModelPage

export const query = graphql`
  query AiQuery {
    topicNodes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/ai\//"},
        frontmatter: {topic: {eq: true}}
      }
      sort: {fileAbsolutePath: ASC}
    ) {
      nodes {
        frontmatter {
          title
        }
        fileAbsolutePath
        id
      }
    }
    articleNodes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/ai\//"},
        frontmatter: {article: {eq: true}}
      }
      sort: {fileAbsolutePath: ASC}
    ) {
      nodes {
        frontmatter {
          title
          subtitle
          year
          authors
        }
        fileAbsolutePath
        id
      }
    }
  }
`

export { Head } from "./../components/head"