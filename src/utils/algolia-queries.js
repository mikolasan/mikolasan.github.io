const escapeStringRegexp = require("escape-string-regexp")
const nifty = require("../nifty")

const pagePath = `src/markdown`
const indexName = `Pages`

const pageQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
        }
        excerpt(pruneLength: 5000)
        fileAbsolutePath
        internal {
          contentDigest
        }
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { id, frontmatter, fileAbsolutePath, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    slug: nifty.absPathToUrl(fileAbsolutePath),
    ...rest,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries