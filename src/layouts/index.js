import React from "react";
import { ThemeProvider, css } from "styled-components";
import StrataLayout from "./Strata";

const Layout = ({ children, data }) => (
  <ThemeProvider theme={theme}>
    <StrataLayout data={data}>{children}</StrataLayout>
  </ThemeProvider>
);
// MAKE OUR QUERIES
const sizes = {
  small: 400,
  medium: 600,
  large: 1000
};
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

// THEN PUT THEM IN THEME
export const theme = {
  color: {
    primary: `#00A4B1`,
    secondary: `#023446`,
    black: `#060707`,
    white: `#f1f2eb`
  },
  media: media
};

export default Layout;
