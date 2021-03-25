# JohnMoen.tech

Wow, haven't touched this in awhile. Let's get our bearings

## The layout

[Html5up Strata](https://html5up.net/strata) was the look I wanted to go for.

## The Blog

I want to start keeping my coding diary on here if possible. Most of the current posts are outdated and are not in line with where I am RIGHT NOW.

### Blog page query

```js
query BlogPostBySlug($path: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    background: file(relativePath: { eq: "jason-leung-714414-unsplash.jpg" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    profilePic: file(relativePath: { eq: "profile-pic.jpg" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 200, maxHeight: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
      }
    }
  }
```
