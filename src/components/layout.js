import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import Header from "components/Header/Header";
import urlString from "../backgroundURL";

const Layout = ({ data, children }) => (
  <LayoutWrapper bgUrl={urlString}>
    <Header data={data} />
    <Main bgUrl={urlString}>{children}</Main>
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </>
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
