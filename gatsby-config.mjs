import round from "lodash";
import { absPathToUrl, removeHtmlExtension, removeTrailingSlash } from "./src/nifty.js";
import { createRequire } from "module"
import { dirname } from "path"
import { fileURLToPath } from "url"

import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const siteUrl = `https://neupokoev.xyz`

const config = {
  siteMetadata: {
    siteUrl: siteUrl,
    title: `Robots, science, gamedev - N`,
    description: `Magazine, blog and knowledgebase for geeks`,
    author: `@mikolasan`,
  },
  trailingSlash: `ignore`,
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        tableOfContents: {
          heading: null,
          maxDepth: 3,
        },
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
              showCaptions: ['title'],
              markdownCaptions: true,
              linkImagesToOriginal: true,
              wrapperStyle: fluidResult => `flex:${round(fluidResult.aspectRatio, 2)};`,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer"
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              enableCustomId: true,
              offsetY: `100`,
              isIconAfterHeader: true,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20">
                <path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3
                3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3
                  9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64
                  1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z">
                </path>
                </svg>`,
              className: `with-anchor`,
              maintainCase: false,
              removeAccents: true,
              elements: [`h1`, `h2`, `h3`],
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `assets`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown`,
        ignore: [`**/templates`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `js-pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-transformer-gitinfo`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-mikolasan-blog`,
        short_name: `mikolasan`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        autoGenHomeLabel: `    `,
        trailingSlashes: false,
      }
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `{
          allSitePage {
            nodes {
              path
            }
          }
          allFile(filter: {sourceInstanceName: {eq: "js-pages"}}) {
            nodes {
              fields {
                gitLogLatestDate
              }
              absolutePath
            }
          }
          allMarkdownRemark (
            sort: { frontmatter: {lastModified: DESC}}
          ){
            nodes {
              fileAbsolutePath
              frontmatter {
                lastModified
              }
            }
          }
        }`,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages }, 
          allMarkdownRemark: { nodes: allMarkdownNodes }, 
          allFile: { nodes: allJsNodes } 
        }) => {
          const nodeMap = {}
          allMarkdownNodes.reduce((acc, node) => {
            const { fileAbsolutePath } = node;
            const uri = absPathToUrl(fileAbsolutePath);
            acc[uri] = node.frontmatter;
            return acc;
          }, nodeMap);

          allJsNodes.reduce((acc, node) => {
            const { absolutePath, fields } = node;
            const uri = absPathToUrl(absolutePath, "pages");
            if (fields !== null && 'gitLogLatestDate' in fields) {
              acc[uri] = { lastModified: fields.gitLogLatestDate };
            }
            return acc;
          }, nodeMap);

          // this will only add markdown files with `lastModified` field set
          // and JS pages commited to git
          // it excludes pagination, 404 and index page
          // TODO: index page should be in the list!
          const pages = []
          for (const [path, node] of Object.entries(nodeMap)) {
            if (path.indexOf('_') === -1 && !path.endsWith('.module')) {
              pages.push({ path: path, ...node })
            }
          }
          return pages
          // return allPages.reduce((acc, page) => {
          //   const path = removeHtmlExtension(removeTrailingSlash(page.path));
          //   if (path in nodeMap && 'lastModified' in nodeMap[path]) {
          //     acc.push({ path: path, ...nodeMap[path] })
          //   }
          //   return acc;
          // }, []);
        },
        serialize: ({ path, lastModified, originalPath }) => {
          return {
            url: path,
            lastmod: lastModified,
          };
        },
      },
    },
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: false,
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries")
      },
    },
    `@mediacurrent/gatsby-plugin-silence-css-order-warning`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ 
              query: { site, allMarkdownRemark } 
            }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.lastModified,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {fileAbsolutePath: {regex: "/^(?!.*\/ru\/.*)/"}}
                  sort: { frontmatter: {lastModified: DESC} },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        lastModified
                      }
                      fileAbsolutePath
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "N - Robots, science, gamedev - RSS Feed",
          },
        ],
      },
    },
  ]
}

export default config