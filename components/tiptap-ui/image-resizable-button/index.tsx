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
            className="akd-z-50 akd-bg-white akd-border akd-rounded akd-shadow-md akd-p-2 akd-flex akd-gap-1 akd-my-2"
          >
            <button
              type="button"
              onClick={() => setTextAlign("left")}
              className="akd-p-1 akd-rounded akd-hover-bg-gray-100 akd-focus-bg-gray-200"
              aria-label="Align left"
            >
              <AlignLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => setTextAlign("center")}
              className="akd-p-1 akd-rounded akd-hover-bg-gray-100 akd-focus-bg-gray-200"
              aria-label="Align center"
            >
              <AlignCenterIcon />
            </button>
            <button
              type="button"
              onClick={() => setTextAlign("right")}
              className="akd-p-1 akd-rounded akd-hover-bg-gray-100 akd-focus-bg-gray-200"
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
