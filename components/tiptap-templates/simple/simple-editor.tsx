"use client";

import * as React from "react";
import {
  Editor,
  EditorContent,
  EditorContext,
  useEditor,
  useEditorState,
} from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { CharacterCount, Placeholder, Selection } from "@tiptap/extensions";
import FileHandler from "@tiptap/extension-file-handler";
import Mention from "@tiptap/extension-mention";

// --- Other Libraries ---
import { ToastContainer } from "react-toastify";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import ResizeCorderIcon from "@/components/custom-svg/ResizeCorderIcon";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import { FileUploadNode } from "@/components/tiptap-node/file-upload-node/file-upload-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { FileUploadButton } from "@/components/tiptap-ui/file-upload-button/file-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";

// --- Components ---

// --- Lib ---
import {
  cn,
  handleImageUpload,
  MAX_FILE_BYTES_SIZE,
  shouldShowFileSizeLimitWarning,
} from "@/lib/tiptap-utils";
import { getMentionSuggestion } from "@/lib/mention-suggestion";
import { useEditorEnv } from "@/components/tiptap-templates/use-editor-env-context";

// --- utils ---
import toastAlert from "@/utils/toastConfig";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

// types
import type {
  MainToolbarParams,
  SimpleEditorProps,
} from "@/components/tiptap-node/types";

