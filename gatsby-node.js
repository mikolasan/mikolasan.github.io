const redirects = require("./redirects.json");
const path = require("path")
const likesConfig = require("./likes-config")
const nifty = require("./src/nifty")
const { createFilePath } = require(`gatsby-source-filesystem`)

const genericListTemplate = path.resolve(`./src/templates/genericListTemplate.js`)
const genericCompactListTemplate = path.resolve(`./src/templates/genericCompactListTemplate.js`)
const codeListTemplate = path.resolve(`./src/templates/codeListTemplate.js`)
const linuxListTemplate = path.resolve(`./src/templates/linuxListTemplate.js`)
const makeListTemplate = path.resolve(`./src/templates/makeListTemplate.js`)
const scienceListTemplate = path.resolve(`./src/templates/scienceListTemplate.js`)

const goodListTemplate = path.resolve(`./src/templates/goodListTemplate.js`)
const badListTemplate = path.resolve(`./src/templates/badListTemplate.js`)
const uglyListTemplate = path.resolve(`./src/templates/uglyListTemplate.js`)

const pageTemplate = path.resolve(`./src/templates/blogTemplate.js`)

const findRedirect = path => redirects.find(r => r.toPath === path)

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const oldPath = page.path
  if (oldPath.endsWith("/")) {
    console.log(`created page with trailing slash: ${oldPath}`)
    return
  }

  // fix "no trailing slash" for GitHub pages
  // exceptions
  const addTrailingSlash = [
    `/blog/how-windows-web-developers-fix-websites-in-safari/`,
    `/ideas/web-app/`
  ]  
  const newPath = nifty.addHtmlToPath(oldPath)
  if (oldPath !== "/" && oldPath !== "/404" && newPath !== oldPath) {
    // Setting config for slash or no-slash at the end of urls (`trailingSlash`)
    // doesn't affect Gatsby in a way that it always creates directories (= url) and index.html inside.
    // For GitHub Pages this means that going to "no slash" address will redirect
    // from "no slash" url to "slash" url. It's bad for Google's indexing (301 is a bad tone)

    // // in case Google already has trailing slash in its index, then we keep that page
    // if (addTrailingSlash.indexOf(`${oldPath}/`) === -1) {
    //   // console.log(`create html version for ${oldPath}`)
    //   deletePage(page)
    // } else {
    //   console.log(`keep page with a trailing slash: ${oldPath}/`)
    // }

    // page.path = newPath
    // if (addTrailingSlash.indexOf(`${oldPath}/`) === -1) {
    //   page.matchPath = newPath
    // } else {
    //   // then we have 'path' folder and 'path.html' folder for page-data.json
    //   page.matchPath = `${oldPath}/*`
    // }
    // createPage(page)

    createPage({
      ...page,
      path: newPath,
      context: {
        ...page.context,
      },
    })
  }

  // restore old pages that already in the index
  // add redirect link to new pages
  const redirect = findRedirect(oldPath)
  if (redirect !== undefined) {
    console.log(`create redirect ${redirect.fromPath} -> ${oldPath}`)
    createPage({
      ...page,
      path: redirect.fromPath,
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

const queryAll = async graphql => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } },
      ) {
        nodes {
          excerpt
          fileAbsolutePath
          frontmatter {
            title
            date
            topic
            article
          }
          id
        }
        totalCount
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
    throw `Error while running GraphQL query for ALL pages.`
  }
  return result
}

const nodeToPageData = (node, template, previous, next, recentArticles) => {
  const path = nifty.absPathToUrl(node.fileAbsolutePath)
  const showLikes = likesConfig.excludePath.find(p => p === path) === undefined
  return {
    path: path,
    component: template,
    context: {
      showLikes: showLikes,
      absolutePath: node.fileAbsolutePath,
      url: path,
      next,
      previous,
      recentArticles: recentArticles
    },
  }
}

const paginationFor = (path, numPosts, config) => {
  const postsPerPage = config.postsPerPage
  const numPages = Math.ceil(numPosts / config.postsPerPage)
  return Array.from({ length: numPages }).map((_, i) => {
    return {
      path: i === 0 ? path : `${path}/${i + 1}`,
      component: config.template,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        baseUrl: path,
        title: config.title,
        regex: config.regex,
        section: config.section,
        subsection: config.subsection,
      },
    }
  })
}

