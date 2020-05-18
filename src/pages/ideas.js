import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Layout from "../components/layout"
import FeaturedImage from "../components/featuredImage"
import styles from "../templates/blogTemplate.module.css"

const IdeasPage = ({
  data: {
    allMarkdownRemark: { group },
  },
  pageContext: {
    breadcrumb: { crumbs }
  }
}) => (
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
      <ul>
        {group
          .sort((a, b) => a.totalCount < b.totalCount ? 1 : -1)
          .filter(tag => tag.totalCount > 2)
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
    allMarkdownRemark(filter: {frontmatter: {tags: {ne: null}}}) {
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