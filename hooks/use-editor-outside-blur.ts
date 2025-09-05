import { useEffect, useMemo } from "react";
import type { Editor } from "@tiptap/react";

/**
 * Hook to manage Tiptap editor focus state
 * Automatically ignores clicks inside editor, floating menus, or dropdown portals
 *
 * @param editor - Tiptap editor instance
 * @param setIsFocused - callback to update focus state
 * @param options - optional CSS selectors to ignore
 */
interface UseEditorBlurOptions {
  floatingMenuSelector?: string; // default: '.floating-menu'
  portalSelector?: string; // default: '[data-radix-portal]'
}

export function useEditorOutsideBlur(
  editor: Editor | null,
  setIsFocused: (focused: boolean) => void,
  options?: UseEditorBlurOptions
) {
  const { floatingMenu, portal } = useMemo(
    () => ({
      floatingMenu: options?.floatingMenuSelector || ".floating-menu",
      portal: options?.portalSelector || "[data-radix-portal]",
    }),
    [options]
  );

  useEffect(() => {
    if (!editor) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Ignore clicks inside editor
      if (editor.view.dom.contains(target)) return;

      // Ignore clicks inside floating menu
      if (document.querySelector(floatingMenu)?.contains(target)) return;

      // Ignore clicks inside portals (Radix, etc.)
      if (portal && target.closest(portal)) return;

      // Actual outside click → blur editor
      setIsFocused(false);
      editor.commands.blur();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editor]);
}
