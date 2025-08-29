"use client";

import React, { useLayoutEffect } from "react";

import { setBrandColors } from "@/utils";

// types
import type { SimpleEditorProps } from "@/components/tiptap-node/types";

// --- Components ---
import { EditorEnvProvider } from "@/components/tiptap-templates/use-editor-env-context";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

const AppEditor: React.FC<SimpleEditorProps> = (props) => {
  // set brand colors
  useLayoutEffect(() => {
    setBrandColors();
  }, []);

  return (
    <EditorEnvProvider>
      <SimpleEditor {...props} />
    </EditorEnvProvider>
  );
};

export default AppEditor;
