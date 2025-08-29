import { Editor, ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";

import { MentionList } from "@/components/tiptap-ui/mention-list";

interface SuggestionProps {
  editor: Editor;
  clientRect?: (() => DOMRect | null) | null;
}

interface SuggestionKeyDownProps {
  event: KeyboardEvent;
}

export const getMentionSuggestion = (mentions: any[]) => ({
  items: ({ query }: { query: string }) => {
    return (
      mentions?.filter((item) =>
        item.name?.toLowerCase()?.includes(query?.toLowerCase())
      ) || []
    );
  },

  render: () => {
    let component: ReactRenderer<any>;
    let popup: Instance[];

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: () => {
            const rect = props.clientRect?.();
            return rect || new DOMRect(0, 0, 0, 0);
          },
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: SuggestionProps) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: () => {
            const rect = props.clientRect?.();
            return rect || new DOMRect(0, 0, 0, 0);
          },
        });
      },

      onKeyDown(props: SuggestionKeyDownProps) {
        if (props.event?.key === "Escape") {
          popup[0].hide();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
});
