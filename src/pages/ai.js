import React from "react"
import Layout from "../components/layout"
import { SEO } from "./../components/seo"
import { graphql, Link } from "gatsby"
import { absPathToUrl } from "../nifty"

const BrainModelPage = ({ data }) => {
  const topicNodes = data.topicNodes.nodes
  const articleNodes = data.articleNodes.nodes

  return (
    <Layout 
      title="AI"
      section="science"
      subsection="ai"
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
        <Link to="/ai/mdp-example-social-media-bot">
          <h3>
            Markov Chains going wild
          </h3>
        </Link>
      </div>
      <div>
        <Link to="/ai/unsupervised-image-classification-with-gan">
          <h3>
            Unsupervised image classification with GAN
          </h3>
        </Link>
      </div>
      <div>
        <Link to="/ai/solve-cartpole-with-spiking-neural-networks">
          <h3>
            Solving CartPole with Spiking Neural Networks
          </h3>
        </Link>
      </div>
      
      
      <h2>Big topics A-Z</h2>
      {topicNodes.map(node => {
        return (
          <div key={node.id}>
            <Link to={absPathToUrl(node.fileAbsolutePath)}><h3>{node.frontmatter.title}</h3></Link>
          </div>
        )})
      }

      <hr />

      <h2>Last reviews</h2>
      <p>
        All reviews <Link to="/ai/reviews">here</Link>
      </p>

      {articleNodes.map(node => {
        return (
          <div key={node.id}>
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
  query AIQuery {
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
        fileAbsolutePath: { regex: "/markdown\/ai\/reviews\//"},
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

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="AI"
  >

  </SEO>
)