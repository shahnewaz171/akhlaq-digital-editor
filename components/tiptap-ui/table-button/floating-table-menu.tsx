"use client";

import * as React from "react";
import type { Editor } from "@tiptap/react";
import { FloatingMenu } from "@tiptap/react/menus";
import "./floating-table-menu.scss";

// Hooks
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// Primitives
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button";
import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/tiptap-ui-primitive/dropdown-menu";
import { Card, CardBody } from "@/components/tiptap-ui-primitive/card";

// Icons
import { TrashIcon } from "@/components/tiptap-icons/trash-icon";
import { TableCellColorMenu } from "@/components/tiptap-ui/table-button/table-cell-color-menu";
import { ListIcon } from "@/components/tiptap-icons/list-icon";
import { ListOrderedIcon } from "@/components/tiptap-icons/list-ordered-icon";
import { HeadingIcon } from "@/components/tiptap-icons/heading-icon";
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon";
import { CornerDownLeftIcon } from "@/components/tiptap-icons/corner-down-left-icon";
import { Code2Icon } from "@/components/tiptap-icons/code2-icon";
import WrenchIcon from "@/components/tiptap-icons/wrench-icon";
import { AlignLeftIcon } from "@/components/tiptap-icons/align-left-icon";
import { AlignCenterIcon } from "@/components/tiptap-icons/align-center-icon";
import { AlignRightIcon } from "@/components/tiptap-icons/align-right-icon";
import { AlignJustifyIcon } from "@/components/tiptap-icons/align-justify-icon";

export interface FloatingTableMenuProps extends Omit<ButtonProps, "type"> {
  editor?: Editor | null;
  isFocusedEditor?: boolean;
  portal?: boolean;
}

declare module "@tiptap/core" {
  interface Storage {
    autoHideWhileTyping: {
      isTyping: boolean;
      timeoutId: NodeJS.Timeout | null;
    };
  }
}

