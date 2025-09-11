import React from "react";
import { createRoot, Root } from "react-dom/client";

// editor
import AppEditor from "@/components/tiptap-templates";

// types
import type { SimpleEditorProps } from "@/components/tiptap-node/types";

// version from package.json (injected at build time)
declare const __PACKAGE_VERSION__: string;
const PACKAGE_VERSION = __PACKAGE_VERSION__;

// Enhanced global interface for better vanilla JS integration
declare global {
  interface Window {
    AkhlaqDigitalEditor: AkhlaqDigitalEditorAPI;
    AKHLAQ_EDITOR_CONFIG?: EditorInitOptions;
  }
}

// Legacy support - separate interface to avoid conflicts
interface LegacyEditorInit {
  init: (editorProps?: Partial<SimpleEditorProps>) => void;
  destroy?: () => void;
  version?: string;
}

// Export types for better TypeScript support
export interface EditorInitOptions {
  // Container options
  container?: string | HTMLElement;

  // Editor configuration
  content?: string | null;
  placeholder?: string;
  className?: string;

  // Features
  isAutoFocus?: boolean;
  isEditable?: boolean;
  isShowMention?: boolean;
  isShowEmoji?: boolean;
  isFileUpload?: boolean;
  isBottomToolbar?: boolean;
  isRefreshEditor?: boolean;
  height?: number;
  acceptedFileTypes?: string;
  mentions?: any[];

  // Callbacks
  onChange?: (content: string | null) => void;
  onInit?: (instance: EditorInstance) => void;
  onDestroy?: () => void;

  // Upload handlers
  handleImageInsertion?: (params: any) => Promise<string | null>;
  handleFilesChange?: (files: any[]) => Promise<void>;

  // Auto-initialization (for script tag usage)
  autoInit?: boolean;
}

// Editor instance interface
export interface EditorInstance {
  getContent: () => string | null;
  setContent: (content: string) => void;
  focus: () => void;
  blur: () => void;
  destroy: () => void;
  getContainer: () => HTMLElement | null;
  isDestroyed: () => boolean;
}

// Event types
export type EditorEvent = "init" | "destroy" | "change" | "focus" | "blur";
export type EditorEventCallback = (data?: any) => void;

// Main API interface for better TypeScript support
export interface AkhlaqDigitalEditorAPI {
  // Core methods
  init: (options?: EditorInitOptions) => EditorInstance;
  destroy: () => void;
  destroyAll: () => void;

  // Utility methods
  version: string;
  isInitialized: () => boolean;
  getInstance: () => EditorInstance | null;

  // Events
  on: (event: EditorEvent, callback: EditorEventCallback) => void;
  off: (event: EditorEvent, callback: EditorEventCallback) => void;
}

// Internal state management
class EditorManager {
  private instances: Map<
    string,
    {
      root: Root;
      container: HTMLElement;
      options: EditorInitOptions;
      lastRender: number;
      isRendering: boolean;
      editorRef?: any; // Store reference to the actual Tiptap editor
    }
  > = new Map();
  private eventListeners: Map<EditorEvent, EditorEventCallback[]> = new Map();
  private static instance: EditorManager | null = null;

  static getInstance(): EditorManager {
    if (!EditorManager.instance) {
      EditorManager.instance = new EditorManager();
    }
    return EditorManager.instance;
  }

