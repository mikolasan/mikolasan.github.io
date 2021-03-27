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
            <h2>Title</h2>
            <div class="ideacards">
              {edges
                .sort((a, b) => a.node.frontmatter.date < b.node.frontmatter.date ? 1 : -1)
                .map(({node}) => (
                <div class="ideacard" key={node.frontmatter.title}>
                  <Link to={node.frontmatter.path}><b>{node.frontmatter.title}</b></Link>
                  <p><small>
                    {node.frontmatter.tags
                      .sort()
                      .reduce((acc, x) => acc === null ? [x] : [acc, ', ', x], null)}
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
          }
        }
      }
    }
  }
`
