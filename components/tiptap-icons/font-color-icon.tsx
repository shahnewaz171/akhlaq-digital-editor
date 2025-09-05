import * as React from "react";

export const FontColorIcon: React.FC<{ color?: string; size?: number }> = ({
  color = "currentColor",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
  >
    {/* The "A" */}
    <text
      x="5"
      y="14"
      fontFamily="inherit"
      fontWeight="bold"
      fontSize="12"
      fill={color}
    >
      A
    </text>
    {/* Color bar (rectangle) under the A */}
    <rect x="6" y="16" width="8" height="3" rx="1" fill={color} />
  </svg>
);

export default FontColorIcon;