const MainToolbarContent = ({
  isFileUpload,
  onHighlighterClick,
  onLinkClick,
  isMobile,
  acceptedFileTypes,
  handleFilesChange,
}: MainToolbarParams) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton />
        {isFileUpload && (
          <FileUploadButton
            acceptedFileTypes={acceptedFileTypes}
            handleFilesChange={handleFilesChange}
          />
        )}
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      {/* dark mode */}
      {/* <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup> */}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor({
  envConfig,
  isShowMention = true,
  isFileUpload = true,
  isBottomToolbar = false,
  acceptedFileTypes = "",
  content = null,
  className = "",
  placeholder = "Enter your content here",
  mentions = [],
  onChange = () => {},
  handleImageInsertion,
  handleFilesChange = async () => {},
}: SimpleEditorProps) {
  // env
  const { envConfig: contextEnvConfig, setEnvConfig } = useEditorEnv();
  const { cdnDomain, cdnSecret } = contextEnvConfig || {};

  // states
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const [resizeHeight, setHeight] = React.useState<number>(190);
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const toastId = React.useRef<any>(null);

  // mobile
  const isMobile = useIsMobile();

  // passing key to force remount the editor when extensions dependencies change
  const editorKey = React.useMemo(
    () =>
      [isShowMention, isFileUpload, placeholder, JSON.stringify(mentions)].join(
        "-"
      ),
    [isShowMention, isFileUpload, placeholder, mentions]
  );

  // editor instance
  const editor: Editor | null = useEditor(
    {
      content,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          "aria-label": "Main content area, start typing to enter text.",
          class: "simple-editor min-h-[190px]",
        },
      },
      extensions: [
        StarterKit.configure({
          horizontalRule: false,
          link: {
            openOnClick: false,
            enableClickSelection: true,
          },
        }),
        Placeholder.configure({
          placeholder,
        }),
        HorizontalRule,
        TextAlign.configure({ types: ["paragraph"] }),
        TaskList,
        TaskItem.configure({ nested: true }),
        Highlight.configure({ multicolor: true }),
        Image,
        Typography,
        Superscript,
        Subscript,
        Selection,
        CharacterCount.configure({
          limit: null,
        }),
        ...(isShowMention
          ? [
              Mention.configure({
                HTMLAttributes: {
                  class: "mention",
                  style:
                    "background-color: var(--brand-color); border-radius: 9999px; color: rgb(250 251 252); margin: 0.2rem; display: inline-block; font-size: 12px; padding: 0.1rem 0.5rem;",
                },
                suggestion: getMentionSuggestion(mentions),

                renderHTML: (attributes) => {
                  const { options, node } = attributes;
                  const { id, label } = node.attrs;
                  const { HTMLAttributes } = options;

                  return [
                    "span",
                    { ...HTMLAttributes, "data-mention-id": id, id },
                    `@${label}`,
                  ];
                },
              }),
            ]
          : []),
        ImageUploadNode.configure({
          accept: "image/*",
          maxSize: MAX_FILE_BYTES_SIZE,
          limit: 5,
          upload: async (file, onProgress, signal, removeFileItem) => {
            if (handleImageInsertion) {
              return await handleImageInsertion({
                file,
                onProgress,
                abortSignal: signal,
                removeFileItem,
                context: "manual",
              });
            }
            return await handleImageUpload({
              file,
              onProgress,
              abortSignal: signal,
              removeFileItem,
            });
          },
          onError: (error) => {
            toastAlert(
              "error",
              error.message || "Image upload failed",
              "top-right",
              toastId
            );
          },
        }),
        FileHandler.configure({
          allowedMimeTypes: [
            "image/png",
            "image/jpeg",
            "image/gif",
            "image/webp",
            "image/svg+xml",
          ],
          onDrop: (currentEditor, files, pos) => {
            files.forEach(async (file: File) => {
              const { size } = file;

              if (size > MAX_FILE_BYTES_SIZE) {
                shouldShowFileSizeLimitWarning(toastId);
                return;
              }

              if (!handleImageInsertion) return null;

              const image_url = await handleImageInsertion({
                file: { file },
                context: "drop",
              });

              if (image_url) {
                currentEditor
                  .chain()
                  .insertContentAt(pos, {
                    type: "image",
                    attrs: {
                      src: image_url,
                    },
                  })
                  .focus()
                  .run();
              }
            });
          },
          onPaste: (currentEditor, files, htmlContent) => {
            files.forEach(async (file: File) => {
              const { size } = file;

              if (htmlContent) {
                return false;
              }

              if (size > MAX_FILE_BYTES_SIZE) {
                shouldShowFileSizeLimitWarning(toastId);
                return;
              }

              if (!handleImageInsertion) return null;

              const image_url = await handleImageInsertion({
                file: { file },
                context: "paste",
              });

              if (image_url) {
                currentEditor
                  .chain()
                  .insertContentAt(currentEditor.state.selection.anchor, {
                    type: "image",
                    attrs: {
                      src: image_url,
                    },
                  })
                  .focus()
                  .run();
              }
            });
          },
        }),
        ...(isFileUpload ? [FileUploadNode] : []),
      ],
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange(html || null);
      },
    },
    [editorKey]
  );

  // editor state
  const { characters, words } = useEditorState<any>({
    editor,
    selector: (ctx) => {
      const { characters, words } = ctx?.editor?.storage?.characterCount || {};

      return {
        characters: characters?.() || 0,
        words: words?.() || 0,
      };
    },
  });

  // initiate envs
  React.useLayoutEffect(() => {
    if (envConfig) {
      setEnvConfig({
        cdnDomain: cdnDomain || "",
        cdnSecret: cdnSecret || "",
      });
    }
  }, [cdnDomain, cdnSecret]);

  // editor view
  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  // resize editor
  const handleResize = (e: MouseEvent) => {
    if (editorRef.current) {
      const startY = e.clientY;
      const startHeight = editorRef.current.offsetHeight;

      const handleMouseMove = (e: MouseEvent) => {
        const newHeight = startHeight + (e.clientY - startY);
        setHeight(newHeight);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  return (
    <div className={cn("simple-editor-wrapper", className)}>
      <EditorContext.Provider value={{ editor }}>
        <div className="editor-container">
          {!isBottomToolbar && (
            <Toolbar ref={toolbarRef} style={{}}>
              {mobileView === "main" ? (
                <MainToolbarContent
                  isFileUpload={isFileUpload}
                  onHighlighterClick={() => setMobileView("highlighter")}
                  onLinkClick={() => setMobileView("link")}
                  isMobile={isMobile}
                  acceptedFileTypes={acceptedFileTypes}
                  handleFilesChange={handleFilesChange}
                />
              ) : (
                <MobileToolbarContent
                  type={mobileView === "highlighter" ? "highlighter" : "link"}
                  onBack={() => setMobileView("main")}
                />
              )}
            </Toolbar>
          )}

          <EditorContent
            editor={editor}
            ref={editorRef}
            role="presentation"
            className="simple-editor-content"
            style={{ height: `${resizeHeight}px` }}
          />

          {/* status bar */}
          <div className="flex justify-end items-center gap-2 bg-[#f5f5f6] editor-status-bar pr-5">
            <p className="!text-[11px] uppercase">{`Chars: ${characters}`}</p>
            <p className="!text-[11px] uppercase">{`Words: ${words}`}</p>
          </div>

          {/* resize */}
          <div className="relative editor-resize">
            <span
              className="editor-resize-icon"
              onMouseDown={(e) => handleResize(e.nativeEvent)}
            >
              <ResizeCorderIcon />
            </span>
          </div>

          {/* bottom toolbar */}
          {isBottomToolbar && (
            <Toolbar ref={toolbarRef} style={{}}>
              {mobileView === "main" ? (
                <MainToolbarContent
                  isFileUpload={isFileUpload}
                  onHighlighterClick={() => setMobileView("highlighter")}
                  onLinkClick={() => setMobileView("link")}
                  isMobile={isMobile}
                  acceptedFileTypes={acceptedFileTypes}
                  handleFilesChange={handleFilesChange}
                />
              ) : (
                <MobileToolbarContent
                  type={mobileView === "highlighter" ? "highlighter" : "link"}
                  onBack={() => setMobileView("main")}
                />
              )}
            </Toolbar>
          )}
        </div>
      </EditorContext.Provider>

      {/* toast container */}
      <ToastContainer />
    </div>
  );
}