const groupBySections = nodes => {
  const sections = {}
  const recentArticlesMaxSize = 5

  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    const path = nifty.absPathToUrl(node.fileAbsolutePath)
    const pathEnd = path.lastIndexOf(`/`)
    let currentSection = path.substring(0, pathEnd)
    if (!currentSection) {
      currentSection = path
    }
    if (!Object.hasOwn(sections, currentSection)) {
      sections[currentSection] = {
        count: 0,
        paginationCount: 0,
        nodes: [],
        paginationNodes: [],
        recentArticles: [],
      }
    }
    sections[currentSection].count++;
    sections[currentSection].nodes.push(node)
    if (!node.frontmatter?.topic && !node.frontmatter?.article) {
      sections[currentSection].paginationNodes.push(node)
      sections[currentSection].paginationCount++;
    }
    if (sections[currentSection].recentArticles.length < recentArticlesMaxSize) {
      sections[currentSection].recentArticles.push(node)
    }
  }
  return sections
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const paginationConfig = {
    "/blog": {
      template: genericListTemplate,
      postsPerPage: 18,
      title: `Blog`,
      regex: "/markdown\/blog\//",
      section: "blog",
    },
    "/code/cpp": {
      template: genericListTemplate,
      postsPerPage: 6,
      title: `C++`,
      regex: "/markdown\/code\/cpp\//",
      section: "code",
      subsection: "cpp",
    },
    "/code": {
      template: codeListTemplate,
      postsPerPage: 9,
      title: `Code`
    },
    "/devlog": {
      template: genericListTemplate,
      postsPerPage: 18,
      title: `Devlog`,
      regex: "/markdown\/devlog\//",
      section: "blog",
      subsection: "devlog",
    },
    "/gamedev": {
      template: genericListTemplate,
      postsPerPage: 6,
      title: `Gamedev`,
      regex: "/markdown\/gamedev\//",
      section: "code",
      subsection: "gamedev",
    },
    "/ideas": {
      template: genericListTemplate,
      postsPerPage: 24,
      title: `Ideas`,
      regex: `/markdown\/ideas\//`,
      section: `code`,
      subsection: `ideas`
    },
    "/lists": {
      template: genericCompactListTemplate,
      postsPerPage: 25,
      title: `Lists`,
      regex: `/markdown\/lists\//`,
      section: `blog`,
      subsection: `lists`
    },
    "/linux": {
      template: linuxListTemplate,
      postsPerPage: 25,
      title: `Linux`
    },
    "/make/3d-prints": {
      template: genericListTemplate,
      postsPerPage: 6,
      title: `3D Prints`,
      regex: "/markdown\/make\/3d-prints\//",
      section: "make",
      subsection: "3d-prints",
    },
    "/make": {
      template: makeListTemplate,
      postsPerPage: 6,
      title: `Make`
    },
    "/projects": {
      template: genericListTemplate,
      postsPerPage: 6,
      title: `Projects`,
      regex: "/markdown\/projects\//",
      section: "code",
      subsection: "projects",
    },
    "/science": {
      template: scienceListTemplate,
      postsPerPage: 6,
      title: `Science`
    },
  }

  let result
  try {
    result = await queryAll(graphql);
  } catch (e) {
    reporter.panicOnBuild(e)
    return
  }

  const allNodes = result.data.allMarkdownRemark.nodes
  const sections = groupBySections(allNodes)
  const keys = Object.keys(sections)
  keys.sort()
  for (let i = 0; i < keys.length; i++) {
    const sectionName = keys[i];
    const section = sections[sectionName];
    const sectionNodes = section.nodes;
    for (let j = 0; j < sectionNodes.length; j++) {
      const node = sectionNodes[j];
      const template = pageTemplate 
      const next = j === 0 ? null : sectionNodes[j - 1]
      const previous = j === sectionNodes.length - 1 ? null : sectionNodes[j + 1]
      const pageData = nodeToPageData(node, template, previous, next, section.recentArticles)
      createPage(pageData)
    }

    // pagination
    if (Object.hasOwn(paginationConfig, sectionName)) {
      const config = paginationConfig[sectionName]
      paginationFor(sectionName, section.paginationCount, config)
        .forEach(pageData => createPage(pageData))
    }
  }

  let config = {
    template: goodListTemplate,
    postsPerPage: 1000,
    title: `The Good`,
  }
  paginationFor("/posts/good", 1, config)
    .forEach(pageData => createPage(pageData))
  
  config = {
    template: badListTemplate,
    postsPerPage: 1000,
    title: `The Bad`,
  }
  paginationFor("/posts/bad", 1, config)
    .forEach(pageData => createPage(pageData))

  config = {
    template: uglyListTemplate,
    postsPerPage: 1000,
    title: `The Ugly`,
  }
  paginationFor("/posts/ugly", 1, config)
    .forEach(pageData => createPage(pageData))
}
