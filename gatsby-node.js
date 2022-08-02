const redirects = require("./redirects.json");
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
      featuredImage: File @fileByRelativePath
      previewImage: File @fileByRelativePath
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
  const { createPage, createRedirect } = actions

  redirects.forEach(redirect => 
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
    })
  )

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

  const blogPostTemplate = path.resolve(`./src/templates/blogTemplate.js`)
  const result = await queryByPath(graphql, "/^(?!.*\/ru\/.*)/");
  result.data.allMarkdownRemark.nodes
    .reduce(nodeReducer, [])
    .map(pageFactory(blogPostTemplate, recentArticles))
    .forEach(page => createPage(page))

  // Russian version
  const ruBlogPostTemplate = path.resolve(`./src/templates/ruBlogTemplate.js`)
  const ruResult = await queryByPath(graphql, "/\/ru\//")
  ruResult.data.allMarkdownRemark.nodes
    .reduce(nodeReducer, [])
    .map(pageFactory(ruBlogPostTemplate, recentArticles))
    .forEach(page => createPage(page))

  const createPagination = async (regex, path, listTemplate) => {
    const result = await queryByPath(graphql, regex)
    paginationFor(result, path, listTemplate)
      .forEach(page => createPage(page))  
  }

  const blogListTemplate = path.resolve(`./src/templates/blogListTemplate.js`)
  const ideasListTemplate = path.resolve(`./src/templates/ideasListTemplate.js`)
  const makeListTemplate = path.resolve(`./src/templates/makeListTemplate.js`)
  const projectsListTemplate = path.resolve(`./src/templates/projectsListTemplate.js`)
  const scienceListTemplate = path.resolve(`./src/templates/scienceListTemplate.js`)
  
  const ruBlogListTemplate = path.resolve(`./src/templates/ruBlogListTemplate.js`)
  const ruParanormalListTemplate = path.resolve(`./src/templates/ruParanormalListTemplate.js`)
  const ruMakeListTemplate = path.resolve(`./src/templates/ruMakeListTemplate.js`)
  const ruDevlogListTemplate = path.resolve(`./src/templates/ruDevlogListTemplate.js`)
  const ruScienceListTemplate = path.resolve(`./src/templates/ruScienceListTemplate.js`)

  // Pagination [/blog]
  await createPagination("/markdown\/blog\//", `/blog`, blogListTemplate)
  // Pagination [/ideas]
  await createPagination("/markdown\/ideas\//", `/ideas`, ideasListTemplate)
  // Pagination [/make]
  await createPagination("/markdown\/make\//", `/make`, makeListTemplate)
  // Pagination [/projects]
  await createPagination("/markdown\/projects\//", `/projects`, projectsListTemplate)
  // Pagination [/science]
  await createPagination("/markdown\/science\//", `/science`, scienceListTemplate)

  // Pagination [/ru/blog]
  await createPagination("/\/ru\/blog*/", `/ru/blog`, ruBlogListTemplate)
  // Pagination [/ru/paranormal]
  await createPagination("/\/ru\/paranormal\//", `/ru/paranormal`, ruParanormalListTemplate)
  // Pagination [/ru/make]
  await createPagination("/\/ru\/make\/(?!hydroponics)/", `/ru/make`, ruMakeListTemplate)
  // Pagination [/ru/devlog]
  await createPagination("/\/ru\/devlog\//", `/ru/devlog`, ruDevlogListTemplate)
  // Pagination [/ru/neural-networks]
  await createPagination("/\/ru\/neural-networks\//", `/ru/neural-networks`, ruScienceListTemplate)

  // catch 
  //reporter.panicOnBuild(e)
}
