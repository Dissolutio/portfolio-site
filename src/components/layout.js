import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import Header from "components/Header/Header";
import urlString from "../backgroundURL";

const Layout = ({ data, children }) => (
  <LayoutWrapper bgUrl={urlString}>
    <Header data={data} />
    <Main>{children}</Main>
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </LayoutWrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
const LayoutWrapper = styled.div`
  background-image: url("${props => props.bgUrl}");
  background-color: #e4572e;
  position: absolute;
  padding: 1rem;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
`;
const Main = styled.div`
  margin-left: 31%;
  max-width: 70%;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 2rem;
  }
`;
export default Layout;
