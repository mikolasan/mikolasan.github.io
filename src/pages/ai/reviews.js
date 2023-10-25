import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import { absPathToUrl } from "../../nifty"
import { SEO } from "../../components/seo"

const AIReviewsPage = ({ data }) => {
  const articleNodes = data.articleNodes.nodes

  return (
    <Layout 
      title="AI Article Reviews"
      section="science"
    >
      <h1>AI Article Reviews</h1>
      {articleNodes.map(node => {
        return (
          <div key={node.id}>
            <Link to={absPathToUrl(node.fileAbsolutePath)}>
              <h3>{node.frontmatter.title}</h3>
            </Link>
            <h4>{node.frontmatter.subtitle}</h4>
            <p>({node.frontmatter.year}) - by {node.frontmatter.authors}</p>
          </div>
        )})
      }

    </Layout>
  )
}

export default AIReviewsPage

export const query = graphql`
  query AIReviewsQuery {
    articleNodes: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/markdown\/ai\/reviews\//"},
        frontmatter: {article: {eq: true}}
      }
      sort: {fileAbsolutePath: ASC}
    ) {
      nodes {
        frontmatter {
          title
          subtitle
          year
          authors
        }
        fileAbsolutePath
        id
      }
    }
  }
`

export const Head = ({ location, data, pageContext }) => (
  <SEO 
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="AI Article Reviews"
  >

  </SEO>
)