module.exports = {
  siteMetadata: {
    title: `Nikolay Neupokoev - developer, traveler, snob`,
    description: `Nikolay Neupokoev - developer, traveler, snob. Personal blog.`,
    author: `@mikolasan`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
