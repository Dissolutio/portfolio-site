import React from "react";
import { BlogThemeProvider } from "./src/BlogThemeContext";
require("prismjs/themes/prism-solarizedlight.css");

export const wrapRootElement = ({ element }) => (
  <BlogThemeProvider>{element}</BlogThemeProvider>
);
