import TableHeader from "@tiptap/extension-table-header";
import type { Attribute } from "@tiptap/core";

interface TableHeaderAttributes {
  backgroundColor: string | null;
}

const CustomTableHeader = TableHeader.extend<{
  addAttributes: () => Record<keyof TableHeaderAttributes, Attribute>;
}>({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-background-color") || null,

        renderHTML: (attributes: TableHeaderAttributes) => {
          if (!attributes.backgroundColor) return {};
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor};`,
          };
        },
      },
    };
  },
});

export default CustomTableHeader;
