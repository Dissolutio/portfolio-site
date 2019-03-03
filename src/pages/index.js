import React from "react";
import { graphql } from "gatsby";

import StrataLayout from "layouts/StrataLayout";
import SEO from "components/seo";
import Section1 from "components/Section1";
import Gallery from "components/Gallery";

import thumb01 from "assets/thumbs/01.jpg";
import thumb02 from "assets/thumbs/02.jpg";
import thumb03 from "assets/thumbs/03.jpg";
import thumb04 from "assets/thumbs/04.jpg";
import thumb05 from "assets/thumbs/05.jpg";
import thumb06 from "assets/thumbs/06.jpg";

import full01 from "assets/fulls/01.jpg";
import full02 from "assets/fulls/02.jpg";
import full03 from "assets/fulls/03.jpg";
import full04 from "assets/fulls/04.jpg";
import full05 from "assets/fulls/05.jpg";
import full06 from "assets/fulls/06.jpg";
const DEFAULT_IMAGES = [
  {
    id: "1",
    src: full01,
    thumbnail: thumb01,
    caption: "Photo 1",
    description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  },
  {
    id: "2",
    src: full02,
    thumbnail: thumb02,
    caption: "Photo 2",
    description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  },
  {
    id: "3",
    src: full03,
    thumbnail: thumb03,
    caption: "Photo 3",
    description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  },
  {
    id: "4",
    src: full04,
    thumbnail: thumb04,
    caption: "Photo 4",
    description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  },
  {
    id: "5",
    src: full05,
    thumbnail: thumb05,
    caption: "Photo 5",
    description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  },
  {
    id: "6",
    src: full06,
    thumbnail: thumb06,
    caption: "Photo 6",
    description: "Lorem ipsum dolor sit amet nisl sed nullam feugiat."
  }
];

const IndexPage = ({ data }) => (
  <StrataLayout data={data}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Section1 />
    <Gallery
      images={DEFAULT_IMAGES.map(
        ({ id, src, thumbnail, caption, description }) => ({
          src,
          thumbnail,
          caption,
          description
        })
      )}
    />
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
      publicURL
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