  private generateId(): string {
    return `ad-editor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private emit(event: EditorEvent, data?: any) {
    const listeners = this.eventListeners.get(event) || [];
    listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} event listener:`, error);
      }
    });
  }

  // Performance optimization: debounced render to prevent excessive re-renders
  private debounceRender(instanceId: string, renderFn: () => void, delay = 16) {
    const instance = this.instances.get(instanceId);
    if (!instance) return;

    const now = Date.now();
    if (instance.isRendering || now - instance.lastRender < delay) {
      return;
    }

    instance.isRendering = true;
    requestAnimationFrame(() => {
      try {
        renderFn();
        instance.lastRender = Date.now();
      } finally {
        instance.isRendering = false;
      }
    });
  }

  on(event: EditorEvent, callback: EditorEventCallback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: EditorEvent, callback: EditorEventCallback) {
    const listeners = this.eventListeners.get(event) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  init(options: EditorInitOptions = {}): EditorInstance {
    try {
      // Container resolution
      let container: HTMLElement;

      if (options.container) {
        if (typeof options.container === "string") {
          const element = document.querySelector(
            options.container
          ) as HTMLElement;
          if (!element) {
            throw new Error(`Container not found: ${options.container}`);
          }
          container = element;
        } else {
          container = options.container;
        }
      } else {
        // Create default container
        container = document.createElement("div");
        container.className = "akhlaq-digital-editor";
        document.body.appendChild(container);
      }

      // Generate unique instance ID
      const instanceId = this.generateId();

      // Create React root
      const root = createRoot(container);

      // Track current content for getContent
      let currentContent = options.content || null;
      let tiptapEditor: any = null; // Store reference to the actual Tiptap editor

      // Enhanced onChange handler that tracks content
      const handleContentChange = (content: string | null) => {
        currentContent = content;
        if (options.onChange) {
          options.onChange(content);
        }
        this.emit("change", { content, instanceId });
      };

      // Enhanced onInit handler that captures the editor reference
      const handleEditorInit = (editorInstance: any) => {
        tiptapEditor = editorInstance;
        // Update the stored instance with the editor reference
        const instanceData = this.instances.get(instanceId);
        if (instanceData) {
          instanceData.editorRef = editorInstance;
        }
        if (options.onInit) {
          options.onInit(editorInstance);
        }
        this.emit("init", { editor: editorInstance, instanceId });
      };

      // Prepare editor props
      const editorProps: Partial<SimpleEditorProps> = {
        content: currentContent,
        placeholder: options.placeholder || "Start writing...",
        className: options.className,
        isRefreshEditor: options.isRefreshEditor || false,
        isAutoFocus: options.isAutoFocus || false,
        isEditable: options.isEditable !== false, // Default to true
        isShowMention: options.isShowMention !== false, // Default to true
        isFileUpload: options.isFileUpload !== false, // Default to true
        isShowEmoji: options.isShowEmoji !== false, // Default to true
        isBottomToolbar: options.isBottomToolbar || false,
        height: options.height || 300, // Add height prop
        acceptedFileTypes: options.acceptedFileTypes || "image/*",
        mentions: options.mentions || [],
        onChange: handleContentChange,
        onInit: handleEditorInit, // Pass the enhanced onInit handler
        handleImageInsertion: options.handleImageInsertion,
        handleFilesChange: options.handleFilesChange,
      };

      // Render editor
      root.render(<AppEditor {...editorProps} />);

      // Store instance with performance tracking
      this.instances.set(instanceId, {
        root,
        container,
        options: {
          ...options,
          onChange: handleContentChange, // Store the enhanced handler
        },
        lastRender: Date.now(),
        isRendering: false,
        editorRef: tiptapEditor, // Store the editor reference
      });

      // Create instance API
      const instance: EditorInstance = {
        getContent: () => {
          // Get the current editor reference from the stored instance
          const instanceData = this.instances.get(instanceId);
          const currentEditor = instanceData?.editorRef;

          // Use the actual Tiptap editor if available for fresh content
          if (currentEditor && currentEditor.getHTML) {
            return currentEditor.getHTML();
          }
          // Fallback: return the tracked current content
          return currentContent;
        },
        setContent: (content: string) => {
          currentContent = content;

          // Get the current editor reference from the stored instance
          const instanceData = this.instances.get(instanceId);
          const currentEditor = instanceData?.editorRef;

          // Use the actual Tiptap editor if available, otherwise fall back to re-render
          if (currentEditor && currentEditor.commands) {
            currentEditor.commands.setContent(content);
          } else {
            // Fallback: update props and re-render
            editorProps.content = content;
            this.debounceRender(instanceId, () => {
              root.render(<AppEditor {...editorProps} />);
            });
          }
        },
        focus: () => {
          // Get the current editor reference from the stored instance
          const instanceData = this.instances.get(instanceId);
          const currentEditor = instanceData?.editorRef;

          // Use the actual Tiptap editor if available
          if (currentEditor && currentEditor.commands) {
            currentEditor.commands.focus();
          } else {
            // Fallback: find contenteditable element
            const editorElement = container.querySelector(
              '[contenteditable="true"]'
            ) as HTMLElement;
            editorElement?.focus();
          }
          this.emit("focus", { instanceId });
        },
        blur: () => {
          const editorElement = container.querySelector(
            '[contenteditable="true"]'
          ) as HTMLElement;
          editorElement?.blur();
          this.emit("blur", { instanceId });
        },
        destroy: () => {
          this.destroyInstance(instanceId);
        },
        getContainer: () => container,
        isDestroyed: () => !this.instances.has(instanceId),
      };

      // Call onInit callback
      if (options.onInit) {
        options.onInit(instance);
      }

      // Emit init event
      this.emit("init", { instance, instanceId });

      return instance;
    } catch (error) {
      console.error("Failed to initialize Akhlaq Digital Editor:", error);
      throw error;
    }
  }

  destroyInstance(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (instance) {
      try {
        // Use setTimeout to avoid unload event conflicts
        setTimeout(() => {
          try {
            instance.root.unmount();
          } catch (error) {
            // Silently handle unmount errors (like unload permission violations)
            const errorMessage =
              error instanceof Error ? error.message : String(error);
            console.warn(
              "Editor unmount warning (safe to ignore):",
              errorMessage
            );
          }
        }, 0);

        // Call onDestroy callback
        if (instance.options.onDestroy) {
          instance.options.onDestroy();
        }

        // Emit destroy event
        this.emit("destroy");

        this.instances.delete(instanceId);
      } catch (error) {
        console.error("Error destroying editor instance:", error);
      }
    }
  }

  destroy() {
    // Destroy the most recent instance (for backward compatibility)
    const instances = Array.from(this.instances.keys());
    if (instances.length > 0) {
      this.destroyInstance(instances[instances.length - 1]);
    }
  }

  destroyAll() {
    const instances = Array.from(this.instances.keys());
    instances.forEach((id) => this.destroyInstance(id));
  }

  isInitialized(): boolean {
    return this.instances.size > 0;
  }

  getInstance(): EditorInstance | null {
    const instanceEntries = Array.from(this.instances.entries());
    if (instanceEntries.length === 0) return null;

    // Return the most recent instance
    const [instanceId, latestInstance] =
      instanceEntries[instanceEntries.length - 1];

    // Cache DOM references for better performance
    let cachedEditorElement: HTMLElement | null = null;
    const getEditorElement = () => {
      if (!cachedEditorElement) {
        cachedEditorElement = latestInstance.container.querySelector(
          '[contenteditable="true"]'
        ) as HTMLElement;
      }
      return cachedEditorElement;
    };

    return {
      getContent: () => {
        // Prefer stored editor reference for fresh content
        const storedEditor = latestInstance.editorRef;
        if (storedEditor && storedEditor.getHTML) {
          return storedEditor.getHTML();
        }

        // Fallback to DOM element
        const editorElement = getEditorElement();
        if (editorElement) {
          return editorElement.innerHTML || null;
        }
        return latestInstance.options.content || null;
      },
      setContent: (content: string) => {
        // Prefer direct editor access for better performance
        const storedEditor = latestInstance.editorRef;
        if (storedEditor && storedEditor.commands) {
          storedEditor.commands.setContent(content);
          return;
        }

        // Fallback: Update stored options and re-render (less optimal)
        latestInstance.options.content = content;
        this.debounceRender(instanceId, () => {
          latestInstance.root.render(
            <AppEditor
              content={content}
              placeholder={latestInstance.options.placeholder}
              className={latestInstance.options.className}
              isRefreshEditor={latestInstance.options.isRefreshEditor}
              isAutoFocus={latestInstance.options.isAutoFocus}
              isEditable={latestInstance.options.isEditable}
              isShowMention={latestInstance.options.isShowMention}
              isShowEmoji={latestInstance.options.isShowEmoji}
              isFileUpload={latestInstance.options.isFileUpload}
              isBottomToolbar={latestInstance.options.isBottomToolbar}
              height={latestInstance.options.height}
              acceptedFileTypes={latestInstance.options.acceptedFileTypes}
              mentions={latestInstance.options.mentions}
              onChange={latestInstance.options.onChange}
              handleImageInsertion={latestInstance.options.handleImageInsertion}
              handleFilesChange={latestInstance.options.handleFilesChange}
            />
          );
        });
      },
      focus: () => {
        // Prefer direct editor access
        const storedEditor = latestInstance.editorRef;
        if (storedEditor && storedEditor.commands) {
          storedEditor.commands.focus();
        } else {
          const editorElement = getEditorElement();
          editorElement?.focus();
        }
        this.emit("focus", { instanceId });
      },
      blur: () => {
        // Prefer direct editor access
        const storedEditor = latestInstance.editorRef;
        if (storedEditor && storedEditor.commands) {
          storedEditor.commands.blur();
        } else {
          const editorElement = getEditorElement();
          editorElement?.blur();
        }
        this.emit("blur", { instanceId });
      },
      destroy: () => this.destroyInstance(instanceId),
      getContainer: () => latestInstance.container,
      isDestroyed: () => !this.instances.has(instanceId),
    };
  }
}

