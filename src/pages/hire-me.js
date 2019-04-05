import React, { Component } from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import resumePDF from "../assets/JohnMoenFrontendResume.pdf";
import StrataLayout from "layouts/StrataLayout";

export default class HireMePage extends Component {
  render() {
    const { data, location } = this.props;

    const Button = styled.button`
      margin: 2rem auto;
      font-family: "Anonymous Pro";
    `;

    return (
      <StrataLayout location={location} data={data}>
        <a href={resumePDF}>
          <Button>View PDF version</Button>
        </a>
        <Img fluid={data.resumeImage.childImageSharp.fluid} alt="resume" />
      </StrataLayout>
    );
  }
}

export const hireMepageQuery = graphql`
  query hireMePageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    resumeImage: file(
      relativePath: { eq: "JohnMoenFrontendDevResumeImage.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
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
