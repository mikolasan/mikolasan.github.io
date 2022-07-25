const path = require("path")
const likesConfig = require("./likes-config")
const nifty = require("./src/nifty")
const { createFilePath } = require(`gatsby-source-filesystem`)


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemarkFrontmatter {
      coverImage: String
      featuredImage: File @fileByRelativePath
    }
  `
  createTypes(typeDefs)
}

const nodeReducer = (array, node) => {
  if (node.fileAbsolutePath !== null) {
    array.push(node);
  }
  return array;
}

const queryByPath = async (graphql, regex) => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {fileAbsolutePath: { regex: "${regex}" }}
      ) {
        nodes {
          fileAbsolutePath
        }
        totalCount
      }
    }
  `)

  if (result.errors) {
    throw `Error while running GraphQL query for ${regex} pages.`
  }
  return result
}

const toPages = (node, template, recentArticles) => {
  const path = nifty.absPathToUrl(node.fileAbsolutePath)
  const showLikes = likesConfig.excludePath.find(p => p === path) === undefined
  return {
    path: path,
    component: template,
    context: {
      showLikes: showLikes,
      absolutePath: node.fileAbsolutePath,
      url: path,
      recentArticles: recentArticles
    },
  }
}

const pageFactory = (template, recentArticles) => {
  return (node) => toPages(node, template, recentArticles)
}

const paginationFor = (result, path, listTemplate, postsPerPage = 12) => {
  let numPosts = result.data.allMarkdownRemark?.totalCount
  if (numPosts === undefined) {
    numPosts = result.data.allMarkdownRemark.nodes.length
  }
  const numPages = Math.ceil(numPosts / postsPerPage)
  return Array.from({ length: numPages }).map((_, i) => {
    return {
      path: i === 0 ? path : `${path}/${i + 1}`,
      component: listTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    }
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const pages = []

  const blogPostTemplate = path.resolve(`./src/templates/blogTemplate.js`)
  const ruBlogPostTemplate = path.resolve(`./src/templates/ruBlogTemplate.js`)
  const blogListTemplate = path.resolve(`./src/templates/blogListTemplate.js`)
  const ruBlogListTemplate = path.resolve(`./src/templates/ruBlogListTemplate.js`)
  const ruParanormalListTemplate = path.resolve(`./src/templates/ruParanormalListTemplate.js`)
  const ruMakeListTemplate = path.resolve(`./src/templates/ruMakeListTemplate.js`)
  const makeListTemplate = path.resolve(`./src/templates/makeListTemplate.js`)
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

  const result = await queryByPath(graphql, "/^(?!.*\/ru\/.*)/");
  result.data.allMarkdownRemark.nodes
    .reduce(nodeReducer, [])
    .map(pageFactory(blogPostTemplate, recentArticles))
    .forEach(page => createPage(page))

  // Russian version
  const ruResult = await queryByPath(graphql, "/\/ru\//")
  ruResult.data.allMarkdownRemark.nodes
    .reduce(nodeReducer, [])
    .map(pageFactory(ruBlogPostTemplate, recentArticles))
    .forEach(page => createPage(page))

  // Pagination [/blog]
  const blogResult = await queryByPath(graphql, "/markdown\/blog\//")
  paginationFor(blogResult, `/blog`, blogListTemplate)
    .forEach(page => createPage(page))

  // Pagination [/make]
  const makeResult = await queryByPath(graphql, "/markdown\/make\//")
  paginationFor(makeResult, `/make`, makeListTemplate)
    .forEach(page => createPage(page))

  // Pagination [/ru/blog]
  const ruBlogResult = await queryByPath(graphql, "/\/ru\/blog*/")
  paginationFor(ruBlogResult, `/ru/blog`, ruBlogListTemplate)
    .forEach(page => createPage(page))

  // Pagination [/ru/paranormal]
  const ruParanormalResult = await queryByPath(graphql, "/\/ru\/paranormal\//")
  paginationFor(ruParanormalResult, `/ru/paranormal`, ruParanormalListTemplate)
    .forEach(page => createPage(page))

  // Pagination [/ru/make]
  const ruMakeResult = await queryByPath(graphql, "/\/ru\/make\/(?!hydroponics)/")
  paginationFor(ruMakeResult, `/ru/make`, ruMakeListTemplate)
    .forEach(page => createPage(page))

  // Pagination [/ru/devlog]
  const ruDevlogResult = await queryByPath(graphql, "/\/ru\/devlog\//")
  paginationFor(ruDevlogResult, `/ru/devlog`, ruDevlogListTemplate)
    .forEach(page => createPage(page))

  // Pagination [/ru/neural-networks]
  const ruScienceResult = await queryByPath(graphql, "/\/ru\/neural-networks\//")
  paginationFor(ruScienceResult, `/ru/neural-networks`, ruScienceListTemplate)
    .forEach(page => createPage(page))

  // catch 
  //reporter.panicOnBuild(e)
}
