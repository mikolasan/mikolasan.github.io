const redirects = require("./redirects.json");
const path = require("path")
const likesConfig = require("./likes-config")
const nifty = require("./src/nifty")
const { createFilePath } = require(`gatsby-source-filesystem`)

const addHtmlToPath = path => path.endsWith(".html") ? path : `${path}.html`

const findRedirect = path => redirects.find(r => r.toPath === path)

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const oldPath = page.path
  if (oldPath.endsWith("/")) {
    return
  }

  // fix "no trailing slash" for GitHub pages
  // exceptions
  const allowTrailingSlash = [
    `/blog/how-windows-web-developers-fix-websites-in-safari/`,
    `/ideas/web-app/`
  ]  
  const newPath = addHtmlToPath(oldPath)
  if (oldPath !== "/" && oldPath !== "/404" && newPath !== oldPath) {
    // slash or no-slash at the end of urls, but Gatsby creates directories and index.html inside
    // for GitHub Pages it means redirect from "no slash" url to "slash" url which is not good
    // but moreover it's bad for Google's indexing

    // in case Google already has trailing slash in its index, then we keep that page
    if (allowTrailingSlash.indexOf(`${oldPath}/`) === -1) {
      console.log(`create html version for ${oldPath}`)
      deletePage(page)
    } else {
      console.log(`keep page with a trailing slash: ${oldPath}/`)
      return
    }

    page.path = newPath
    page.matchPath = oldPath
    createPage(page)
  }

  const redirect = findRedirect(oldPath)
  if (redirect !== undefined) {
    console.log(`create redirect ${redirect.fromPath} -> ${oldPath}`)
    page.path = redirect.fromPath
    createPage({
      ...page,
      context: {
        ...page.context,
        redirect: redirect.toPath,
      },
    })
  }

  // add `updated` pageContext to JS pages (not Markdown, not pagination)
  // if (`updated` in page.context) {
  //   return
  // }
  // const updated = {
  //   'about': `2022-10-22`,
  //   'creative-ideas-for-app-development': `2022-10-22`,
  //   'credits': `2022-10-22`,
  //   'd3-test': `2022-10-22`,
  //   'gamedev_old': `2022-10-22`,
  //   'idea-generator': `2022-10-22`,
  //   'ideas-for-app-development': `2022-10-22`,
  //   'ideas_old': `2022-10-22`,
  //   'index': `2022-10-22`,
  //   'innovative-ideas-for-app-development': `2022-10-22`,
  //   'make_old': `2022-10-22`,
  //   'projects_old': `2022-10-22`,
  //   'site-map': `2022-10-22`,
  //   'sitemap': `2022-10-22`,
  //   'projects/calm-place': `2022-10-22`,
  //   'ru/about': `2022-10-22`,
  //   'ru/ideas': `2022-10-22`,
  //   'ru/index': `2022-10-22`,
  //   'ru/projects': `2022-10-22`,
  //   'ideas/ai': `2022-10-22`,
  //   'ideas/ar': `2022-10-22`,
  //   'ideas/diy': `2022-10-22`,
  //   'ideas/games': `2022-10-22`,
  //   'ideas/life': `2022-10-22`,
  //   'ideas/mobile-app': `2022-10-22`,
  //   'ideas/web-app': `2022-10-22`,
  // }
  // const path = page.componentPath
  // const match = path.match(/.*\/src\/pages\/(.*)\.js/)
  // if (match && match.length > 1) {
  //   const pageName = match[1]
  //   if (pageName in updated) {
  //     // console.log(pageName, updated[pageName])
  //     deletePage(page)
  //     createPage({
  //       ...page,
  //       context: {
  //         ...page.context,
  //         updated: updated[pageName],
  //       },
  //     })
  //     return
  //   }
  // }

  // add more ???

}

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

const queryAllByPath = async (graphql, regex) => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "${regex}" }
        }
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

const queryPagesByPath = async (graphql, regex) => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: { topic: {ne: true}, article: {ne: true}}
          fileAbsolutePath: { regex: "${regex}" }
        }
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
  return node => toPages(node, template, recentArticles)
}

