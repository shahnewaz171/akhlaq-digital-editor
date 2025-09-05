import * as React from "react";

export const CheckIcon: React.FC<{
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ size = 24, className = "", style }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    style={style}
  >
    <circle cx="10" cy="10" r="10" fill="none" />
    <path
      d="M6 10.5L9 13.5L14 8.5"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
