require(`dotenv`).config({
  path: `.env`,
})

const siteMetadata = {
  siteTitle: `SungKwang`,
  siteTitleAlt: `SungKwang's Blog`,
  siteHeadline: `SungKwang's Blog`,
  siteUrl: `https://blog.sungkwang.me`,
  siteDescription: `I'm a full stack developer`,
  siteLanguage: `en`,
  siteImage: `/banner.jpg`,
  author: `@sungkwangsong`,
  showLineNumbers: false,
  siteLanguage: `KR`,
  basePath: '/',
  blogPath: '/articles',
  tagsPath: '/tags',
  navigation: [
    {
      title: `Articles`,
      slug: `/articles`,
    },
    {
      title: `About`,
      slug: `/about`,
    },
  ],
  externalLinks: [
    {
      name: `Twitter`,
      url: `https://twitter.com/sungkwangsong/`,
    },
    {
      name: `Instagram`,
      url: `https://www.instagram.com/sungkwangsong/`,
    },
  ], 
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: siteMetadata,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-120131969-3',
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SungKwang's Blog`,
        short_name: `SungKwang's Blog`,
        description: ``,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteTitle
                siteDescription
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPost } }) => {
              return allPost.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  title: node.title,
                  description: node.excerpt,
                  date: node.date,
                  url: site.siteMetadata.siteUrl + node.slug,
                  guid: site.siteMetadata.siteUrl + node.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
              allPost(sort: { fields: date, order: DESC }) {
                nodes {
                  slug
                  title
                  date(formatString: "YYYY.MM.DD")
                  excerpt
                  description
                  tags {
                    name
                    slug
                  }
                }
              }
            }
            `,
            output: "/feed.xml",
            title: "SungKwang's Blog RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/articles/",
            // optional configuration to specify external rss feed, such as feedburner
            // link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      }
    },
    
  ] 
}
