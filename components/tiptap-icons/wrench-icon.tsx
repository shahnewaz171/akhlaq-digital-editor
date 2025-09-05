import * as React from "react";

export const WrenchIcon = React.memo(
  ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.7 6.3a4.5 4.5 0 0 1-6.36 6.36L3 18l3 3 5.34-5.34a4.5 4.5 0 0 1 6.36-6.36l-3 3 3-3z" />
    </svg>
  )
);

WrenchIcon.displayName = "WrenchIcon";

export default WrenchIcon;
