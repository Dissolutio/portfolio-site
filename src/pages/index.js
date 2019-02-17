import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Img from "gatsby-image";
import SEO from "../components/seo";
import TextBrickH2P from "../components/TextBrickH2P";
import "../utilities/reset.css";
const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <TextBrickH2P />
  </Layout>
);

export default IndexPage;
