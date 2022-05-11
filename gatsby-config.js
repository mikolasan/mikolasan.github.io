require("dotenv").config()
const _ = require("lodash");

module.exports = {
  siteMetadata: {
    siteUrl: `https://neupokoev.xyz`,
    title: `Nikolay Neupokoev - developer, traveler, snob`,
    description: `Nikolay Neupokoev - developer, traveler, snob. Personal blog.`,
    author: `@mikolasan`,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
              linkImagesToOriginal: true,
              wrapperStyle: fluidResult => `flex:${_.round(fluidResult.aspectRatio, 2)};`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          }
        ],
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
        name: `images`,
        path: `${ __dirname }/src/images`,
      },
    },
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
        autoGenHomeLabel: `Home`,
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
    `gatsby-plugin-sitemap`,
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
                  date: edge.node.frontmatter.date,
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
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                      fileAbsolutePath
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Developer Traveler Snob - RSS Feed",
          },
        ],
      },
    }
  ],
}
