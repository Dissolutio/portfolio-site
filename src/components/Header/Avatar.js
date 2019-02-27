import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const ProfilePic = () => (
  <StaticQuery
    query={graphql`
      query profilePic {
        file(relativePath: { eq: "profile-pic.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 200, maxHeight: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.file.childImageSharp.fluid} />}
  />
);
export { ProfilePic };
