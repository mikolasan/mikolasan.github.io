import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const AllIdeas = ({ data, pageContext }) => {
  const group = data.allMarkdownRemark.group
  return (
    <Layout
      title="All ideas for app development"
      section="ideas"
      crumbs={pageContext.breadcrumb.crumbs}
      bannerParagraph={[<h1>Ideas for app development</h1>,
        <p>
        So you want to make a great application.
        It is easy. Get an idea here. This is the first step and it is very important.
        </p>]}
    >
      {group
        .sort((a, b) => a.totalCount < b.totalCount ? 1 : -1)
        .map(tag => (
          <div>
            <h2 key={tag.fieldValue}>{tag.fieldValue}</h2>
            <div className="ideacards">
              {tag.nodes
                .sort((a, b) => a.frontmatter.date < b.frontmatter.date ? 1 : -1)
                .map(node => (
                  <div className="ideacard" key={node.frontmatter.title}>
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
    </Layout>
  )
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
          path: {regex: "/^\/ideas/"}
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
