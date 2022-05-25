module.exports = {
  siteMetadata: {
    siteUrl: "http://www.jodnddus.blog/",
    title: "blog",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `posts`,
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 720,
              linkImagesToOriginal: false,
              backgroundColor: "transparent",
            },
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-plugin-sass",
    "gatsby-plugin-cname",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-feed",
  ],
};
