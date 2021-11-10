const path = require("path")
const likesConfig = require("./likes-config")
const nifty = require("./src/nifty")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemarkFrontmatter {
      coverImage: String
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blogTemplate.js`)
  const ruBlogPostTemplate = path.resolve(`./src/templates/ruBlogTemplate.js`)
  const blogListTemplate = path.resolve(`./src/templates/blogListTemplate.js`)
  const ruBlogListTemplate = path.resolve(`./src/templates/ruBlogListTemplate.js`)
  const ruParanormalListTemplate = path.resolve(`./src/templates/ruParanormalListTemplate.js`)
  const ruMakeListTemplate = path.resolve(`./src/templates/ruMakeListTemplate.js`)
  const ruDevlogListTemplate = path.resolve(`./src/templates/ruDevlogListTemplate.js`)
  const ruScienceListTemplate = path.resolve(`./src/templates/ruScienceListTemplate.js`)

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
        filter: {fileAbsolutePath: {regex: "/^(?!.*\/ru\/.*)/"}}
      ) {
        nodes {
          fileAbsolutePath
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.nodes.forEach(node => {
    if (node.fileAbsolutePath === null) return
    const path = nifty.absPathToUrl(node.fileAbsolutePath)
    const showLikes = likesConfig.excludePath.find(p => p === path) === undefined
    createPage({
      path: path,
      component: blogPostTemplate,
      context: {
        showLikes: showLikes,
        absolutePath: node.fileAbsolutePath,
        url: path,
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
        filter: { fileAbsolutePath: { regex: "/markdown\/blog\//" }}
      ) {
        nodes {
          fileAbsolutePath
        }
        totalCount
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
  const numPosts = blogResult.data.allMarkdownRemark.totalCount
  const numPages = Math.ceil(numPosts / postsPerPage)
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
  const ruNumPages = Math.ceil(ruNumPosts / ruPostsPerPage)
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
        filter: {fileAbsolutePath: { regex: "/\/ru\/paranormal\//" }}
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
  const numParanormalPages = Math.ceil(numParanormalPosts / ruPostsPerPage)
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
        filter: {fileAbsolutePath: { regex: "/\/ru\/make\//" }}
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
  const numMakePages = Math.ceil(numMakePosts / ruPostsPerPage)
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
        filter: {fileAbsolutePath: { regex: "/\/ru\/devlog\//" }}
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
  const numDevlogPages = Math.ceil(numDevlogPosts / ruPostsPerPage)
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

  // Pagination [/ru/neural-networks]
  const ruScienceResult = await graphql(`
    {
      allMarkdownRemark(
        filter: {fileAbsolutePath: { regex: "/\/ru\/neural-networks\//" }}
      ) {
        nodes {
          fileAbsolutePath
        }
      }
    }
  `)

  if (ruScienceResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for ru neural-networks pages.`)
    return
  }
  // Create blog-list pages
  const ruSciencePosts = ruScienceResult.data.allMarkdownRemark.nodes
  const numSciencePosts = ruSciencePosts.length
  const numSciencePages = Math.ceil(numSciencePosts / ruPostsPerPage)
  Array.from({ length: numSciencePages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/ru/neural-networks` : `/ru/neural-networks/${i + 1}`,
      component: ruScienceListTemplate,
      context: {
        limit: ruPostsPerPage,
        skip: i * ruPostsPerPage,
        numPages: numSciencePages,
        currentPage: i + 1,
      },
    })
  })
}
