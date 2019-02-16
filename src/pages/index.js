import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Img from "gatsby-image";
import SEO from "../components/seo";
import TextBrickH2P from "../components/TextBrickH2P";
const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Header>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div>
        <Img src="gatsby-astronaut.png" />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
      <br />
      <Link to="/styled-components/">Go to styled-components example page</Link>
    </Header>
    <Main>
      <TextBrickH2P />
    </Main>
  </Layout>
);

export default IndexPage;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  background-color: #1f1815;
  // background-attachment: scroll, fixed;
  // background-image: url(http://localhost:8000/static/overlay-63337cc….png), url(http://localhost:8000/static/jason-leung-714414-unsplash-e8532a5….jpg);
  // background-position: top left, left;
  // background-repeat: repeat, no-repeat;
  // background-size: auto, auto 120%;
  color: rgba(255, 255, 255, 0.5);
  height: 100%;
  left: 0;
  // padding: 8em 4em;
  position: fixed;
  text-align: right;
  top: 0;
  // width: 35%;
`;
const Main = styled.div`
  color: red;
`;

export const astronautImgQuery = graphql`
  query {
    file(relativePath: { eq: "gatsby-astronaut.png" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
