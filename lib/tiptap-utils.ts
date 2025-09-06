import type {
  FileWithId,
  HandleImageUploadParams,
} from "@/components/tiptap-node/types";
import { bytesToMB } from "@/utils";
import AKHLAQ_PLACEHOLDER_IMAGE from "@/utils/akhlaq-placeholder";
import toastAlert from "@/utils/toastConfig";
import type { Node as TiptapNode } from "@tiptap/pm/model";
import { NodeSelection } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/react";
import { uid } from "uid";

export const MAX_FILE_BYTES_SIZE = 25 * 1024 * 1024; // 25MB

export const MAC_SYMBOLS: Record<string, string> = {
  mod: "⌘",
  ctrl: "⌘",
  alt: "⌥",
  shift: "⇧",
  backspace: "Del",
} as const;

export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Determines if the current platform is macOS
 * @returns boolean indicating if the current platform is Mac
 */
export function isMac(): boolean {
  return (
    typeof navigator !== "undefined" &&
    navigator.platform.toLowerCase().includes("mac")
  );
}

/**
 * Formats a shortcut key based on the platform (Mac or non-Mac)
 * @param key - The key to format (e.g., "ctrl", "alt", "shift")
 * @param isMac - Boolean indicating if the platform is Mac
 * @param capitalize - Whether to capitalize the key (default: true)
 * @returns Formatted shortcut key symbol
 */
export const formatShortcutKey = (
  key: string,
  isMac: boolean,
  capitalize: boolean = true
): string => {
  if (isMac) {
    const lowerKey = key.toLowerCase();
    return MAC_SYMBOLS[lowerKey] || (capitalize ? key.toUpperCase() : key);
  }

  return capitalize ? key.charAt(0).toUpperCase() + key.slice(1) : key;
};

/**
 * Parses a shortcut key string into an array of formatted key symbols
 * @param shortcutKeys - The string of shortcut keys (e.g., "ctrl-alt-shift")
 * @param delimiter - The delimiter used to split the keys (default: "-")
 * @param capitalize - Whether to capitalize the keys (default: true)
 * @returns Array of formatted shortcut key symbols
 */
export const parseShortcutKeys = (props: {
  shortcutKeys: string | undefined;
  delimiter?: string;
  capitalize?: boolean;
}): string[] => {
  const { shortcutKeys, delimiter = "+", capitalize = true } = props;

  if (!shortcutKeys) return [];

  return shortcutKeys
    .split(delimiter)
    .map((key) => key.trim())
    .map((key) => formatShortcutKey(key, isMac(), capitalize));
};

/**
 * Checks if a mark exists in the editor schema
 * @param markName - The name of the mark to check
 * @param editor - The editor instance
 * @returns boolean indicating if the mark exists in the schema
 */
export const isMarkInSchema = (
  markName: string,
  editor: Editor | null
): boolean => {
  if (!editor?.schema) return false;
  return editor.schema.spec.marks.get(markName) !== undefined;
};

/**
 * Checks if a node exists in the editor schema
 * @param nodeName - The name of the node to check
 * @param editor - The editor instance
 * @returns boolean indicating if the node exists in the schema
 */
export const isNodeInSchema = (
  nodeName: string,
  editor: Editor | null
): boolean => {
  if (!editor?.schema) return false;
  return editor.schema.spec.nodes.get(nodeName) !== undefined;
};

/**
 * Checks if a value is a valid number (not null, undefined, or NaN)
 * @param value - The value to check
 * @returns boolean indicating if the value is a valid number
 */
export function isValidPosition(pos: number | null | undefined): pos is number {
  return typeof pos === "number" && pos >= 0;
}

/**
 * Checks if one or more extensions are registered in the Tiptap editor.
 * @param editor - The Tiptap editor instance
 * @param extensionNames - A single extension name or an array of names to check
 * @returns True if at least one of the extensions is available, false otherwise
 */
export function isExtensionAvailable(
  editor: Editor | null,
  extensionNames: string | string[]
): boolean {
  if (!editor) return false;

  const names = Array.isArray(extensionNames)
    ? extensionNames
    : [extensionNames];

  const found = names.some((name) =>
    editor.extensionManager.extensions.some((ext) => ext.name === name)
  );

  if (!found) {
    console.warn(
      `None of the extensions [${names.join(
        ", "
      )}] were found in the editor schema. Ensure they are included in the editor configuration.`
    );
  }

  return found;
}

/**
 * Finds a node at the specified position with error handling
 * @param editor The Tiptap editor instance
 * @param position The position in the document to find the node
 * @returns The node at the specified position, or null if not found
 */
