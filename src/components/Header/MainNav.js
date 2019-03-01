import React, { Component } from "react";
import { Link } from "gatsby";
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
  font-size: 1.3rem;
  color: ${props => props.theme.color.teal5};
  border: none;
  box-shadow: none;
  border-bottom: 1px solid ${props => props.theme.color.teal5};
  &:visited {
    color: ${props => props.theme.color.primary};
  }
  &:hover {
    border-bottom: 3px dashed ${props => props.theme.color.secondary};
    color: ${props => props.theme.color.secondary};
  }

  small {
    font-family: monospace;
  }
`;
