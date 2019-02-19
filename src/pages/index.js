import React from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import Layout from "components/layout";
import Img from "gatsby-image";
import SEO from "components/seo";
import TextBrickH2P from "components/TextBrickH2P";
import "utilities/reset.css";
const IndexPage = ({ data }) => (
  <Layout data={data}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <TextBrickH2P />
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
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
