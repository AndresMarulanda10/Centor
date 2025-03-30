// Import SVGProps type from React
import type { SVGProps } from "react";

// Define IconSvgProps type that extends SVG element props
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  // Optional size property of type number
  size?: number;
};
