import React from "react";
import { graphql } from "gatsby";

import StrataLayout from "layouts/StrataLayout";
import SEO from "components/seo";
import HomepageIntro from "components/HomepageIntro";
import Gallery from "components/Gallery";
import { portfolioImageInfo } from "utilities/portfolioImageInfo";

const IndexPage = ({ data }) => {
  // combine queried nodes with corresponding caption/description
  const imageNodes = portfolioImageInfo.map(
    ({ alt, caption, description, id }) => {
      const sharpImage = data.galleryOne.edges.filter(edge =>
        edge.node.childImageSharp.fluid.originalName.includes(id)
      )[0];
      const solutionNode = {
        ...sharpImage.node,
        caption,
        id,
        description,
        alt,
        src: sharpImage.node.childImageSharp.fluid.src,
        srcSet: sharpImage.node.childImageSharp.fluid.srcSet
      };
      console.log(solutionNode);
      return solutionNode;
    }
  );
  return (
    <StrataLayout data={data}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <HomepageIntro />
      <Gallery imageNodes={imageNodes} />
    </StrataLayout>
  );
};

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
    galleryOne: allFile(
      filter: {
        relativeDirectory: { eq: "fulls" }
        sourceInstanceName: { eq: "images" }
      }
    ) {
      edges {
        node {
          publicURL
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
              originalName
            }
          }
        }
      }
    }
  }
`;
