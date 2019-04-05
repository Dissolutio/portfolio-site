import React from "react";
import { graphql } from "gatsby";

import StrataLayout from "layouts/StrataLayout";
import SEO from "../components/seo";

const SecondPage = ({ data }) => (
  <StrataLayout data={data}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>About Me</h1>
    <p>
      I am a self-taught programmer, and eventhough I'm late to the party, let
      me tell you, I am having an incredible time.
    </p>
    <h2>My primary tools are JavaScript and React</h2>
    <p>Both me and the modern toolset are becoming sharper every single day.</p>
    <h2>Modern web development offers powerful possibilities</h2>
    <p>
      An well-made tool can empower human and tribe alike, and bring joy through
      its very use. The software of the future will both describe and define us.
    </p>
    <h2>The challenges facing humanity are great</h2>
    <p>
      There are helpers around the world who are drawn to a similar vision.
      These people are doing urgent work, and they need the power of modern
      software tools.
    </p>
    <p>
      There's a lot of work to do, and it makes my life so easy lucky and free
      to know my place in the struggle.
    </p>
  </StrataLayout>
);

export default SecondPage;

export const aboutPageQuery = graphql`
  query aboutPageQuery {
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
    profilePic: file(relativePath: { eq: "profile-pic.jpg" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 200, maxHeight: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
