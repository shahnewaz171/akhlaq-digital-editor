import AppEditor from "@/components/tiptap-templates";

// types
export type { SimpleEditorProps } from "@/components/tiptap-node/types";

// export editor with consistent naming
export { AppEditor as SimpleEditor };
export { AppEditor }; // Keep AppEditor for backward compatibility
export default AppEditor;
