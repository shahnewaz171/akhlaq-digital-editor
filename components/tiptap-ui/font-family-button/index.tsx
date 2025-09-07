"use client";

import * as React from "react";
import type { Editor } from "@tiptap/react";
import { AVAILABLE_FONT_FAMILIES } from "./font-family-extension";
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
import { FontFamilyIcon } from "@/components/tiptap-icons/font-family-icon";
import { cn } from "@/lib/tiptap-utils";

export interface FontFamilyDropdownProps extends Omit<ButtonProps, "type"> {
  editor?: Editor | null;
  families?: string[];
  hideWhenUnavailable?: boolean;
  onOpenChange?: (open: boolean) => void;
  portal?: boolean;
}

export function FontFamilyDropdown({
  editor: providedEditor,
  families = AVAILABLE_FONT_FAMILIES,
  onOpenChange,
  portal = false,
  ...props
}: FontFamilyDropdownProps) {
  const { editor } = useTiptapEditor(providedEditor);
  const [open, setOpen] = React.useState(false);

  const handleOnOpenChange = React.useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      onOpenChange?.(isOpen);
    },
    [onOpenChange]
  );

  // check is dropdown selected or not
  const isSelectDropdownItem = families.some((family) =>
    editor?.isActive("textStyle", { fontFamily: family })
  );

  // change font
  const handleSelectFont = (font: string, isResetFont?: boolean) => {
    if (isResetFont) {
      editor?.chain().focus().unsetFontFamily().run();
    } else {
      editor?.chain().focus().setFontFamily(font).run();
    }
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOnOpenChange}>
      <DropdownMenuTrigger asChild disabled={!editor?.isEditable}>
        <Button
          type="button"
          data-style="ghost"
          disabled={!editor?.isEditable}
          data-disabled={!editor?.isEditable}
          data-active-state={isSelectDropdownItem ? "on" : "off"}
          role="button"
          tabIndex={-1}
          aria-label="Font family"
          tooltip="Font family"
          {...props}
        >
          <FontFamilyIcon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" portal={portal}>
        <Card>
          <CardBody>
            <ButtonGroup className="gap-1 w-full">
              {families.map((family) => {
                const isActive = editor?.isActive("textStyle", {
                  fontFamily: family,
                });

                return (
                  <DropdownMenuItem key={family} asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      className={cn("cursor-pointer", isActive && "is-active")}
                      style={{ fontFamily: family }}
                      onClick={() => handleSelectFont(family)}
                    >
                      {family}
                    </Button>
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuItem asChild>
                <Button
                  type="button"
                  data-style="ghost"
                  className="cursor-pointer"
                  onClick={() => handleSelectFont("", true)}
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

export default FontFamilyDropdown;
