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
    const group = data.allMarkdownRemark.group
    const {
      currentPage,
      numPages,
      breadcrumb: { crumbs },
    } = this.props.pageContext
    return (
      <Layout>
        <Banner>
          <h1>Creative ideas crafted with love</h1>
          <p>
          So you want to make a great application. 
          It is easy. Get an idea here. This is the first step and it is very important.
          </p>
        </Banner>
        <section>
          <ul>
            {group
              .sort((a, b) => a.totalCount < b.totalCount ? 1 : -1)
              .filter(tag => tag.totalCount > 1)
              .map(tag => (
              <li key={tag.fieldValue}>
                Popularity x{tag.totalCount}:{" "}<b>{tag.fieldValue}</b>
                <ul>
                  {tag.nodes.map(node => (
                    <li key={node.frontmatter.title}>
                      <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>{" "}
                      ({node.frontmatter.tags
                        .sort()
                        .map(t => t === tag.fieldValue ? (<b>{t}</b>) : (t))
                        .reduce((acc, x) => acc === null ? [x] : [acc, ', ', x], null)})
                    </li>
                  ))}
                </ul>
              </li>

            ))}
          </ul>
        </section>
      </Layout>
    )
  }
}

CreativeIdeas.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
  }),
}

export default CreativeIdeas

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          tags: {ne: null},
          path: {regex: "/^\/projects/"}
        }
      }
    ) {
      group(field: frontmatter___tags) {
        nodes {
          frontmatter {
            tags
            path
            title
          }
        }
        fieldValue
        totalCount
      }
    }
  }
`