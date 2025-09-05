import { handleImageString } from "@/lib/tiptap-utils";
import { Node } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

export interface Base64ImageNodeAttributes {
  src: string;
  title?: string;
}

export interface HandleImagePasteAndDropParams {
  file: File;
  context: "paste" | "drop";
}

export const Base64ImageNode = Node.create({
  name: "base64Image",
  group: "block",
  inline: false,
  atom: true,

  addOptions() {
    return {
      onPasteAndDrop: (): boolean | Promise<string | boolean> => false,
    };
  },

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'img[src^="data:image"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", HTMLAttributes];
  },

  //  manage drop and paste content
  addProseMirrorPlugins() {
    const options = this.options;
    const editor = this.editor;

    return [
      new Plugin({
        props: {
          handlePaste: (view, event) => {
            const clipboardData = event.clipboardData;

            const textContent =
              clipboardData?.getData("text/plain") ||
              clipboardData?.getData("text/html");

            const base64String = textContent?.match(
              /(data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64),([A-Za-z0-9+/=]+)/
            );

            if (Array.isArray(base64String)) {
              handleImageString(
                base64String[0],
                "paste",
                options.onPasteAndDrop,
                editor
              );
              return true;
            }
            return false;
          },
          handleDrop: (view, event, slice, moved) => {
            const dt = event.dataTransfer;
            if (!dt) return false;

            let isFirstImage = false;

            for (let i = 0; !moved && i < dt.items.length; i++) {
              const item = dt.items[i];

              if (item.kind === "string" && item.type === "text/html") {
                // only process the first image
                if (!isFirstImage) {
                  isFirstImage = true;

                  item.getAsString((html: any) => {
                    const base64String = html?.match(
                      /<img[^>]+src=["'](data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,[A-Za-z0-9+/=]+|https?:\/\/[^"']+)["']/
                    );

                    if (
                      Array.isArray(base64String) &&
                      base64String.length > 1
                    ) {
                      const imageContent = base64String[1];
                      handleImageString(
                        imageContent,
                        "drop",
                        options.onPasteAndDrop,
                        editor
                      );
                    }
                  });
                }
                return true;
              }
            }
            return false;
          },
        },
      }),
    ];
  },
});

export default Base64ImageNode;
