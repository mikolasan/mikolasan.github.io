import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

class CreativeIdeas extends React.Component {
  render () {
    const { data } = this.props
    const edges = data.allMarkdownRemark.edges
    return (
      <Layout
        title="Creative ideas for app development"
        section="ideas"
        bannerParagraph={[<h1>Creative ideas for app development</h1>,
          <p>
          So you want to make a great application.
          It is easy. Get an idea here. This is the first step and it is very important.
          </p>]}
      >
        <div>
          <div className="ideacards">
            {edges
              .sort((a, b) => a.node.frontmatter.date < b.node.frontmatter.date ? 1 : -1)
              .map(({ node }) => (
                <div className="ideacard" key={node.frontmatter.title}>
                  <Link to={node.frontmatter.path}>
                    <img src={node.frontmatter.coverImage ? "/images/projects/" + node.frontmatter.coverImage : "/images/no-cover.jpg"}/>
                  </Link>
                  <h3>{node.frontmatter.title}</h3>
                  <p><Link to={node.frontmatter.path}>Read more</Link></p>
                  <p><small>
                    {node.frontmatter.tags
                      .sort()
                      .map(tag => (<span key={tag}>{tag}</span>))
                    }
                  </small></p>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default CreativeIdeas

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          language: {ne: "ru"}
          idea: {eq: "creative"},
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            date
            tags
            idea
            path
            title
            coverImage {
              id
              base
            }
          }
        }
      }
    }
  }
`
