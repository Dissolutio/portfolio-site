import React from "react";
// Context is made up of two things
// Provider - Single as close to top level as possible
// Consumer - Multiple have multiple consumers
const BlogThemeContext = React.createContext();

const theme1 = {
  primary: "#00A4B1",
  secondaryDark: "#023446",
  secondaryLight: "#2B73B0",
  accentDark: "rgba(241, 242, 235, 1)",
  accentBright: "#FCFC44",
  red: "#FD0029"
};

const theme2 = {
  primary: "rgba(10, 9, 8, 1)",
  secondaryDark: "rgba(63, 72, 99, 1)",
  secondaryLight: "rgba(241, 242, 235, 1)",
  accentDark: "rgba(84, 35, 68, 1)",
  accentBright: "rgba(191, 209, 229, 1)"
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
