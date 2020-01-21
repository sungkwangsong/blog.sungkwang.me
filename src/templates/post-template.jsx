import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostTemplateDetails from '../components/PostTemplateDetails'
import SEO from '../components/SEO/SEO';

class PostTemplate extends React.Component {
  render() {
    const { title, subtitle } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const { title: postTitle, description: postDescription, image } = post.frontmatter
    const description = postDescription !== null ? postDescription : subtitle

    return (
      <Layout>
        <div>
          {/* <Helmet>
            <title>{`${postTitle} - ${title}`}</title>
            <meta name="description" content={description} />
          </Helmet> */}
        {/* <SEO
          title={title}
          description={post.frontmatter.description || post.excerpt || 'nothin’'}
          // image={post.frontmatter.image.childImageSharp.sizes.src}
          image={title || ''}
          pathname={post.fields.slug}
          article
        /> */}

          <PostTemplateDetails {...this.props} />
        </div>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        subtitle
        copyright
        author {
          name
          twitter
          facebook
          facebookAppID          
        }
        disqusShortname
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
        slug
      }
      frontmatter {
        path
        title
        tags
        date
        description
        image
      }
    }
  }
`
