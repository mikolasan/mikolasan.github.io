import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Layout from "../components/layout"
import Banner from "../components/banner"
import SlotMachine from "../components/slotMachine"
import styles from "../templates/blogTemplate.module.css"

class AllIdeas extends React.Component {
  render() {
    const { data } = this.props
    const group = data.allMarkdownRemark.group
    const {
      currentPage,
      numPages,
      breadcrumb: { crumbs },
    } = this.props.pageContext
    return (
      <Layout
        title="All ideas for app development"
        section="ideas"
      >
        <Banner>
          <h1>All ideas for app development</h1>
          <p>
          So you want to make a great application.
          It is easy. Get an idea here. This is the first step and it is very important.
          </p>
        </Banner>
        <section>
          {group
            .sort((a, b) => a.totalCount < b.totalCount ? 1 : -1)
            .map(tag => (
              <div>
                <h2 key={tag.fieldValue}>{tag.fieldValue}</h2>
                <div class="ideacards">
                  {tag.nodes.map(node => (
                    <div class="ideacard" key={node.frontmatter.title}>
                      <Link to={node.frontmatter.path}><b>{node.frontmatter.title}</b></Link>
                      <p><small>
                        {node.frontmatter.tags
                          .sort()
                          .map(t => t === tag.fieldValue ? (<b>{t}</b>) : (t))
                          .reduce((acc, x) => acc === null ? [x] : [acc, ', ', x], null)}
                      </small></p>
                    </div>
                  ))}
                </div>
              </div>

            ))
          }
        </section>
      </Layout>
    )
  }
}

AllIdeas.propTypes = {
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

export default AllIdeas

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
            idea
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
