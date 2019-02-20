import React from "react";
import styled from "styled-components";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const SecondPage = ({ data }) => (
  <Layout data={data}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>About Me</h1>
    <p>My name is John, I am mostly curious and thankful.</p>
    <p>
      In January 2018 is when I decided I was going to learn how to code and get
      a developer job or build a freelance business. It's been a lot of work
      since then, but work with passion behind it can really make the time fly.
    </p>
    <p>
      My main tools lately are Node.js and React.js, but the modern toolset is
      rapidly expanding, and I am thrilled to perpetually learn new techniques
      and architechtures. The wild world of software is a playground for my
      mind.
    </p>
    <p>
      The challenges facing humanity, and the individual human, are great. There
      are helpers around the world who are drawn to a bigger picture of the
      future, a positive vision. They are all around, and they are doing
      valuable, urgent work on many fronts to construct a sustainable and
      equitable global human civilization.
    </p>
    <p>
      All these helpers, with all their renewable energy, ecological
      restoration, social work, holistic health and organizational transparency
      , need powerful web solutions and are often short on funds to compete for
      cutting edge tech. Gee, who's gonna build those?
    </p>
    <p>
      There's a lot of work to do, and it makes my life so easy lucky and free
      to know my place in the struggle.
    </p>
  </Layout>
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
  }
`;
