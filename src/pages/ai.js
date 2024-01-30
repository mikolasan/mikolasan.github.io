import React from "react"
import Layout from "../components/layout"
import BlogPreview from "../components/blogPreview"
import ScrollSplit from "../components/scrollSplit"
import { SEO } from "./../components/seo"
import { graphql, Link } from "gatsby"
import { absPathToUrl, formatDate } from "../nifty"
import * as styles from "../components/postList.module.css"

const BrainModelPage = ({ data }) => {
  const topicNodes = data.topicNodes.nodes
  const articleNodes = data.articleNodes.nodes
  const banner = [
    <h1 key="title" id="_name1" itemProp="name">Artificial Intelligence</h1>,
  ]
  return (
    <Layout
      mainConf="fullscreen"
      title="AI"
      section="science"
      subsection="ai"
      bannerParagraph={banner}
    >
      <div className="centered">
        <div className="main-section">
          <h2>Main research</h2>
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
        </div>
      </div>
      
      <ScrollSplit>
        <h2>Big topics A-Z</h2>
      </ScrollSplit>
      <div className="centered">
        <div className="main-section">
          <div className={styles.blogcards}>
            {topicNodes.map(node => (
              <BlogPreview
                key={node.id} 
                path={absPathToUrl(node.fileAbsolutePath)}
                title={node.frontmatter.title}
                text={node.excerpt}
                readMore="Read more..."
                developing={node.frontmatter.developing}
              />
            ))}
          </div>
        </div>
      </div>
      

      <ScrollSplit>
        <h2>Last reviews</h2>
      </ScrollSplit>
      <div className="centered">
        <div className="main-section">
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
        </div>
      </div>
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
        excerpt
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