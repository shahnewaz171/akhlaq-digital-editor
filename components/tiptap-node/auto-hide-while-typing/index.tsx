import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

interface AutoHideStorage {
  isTyping: boolean;
  timeoutId: NodeJS.Timeout | null;
}

export const AutoHideWhileTyping = Extension.create<{
  storage: AutoHideStorage;
}>({
  name: "autoHideWhileTyping",

  addStorage() {
    return {
      isTyping: false,
      timeoutId: null,
    };
  },

  onTransaction({ editor, transaction }) {
    const isTableActive = editor.isActive("table");

    if (!transaction.docChanged || !isTableActive) return;

    this.storage.isTyping = true;
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            focus: () => {
              this.storage.isTyping = false;
              return false;
            },
            mousedown: () => {
              this.storage.isTyping = false;
              return false;
            },
          },
        },
      }),
    ];
  },
});
