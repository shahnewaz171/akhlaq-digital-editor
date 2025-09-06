import { computePosition } from "@floating-ui/dom";
import { ReactRenderer } from "@tiptap/react";
import type { Editor } from "@tiptap/react";

import EmojiList from "@/components/tiptap-node/emoji-node/EmojiList";

interface EmojiItem {
  name: string;
  shortcodes: string[];
  tags: string[];
  fallbackImage?: string;
}

interface EmojiSuggestionProps {
  editor: Editor;
  query: string;
}

interface SuggestionProps {
  editor: Editor;
  clientRect?: (() => DOMRect | null) | null;
  items: EmojiItem[];
  command: (item: { name: string }) => void;
}

interface SuggestionKeyDownProps {
  event: KeyboardEvent;
}

const emojiSuggestion = {
  items: ({ editor, query }: EmojiSuggestionProps) => {
    return editor.storage.emoji.emojis
      .filter(({ shortcodes, tags }: EmojiItem) => {
        return (
          shortcodes.find((shortcode: string) =>
            shortcode.startsWith(query.toLowerCase())
          ) || tags.find((tag: string) => tag.startsWith(query.toLowerCase()))
        );
      })
      .slice(0, 5);
  },

  allowSpaces: false,

  render: () => {
    let component: ReactRenderer | null = null;

    function repositionComponent(clientRect: DOMRect | null) {
      if (!component || !component.element || !clientRect) {
        return;
      }

      const virtualElement = {
        getBoundingClientRect() {
          return clientRect;
        },
      };

      computePosition(virtualElement, component.element as HTMLElement, {
        placement: "bottom-start",
      }).then((pos) => {
        if (component?.element) {
          Object.assign((component.element as HTMLElement).style, {
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            position: pos.strategy === "fixed" ? "fixed" : "absolute",
          });
        }
      });
    }

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(EmojiList, {
          props,
          editor: props.editor,
        });

        document.body.appendChild(component.element);
        if (props.clientRect) {
          repositionComponent(props.clientRect());
        }
      },

      onUpdate(props: SuggestionProps) {
        component?.updateProps(props);
        if (props.clientRect) {
          repositionComponent(props.clientRect());
        }
      },

      onKeyDown(props: SuggestionKeyDownProps) {
        if (props.event.key === "Escape") {
          if (component?.element) {
            document.body.removeChild(component.element);
            component.destroy();
          }
          return true;
        }

        return (component?.ref as any)?.onKeyDown?.(props);
      },

      onExit() {
        if (component?.element && document.body.contains(component.element)) {
          document.body.removeChild(component.element);
        }
        component?.destroy();
      },
    };
  },
};

export default emojiSuggestion;
