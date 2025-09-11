import * as React from "react";
import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/tiptap-ui-primitive/dropdown-menu";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { BanIcon } from "@/components/tiptap-icons/ban-icon";
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon";
import { CheckIcon } from "@/components/tiptap-icons/check-icon";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import FontSizeIcon from "@/components/tiptap-icons/font-size-icon";

// 7x3 grid of colors (21 total)
const TEXT_COLORS = [
  { color: "#D32F2F", name: "Crimson red" },
  { color: "#1976D2", name: "Royal blue" },
  { color: "#388E3C", name: "Emerald green" },
  { color: "#F57C00", name: "Vivid orange" },
  { color: "#8E24AA", name: "Deep purple" },
  { color: "#FBC02D", name: "Bright yellow" },
  { color: "#0288D1", name: "Cyan blue" },
  { color: "#43A047", name: "Spring green" },
  { color: "#FF5722", name: "Coral" },
  { color: "#7B1FA2", name: "Royal violet" },
  { color: "#009688", name: "Teal" },
  { color: "#455A64", name: "Slate gray" },
  { color: "#512DA8", name: "Indigo" },
  { color: "#FF9800", name: "Amber" },
  { color: "#00BCD4", name: "Bright cyan" },
  { color: "#FFC107", name: "Sunshine yellow" },
  { color: "#F5F5F5", name: "Off white" },
  { color: "#E0F7FA", name: "Pale aqua" },
  { color: "#FFF9C4", name: "Pale yellow" },
  { color: "#F3E5F5", name: "Pale lavender" },
  { color: "#FFEBEE", name: "Pale pink" },
];

function TextColorMenu({ editor: providedEditor }: { editor?: Editor }) {
  const { editor } = useTiptapEditor(providedEditor);

  const setColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  // check if selected cell has a color from the palette
  const isSelectCellColor = TEXT_COLORS.some(
    (item) => item.color === editor?.getAttributes("textStyle")?.color
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={!editor?.isEditable}>
        <Button
          type="button"
          data-style="ghost"
          aria-label="Text color"
          disabled={!editor?.isEditable}
          data-disabled={!editor?.isEditable}
          className="akd-p-1 akd-pl-2 akd-flex akd-items-center akd-justify-center akd-gap-1"
          tooltip="Text color"
          data-active-state={isSelectCellColor ? "on" : "off"}
          style={{
            border: "none",
            padding: 0,
            minWidth: 0,
            boxShadow: "none",
          }}
        >
          <span className="akd-relative akd-inline-block-font-bold-14">
            <FontSizeIcon className="akd-button-icon" />
            <span
              className="akd-absolute akd-bottom-neg-2 akd-left-0 akd-right-0 akd-h-3px"
              style={{
                backgroundColor:
                  editor?.getAttributes("textStyle")?.color || "#000000",
              }}
            />
          </span>
          <ChevronDownIcon className="akd-button-icon" />
        </Button>
      </DropdownMenuTrigger>

      {/* dropdown content */}
      <DropdownMenuContent
        align="start"
        className="akd-p-2 akd-bg-white akd-rounded-md"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
      >
        <div className="akd-grid akd-grid-cols-7 akd-gap-1-5">
          {TEXT_COLORS.map((item) => {
            const isCellYellow = editor?.isActive("textStyle", {
              color: item.color,
            });

            return (
              <DropdownMenuItem asChild key={item.color}>
                <Button
                  type="button"
                  data-style="ghost"
                  aria-label={item.name}
                  className="akd-cursor-pointer akd-p-0"
                  tooltip={item.name}
                  style={{
                    background: item.color,
                    borderRadius: "4px",
                    height: 26,
                    width: 26,
                    minWidth: 0,
                    boxShadow: "0 0 0 1px #e5e7eb",
                  }}
                  onClick={() => setColor(item.color)}
                >
                  {isCellYellow && (
                    <CheckIcon className="akd-text-black akd-font-semibold" />
                  )}
                </Button>
              </DropdownMenuItem>
            );
          })}
        </div>

        {/* remove cell background */}
        <div className="akd-flex akd-justify-center akd-mt-2">
          <Button
            onClick={() => editor?.chain().focus().unsetColor().run()}
            aria-label="Remove color"
            tooltip="Remove color"
            type="button"
            role="menuitem"
            data-style="ghost"
            className="akd-cursor-pointer"
            data-testid="unsetColor"
            style={{ height: 28, width: 28, minWidth: 0, borderRadius: 4 }}
          >
            <BanIcon className="akd-button-icon" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TextColorMenu;
