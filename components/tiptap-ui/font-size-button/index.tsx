"use client";

import * as React from "react";
import type { Editor } from "@tiptap/react";

import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

import type { ButtonProps } from "@/components/tiptap-ui-primitive/button";
import { Button, ButtonGroup } from "@/components/tiptap-ui-primitive/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/tiptap-ui-primitive/dropdown-menu";
import { Card, CardBody } from "@/components/tiptap-ui-primitive/card";
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon";
import { FontSizeIcon } from "@/components/tiptap-icons/font-size-icon";
import { AVAILABLE_FONT_SIZES } from "./font-size-extension";
import { cn } from "@/lib/tiptap-utils";

export interface FontSizeDropdownProps extends Omit<ButtonProps, "type"> {
  editor?: Editor;
  sizes?: string[];
  onOpenChange?: (open: boolean) => void;
  portal?: boolean;
}

export function FontSizeDropdown({
  editor: providedEditor,
  sizes = AVAILABLE_FONT_SIZES,
  onOpenChange,
  portal = false,
  ...props
}: FontSizeDropdownProps) {
  const { editor } = useTiptapEditor(providedEditor);
  const [open, setOpen] = React.useState(false);

  const handleOnOpenChange = React.useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      onOpenChange?.(isOpen);
    },
    [onOpenChange]
  );

  if (!editor || !editor.isEditable) return null;

  // check is dropdown selected or not
  const isSelectDropdownItem = sizes.some((size) =>
    editor.isActive("textStyle", { fontSize: size })
  );

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
          role="button"
          tabIndex={-1}
          aria-label="Font size"
          tooltip="Font size"
          data-active-state={isSelectDropdownItem ? "on" : "off"}
          {...props}
        >
          <FontSizeIcon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        portal={portal}
        className="custom-dropdown"
      >
        <Card>
          <CardBody>
            <ButtonGroup>
              {sizes.map((size) => {
                const isActive = editor.isActive("textStyle", {
                  fontSize: size,
                });

                return (
                  <DropdownMenuItem key={size} asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      className={cn("cursor-pointer", isActive && "is-active")}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().setFontSize(size).run()
                        )
                      }
                    >
                      {size}
                    </Button>
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuItem asChild>
                <Button
                  type="button"
                  data-style="ghost"
                  className="cursor-pointer"
                  onClick={() =>
                    exec(() => editor.chain().focus().unsetFontSize().run())
                  }
                >
                  Reset
                </Button>
              </DropdownMenuItem>
            </ButtonGroup>
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FontSizeDropdown;
