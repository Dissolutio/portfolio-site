import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Header from "components/Header/Header";
import { theme } from "./theme";
import "sanitize.css";

const StrataLayout = ({ data, children }) => (
  <ThemeProvider theme={theme}>
    <LayoutWrapper>
      <HeaderWrapper>
        <Header data={data} />
      </HeaderWrapper>
      <MainPageWrapper>{children}</MainPageWrapper>
    </LayoutWrapper>
  </ThemeProvider>
);

const LayoutWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
`;
const HeaderWrapper = styled.header`
  color: ${props => props.theme.color.white};
  left: auto;
  position: relative;
  text-align: center;
  top: auto;
  width: 100%;
  ${props => props.theme.media.medium`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 30%;
    `}
  ${props => props.theme.media.large`
    width: 35%;
    `}
`;
const MainPageWrapper = styled.div`
  padding: 1rem;
  ${props => props.theme.media.medium`
  margin-left: 30%;
  max-width: 70%;
  padding: 2rem;
  `}
  ${props => props.theme.media.large`
 margin-left: 35%;
 max-width: 65%;
 padding: 2rem;
 `}
`;

export default StrataLayout;
