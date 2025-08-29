import React from "react";
import { createRoot, Root } from "react-dom/client";

// editor
import AppEditor from "../../components/tiptap-templates";
import "../../app/globals.css";

// types
import type {
  ConfigParams,
  SimpleEditorProps,
} from "../../components/tiptap-node/types";

// inject type
declare global {
  interface Window {
    EditorInit: {
      init: (
        editorProps?: Partial<SimpleEditorProps>,
        envConfig?: Partial<ConfigParams>
      ) => void;
      destroy?: () => void;
      version?: string;
    };
    EDITOR_PROPS?: Partial<SimpleEditorProps>;
  }
}

// unique container ID for the editor
const EDITOR_CONTAINER_ID = "ad-editor-container";

// react root
let root: Root | null = null;

/**
 * initializes the editor into a container.
 */
export const initEditor = (
  editorProps?: Partial<SimpleEditorProps>,
  envConfig?: Partial<ConfigParams>
) => {
  let container = document.getElementById(EDITOR_CONTAINER_ID);

  if (!container) {
    container = document.createElement("div");
    container.id = EDITOR_CONTAINER_ID;
    document.body.appendChild(container);
  }

  if (!root) {
    root = createRoot(container);
  }

  root.render(
    <React.StrictMode>
      <AppEditor {...editorProps} envConfig={envConfig} />
    </React.StrictMode>
  );
};

/**
 * destroys the editor and cleans up the container.
 */
export const destroyEditor = () => {
  if (root) {
    root.unmount();
    root = null;
    const container = document.getElementById(EDITOR_CONTAINER_ID);
    if (container) container.remove();
  }
};

/**
 * auto-initialize if script tag is loaded with data attributes.
 */
const autoInit = () => {
  const scriptTag = document.getElementById("ad-editor");

  if (scriptTag) {
    const cdnDomain = scriptTag.getAttribute("cdn-domain") || "";
    const cdnSecret = scriptTag.getAttribute("cdn-secret") || "";

    const editorProps = window.EDITOR_PROPS || {};

    initEditor(editorProps, { cdnDomain, cdnSecret });
  }
};

// expose globally for CDN usage
if (typeof window !== "undefined") {
  window.EditorInit = {
    init: initEditor,
    destroy: destroyEditor,
    version: process.env.NEXT_PUBLIC_PACKAGE_VERSION,
  };

  // auto-initialize if data attributes are present
  if (document.readyState === "complete") {
    autoInit();
  } else {
    window.addEventListener("load", autoInit, { once: true });
  }
}
