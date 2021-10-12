const path = require("path")
const { PassThrough } = require("stream")
const likesConfig = require("./likes-config")
const nifty = require("./src/nifty")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blogTemplate.js`)
  const ruBlogPostTemplate = path.resolve(`./src/templates/ruBlogTemplate.js`)
  const blogListTemplate = path.resolve(`./src/templates/blogListTemplate.js`)
  const ruBlogListTemplate = path.resolve(`./src/templates/ruBlogListTemplate.js`)
  const ruParanormalListTemplate = path.resolve(`./src/templates/ruParanormalListTemplate.js`)
  const ruMakeListTemplate = path.resolve(`./src/templates/ruMakeListTemplate.js`)
  const ruDevlogListTemplate = path.resolve(`./src/templates/ruDevlogListTemplate.js`)

  const recentArticles = await graphql(`
    {
      allMarkdownRemark(
        limit: 5,
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

  if (recentArticles.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

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
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        showLikes: showLikes,
        pagePath: path,
        recentArticles: recentArticles
      },
    })
  })

  // Russian version
  const ruResult = await graphql(`
    {
      allMarkdownRemark(
        filter: {fileAbsolutePath: { regex: "/\/ru\//"}}
      ) {
        nodes {
          fileAbsolutePath
        }
      }
    }
  `)

  if (ruResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  ruResult.data.allMarkdownRemark.nodes.forEach(node => {
    if (node.fileAbsolutePath === null) return
    const path = nifty.absPathToUrl(node.fileAbsolutePath)
    console.log(path);
    createPage({
      path: path,
      component: ruBlogPostTemplate,
      context: {
        showLikes: false,
        absolutePath: node.fileAbsolutePath,
        url: path
      }, // additional data can be passed via context
    })
  })

  // Pagination [/blog]
  const blogResult = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/\/blog*/" }}
      ) {
        nodes {
          fileAbsolutePath
        }
      }
    }
  `)

  if (blogResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for blog pages.`)
    return
  }
  // Create blog-list pages
  const posts = blogResult.data.allMarkdownRemark.nodes
  const postsPerPage = 6
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

  // Pagination [/ru/blog]
  const ruBlogResult = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/\/ru\/blog*/" }}
      ) {
        nodes {
          fileAbsolutePath
        }
      }
    }
  `)

  if (ruBlogResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for ru blog pages.`)
    return
  }
  // Create blog-list pages
  const ruPosts = ruBlogResult.data.allMarkdownRemark.nodes
  const ruPostsPerPage = 6
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

  // Pagination [/ru/paranormal]
  const ruParanormalResult = await graphql(`
    {
      allMarkdownRemark(
        filter: {fileAbsolutePath: { regex: "/\/ru\/paranormal\//"}}
      ) {
        nodes {
          fileAbsolutePath
        }
      }
    }
  `)

  if (ruParanormalResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for ru paranormal pages.`)
    return
  }
  // Create blog-list pages
  const ruParanormalPosts = ruParanormalResult.data.allMarkdownRemark.nodes
  const numParanormalPosts = ruParanormalPosts.length
  const numParanormalPages = Math.ceil(numParanormalPosts / (ruPostsPerPage + 1))
  Array.from({ length: numParanormalPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/ru/paranormal` : `/ru/paranormal/${i + 1}`,
      component: ruParanormalListTemplate,
      context: {
        limit: ruPostsPerPage,
        skip: i * ruPostsPerPage,
        numPages: numParanormalPages,
        currentPage: i + 1,
      },
    })
  })

  // Pagination [/ru/make]
  const ruMakeResult = await graphql(`
    {
      allMarkdownRemark(
        filter: {fileAbsolutePath: { regex: "/\/ru\/make\//"}}
      ) {
        nodes {
          fileAbsolutePath
        }
      }
    }
  `)

  if (ruMakeResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for ru make pages.`)
    return
  }
  // Create blog-list pages
  const ruMakePosts = ruMakeResult.data.allMarkdownRemark.nodes
  const numMakePosts = ruMakePosts.length
  const numMakePages = Math.ceil(numMakePosts / (ruPostsPerPage + 1))
  Array.from({ length: numMakePages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/ru/make` : `/ru/make/${i + 1}`,
      component: ruMakeListTemplate,
      context: {
        limit: ruPostsPerPage,
        skip: i * ruPostsPerPage,
        numPages: numMakePages,
        currentPage: i + 1,
      },
    })
  })

  // Pagination [/ru/devlog]
  const ruDevlogResult = await graphql(`
    {
      allMarkdownRemark(
        filter: {fileAbsolutePath: { regex: "/\/ru\/devlog\//"}}
      ) {
        nodes {
          fileAbsolutePath
        }
      }
    }
  `)

  if (ruDevlogResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for ru devlog pages.`)
    return
  }
  // Create blog-list pages
  const ruDevlogPosts = ruDevlogResult.data.allMarkdownRemark.nodes
  const numDevlogPosts = ruDevlogPosts.length
  const numDevlogPages = Math.ceil(numDevlogPosts / (ruPostsPerPage + 1))
  Array.from({ length: numDevlogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/ru/devlog` : `/ru/devlog/${i + 1}`,
      component: ruDevlogListTemplate,
      context: {
        limit: ruPostsPerPage,
        skip: i * ruPostsPerPage,
        numPages: numDevlogPages,
        currentPage: i + 1,
      },
    })
  })
}
