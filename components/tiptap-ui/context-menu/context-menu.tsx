import * as React from "react";
import * as Popover from "@radix-ui/react-popover";

export interface ContextMenuItem {
  key: string;
  title: string;
  onClick: () => void;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  anchorPoint: { x: number; y: number };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  anchorPoint,
  open,
  onOpenChange,
}) => {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Anchor
        style={{ position: "fixed", left: anchorPoint.x, top: anchorPoint.y }}
      />
      <Popover.Content
        side="right"
        align="start"
        className="akd-z-50 akd-bg-white akd-border akd-rounded akd-shadow-md akd-p-2 akd-flex akd-flex-col akd-gap-1"
      >
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className="akd-p-1 akd-text-left akd-hover-bg-gray-100 akd-rounded akd-cursor-pointer"
            onClick={() => {
              item.onClick();
              onOpenChange(false);
            }}
          >
            {item.title}
          </button>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
};
