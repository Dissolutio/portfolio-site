import React from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";

import StrataLayout from "layouts/StrataLayout";
import Bio from "components/Bio";

import { rhythm } from "utilities/typography";

class BlogPostTemplate extends React.Component {
  render() {
    const { location, data } = this.props;
    const post = data.markdownRemark;
    const { previous, next } = this.props.pageContext;
    console.log(data);
    return (
      <StrataLayout location={location} data={data}>
        <MainPageWrap>
          <h1>{post.frontmatter.title}</h1>
          <article dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Bio />
        </MainPageWrap>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            listStyle: "none",
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.frontmatter.path} rel="prev">
                ← Previous: {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.frontmatter.path} rel="next">
                Next: {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </StrataLayout>
    );
  }
}

const MainPageWrap = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 0px 1.0875rem 1.45rem;
  h1 {
    font-size: 1.6rem;
  }
`;

export default BlogPostTemplate;

export const pageQuery = graphql`
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
`;
