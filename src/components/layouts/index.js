import React from "react";
import { ThemeProvider } from "styled-components";
import StrataLayout from "./Strata";

const Layout = ({ children, data }) => (
  <ThemeProvider theme={theme}>
    <StrataLayout data={data}>{children}</StrataLayout>
  </ThemeProvider>
);
export const theme = {
  color: {
    primary: `#00A4B1`,
    secondary: `#023446`,
    black: `#060707`,
    white: `#f1f2eb`
  },
  size: {
    small: `only screen and (max-width: 360)`,
    medium: `only screen and (min-width: 360)`,
    large: `only screen and (min-width: 1000)`
  }
};
export default Layout;
