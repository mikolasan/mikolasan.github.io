module.exports = {
  siteMetadata: {
    siteUrl: `https://mikolasan.github.io`,
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
              maxWidth: 800,
            },
          },
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
        autoGenHomeLabel: `Index`,
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
    `gatsby-plugin-sitemap`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
