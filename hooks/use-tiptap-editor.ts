"use client";

import * as React from "react";
import type { Editor } from "@tiptap/react";
import { deepEqual } from "fast-equals";
import { useCurrentEditor, useEditorState } from "@tiptap/react";

/**
 * Hook that provides access to a Tiptap editor instance.
 *
 * Accepts an optional editor instance directly, or falls back to retrieving
 * the editor from the Tiptap context if available. This allows components
 * to work both when given an editor directly and when used within a Tiptap
 * editor context.
 *
 * @param providedEditor - Optional editor instance to use instead of the context editor
 * @returns The provided editor or the editor from context, whichever is available
 */

type EditorState = {
  editor: Editor | null;
  editorState?: Editor["state"];
  canCommand?: Editor["can"];
  characters?: number;
  words?: number;
};

export function useTiptapEditor(providedEditor?: Editor | null): EditorState {
  const { editor: coreEditor } = useCurrentEditor();
  const mainEditor = React.useMemo(
    () => providedEditor || coreEditor,
    [providedEditor, coreEditor]
  );

  const editorState = useEditorState({
    equalityFn: deepEqual,
    editor: mainEditor,
    selector(context) {
      const { characters, words } =
        context?.editor?.storage?.characterCount || {};

      return {
        editor: context?.editor || null,
        editorState: context?.editor?.state || undefined,
        characters: characters?.() || 0,
        words: words?.() || 0,
        canCommand: context?.editor?.can || undefined,
      };
    },
  }) as EditorState;

  return editorState;
}
