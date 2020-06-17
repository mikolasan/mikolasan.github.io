import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Layout from "../components/layout"
import FeaturedImage from "../components/featuredImage"
import styles from "../templates/blogTemplate.module.css"
import { init_interface } from "./slots/interface"
import { init_reels } from "./slots/reels"
import "./slot.css"


class IdeasPage extends React.Component {
  componentDidMount() {
    init_reels();
    init_interface();
  }

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
        
        <FeaturedImage />
        <section>
          <div className={styles.breadcrumbs}>
            <Breadcrumb
              crumbs={crumbs}
              crumbSeparator=">"
              title="//"
            />
          </div>
          <h1>Ideas</h1>
          <h2>Lucky idea generator</h2>
          <p>If you want random unpredictable and fun project, then try this totally free slot machine
             from a slot developer who likes throwing cutting edge technologies in production. </p>
          <canvas id="reels" width="650" height="394"></canvas>
          <canvas id="interface" width="100" height="50"></canvas>
          <p>
            <strong>Result: </strong>
            <span id="win">no result. Press "Spin" to update.</span>
          </p>
          <h2>Creative ideas crafted with love</h2>
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
          <h2>And other</h2>
          <ul>
          <li>Combine together cameras from trashed phones</li>
          <li>Add Google drive support to open source file manager</li>
          </ul>
        </section>
      </Layout>
    )
  }
}

IdeasPage.propTypes = {
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

export default IdeasPage

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