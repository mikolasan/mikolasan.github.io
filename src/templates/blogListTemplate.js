import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    const onePage = isFirst && isLast
    return (
      <Layout>
        <div>
          <h1>Everything</h1>
          <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
          {posts.map(({ node }) => (
            <div key={node.id}>
              <h3>
                {node.frontmatter.title}
              </h3>
              <span>
                {node.frontmatter.date}
              </span>
              <p>{node.excerpt}{" "}
              <Link to={node.frontmatter.path}>Читать далее...</Link>
              </p>
            </div>
          ))}
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              listStyle: 'none',
              padding: 0,
            }}
          >
            {!isFirst && (
              <Link to={`/everything/${prevPage}`} rel="prev">
                ← Previous Page
              </Link>
            ) || "← Previous Page"}
            {Array.from({ length: numPages }, (_, i) => (
              <li
                key={`pagination-number${i + 1}`}
                style={{
                  margin: 0,
                }}
              >
                <Link
                  to={`/everything/${i === 0 ? '' : i + 1}`}
                  style={{
                    padding: 5,
                    textDecoration: 'none',
                    color: i + 1 === currentPage ? '#ffffff' : '',
                    background: i + 1 === currentPage ? '#007acc' : '',
                  }}
                >
                  {i + 1}
                </Link>
              </li>
            ))}
            {!isLast && (
              <Link to={`/everything/${nextPage}`} rel="next">
                Next Page →
              </Link>
            ) || "Next Page →"}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { fields: [frontmatter___date], order: DESC},
      filter: { frontmatter: { path: { regex: "/\/everything*/" }}}
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`