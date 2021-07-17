import React from "react"
import Layout from "../components/layout"
import FeaturedImage from "../components/featuredImage"
import { graphql, Link } from "gatsby"

const NavigationPage = ({ data }) => {
  const nodes = data.allSitePage.nodes
  const edges = data.allMarkdownRemark.edges
  const paths = nodes.map(node => node.path)
  const sections = new Map()
  paths.forEach(path => {
    const ruRegex = /\/ru\/([a-z\-]+)\/.*/i
    const regex = /\/([a-z\-]+)\/.*/i
    const ruMatch = ruRegex.exec(path)
    const match = regex.exec(path)
    if (ruMatch !== null && ruMatch[1] !== undefined) {
      const sectioName = ruMatch[1]
      if (sections.has(sectioName)) {
        sections.get(sectioName).unshift(path)
      } else {
        sections.set(sectioName, [path])
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
    <Layout title="One page navigation">
      <FeaturedImage />
      <h1>Navigation</h1>
      {Array.from(sections.keys()).map(key => {
        return (
          <details>
            <summary><h2>▸ {key.replace("-", " ")}</h2></summary>
            <ul>
              {sections.get(key).map(path => {
                let title = "< no title :( >"
                const edge = edges.find(e => e.node.frontmatter.path === path)
                if (edge !== undefined) {
                  title = edge.node.frontmatter.title
                }
                if (path.match(/\/ru\//) !== null) {
                  title = "[RU] " + title
                }
                return <li><Link to={path}>{title}</Link></li>
              })}
            </ul>
          </details>
        )
      })}
    </Layout>
  )
}

export default NavigationPage

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
            path
          }
        }
      }
    }
  }
`
