import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import BlogThemeContext from "../BlogThemeContext";
import Header from "./header";

import urlString from "../backgroundURL";

const Layout = ({ children }) => (
  <div>
    <Header />
    <Main bgUrl={urlString}>{children}</Main>
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
const Main = styled.div`
  width: 70%;
  margin-left: 30%;
  background-color: #e4572e;
  background-image: url("${props => props.bgUrl}");
`;
export default Layout;
