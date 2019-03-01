import React, { Component } from "react";
import Link from "gatsby-link";
import styled from "styled-components";

export default class MainNav extends Component {
  render() {
    return (
      <MainNavWrapper>
        <ul>
          <li>
            <StyledLink to="/about">About</StyledLink>
          </li>
          <li>
            <StyledLink to="/blog">Blog</StyledLink>
          </li>
          <li>
            <StyledLink to="/hire-me">Hire Me</StyledLink>
          </li>
        </ul>
      </MainNavWrapper>
    );
  }
}
const MainNavWrapper = styled.nav`
  ul {
    list-style: none;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.color.primary};
  border: none;
  box-shadow: none;

  &:hover {
    border-bottom: 3px solid ${props => props.theme.color.primary};
  }
  small {
    font-family: monospace;
  }
`;
