import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import Snake from "../components/snake"
import { absPathToUrl, removeHtmlExtension } from "../nifty"
import { SEO } from "../components/seo"

const NotFoundPage = ({ data }) => {
  const nodes = data.allSitePage.nodes
  const edges = data.allMarkdownRemark.edges
  const slugs = nodes.map(node => removeHtmlExtension(node.path))
  const sections = new Map()
  const ruSections = new Map()
  slugs.forEach(path => {
    const regex = /\/([a-z\-]+)\/.*/i
    const ruRegex = /\/ru\/([a-z\-]+)\/.*/i
    const match = regex.exec(path)
    const ruMatch = ruRegex.exec(path)
    if (ruMatch !== null && ruMatch[1] !== undefined) {
      const sectioName = ruMatch[1]
      if (ruSections.has(sectioName)) {
        ruSections.get(sectioName).unshift(path)
      } else {
        ruSections.set(sectioName, [path])
      }
    } else if (match !== null && match[1] !== undefined && match[1] !== "ru") {
      const sectioName = match[1]
      if (sections.has(sectioName)) {
        sections.get(sectioName).push(path)
      } else {
        sections.set(sectioName, [path])
      }
    }
  })

  return (
    <Layout 
      title="404"
      bannerParagraph={[<h1 key="1">404 - Not Found</h1>]}
    >
      <p>Oops. The page you are looking for ... got lost.</p>
      <p>So, first, DON'T PANIC</p>
      <ul>
        <ol>You can use local search from the top navigation bar.</ol>
        <ol>Or enjoy my isometric implementation of a snake game</ol>
      </ul>

      <Snake />

      <p>But here are all sections of this website. I hope at least this can help</p>
      {Array.from(sections.keys()).map(key => {
        return (
          <details key={key}>
            <summary>
              <h2>▸ {key.replaceAll("-", " ")}</h2>
            </summary>
            <ul>
              {sections.get(key).map(path => {
                let title = "---"
                const edge = edges.find(e => absPathToUrl(e.node.fileAbsolutePath) === path)
                if (edge === undefined) {
                  return ``
                } else {
                  title = edge.node.frontmatter.title
                  return <li key={path}>
                    <Link to={path}>{title}</Link>
                  </li>
                }
              })}
            </ul>
          </details>
        )
      })}

      <hr />
      <p>And here is the Russian part of this website</p>
      {Array.from(ruSections.keys()).map(key => {
        return (
          <details key={key}>
            <summary>
              <h2>▸ {key.replaceAll("-", " ")}</h2>
            </summary>
            <ul>
              {ruSections.get(key).map(path => {
                let title = "---"
                const edge = edges.find(e => absPathToUrl(e.node.fileAbsolutePath) === path)
                if (edge === undefined) {
                  return ``
                } else {
                  title = edge.node.frontmatter.title
                  return <li key={path}>
                    <Link to={path}>{title}</Link>
                  </li>
                }
              })}
            </ul>
          </details>
        )
      })}
    </Layout>
  )
}

export default NotFoundPage

export const query = graphql`
  query AllNavigationQuery {
    allSitePage {
      nodes {
        path
      }
    },
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          }
          fileAbsolutePath
        }
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
    title="404"
  >

  </SEO>
)