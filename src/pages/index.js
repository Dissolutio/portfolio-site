import React from "react";
import { graphql } from "gatsby";
import Layout from "layouts";
import SEO from "components/seo";
import Section1 from "components/Section1";
import "utilities/reset.css";
const IndexPage = ({ data }) => (
  <Layout data={data}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Section1 />
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
