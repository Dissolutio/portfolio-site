import React from "react";
import { graphql } from "gatsby";

import StrataLayout from "layouts/StrataLayout";
import SEO from "components/seo";
import Section1 from "components/Section1";
import Gallery from "components/Gallery";

const DEFAULT_IMAGES = [
  {
    id: 1,
    alt: "street",
    caption: "Photo 1",
    description: "1Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  },
  {
    id: 2,
    alt: "forest",
    caption: "Photo 2",
    description: "2Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  },
  {
    id: 3,
    alt: "books",
    caption: "Photo 3",
    description: "3Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  },
  {
    id: 4,
    alt: "feet on stairs",
    caption: "Photo 4",
    description: "4Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  },
  {
    id: 5,
    alt: "mountains",
    caption: "Photo 5",
    description: "5Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  },
  {
    id: 6,
    alt: "wood",
    caption: "Photo 6",
    description: "6Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  }
];

const IndexPage = ({ data }) => {
  // combine queried nodes with corresponding caption/description
  const imageNodes = DEFAULT_IMAGES.map(({ alt, caption, description, id }) => {
    const sharpImage = data.galleryOne.edges.filter(edge =>
      edge.node.childImageSharp.fluid.originalName.includes(id)
    )[0];
    const solutionNode = {
      ...sharpImage.node,
      caption,
      description,
      alt,
      src: sharpImage.node.childImageSharp.fluid.src,
      srcSet: sharpImage.node.childImageSharp.fluid.srcSet
    };
    console.log(solutionNode);
    return solutionNode;
  });
  return (
    <StrataLayout data={data}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Section1 />
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
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
              originalName
            }
          }
        }
      }
    }
  }
`;
