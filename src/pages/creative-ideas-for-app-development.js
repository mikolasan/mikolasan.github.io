import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Layout from "../components/layout"
import Banner from "../components/banner"
import SlotMachine from "../components/slotMachine"
import styles from "../templates/blogTemplate.module.css"

class CreativeIdeas extends React.Component {
  render() {
    const { data } = this.props
    const edges = data.allMarkdownRemark.edges
    const {
      currentPage,
      numPages,
      breadcrumb: { crumbs },
    } = this.props.pageContext
    return (
      <Layout
        title="Creative ideas for app development"
        section="ideas"
      >
        <Banner>
          <h1>Creative ideas for app development</h1>
          <p>
          So you want to make a great application.
          It is easy. Get an idea here. This is the first step and it is very important.
          </p>
        </Banner>
        <section>
          <div>
            <div className="ideacards">
              {edges
                .sort((a, b) => a.node.frontmatter.date < b.node.frontmatter.date ? 1 : -1)
                .map(({node}) => (
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
            coverImage
          }
        }
      }
    }
  }
`
