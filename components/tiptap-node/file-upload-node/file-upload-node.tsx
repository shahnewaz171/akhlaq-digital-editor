import { NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { CloseIcon } from "@/components/tiptap-icons/close-icon";
import "@/components/tiptap-node/file-upload-node/file-upload-node.scss";

export const FileUploadNode = (props: any) => {
  const { node, deleteNode } = props;
  const { attrs } = node;

  return (
    <NodeViewWrapper className="file-upload-node">
      <div className="file-info">
        <div className="file-name">{attrs["data-file-name"]}</div>
        <div className="file-size">{attrs["data-file-size"]}</div>
      </div>
      <Button onClick={deleteNode} data-style="ghost">
        <CloseIcon className="akd-button-icon" />
      </Button>
    </NodeViewWrapper>
  );
};
