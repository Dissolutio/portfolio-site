import Typography from "typography";
import anonymousTheme from "typography-theme-anonymous";

const typography = new Typography({
  ...anonymousTheme,
  baseFontSize: "16px"
});

export const rhythm = typography.rhythm;
export const scale = typography.scale;
export default typography;
