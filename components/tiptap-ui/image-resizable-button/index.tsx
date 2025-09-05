import "tiptap-extension-resizable-image/styles.css";

import * as Popover from "@radix-ui/react-popover";
// import { AlignLeftIcon } from "@/components/tiptap-icons/align-left-icon";
// import { AlignCenterIcon } from "@/components/tiptap-icons/align-center-icon";
// import { AlignRightIcon } from "@/components/tiptap-icons/align-right-icon";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import {
  ResizableImage,
  ResizableImageComponent,
  ResizableImageNodeViewRendererProps,
} from "tiptap-extension-resizable-image";

const NodeView = (props: ResizableImageNodeViewRendererProps) => {
  //   const editor = props.editor;

  //   const setTextAlign = (textAlign: string) => {
  //     editor.chain().focus().setTextAlign(textAlign).run();
  //   };

  return (
    <NodeViewWrapper className="image-component" data-drag-handle>
      <Popover.Root>
        <Popover.Trigger asChild>
          <div style={{ display: "inline-flex" }}>
            <ResizableImageComponent {...props} />
          </div>
        </Popover.Trigger>
        {/* <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="center"
            className="z-50 bg-white border rounded shadow-md p-2 flex gap-1 my-2"
          >
            <button
              type="button"
              onClick={() => setTextAlign("left")}
              className="p-1 rounded hover:bg-gray-100 focus:bg-gray-200"
              aria-label="Align left"
            >
              <AlignLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => setTextAlign("center")}
              className="p-1 rounded hover:bg-gray-100 focus:bg-gray-200"
              aria-label="Align center"
            >
              <AlignCenterIcon />
            </button>
            <button
              type="button"
              onClick={() => setTextAlign("right")}
              className="p-1 rounded hover:bg-gray-100 focus:bg-gray-200"
              aria-label="Align right"
            >
              <AlignRightIcon />
            </button>
          </Popover.Content>
        </Popover.Portal> */}
      </Popover.Root>
    </NodeViewWrapper>
  );
};

export const ResizableImageExtension = ResizableImage.extend({
  addNodeView() {
    return ReactNodeViewRenderer((props) =>
      NodeView(props as unknown as ResizableImageNodeViewRendererProps)
    );
  },
});
