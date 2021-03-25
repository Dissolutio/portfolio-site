module.exports = {
  siteMetadata: {
    title: "John Moen Software Developer Portfolio Site",
    author: "John Moen",
    description:
      "A portfolio and blog site that highlights the work of John Moen, a software developer based in Austin, TX. Browse a gallery of his projects, learn more about the author, or check out the blog if you geek out on JavaScript, React, or Boardgame.io.",
    siteUrl: "https://johnmoen.tech",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `John Moen Portfolio Blog`,
        short_name: `JM Portfolio`,
        start_url: `/`,
        background_color: `#f1f2eb`,
        theme_color: `#6fffe9`,
        display: `minimal-ui`,
        icon: `src/assets/iconfinder_Newsvine_128x128_10922.png`,
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utilities/typography",
      },
    },
    // 'gatsby-plugin-offline',
  ],
};
