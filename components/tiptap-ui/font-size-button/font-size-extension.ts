import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

export const AVAILABLE_FONT_SIZES = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
];

function normalizeSize(size?: string | null): string | null {
  if (!size) return null;
  // Already px
  if (/^\d+(\.\d+)?px$/.test(size)) return size;
  // Number only -> px
  if (/^\d+(\.\d+)?$/.test(size)) return `${size}px`;
  return size;
}

const FontSizeExtension = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.fontSize || null,
            renderHTML: (attributes: { fontSize?: string | null }) => {
              const value = normalizeSize(attributes.fontSize ?? null);
              if (!value) return {};
              return { style: `font-size: ${value}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }) => {
          const value = normalizeSize(size);
          if (!value) {
            return chain().setMark("textStyle", { fontSize: null }).run();
          }
          return chain().setMark("textStyle", { fontSize: value }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize: null }).run();
        },
    };
  },
});

export default FontSizeExtension;
