import React, { createContext, useContext, useState, useCallback } from "react";
import type {
  ConfigParams,
  EditorEnvContextType,
} from "@/components/tiptap-node/types";

const EditorEnvContext = createContext<EditorEnvContextType | undefined>(
  undefined
);

export const EditorEnvProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [envConfig, setEnvConfig] = useState<ConfigParams>({});

  const setEnv = useCallback((config: ConfigParams) => {
    setEnvConfig(config);
  }, []);

  return (
    <EditorEnvContext.Provider value={{ envConfig, setEnvConfig: setEnv }}>
      {children}
    </EditorEnvContext.Provider>
  );
};

export function useEditorEnv() {
  const context = useContext(EditorEnvContext);
  if (!context) {
    throw new Error("useEditorEnv must be used within an EditorEnvProvider");
  }
  return context;
}
