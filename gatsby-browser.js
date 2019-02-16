import React from "react";

import { BlogThemeProvider } from "./src/BlogThemeContext";

export const wrapRootElement = ({ element }) => (
  <BlogThemeProvider>{element}</BlogThemeProvider>
);
