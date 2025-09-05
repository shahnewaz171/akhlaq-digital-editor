import * as React from "react";

export function FontFamilyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontWeight="bold"
        fontSize="13"
        fill="currentColor"
        fontFamily="inherit"
      >
        T
      </text>
    </svg>
  );
}

export default FontFamilyIcon;
