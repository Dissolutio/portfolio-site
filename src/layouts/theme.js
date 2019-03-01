import { css } from "styled-components";

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
/* Teal Coolors Exported Palette - coolors.co/0b2027-114b5f-40798c-70a9a1-1b998b */
/* RGBA */
/* Blue Coolors Exported Palette - coolors.co/0b132b-1c2541-3a506b-5bc0be-6fffe9 */
/* RGBA */
const theme = {
  color: {
    primary: `#00A4B1`,
    secondary: `#023446`,
    black: `#060707`,
    white: `#f1f2eb`,
    blue1: `rgba(11, 19, 43, 1)`,
    blue2: `rgba(28, 37, 65, 1)`,
    blue3: `rgba(58, 80, 107, 1)`,
    blue4: `rgba(91, 192, 190, 1)`,
    blue5: `rgba(111, 255, 233, 1)`,
    teal1: `rgba(11, 32, 39, 1)`,
    teal2: `rgba(17, 75, 95, 1)`,
    teal3: `rgba(64, 121, 140, 1)`,
    teal4: `rgba(112, 169, 161, 1)`,
    teal5: `rgba(27, 153, 139, 1)`
  },
  media: media
};
export default theme;
// USE LIKE SO
// ${props = props.theme.media.small`
//  css: goesHere;
// `
