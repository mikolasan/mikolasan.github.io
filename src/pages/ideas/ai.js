import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import { absPathToUrl } from "../../nifty"

const IdeasAi = ({ data, pageContext }) => {
  const nodes = data.allMarkdownRemark.nodes
  return (
    <Layout
      title="AI ideas"
      section="ideas"
      crumbs={pageContext.breadcrumb.crumbs}
    >
      <h2>AI</h2>
      
      <div className="ideacards">
        {nodes
          .sort((a, b) => a.frontmatter.date < b.frontmatter.date ? 1 : -1)
          .map(node => (
            <div className="ideacard" key={node.frontmatter.title}>
              <Link to={absPathToUrl(node.fileAbsolutePath)}>
                <img src={node.frontmatter.coverImage ? "/images/projects/" + node.frontmatter.coverImage : "/images/no-cover.jpg"}/>
              </Link>
              <h3>{node.frontmatter.title}</h3>
              <p><Link to={absPathToUrl(node.fileAbsolutePath)}>Read more</Link></p>
              {node.frontmatter.tags && (
              <p><small>
                {node.frontmatter.tags
                  .sort()
                  .map(t => (<span>{t}</span>))
                }
              </small></p>
              )}
            </div>
          ))}
        </div>
    </Layout>
  )
}

export default IdeasAi

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/ideas\/ai\//" }}
    ) {
      nodes {
        frontmatter {
          date
          tags
          idea
          path
          title
          coverImage
        }
        fileAbsolutePath
      }
    }
  }
`

export { Head } from "./../../components/head"