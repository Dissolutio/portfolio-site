import Typography from "typography";
import anonymousTheme from "typography-theme-anonymous";

anonymousTheme.baseFontSize = "16px";

const typography = new Typography(anonymousTheme);

export const rhythm = typography.rhythm;
export const scale = typography.scale;
export default typography;