export function findNodeAtPosition(
  editor: Editor,
  position: number
): TiptapNode | null {
  try {
    const node = editor.state.doc.nodeAt(position);
    if (!node) {
      console.warn(`No node found at position ${position}`);
      return null;
    }
    return node;
  } catch (error) {
    console.error(`Error getting node at position ${position}:`, error);
    return null;
  }
}

/**
 * Finds the position and instance of a node in the document
 * @param props Object containing editor, node (optional), and nodePos (optional)
 * @param props.editor The Tiptap editor instance
 * @param props.node The node to find (optional if nodePos is provided)
 * @param props.nodePos The position of the node to find (optional if node is provided)
 * @returns An object with the position and node, or null if not found
 */
export function findNodePosition(props: {
  editor: Editor | null;
  node?: TiptapNode | null;
  nodePos?: number | null;
}): { pos: number; node: TiptapNode } | null {
  const { editor, node, nodePos } = props;

  if (!editor || !editor.state?.doc) return null;

  // Zero is valid position
  const hasValidNode = node !== undefined && node !== null;
  const hasValidPos = isValidPosition(nodePos);

  if (!hasValidNode && !hasValidPos) {
    return null;
  }

  // First search for the node in the document if we have a node
  if (hasValidNode) {
    let foundPos = -1;
    let foundNode: TiptapNode | null = null;

    editor.state.doc.descendants((currentNode, pos) => {
      // TODO: Needed?
      // if (currentNode.type && currentNode.type.name === node!.type.name) {
      if (currentNode === node) {
        foundPos = pos;
        foundNode = currentNode;
        return false;
      }
      return true;
    });

    if (foundPos !== -1 && foundNode !== null) {
      return { pos: foundPos, node: foundNode };
    }
  }

  // If we have a valid position, use findNodeAtPosition
  if (hasValidPos) {
    const nodeAtPos = findNodeAtPosition(editor, nodePos!);
    if (nodeAtPos) {
      return { pos: nodePos!, node: nodeAtPos };
    }
  }

  return null;
}

/**
 * Checks if the current selection in the editor is a node selection of specified types
 * @param editor The Tiptap editor instance
 * @param types An array of node type names to check against
 * @returns boolean indicating if the selected node matches any of the specified types
 */
export function isNodeTypeSelected(
  editor: Editor,
  types: string[] = []
): boolean {
  if (!editor || !editor.state.selection) return false;

  const { state } = editor;
  const { doc, selection } = state;

  if (selection.empty) return false;

  if (selection instanceof NodeSelection) {
    const node = doc.nodeAt(selection.from);
    return node ? types.includes(node.type.name) : false;
  }

  return false;
}

/**
 * Handles image upload with progress tracking and abort capability
 * @param file The file to upload
 * @param onProgress Optional callback for tracking upload progress
 * @param abortSignal Optional AbortSignal for cancelling the upload
 * @returns Promise resolving to the URL of the uploaded image
 */

export const handleImageUpload = async ({
  file,
  onProgress,
  abortSignal,
  removeFileItem,
}: HandleImageUploadParams) => {
  const { file_id, file: rawFile } = file || {};

  const file_url = null;

  if (!file_id) {
    throw new Error("No file provided");
  }

  if (rawFile.size > MAX_FILE_BYTES_SIZE) {
    if (removeFileItem) removeFileItem(file_id);
    throw new Error(
      `File size exceeds maximum allowed: ${bytesToMB(MAX_FILE_BYTES_SIZE)}MB`
    );
  }

  // For demo/testing: Simulate upload progress. In production, replace the following code
  // with your own upload implementation.
  for (let progress = 0; progress <= 100; progress += 10) {
    if (abortSignal?.aborted) {
      throw new Error("Upload cancelled");
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    onProgress?.({ progress });
  }

  return file_url || AKHLAQ_PLACEHOLDER_IMAGE;
};

export const handleFileUpload = (
  editor: Editor,
  acceptedFileTypes: string,
  handleFilesChange: (files: FileWithId[]) => Promise<void>,
  toastId: any
): void => {
  const input = document.createElement("input");
  input.setAttribute(
    "accept",
    acceptedFileTypes ||
      ".pdf, .doc, .docx, .txt, .rtf, .odt, .xls, .xlsx, .ods, .csv, .tsv, .ppt, .pptx, .pps, .ppsx, .odp"
  );
  input.setAttribute("multiple", "true");
  input.setAttribute("type", "file");

  input.onchange = async () => {
    let files = Array.from(input.files || []);

    files.forEach((file) => {
      if (file.size > MAX_FILE_BYTES_SIZE) {
        toastAlert(
          "error",
          `${file.name} is not supported'`,
          "top-right",
          toastId
        );
        files = files.filter((item) => item.name !== file.name);
      }
    });

    if (files.length > 5) {
      toastAlert(
        "error",
        `Maximum ${5} file${files.length === 1 ? "" : "s"} allowed`,
        "top-right",
        toastId
      );
    } else if (files.length > 0) {
      await handleFilesChange(files);
    }
  };
  input.click();
};

type ProtocolOptions = {
  /**
   * The protocol scheme to be registered.
   * @default '''
   * @example 'ftp'
   * @example 'git'
   */
  scheme: string;

  /**
   * If enabled, it allows optional slashes after the protocol.
   * @default false
   * @example true
   */
  optionalSlashes?: boolean;
};

type ProtocolConfig = Array<ProtocolOptions | string>;

const ATTR_WHITESPACE =
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

export function isAllowedUri(
  uri: string | undefined,
  protocols?: ProtocolConfig
): boolean {
  const allowedProtocols: string[] = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp",
  ];

  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol =
        typeof protocol === "string" ? protocol : protocol.scheme;

      if (nextProtocol) {
        allowedProtocols.push(nextProtocol);
      }
    });
  }

  return (
    !uri ||
    !!uri
      .replace(ATTR_WHITESPACE, "")
      .match(
        new RegExp(
          `^(?:(?:${allowedProtocols.join(
            "|"
          )}):|[^a-z]|[a-z0-9+.\-]+(?:[^a-z+.\-:]|$))`,
          "i"
        )
      )
  );
}

