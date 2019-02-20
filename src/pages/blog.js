import React, { Component } from "react";
import styled from "styled-components";
import { Link, graphql } from "gatsby";

import Layout from "components/layout";
import SEO from "../components/seo";
import PostGroupList from "components/PostGroupList";

export default class BlogPage extends Component {
  render() {
    const { data, location } = this.props;
    const posts = [...data.allMarkdownRemark.edges];
    return (
      <Layout location={location} data={data}>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Blog</h1>
        <PostGroupList
          posts={posts}
          groupTitle="React"
          groupSortTitle="React"
        />
        <PostGroupList
          posts={posts}
          groupTitle="Create-React-App v2 : Heroscape Armory"
          groupSortTitle="Heroscape Armory"
        />
        <PostGroupList
          posts={posts}
          groupTitle="Learning Node"
          groupSortTitle="Learning Node"
        />
        <PostGroupList
          posts={posts}
          groupTitle="Personal"
          groupSortTitle="Personal"
        />
      </Layout>
    );
  }
}

export const blogPageQuery = graphql`
  query blogPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD YYYY")
            path
            category
          }
          html
          excerpt
        }
      }
    }
    background: file(relativePath: { eq: "jason-leung-714414-unsplash.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
