import TableCell from "@tiptap/extension-table-cell";
import { Attribute } from "@tiptap/core";

interface TableCellAttributes {
  backgroundColor: string | null;
}

const CustomTableCell = TableCell.extend<{
  addAttributes: () => Record<keyof TableCellAttributes, Attribute>;
}>({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-background-color") || null,
        renderHTML: (attributes: TableCellAttributes) => {
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

export default CustomTableCell;