const paginationFor = (result, path, listTemplate, postsPerPage = 6) => {
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

  const recentArticles = {} // TODO
  // await graphql(`
  //   {
  //     allMarkdownRemark(
  //       limit: 5,
  //       sort: { frontmatter: {date: DESC}},
  //       filter: {
  //         frontmatter: {language: {ne: "ru"}, topic: {ne: true}, article: {ne: true}}
  //       }
  //     ) {
  //       edges {
  //         node {
  //           frontmatter {
  //             path
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

  // if (recentArticles.errors) {
  //   reporter.panicOnBuild(`Error while running GraphQL query.`)
  //   return
  // }

  const blogPostTemplate = path.resolve(`./src/templates/blogTemplate.js`)
  const result = await queryAllByPath(graphql, "/^(?!.*\/ru\/.*)/");
  result.data.allMarkdownRemark.nodes
    .reduce(nodeReducer, [])
    .map(pageFactory(blogPostTemplate, recentArticles))
    .forEach(page => createPage(page))

  // Russian version
  const ruBlogPostTemplate = path.resolve(`./src/templates/ruBlogTemplate.js`)
  const ruResult = await queryAllByPath(graphql, "/\/ru\//")
  ruResult.data.allMarkdownRemark.nodes
    .reduce(nodeReducer, [])
    .map(pageFactory(ruBlogPostTemplate, recentArticles))
    .forEach(page => createPage(page))

  const createPagination = async (regex, path, listTemplate, postsPerPage = 6) => {
    const result = await queryPagesByPath(graphql, regex)
    paginationFor(result, path, listTemplate, postsPerPage)
      .forEach(page => createPage(page))  
  }

  const printsListTemplate = path.resolve(`./src/templates/3dPrintsListTemplate.js`)
  const blogListTemplate = path.resolve(`./src/templates/blogListTemplate.js`)
  const codeListTemplate = path.resolve(`./src/templates/codeListTemplate.js`)
  const cppListTemplate = path.resolve(`./src/templates/cppListTemplate.js`)
  const devlogListTemplate = path.resolve(`./src/templates/devlogListTemplate.js`)
  const gamedevListTemplate = path.resolve(`./src/templates/gamedevListTemplate.js`)
  const ideasListTemplate = path.resolve(`./src/templates/ideasListTemplate.js`)
  const linuxListTemplate = path.resolve(`./src/templates/linuxListTemplate.js`)
  const makeListTemplate = path.resolve(`./src/templates/makeListTemplate.js`)
  const projectsListTemplate = path.resolve(`./src/templates/projectsListTemplate.js`)
  const scienceListTemplate = path.resolve(`./src/templates/scienceListTemplate.js`)
  
  const ruBlogListTemplate = path.resolve(`./src/templates/ruBlogListTemplate.js`)
  const ruParanormalListTemplate = path.resolve(`./src/templates/ruParanormalListTemplate.js`)
  const ruMakeListTemplate = path.resolve(`./src/templates/ruMakeListTemplate.js`)
  const ruDevlogListTemplate = path.resolve(`./src/templates/ruDevlogListTemplate.js`)
  const ruScienceListTemplate = path.resolve(`./src/templates/ruScienceListTemplate.js`)

  try {
    await Promise.all([
      // Pagination [/make/3d-prints]
      createPagination("/markdown\/make\/3d-prints\//", `/make/3d-prints`, printsListTemplate),
      // Pagination [/blog]
      createPagination("/markdown\/blog\//", `/blog`, blogListTemplate, 18),
      // Pagination [/code/cpp]
      createPagination("/markdown\/code\/cpp\//", `/code/cpp`, cppListTemplate),
      // Pagination [/code]
      createPagination("/markdown\/code\/(?!cpp)/", `/code`, codeListTemplate, 9),
      // Pagination [/devlog]
      createPagination("/markdown\/devlog\//", `/devlog`, devlogListTemplate, 18),
      // Pagination [/gamedev]
      createPagination("/markdown\/gamedev\//", `/gamedev`, gamedevListTemplate),
      // Pagination [/ideas]
      createPagination("/markdown\/ideas\//", `/ideas`, ideasListTemplate),
      // Pagination [/linux]
      createPagination("/markdown\/linux\//", `/linux`, linuxListTemplate, 25),
      // Pagination [/make]
      createPagination("/markdown\/make\/(?!robot|3d-prints)/", `/make`, makeListTemplate),
      // Pagination [/projects]
      createPagination("/markdown\/projects\//", `/projects`, projectsListTemplate),
      // Pagination [/science]
      createPagination("/markdown\/science\//", `/science`, scienceListTemplate),

      // Pagination [/ru/blog]
      createPagination("/\/ru\/blog*/", `/ru/blog`, ruBlogListTemplate),
      // Pagination [/ru/paranormal]
      createPagination("/\/ru\/paranormal\//", `/ru/paranormal`, ruParanormalListTemplate),
      // Pagination [/ru/make]
      createPagination("/\/ru\/make\/(?!hydroponics)/", `/ru/make`, ruMakeListTemplate),
      // Pagination [/ru/devlog]
      createPagination("/\/ru\/devlog\//", `/ru/devlog`, ruDevlogListTemplate),
      // Pagination [/ru/neural-networks]
      createPagination("/\/ru\/neural-networks\//", `/ru/neural-networks`, ruScienceListTemplate),
    ])
  } catch (e) {
    reporter.panicOnBuild(e)
  }
}
