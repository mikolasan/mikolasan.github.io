import React from "react"
import { graphql, Link } from "gatsby"
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Layout from "../components/ruLayout"
import Banner from "../components/banner"
import FeaturedImage from "../components/featuredImage"
import styles from "./blogTemplate.module.css"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    const {
      currentPage,
      numPages,
      breadcrumb: { crumbs },
    } = this.props.pageContext
    const anotherLanguageLink = '/blog'
    const languageName = "Switch to english version"
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    const onePage = isFirst && isLast
    return (
      <Layout languageName={languageName} anotherLanguageLink={anotherLanguageLink}>
        <Banner>
          <h1>Блог</h1>
          <p>бложик...</p>
        </Banner>
        <section>
          <h4>{data.allMarkdownRemark.totalCount} заметок</h4>
          {posts.map(({ node }) => (
            <div key={node.id}>
              <h3>
                {node.frontmatter.title}
              </h3>
              <span>
                {node.frontmatter.date}
              </span>
              <p>{node.excerpt}{" "}
              <Link to={node.frontmatter.path}>Читать дальше...</Link>
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
              <Link to={`/blog/${prevPage}`} rel="prev">
                ← Пред стр
              </Link>
            ) || "← Пред стр"}
            {Array.from({ length: numPages }, (_, i) => (
              <li
                key={`pagination-number${i + 1}`}
                style={{
                  margin: 0,
                }}
              >
                <Link
                  to={`/blog/${i === 0 ? '' : i + 1}`}
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
              <Link to={`/blog/${nextPage}`} rel="next">
                След стр →
              </Link>
            ) || "След стр →"}
          </ul>
          </section>
      </Layout>
    )
  }
}

export default BlogIndex

export const query = graphql`
  query RuBlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit,
      skip: $skip,
      sort: { fields: [frontmatter___date], order: DESC},
      filter: { frontmatter: { path: { regex: "/\/ru\/blog*/" }}}
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