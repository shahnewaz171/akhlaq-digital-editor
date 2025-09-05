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
        className="z-50 bg-white border rounded shadow-md p-2 flex flex-col gap-1"
      >
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className="p-1 text-left hover:bg-gray-100 rounded cursor-pointer"
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
