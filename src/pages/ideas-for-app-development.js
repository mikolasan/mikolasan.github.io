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
          <h1>Ideas for app development</h1>
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
                  {tag.nodes
                    .sort((a, b) => a.frontmatter.date < b.frontmatter.date ? 1 : -1)
                    .map(node => (
                    <div class="ideacard" key={node.frontmatter.title}>
                      <Link to={node.frontmatter.path}>
                        <img src={node.frontmatter.coverImage ? "/images/projects/" + node.frontmatter.coverImage : "/images/no-cover.jpg"}/>
                      </Link>
                      <h3>{node.frontmatter.title}</h3>
                      <p><Link to={node.frontmatter.path}>Read more</Link></p>
                      <p><small>
                        {node.frontmatter.tags
                          .sort()
                          .map(t => t === tag.fieldValue ? (<span><b>{t}</b></span>) : (<span>{t}</span>))
                        }
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
            date
            tags
            idea
            path
            title
            coverImage
          }
        }
        fieldValue
        totalCount
      }
    }
  }
`
