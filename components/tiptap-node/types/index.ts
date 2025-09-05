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
  envConfig?: ConfigParams;
  isShowMention?: boolean;
  isFileUpload?: boolean;
  isBottomToolbar?: boolean;
  acceptedFileTypes?: string;
  content?: string | null;
  className?: string;
  placeholder?: string;
  mentions?: any[];
  onChange?: (content: string | null) => void;
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

export interface GetImgixFileURLParams {
  isPrivate?: boolean;
  height?: number;
  width?: number;
  path?: string;
  rotate?: number;
  fit?: string;
  quality?: number;
}

export interface ImageComponentParams extends GetImgixFileURLParams {
  alt: string;
  className?: string;
  generatedUrl?: string;
  src?: string;
  defaultImageName?: string;
  textSize?: string;
}

export interface ImgixFileURLWIthEnvParams extends GetImgixFileURLParams {
  envConfig: ConfigParams;
}

export interface EditorEnvContextType {
  envConfig: ConfigParams;
  setEnvConfig: (config: ConfigParams) => void;
}
