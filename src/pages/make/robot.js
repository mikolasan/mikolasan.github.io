import React from "react"
import Layout from "../../components/layout"
import BlogPreview from "../../components/blogPreview"
import ScrollSplit from "../../components/scrollSplit"
import { SEO } from "../../components/seo"
import { graphql, Link } from "gatsby"
import { absPathToUrl, formatDate } from "../../nifty"
import * as styles from "../../components/postList.module.css"

const BrainModelPage = ({ data }) => {
  const postNodes = data.postNodes.nodes
  const constructorNodes = data.constructorNodes.nodes
  const topicNodes = data.topicNodes.nodes
  const encyclopediaNodes = data.encyclopediaNodes.nodes
  const banner = [
    <h1 key="title" id="_name1" itemProp="name">Robot</h1>,
  ]
  return (
    <Layout
      mainConf="fullscreen"
      title="Robot"
      section="make"
      bannerParagraph={banner}
    >
      <div className="centered">
        <div className="main-section">
          <div className={styles.blogcards}>
            {postNodes.map(node => (
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
      
      <div className="centered">
        <div className="main-section">
          <h2>Big topics A-Z</h2>
          {topicNodes.map(node => (
            <div key={node.id}>
              <Link to={absPathToUrl(node.fileAbsolutePath)}>
                <h3>
                  {node.frontmatter.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
      

      <div className="centered">
        <div className="main-section">
          <h2>Constructor</h2>
          <p>
            Start <Link to="/make/constructor">here</Link>
          </p>
          {constructorNodes.map(node => (
            <div key={node.id}>
              <Link to={absPathToUrl(node.fileAbsolutePath)}>
                <h3>
                  {node.frontmatter.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <ScrollSplit>
        <h2>Robot encyclopedia</h2>
      </ScrollSplit>
      <div className="centered">
        <div className="main-section">
          <p>
            All pages <Link to="/make/robot/encyclopedia">here</Link>
          </p>

          <div className={styles.blogcards}>
            {encyclopediaNodes.map(node => (
              <BlogPreview
                key={node.id} 
                path={absPathToUrl(node.fileAbsolutePath)}
                title={node.frontmatter.title}
                text={node.excerpt}
                readMore="Read more..."
                image={node.frontmatter.image}
                altImage={node.frontmatter.altImage}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="centered">
        <div className="main-section">
          <Link to="/make/robot/resources">
            <h3>Resources</h3>
          </Link>
        </div>
      </div>

    </Layout>
  )
}

export default BrainModelPage

export const query = graphql`
  query RobotQuery {
    postNodes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/make\/robot\/(?!encyclopedia)/"},
        frontmatter: {
          topic: {ne: true}
          posts: {ne: false}
        }
      }
      sort: {frontmatter: { date: ASC}}
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
    constructorNodes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/make\/constructor\//"},
      }
      sort: {frontmatter: {published: DESC}}
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
    encyclopediaNodes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/make\/robot\/encyclopedia\//"},
      }
      sort: {frontmatter: {published: DESC}}
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
    topicNodes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/make\/robot\//"},
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
  }
`

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="Robot"
  >

  </SEO>
)