// Auto-initialization function
const autoInit = () => {
  try {
    // Check for script tag configuration
    const scriptTag = document.querySelector(
      "script[data-akhlaq-editor]"
    ) as HTMLScriptElement;

    if (scriptTag) {
      const config: EditorInitOptions = {
        container: scriptTag.dataset.container,
        content: scriptTag.dataset.content,
        placeholder: scriptTag.dataset.placeholder,
        className: scriptTag.dataset.className,
        isRefreshEditor: scriptTag.dataset.refreshEditor === "true",
        isAutoFocus: scriptTag.dataset.autoFocus === "true",
        isEditable: scriptTag.dataset.editable !== "false", // Default to true
        isShowMention: scriptTag.dataset.mentions === "true",
        isShowEmoji: scriptTag.dataset.emoji === "true",
        isFileUpload: scriptTag.dataset.fileUpload === "true",
        isBottomToolbar: scriptTag.dataset.bottomToolbar === "true",
        acceptedFileTypes: scriptTag.dataset.acceptedFileTypes,
        autoInit: true,
      };

      // Merge with global config
      const globalConfig = window.AKHLAQ_EDITOR_CONFIG || {};
      const finalConfig = { ...globalConfig, ...config };

      if (finalConfig.autoInit !== false) {
        EditorManager.getInstance().init(finalConfig);
      }
    }
  } catch (error) {
    console.error("Auto-initialization failed:", error);
  }
};

