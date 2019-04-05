import React from "react";
import styled from "styled-components";

const HomepageIntro = () => (
  <HomepageSection>
    <h2>I'm John, a frontend developer based in Austin,&nbsp;TX.</h2>
    <p>
      I create websites, custom UI and web applications. My tools include:
      JavaScript, React, Node, and good old-fashioned HTML and CSS.
    </p>
    <ActionButton>Contact Me</ActionButton>
  </HomepageSection>
);
export default HomepageIntro;

const HomepageSection = styled.section`
  padding: 1em;
`;
const ActionButton = styled.button`
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  background-color: transparent;
  border-radius: 0.35em;
  border: solid 3px ${props => props.theme.color.primary};
  color: ${props => props.theme.color.black};
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  height: calc(2.75em + 6px);
  line-height: 2.75em;
  min-width: 10em;
  padding: 0 1.5em;
  margin-bottom: 1em;
  text-align: center;
  white-space: nowrap;
  &:hover {
    border-color: #49bf9d;
    color: #49bf9d !important;
  }
`;
