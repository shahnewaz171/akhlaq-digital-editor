import { Extension } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";

const ClearHighlightOnBlur = Extension.create({
  name: "clearHighlightOnBlur",

  addOptions() {
    return {
      toolbarSelector: ".tiptap-toolbar",
      bottomToolbarSelector: ".editor-status-bar",
    };
  },
  onCreate() {
    const editor = this.editor;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const { toolbarSelector, bottomToolbarSelector } = this.options;

      // prevent to remove highlight if the selection is inside editor or toolbar
      if (
        editor.view.dom.contains(target) ||
        (toolbarSelector && target.closest(toolbarSelector)) ||
        (bottomToolbarSelector && target.closest(bottomToolbarSelector))
      ) {
        return;
      }

      // clear selection highlight without deleting content
      const { state, view } = editor;
      const { from } = state.selection;

      const tr = state.tr.setSelection(TextSelection.create(state.doc, from));
      view.dispatch(tr);
    };

    document.addEventListener("mousedown", handleClickOutside);

    // cleanup on destroy
    editor.on("destroy", () => {
      document.removeEventListener("mousedown", handleClickOutside);
    });
  },
});

export default ClearHighlightOnBlur;
