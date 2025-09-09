import React from "react";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { handleFileUpload } from "@/lib/tiptap-utils";

// --- Tiptap UI ---
import type { UseImageUploadConfig } from "@/components/tiptap-ui/image-upload-button";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button";
import FileIcon from "@/components/custom-svg/FileIcon";

export interface FileUploadButtonProps
  extends Omit<ButtonProps, "type">,
    UseImageUploadConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string;
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean;
  acceptedFileTypes: string;
  handleFilesChange: (files: File[]) => Promise<void>;
}

export const FileUploadButton = React.forwardRef<
  HTMLButtonElement,
  FileUploadButtonProps
>(
  (
    {
      editor: providedEditor,
      text,
      acceptedFileTypes,
      handleFilesChange,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);

    // ref
    const toastId = React.useRef<any>(null);

    const handleClick = () => {
      if (editor) {
        handleFileUpload(editor, acceptedFileTypes, handleFilesChange, toastId);
      }
    };

    return (
      <Button
        type="button"
        data-style="ghost"
        disabled={!editor?.isEditable}
        data-disabled={!editor?.isEditable}
        role="button"
        tabIndex={-1}
        tooltip="Add file"
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        <FileIcon className="akd-button-icon" />
        {text && <span className="akd-button-text">{text}</span>}
      </Button>
    );
  }
);

FileUploadButton.displayName = "FileUploadButton";
