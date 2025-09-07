"use client";

import * as React from "react";
import type { Editor } from "@tiptap/react";

// Hooks
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// Primitives
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button";
import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/tiptap-ui-primitive/dropdown-menu";

// Icons
import { TableIcon } from "@/components/tiptap-icons/table-icon";

export interface TableDropdownMenuProps extends Omit<ButtonProps, "type"> {
  editor?: Editor;
  onOpenChange?: (open: boolean) => void;
}

export function TableDropdownMenu({
  editor: providedEditor,
  onOpenChange,
  ...props
}: TableDropdownMenuProps) {
  const { editor } = useTiptapEditor(providedEditor);
  const [open, setOpen] = React.useState(false);

  const handleOnOpenChange = React.useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      onOpenChange?.(isOpen);
    },
    [onOpenChange]
  );

  // check if in table
  const isInTable = editor?.isActive("table");

  const exec = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOnOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          disabled={!editor?.isEditable}
          data-disabled={!editor?.isEditable}
          data-active-state={isInTable ? "on" : "off"}
          role="button"
          tabIndex={-1}
          aria-label="Table"
          tooltip="Table"
          onClick={() =>
            exec(() =>
              editor
                ?.chain()
                .focus()
                .insertTable({
                  rows: 3,
                  cols: 3,
                  withHeaderRow: true,
                })
                .run()
            )
          }
          {...props}
        >
          <TableIcon className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}

export default TableDropdownMenu;
