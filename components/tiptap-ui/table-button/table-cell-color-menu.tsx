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

// 7x4 grid of colors (28 total)
const TABLE_COLORS = [
  { color: "#FFFFFF", name: "Pure white" },
  { color: "#F8FAFC", name: "Soft gray" },
  { color: "#E5E7EB", name: "Light gray" },
  { color: "#FEE2E2", name: "Blush pink" },
  { color: "#FBCFE8", name: "Pastel pink" },
  { color: "#F9A8D4", name: "Bright pink" },
  { color: "#F472B6", name: "Hot pink" },
  { color: "#FEF9C3", name: "Pale yellow" },
  { color: "#FDE68A", name: "Sunny yellow" },
  { color: "#FCD34D", name: "Golden yellow" },
  { color: "#DCFCE7", name: "Mint green" },
  { color: "#A7F3D0", name: "Subtle green" },
  { color: "#6EE7B7", name: "Teal green" },
  { color: "#34D399", name: "Emerald green" },
  { color: "#BFDBFE", name: "Sky blue" },
  { color: "#93C5FD", name: "Cornflower blue" },
  { color: "#60A5FA", name: "Azure blue" },
  { color: "#C7D2FE", name: "Lavender blue" },
  { color: "#818CF8", name: "Indigo blue" },
  { color: "#A5B4FC", name: "Periwinkle" },
  { color: "#E0E7FF", name: "Powder indigo" },
  { color: "#DDD6FE", name: "Lilac purple" },
  { color: "#F3E8FF", name: "Mauve purple" },
  { color: "#C084FC", name: "Violet purple" },
  { color: "#F97316", name: "Warm orange" },
  { color: "#FDBA74", name: "Peach cream" },
  { color: "#CFFAFE", name: "Aqua blue" },
  { color: "#D9F99D", name: "Lime green" },
];

export function TableCellColorMenu({
  editor: providedEditor,
  handleMouseDown,
}: {
  editor?: Editor;
  handleMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { editor } = useTiptapEditor(providedEditor);

  if (!editor || !editor.isEditable) return null;

  const setColor = (color: string | null) => {
    editor.chain().focus().setCellAttribute("backgroundColor", color).run();
  };

  // check if selected cell has a color from the palette
  const selectedCellBg =
    editor.getAttributes("tableCell")?.backgroundColor ??
    editor.getAttributes("tableHeader")?.backgroundColor ??
    null;

  const isSelectCellColor = TABLE_COLORS.some(
    (item) => item.color === selectedCellBg
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          aria-label="Cell background"
          className="p-2 cursor-pointer"
          tooltip="Cell background"
          data-active-state={isSelectCellColor ? "on" : "off"}
          style={{
            border: "none",
            padding: 0,
            minWidth: 0,
            boxShadow: "none",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: selectedCellBg || "#FFFFFF",
              border: "1px solid #ccc",
              borderRadius: "4px",
              height: "16px",
              width: "16px",
              minWidth: 0,
              verticalAlign: "middle",
            }}
          />
          <ChevronDownIcon className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>

      {/* dropdown content */}
      <DropdownMenuContent
        align="start"
        className="p-2 bg-white rounded-md"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
      >
        <div className="grid grid-cols-7 gap-1.5">
          {TABLE_COLORS.map((item) => {
            const isCellYellow =
              editor.isActive("tableCell", { backgroundColor: item.color }) ||
              editor.isActive("tableHeader", { backgroundColor: item.color });

            return (
              <DropdownMenuItem asChild key={item.color}>
                <Button
                  type="button"
                  data-style="ghost"
                  aria-label={item.name}
                  className="cursor-pointer !p-0"
                  tooltip={item.name}
                  style={{
                    background: item.color,
                    borderRadius: "4px",
                    height: 26,
                    width: 26,
                    minWidth: 0,
                    boxShadow: "0 0 0 1px #e5e7eb",
                  }}
                  onMouseDown={handleMouseDown}
                  onClick={() => setColor(item.color)}
                >
                  {isCellYellow && (
                    <CheckIcon className=" text-black font-semibold" />
                  )}
                </Button>
              </DropdownMenuItem>
            );
          })}
        </div>

        {/* remove cell background */}
        <div className="flex justify-center mt-2">
          <Button
            onMouseDown={handleMouseDown}
            onClick={() => setColor(null)}
            aria-label="Remove cell background"
            tooltip="Remove cell background"
            type="button"
            role="menuitem"
            data-style="ghost"
            className="cursor-pointer"
            style={{ height: 28, width: 28, minWidth: 0, borderRadius: 4 }}
          >
            <BanIcon className="tiptap-button-icon" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
