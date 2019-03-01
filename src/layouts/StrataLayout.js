import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Header from "components/Header/Header";
import theme from "./theme";
import "sanitize.css";

const StrataLayout = ({ data, children }) => (
  <ThemeProvider theme={theme}>
    <StrataLayout data={data}>
      <LayoutWrapper>
        <HeaderWrapper>
          <Header data={data} />
        </HeaderWrapper>
        <MainPageWrapper>{children}</MainPageWrapper>
      </LayoutWrapper>
    </StrataLayout>
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
  color: rgba(255, 255, 255, 0.5);
  left: auto;
  position: relative;
  text-align: center;
  top: auto;
  width: 100%;
  display: block;
  @media screen and (min-width: ${960 / 16}em) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 30%;
  }
  @media screen and (min-width: ${1500 / 16}em) {
    width: 35%;
  }
`;
const MainPageWrapper = styled.div`
  margin-left: 30%;
  max-width: 70%;
  @media screen and (min-width: ${1500 / 16}em) {
    margin-left: 35%;
    max-width: 65%;
  }
`;

export default StrataLayout;
