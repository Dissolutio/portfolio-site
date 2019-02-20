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
            <StyledLink to="/about">Hire Me</StyledLink>
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
  color: #6fffe9;
  padding: 0.6rem;
  display: block;
  border: none;
  box-shadow: none;
  &:hover {
    border-bottom: 3px solid rgba(40, 48, 68, 1);
  }
  small {
    font-family: monospace;
  }
`;
