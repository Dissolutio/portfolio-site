import React from "react";
import { graphql } from "gatsby";
import StrataLayout from "layouts/StrataLayout";
import SEO from "components/seo";
import Section1 from "components/Section1";
const IndexPage = ({ data }) => (
  <StrataLayout data={data}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Section1 />
  </StrataLayout>
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