function FloatingTableMenu({
  editor: providedEditor,
  isFocusedEditor = true,
  portal = false,
}: FloatingTableMenuProps) {
  const { editor } = useTiptapEditor(providedEditor);

  if (!editor || !editor.isEditable) return null;

  const shouldShow = ({ editor }: { editor: Editor }) => {
    const typingStorage = editor.storage.autoHideWhileTyping;
    return editor.isActive("table") && !typingStorage?.isTyping;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const exec = (fn: () => void) => {
    fn();
  };

  return (
    <FloatingMenu
      className="floating-menu"
      editor={editor}
      shouldShow={shouldShow}
      hidden={!isFocusedEditor}
      options={{ placement: "bottom-start" }}
    >
      <Card className="bg-white z-[1]">
        <CardBody>
          <div className="space-y-2">
            {/* Row 1 */}
            <div className="grid grid-cols-4 gap-2">
              {/* Alignment Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    aria-label="Align"
                    tooltip="Align"
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <AlignLeftIcon className="tiptap-button-icon" />
                    <ChevronDownIcon className="tiptap-button-icon" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  portal={portal}
                  className="divide-y divide-gray-200 dark:divide-gray-700 bg-white p-2 rounded-md"
                  style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
                >
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().setTextAlign("left").run()
                        )
                      }
                    >
                      <AlignLeftIcon className="tiptap-button-icon" /> Left
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().setTextAlign("center").run()
                        )
                      }
                    >
                      <AlignCenterIcon className="tiptap-button-icon" /> Center
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().setTextAlign("right").run()
                        )
                      }
                    >
                      <AlignRightIcon className="tiptap-button-icon" /> Right
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().setTextAlign("justify").run()
                        )
                      }
                    >
                      <AlignJustifyIcon className="tiptap-button-icon" />{" "}
                      Justify
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Rows */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    aria-label="Row actions"
                    tooltip="Row actions"
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <ListOrderedIcon className="tiptap-button-icon" />
                    <ChevronDownIcon className="tiptap-button-icon" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  portal={portal}
                  className="divide-y divide-gray-200 dark:divide-gray-700 bg-white p-2 rounded-md"
                  style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
                >
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().addRowBefore().run())
                      }
                    >
                      Row before
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().addRowAfter().run())
                      }
                    >
                      Row after
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().deleteRow().run())
                      }
                    >
                      Delete row
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Columns */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    aria-label="Column actions"
                    tooltip="Column actions"
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <ListIcon className="tiptap-button-icon" />
                    <ChevronDownIcon className="tiptap-button-icon" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  portal={portal}
                  className="divide-y divide-gray-200 dark:divide-gray-700 bg-white p-2 rounded-md"
                  style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
                >
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().addColumnBefore().run()
                        )
                      }
                    >
                      Col before
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().addColumnAfter().run()
                        )
                      }
                    >
                      Col after
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().deleteColumn().run())
                      }
                    >
                      Delete col
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Headers */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    aria-label="Header toggles"
                    tooltip="Header toggles"
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <HeadingIcon className="tiptap-button-icon" />
                    <ChevronDownIcon className="tiptap-button-icon" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  portal={portal}
                  className="divide-y divide-gray-200 dark:divide-gray-700 bg-white p-2 rounded-md"
                  style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
                >
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().toggleHeaderRow().run()
                        )
                      }
                    >
                      Header row
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().toggleHeaderColumn().run()
                        )
                      }
                    >
                      Header col
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().toggleHeaderCell().run()
                        )
                      }
                    >
                      Header cell
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cell operations */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    aria-label="Cell operations"
                    tooltip="Cell operations"
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <Code2Icon className="tiptap-button-icon" />
                    <ChevronDownIcon className="tiptap-button-icon" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  portal={portal}
                  className="divide-y divide-gray-200 dark:divide-gray-700 bg-white p-2 rounded-md"
                  style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
                >
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().mergeCells().run())
                      }
                    >
                      Merge cells
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().splitCell().run())
                      }
                    >
                      Split cell
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().mergeOrSplit().run())
                      }
                    >
                      Merge or split
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cell background */}
              <TableCellColorMenu
                editor={editor}
                handleMouseDown={handleMouseDown}
              />

              {/* Navigate */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    aria-label="Navigate cells"
                    tooltip="Navigate cells"
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <CornerDownLeftIcon className="tiptap-button-icon" />
                    <ChevronDownIcon className="tiptap-button-icon" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  portal={portal}
                  className="divide-y divide-gray-200 dark:divide-gray-700 bg-white p-2 rounded-md"
                  style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
                >
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() =>
                          editor.chain().focus().goToPreviousCell().run()
                        )
                      }
                    >
                      Prev cell
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().goToNextCell().run())
                      }
                    >
                      Next cell
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Utilities */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    aria-label="Utilities"
                    tooltip="Utilities"
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <WrenchIcon className="tiptap-button-icon" />
                    <ChevronDownIcon className="tiptap-button-icon" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  portal={portal}
                  className="divide-y divide-gray-200 dark:divide-gray-700 bg-white p-2 rounded-md"
                  style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
                >
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().fixTables().run())
                      }
                    >
                      Fix tables
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Danger */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    data-style="ghost"
                    aria-label="Danger"
                    tooltip="Danger"
                    className="flex items-center gap-1 text-red-600"
                  >
                    <TrashIcon className="tiptap-button-icon" />
                    <ChevronDownIcon className="tiptap-button-icon" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  portal={portal}
                  className="divide-y divide-gray-200 dark:divide-gray-700 bg-white p-2 rounded-md"
                  style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
                >
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().deleteRow().run())
                      }
                    >
                      Delete row
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().deleteColumn().run())
                      }
                    >
                      Delete col
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      type="button"
                      data-style="ghost"
                      className="text-red-600"
                      onMouseDown={handleMouseDown}
                      onClick={() =>
                        exec(() => editor.chain().focus().deleteTable().run())
                      }
                    >
                      Delete table
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardBody>
      </Card>
    </FloatingMenu>
  );
}

export default FloatingTableMenu;
