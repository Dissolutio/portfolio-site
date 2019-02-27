import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Header from "components/Header/Header";
import BlogThemeContext, { BlogThemeProvider } from "BlogThemeContext";
import urlString from "../../backgroundURL";

const LayoutWithContext = ({ data, children }) => (
  <BlogThemeProvider>
    <BlogThemeContext.Consumer>
      {({ theme }) => (
        <LayoutWrapper bgUrl={urlString} theme={theme}>
          <Header data={data} theme={theme} />
          <Main theme={theme}>{children}</Main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </LayoutWrapper>
      )}
    </BlogThemeContext.Consumer>
  </BlogThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
const LayoutWrapper = styled.div`
  background-image: url("${props => props.bgUrl}");
  background-color:  ${props => props.theme.primary};
  position: absolute;
  padding: 1rem;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  @media
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
export default LayoutWithContext;
