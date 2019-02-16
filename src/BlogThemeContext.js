import React from "react";
// Context is made up of two things
// Provider - Single as close to top level as possible
// Consumer - Multiple have multiple consumers
const BlogThemeContext = React.createContext();

const theme1 = {
  red: "rgba(228, 87, 46, 1)",
  yellow: "rgba(243, 167, 18, 1)",
  brown: "rgba(109, 76, 61, 1)",
  darkBlue: "rgba(41, 51, 92, 1)",
  lightBlue: "rgba(78, 89, 140, 1)"
};

const theme2 = {
  color1: "rgba(10, 9, 8, 1)",
  color2: "rgba(63, 72, 99, 1)",
  color3: "rgba(241, 242, 235, 1)",
  color4: "rgba(84, 35, 68, 1)",
  color5: "rgba(191, 209, 229, 1)"
};

export class BlogThemeProvider extends React.Component {
  state = {
    theme: theme1
  };

  // add function here
  selectTheme1 = () => {
    this.setState({
      theme: theme1
    });
  };
  selectTheme2 = () => {
    this.setState({
      theme: theme2
    });
  };
  render() {
    return (
      <BlogThemeContext.Provider
        value={{
          ...this.state,
          selectTheme1: this.selectTheme1,
          selectTheme2: this.selectTheme2
        }}>
        {this.props.children}
      </BlogThemeContext.Provider>
    );
  }
}

export default BlogThemeContext;
