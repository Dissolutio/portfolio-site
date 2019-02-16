import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import BlogThemeContext from "../BlogThemeContext";

const MainHeaderTitle = styled(Link)`
  font-weight: bold;
  color: ${props => props.theme.yellow};
  textdecoration: none;
`;

const Header = ({ siteTitle }) => (
  <BlogThemeContext.Consumer>
    {({ theme }) => (
      <header theme={theme}>
        <div
          style={{
            margin: `0 auto`,
            padding: `1.45rem 1.0875rem`
          }}>
          <h1>
            <MainHeaderTitle to="/" theme={theme}>
              {siteTitle}
            </MainHeaderTitle>
          </h1>
        </div>
      </header>
    )}
  </BlogThemeContext.Consumer>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