export function sanitizeUrl(
  inputUrl: string,
  baseUrl: string,
  protocols?: ProtocolConfig
): string {
  try {
    const url = new URL(inputUrl, baseUrl);

    if (isAllowedUri(url.href, protocols)) {
      return url.href;
    }
  } catch {
    // If URL creation fails, it's considered invalid
  }
  return "#";
}

export const shouldShowFileSizeLimitWarning = (
  toastId: React.RefObject<string | null>
): any => {
  toastAlert(
    "error",
    `File size exceeds maximum allowed: ${bytesToMB(MAX_FILE_BYTES_SIZE)}MB`,
    "top-right",
    toastId
  );
};

// convert base64 to File
export const base64ToFile = (base64String: string[]) => {
  if (base64String.length < 4) return null;

  try {
    const mime = base64String[1]?.match(/:(.*?);/)?.[1] || "";

    const bstr = atob(base64String[3]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const fileName = `${uid(12)}.${mime?.split("/")?.[1] || "png"}`;

    return new File([u8arr], fileName, { type: mime });
  } catch (err) {
    console.error(err);
    toastAlert("error", "File is not supported!", "top-right");
    return null;
  }
};

// convert url to File
export const urlToFile = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const fileName = `${uid(12)}.${blob.type?.split("/")?.[1] || "png"}`;

    return new File([blob], fileName, { type: blob.type || "image/png" });
  } catch (err) {
    console.error(err);
    toastAlert("error", "File is not supported!", "top-right");
    return null;
  }
};

// handle base64 and URL image strings
export const handleImageString = async (
  imageString: string,
  context: "paste" | "drop",
  onPasteAndDrop: any,
  editor: any
) => {
  let file: File | null = null;

  if (imageString.startsWith("data:image")) {
    const base64 = imageString.match(
      /(data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64),([A-Za-z0-9+/=]+)/
    );
    file = base64 ? base64ToFile(base64) : null;
  } else if (/^https?:\/\//.test(imageString)) {
    file = (await urlToFile(imageString)) || null;
  }

  if (file) {
    try {
      const image_url = await onPasteAndDrop({ file, context });
      if (image_url) {
        editor
          ?.chain()
          .insertContentAt(editor.state.selection.anchor, {
            type: "image",
            attrs: { src: image_url, "data-keep-ratio": true },
          })
          .focus()
          .run();
      } else {
        toastAlert("error", `${file.name} is not supported`, "top-right");
      }
    } catch (err) {
      console.error(err);
      toastAlert("error", `${file.name} is not supported`, "top-right");
    }
    return true;
  }
  return false;
};

export const copyToClipboard = async (
  value: string,
  message?: string,
  toastId?: any
) => {
  const isUrl = /^https?:\/\//i.test(value);
  const defaultMsg = isUrl ? "Image link copied" : "Copied to clipboard";
  const toastMsg = message || defaultMsg;

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(value);
      toastAlert("success", toastMsg, "top-right", toastId);
    } catch (err) {
      console.error(err);
      toastAlert(
        "error",
        "Something went wrong. Please try again!",
        "top-right",
        toastId
      );
    }
  }
};
