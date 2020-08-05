const path = require("path")
const likesConfig = require("./likes-config")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blogTemplate.js`)
  const ruBlogPostTemplate = path.resolve(`./src/templates/ruBlogTemplate.js`)
  const blogListTemplate = path.resolve(`./src/templates/blogListTemplate.js`)
  const ruBlogListTemplate = path.resolve(`./src/templates/ruBlogListTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000,
        sort: { order: DESC, fields: [frontmatter___date]},
        filter: { frontmatter: {language: {ne: "ru"}}}
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.path === null) return
    const path = node.frontmatter.path
    const showLikes = likesConfig.excludePath.find(p => p === path) === undefined
    createPage({
      path: path,
      component: blogPostTemplate,
      context: {
        showLikes: showLikes,
        pagePath: path
      },
    })
  })

  // Russian version
  const ruResult = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000,
        sort: { order: DESC, fields: [frontmatter___date]},
        filter: { frontmatter: {language: {eq: "ru"}}}
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (ruResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  ruResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.path === null) return
    createPage({
      path: node.frontmatter.path,
      component: ruBlogPostTemplate,
      context: {
        showLikes: false,
        pagePath: node.frontmatter.path
      }, // additional data can be passed via context
    })
  })

  // Pagination
  const blogResult = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000,
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { path: { regex: "/^\/blog*/" }}}
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (blogResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for blog pages.`)
    return
  }
  // Create blog-list pages
  const posts = blogResult.data.allMarkdownRemark.edges
  const postsPerPage = 5
  const numPosts = posts.length
  const numPages = Math.ceil(numPosts / (postsPerPage + 1))
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Pagination
  const ruBlogResult = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000,
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { path: { regex: "/\/ru\/blog*/" }}}
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (ruBlogResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for ru blog pages.`)
    return
  }
  // Create blog-list pages
  const ruPosts = ruBlogResult.data.allMarkdownRemark.edges
  const ruPostsPerPage = 5
  const ruNumPosts = ruPosts.length
  const ruNumPages = Math.ceil(ruNumPosts / (ruPostsPerPage + 1))
  Array.from({ length: ruNumPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/ru/blog` : `/ru/blog/${i + 1}`,
      component: ruBlogListTemplate,
      context: {
        limit: ruPostsPerPage,
        skip: i * ruPostsPerPage,
        numPages: ruNumPages,
        currentPage: i + 1,
      },
    })
  })
}
