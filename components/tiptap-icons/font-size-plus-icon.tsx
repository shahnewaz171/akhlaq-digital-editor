import * as React from "react";

export function FontSizePlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="5" y="11" width="14" height="2" rx="1" fill="currentColor" />
      <rect x="11" y="5" width="2" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}

export default FontSizePlusIcon;
