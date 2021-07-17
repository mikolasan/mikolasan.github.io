import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

class InnovativeIdeas extends React.Component {
  render () {
    const { data } = this.props
    const edges = data.allMarkdownRemark.edges
    return (
      <Layout
        title="Innovative ideas for app development"
        section="ideas"
        bannerParagraph={[
          <h1>Innovative ideas for app development</h1>,
          <p>
          So you want to make a great application.
          It is easy. Get an idea here. This is the first step and it is very important.
          </p>
        ]}
      >
        <section>
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
                        .map(tag => (<span>{tag}</span>))
                      }
                    </small></p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default InnovativeIdeas

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          language: {ne: "ru"}
          idea: {eq: "innovative"},
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
            coverImage
          }
        }
      }
    }
  }
`