// Initialize when DOM is ready
const initWhenReady = () => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoInit, { once: true });
  } else {
    autoInit();
  }
};

// Expose global API
if (typeof window !== "undefined") {
  const manager = EditorManager.getInstance();

  // Modern API with proper typing
  const api: AkhlaqDigitalEditorAPI = {
    init: (options?: EditorInitOptions) => manager.init(options || {}),
    destroy: () => manager.destroy(),
    destroyAll: () => manager.destroyAll(),
    version: PACKAGE_VERSION,
    isInitialized: () => manager.isInitialized(),
    getInstance: () => manager.getInstance(),
    on: (event: EditorEvent, callback: EditorEventCallback) =>
      manager.on(event, callback),
    off: (event: EditorEvent, callback: EditorEventCallback) =>
      manager.off(event, callback),
  };

  // Assign to window - this is the main API
  window.AkhlaqDigitalEditor = api;

  // Also assign to global for better CDN compatibility
  (globalThis as any).AkhlaqDigitalEditor = api;

  // Legacy API (for backward compatibility)
  const legacyAPI: LegacyEditorInit = {
    init: (editorProps?: Partial<SimpleEditorProps>) => {
      const options: EditorInitOptions = {
        content: editorProps?.content || null,
        placeholder: editorProps?.placeholder,
        className: editorProps?.className,
        isRefreshEditor: editorProps?.isRefreshEditor,
        isAutoFocus: editorProps?.isAutoFocus,
        isEditable: editorProps?.isEditable,
        isShowMention: editorProps?.isShowMention,
        isShowEmoji: editorProps?.isShowEmoji,
        isFileUpload: editorProps?.isFileUpload,
        isBottomToolbar: editorProps?.isBottomToolbar,
        height: editorProps?.height,
        acceptedFileTypes: editorProps?.acceptedFileTypes,
        mentions: editorProps?.mentions,
        onChange: editorProps?.onChange,
        handleImageInsertion: editorProps?.handleImageInsertion,
        handleFilesChange: editorProps?.handleFilesChange,
      };
      manager.init(options);
    },
    destroy: () => manager.destroy(),
    version: PACKAGE_VERSION,
  };

  // Assign to window for backward compatibility
  (window as any).EditorInit = legacyAPI;

  // Auto-initialize
  initWhenReady();
}

// No export needed for IIFE format - globals are set above
