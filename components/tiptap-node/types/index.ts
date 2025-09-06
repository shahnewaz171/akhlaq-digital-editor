import type { Editor } from "@tiptap/react";

export type FileWithId = File & { file_id?: string };

export type FileParams = {
  file: FileWithId;
  file_id?: string;
};

export interface HandleImageUploadParams {
  file: FileParams;
  onProgress?: (event: { progress: number }) => void;
  abortSignal?: AbortSignal;
  removeFileItem?: (id: string) => void;
}

export interface HandleImageInsertionParams extends HandleImageUploadParams {
  context: "manual" | "drop" | "paste";
}

export interface ConfigParams {
  cdnDomain?: string;
  cdnSecret?: string;
}

export interface SimpleEditorProps {
  isShowMention?: boolean;
  isFileUpload?: boolean;
  isBottomToolbar?: boolean;
  acceptedFileTypes?: string;
  content?: string | null;
  className?: string;
  placeholder?: string;
  mentions?: any[];
  onChange?: (content: string | null) => void;
  onInit?: (editor: any) => void; // Add onInit callback
  handleImageInsertion?: ({
    file,
    onProgress,
    abortSignal,
    removeFileItem,
  }: HandleImageInsertionParams) => Promise<string | null>;
  handleFilesChange?: (files: FileWithId[]) => Promise<void>;
}

export interface MainToolbarParams {
  isFileUpload: boolean;
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
  acceptedFileTypes: string;
  editor: Editor | null;
  handleFilesChange: (files: File[]) => Promise<void>;
}

export interface ImageComponentParams {
  alt: string;
  className?: string;
  generatedUrl?: string;
  src?: string;
  defaultImageName?: string;
  textSize?: string;
  isPrivate?: boolean;
  height?: number;
  width?: number;
  path?: string;
  rotate?: number;
  fit?: string;
  quality?: number;
}

export interface EditorEnvContextType {
  envConfig: ConfigParams;
  setEnvConfig: (config: ConfigParams) => void;
}

export interface ImgixFileURLWIthEnvParams {
  isPrivate?: boolean;
  height?: number;
  path?: string;
  rotate?: number;
  width?: number;
  fit?: string;
  quality?: number;
  envConfig?: ConfigParams;
}
