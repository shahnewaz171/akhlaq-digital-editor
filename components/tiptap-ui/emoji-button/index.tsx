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

  const setEmoji = (emojiName: string) => {
    editor?.chain().focus().setEmoji(emojiName).run();
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
  const isEmojiSelected = editor?.isActive("emoji");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={!editor?.isEditable}>
        <Button
          type="button"
          data-style="ghost"
          aria-label="Emoji"
          disabled={!editor?.isEditable}
          data-disabled={!editor?.isEditable}
          className="akd-p-1 akd-flex akd-items-center akd-justify-center akd-gap-1"
          tooltip="Emoji"
          data-active-state={isEmojiSelected ? "on" : "off"}
          style={{
            border: "none",
            padding: 0,
            minWidth: 0,
            boxShadow: "none",
          }}
        >
          <EmojiIcon className="akd-button-icon" />
          <ChevronDownIcon className="akd-button-icon" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="akd-p-3 akd-bg-white akd-z-10 akd-rounded-md akd-w-96"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
      >
        {/* category tabs - horizontal scrollable with navigation */}
        <div className="akd-mb-3 akd-border-b akd-border-gray-200 akd-pb-2">
          <div className="akd-relative akd-flex akd-items-center">
            <Button
              type="button"
              data-style="ghost"
              className="akd-absolute akd-left-0 akd-z-10 akd-p-0 akd-min-w-28 akd-h-28 akd-bg-white akd-shadow-sm akd-border akd-border-gray-200 akd-hover-bg-gray-50"
              onClick={() => scrollCategories("left")}
              aria-label="Scroll categories left"
            >
              <ArrowLeftIcon className="akd-h-3 akd-w-3" />
            </Button>

            <div
              ref={categoryContainerRef}
              className="akd-flex akd-gap-1 akd-overflow-x-auto akd-mx-10 akd-px-2 akd-scrollbar-hide"
            >
              {Object.entries(EMOJI_CATEGORIES).map(([key, category]) => (
                <Button
                  key={key}
                  type="button"
                  data-style="ghost"
                  className={`akd-px-3 akd-py-1 akd-text-xs akd-cursor-pointer akd-whitespace-nowrap akd-flex-shrink-0 ${
                    selectedCategory === key
                      ? "akd-bg-blue-100 akd-text-blue-700"
                      : "akd-hover-bg-gray-100"
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
              className="akd-absolute akd-right-0 akd-z-10 akd-p-0 akd-min-w-28 akd-h-28 akd-bg-white akd-shadow-sm akd-border akd-border-gray-200 akd-hover-bg-gray-50"
              onClick={() => scrollCategories("right")}
              aria-label="Scroll categories right"
            >
              <ArrowRightIcon className="akd-h-3 akd-w-3" />
            </Button>
          </div>
        </div>

        {/* Emoji grid - 3 rows with navigation arrows */}
        <div className="akd-overflow-x-auto akd-mx-10 akd-px-2">
          <div
            className="akd-grid akd-grid-flow-col akd-auto-cols-max akd-gap-1 akd-pb-2 akd-grid-rows-3"
            style={{ gridTemplateRows: "repeat(3, minmax(0, 1fr))" }}
          >
            {EMOJI_CATEGORIES[
              selectedCategory as keyof typeof EMOJI_CATEGORIES
            ]?.emojis?.map((item: { emoji: string; name: string }) => {
              const isActive = editor?.isActive("emoji", { emoji: item.name });

              return (
                <DropdownMenuItem asChild key={item.name}>
                  <Button
                    type="button"
                    data-style="ghost"
                    aria-label={item.name}
                    className={`akd-cursor-pointer akd-p-0 akd-hover-bg-gray-100 akd-emoji-button-style ${
                      isActive
                        ? "akd-bg-blue-50 akd-ring-2 akd-ring-blue-200"
                        : ""
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
