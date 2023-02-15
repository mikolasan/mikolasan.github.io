require("dotenv").config()
const _ = require("lodash");
const nifty = require("./src/nifty")

const siteUrl = `https://neupokoev.xyz`

module.exports = {
  siteMetadata: {
    siteUrl: siteUrl,
    title: `Robots, science, gamedev - N`,
    description: `Magazine, blog and knowledgebase for geeks`,
    author: `@mikolasan`,
  },
  trailingSlash: `never`,
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
              showCaptions: ['title'],
              markdownCaptions: true,
              linkImagesToOriginal: true,
              wrapperStyle: fluidResult => `flex:${_.round(fluidResult.aspectRatio, 2)};`,
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
          }
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${ __dirname }/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${ __dirname }/src/markdown`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `js-pages`,
        path: `${ __dirname }/src/pages/`,
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
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          `UA-165261437-1`
        ],
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // using Google Global Site Tag does not necessarily constitute Tracking
          respectDNT: false,
        },
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
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
          allMarkdownRemark {
            nodes {
              fileAbsolutePath
              frontmatter {
                lastModified
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMarkdownRemark: { nodes: allMarkdownNodes },
          allFile: { nodes: allJsNodes },
        }) => {
          const nodeMap = allMarkdownNodes.reduce((acc, node) => {
            const { fileAbsolutePath } = node
            const uri = nifty.absPathToUrl(fileAbsolutePath)
            acc[uri] = node.frontmatter
            return acc
          }, {})
          
          allJsNodes.reduce((acc, node) => {
            const { absolutePath, fields } = node
            const uri = nifty.absPathToUrl(absolutePath, "pages")
            acc[uri] = { lastModified: fields.gitLogLatestDate }
            return acc
          }, nodeMap)
          
          return allPages.map(page => {
            path = nifty.removeTrailingSlash(page.path)
            return { ...page, ...nodeMap[path], originalPath: path }
          })
        },
        serialize: ({ path, lastModified, originalPath }) => {
          return {
            url: path,
            lastmod: lastModified,
            // changefreq: "daily",
            // priority: originalPath === "/" ? 1.0 : 0.7,
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: false,
      }
    },
    `gatsby-plugin-react-helmet`,
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
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
                  sort: { order: DESC, fields: [frontmatter___lastModified] },
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
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Vollkorn SC`,
    //         variants: [`700`]
    //       },
    //       {
    //         family: `Manrope`,
    //         variants: [`300`]
    //       },
    //       {
    //         family: `Nunito`,
    //         variants: [`300`]
    //       },
    //     ],
    //     encode: false,
    //     filename: "google-fonts.css",
    //     formats: ["woff2", "woff", "ttf", "eof"]
    //   },
    // },
  ],
}
