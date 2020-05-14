module.exports = {
  siteMetadata: {
    title: `Logesh Thulasiraman Writes!`,
    name: `Logesh Thulasiraman Writes!`,
    siteUrl: `https://blog.logesht.dev`,
    description: `A Personal Blog or Tech Digests by Logesh Thulasiraman!`,
    hero: {
      heading: `Tech Digests By Logesh Thulasiraman!`,
      maxWidth: 550,
    },
    social: [
      {
        name: `github`,
        url: `https://github.com/tlogesh`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/logesht/`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/logesh-thulasiraman-b1527aa2/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
  ],
};
