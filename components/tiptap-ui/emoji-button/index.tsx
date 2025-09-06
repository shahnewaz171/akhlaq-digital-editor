import * as React from "react";
import { useState, useRef } from "react";
import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/tiptap-ui-primitive/dropdown-menu";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { EmojiIcon } from "@/components/tiptap-icons/emoji-icon";
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon";
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { ArrowRightIcon } from "@/components/tiptap-icons/arrow-right-icon";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import EMOJI_CATEGORIES from "@/utils/emoji-category";

function EmojiDropdown({ editor: providedEditor }: { editor?: Editor }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("smileys");
  const categoryContainerRef = useRef<HTMLDivElement>(null);

  const { editor } = useTiptapEditor(providedEditor);

  if (!editor || !editor.isEditable) return null;

  const setEmoji = (emojiName: string) => {
    editor.chain().focus().setEmoji(emojiName).run();
  };

  // navigation functions for categories
  const scrollCategories = (direction: "left" | "right") => {
    if (categoryContainerRef.current) {
      const scrollAmount = 200;
      const currentScroll = categoryContainerRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      categoryContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  // check if any emoji is currently active
  const isEmojiSelected = editor.isActive("emoji");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          aria-label="Emoji"
          className="!p-1 cursor-pointer flex items-center justify-center gap-1"
          tooltip="Emoji"
          data-active-state={isEmojiSelected ? "on" : "off"}
          style={{
            border: "none",
            padding: 0,
            minWidth: 0,
            boxShadow: "none",
          }}
        >
          <EmojiIcon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="p-3 bg-white z-10 rounded-md w-96"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
      >
        {/* category tabs - horizontal scrollable with navigation */}
        <div className="mb-3 border-b border-gray-200 pb-2">
          <div className="relative flex items-center">
            <Button
              type="button"
              data-style="ghost"
              className="absolute left-0 z-10 !p-0 !min-w-[28px] !h-[28px] bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
              onClick={() => scrollCategories("left")}
              aria-label="Scroll categories left"
            >
              <ArrowLeftIcon className="h-3 w-3" />
            </Button>

            <div
              ref={categoryContainerRef}
              className="flex gap-1 overflow-x-auto mx-10 px-2 scrollbar-hide"
            >
              {Object.entries(EMOJI_CATEGORIES).map(([key, category]) => (
                <Button
                  key={key}
                  type="button"
                  data-style="ghost"
                  className={`px-3 py-1 text-xs cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === key
                      ? "!g-blue-100 !text-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(key)}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            <Button
              type="button"
              data-style="ghost"
              className="absolute right-0 z-10 !p-0 !min-w-[28px] !h-[28px] bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
              onClick={() => scrollCategories("right")}
              aria-label="Scroll categories right"
            >
              <ArrowRightIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Emoji grid - 3 rows with navigation arrows */}
        <div className="overflow-x-auto mx-10 px-2">
          <div
            className="grid grid-flow-col auto-cols-max gap-1 pb-2"
            style={{ gridTemplateRows: "repeat(3, minmax(0, 1fr))" }}
          >
            {EMOJI_CATEGORIES[
              selectedCategory as keyof typeof EMOJI_CATEGORIES
            ]?.emojis?.map((item: { emoji: string; name: string }) => {
              const isActive = editor.isActive("emoji", { emoji: item.name });

              return (
                <DropdownMenuItem asChild key={item.name}>
                  <Button
                    type="button"
                    data-style="ghost"
                    aria-label={item.name}
                    className={`cursor-pointer !p-0 hover:bg-gray-100 ${
                      isActive ? "bg-blue-50 ring-2 ring-blue-200" : ""
                    }`}
                    tooltip={item.name.replace(/_/g, " ")}
                    style={{
                      borderRadius: "4px",
                      height: 36,
                      width: 36,
                      minWidth: 36,
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setEmoji(item.name)}
                  >
                    {item.emoji}
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface EmojiButtonProps {
  editor?: any;
  [key: string]: any;
}

const EmojiButton = ({
  editor: providedEditor,
  ...props
}: EmojiButtonProps) => {
  return <EmojiDropdown editor={providedEditor} {...props} />;
};

export default EmojiButton;
