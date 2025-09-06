# 📦 Akhlaq Digital Editor - NPM Package

A powerful, modern rich text editor built with React, ProseMirror, and Tiptap. Perfect for React applications with TypeScript support, customizable features, and excellent performance.

> **Foundation**: Built on the excellent ProseMirror framework, enhanced with Tiptap and modern React patterns. We add enhanced features, optimizations, and a superior developer experience on top of these solid foundations.

## 🚀 Quick Start

### Installation

```bash
npm install @akhlaqdigital/editor
# or
yarn add @akhlaqdigital/editor
# or
pnpm add @akhlaqdigital/editor
```

### Basic Usage

```jsx
import { SimpleEditor } from "@akhlaqdigital/editor";

function MyApp() {
  const [content, setContent] = useState("<p>Hello World!</p>");

  return (
    <SimpleEditor
      content={content}
      onChange={setContent}
      placeholder="Start writing..."
    />
  );
}
```

## 🔧 Component Props

### Core Props

| Prop          | Type             | Default                     | Description                                                       |
| ------------- | ---------------- | --------------------------- | ----------------------------------------------------------------- |
| `content`     | `string \| null` | `null`                      | Initial HTML content for the editor                               |
| `onChange`    | `function`       | `() => {}`                  | Callback when content changes `(content: string \| null) => void` |
| `placeholder` | `string`         | `"Enter your content here"` | Placeholder text when editor is empty                             |
| `className`   | `string`         | `""`                        | Additional CSS classes for styling                                |

### Feature Configuration

| Prop                | Type      | Default | Description                                                  |
| ------------------- | --------- | ------- | ------------------------------------------------------------ |
| `isShowMention`     | `boolean` | `true`  | Enable @mention functionality                                |
| `isShowEmoji`       | `boolean` | `true`  | Enable emoji picker with categorized emojis                  |
| `isFileUpload`      | `boolean` | `true`  | Enable file upload features                                  |
| `isBottomToolbar`   | `boolean` | `false` | Position toolbar at bottom instead of top                    |
| `mentions`          | `array`   | `[]`    | Array of mention suggestions `[{id: number, label: string}]` |
| `acceptedFileTypes` | `string`  | `""`    | Accepted file types for uploads (e.g., "image/\*,.pdf,.doc") |

### Upload Handlers

| Prop                   | Type       | Default          | Description                 |
| ---------------------- | ---------- | ---------------- | --------------------------- |
| `handleImageInsertion` | `function` | `undefined`      | Custom image upload handler |
| `handleFilesChange`    | `function` | `async () => {}` | Custom file upload handler  |

### Upload Handler Types

```typescript
// Image upload handler
type HandleImageInsertion = (params: {
  file: { file: File };
  onProgress?: (event: { progress: number }) => void;
  abortSignal?: AbortSignal;
  removeFileItem?: (id: string) => void;
  context: "manual" | "paste" | "drop";
}) => Promise<string | null>;

// File selection handler
type HandleFilesChange = (files: File[]) => Promise<void>;
```

## 📝 Examples

### Basic Example

```jsx
import React, { useState } from "react";
import { SimpleEditor } from "@akhlaqdigital/editor";

function BasicEditor() {
  const [content, setContent] = useState("<p>Start typing...</p>");

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h1>My Document Editor</h1>
      <SimpleEditor
        content={content}
        onChange={setContent}
        placeholder="Write your content here..."
        className="my-editor"
      />
    </div>
  );
}

export default BasicEditor;
```

### Advanced Example with All Features

```jsx
import React, { useState, useCallback } from 'react';
import { SimpleEditor } from '@akhlaqdigital/editor';

function AdvancedEditor() {
  const [content, setContent] = useState(`
    <h2>Welcome to the Editor!</h2>
    <p>This editor supports <strong>rich formatting</strong>, @mentions, emojis 😊, and file uploads.</p>
  `);

  // Sample mentions data
  const mentions = [
    { id: 1, label: 'John Doe' },
    { id: 2, label: 'Jane Smith' },
    { id: 3, label: 'Alice Johnson' },
    { id: 4, label: 'Team Alpha' },
    { id: 5, label: 'Team Beta' }
  ];

  // Custom image upload handler
  const handleImageUpload = useCallback(async ({
    file,
    onProgress,
    abortSignal,
    removeFileItem,
    context
  }) => {
    try {
      console.log(\`Uploading image: \${file.file.name} (context: \${context})\`);

      // Create FormData for upload
      const formData = new FormData();
      formData.append('image', file.file);
      formData.append('context', context);

      // Upload with progress tracking
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
        signal: abortSignal,
      });

      if (!response.ok) {
        throw new Error(\`Upload failed: \${response.status}\`);
      }

      const result = await response.json();
      console.log('✅ Image uploaded successfully:', result.url);

      return result.url;

    } catch (error) {
      console.error('❌ Image upload failed:', error);

      // Remove the failed upload from UI
      if (removeFileItem) {
        removeFileItem(file.id);
      }

      // Re-throw to show error to user
      throw new Error(\`Upload failed: \${error.message}\`);
    }
  }, []);

  // File selection handler
  const handleFilesChange = useCallback(async (files) => {
    console.log(\`📁 Selected \${files.length} files:\`, files.map(f => f.name));

    // Process files as needed
    for (const file of files) {
      console.log(\`- \${file.name} (\${(file.size / 1024).toFixed(1)} KB)\`);
    }

    // You could trigger bulk upload here
    // await bulkUploadFiles(files);
  }, []);

  // Content change handler
  const handleContentChange = useCallback((newContent) => {
    setContent(newContent);

    // Auto-save to localStorage
    if (newContent) {
      localStorage.setItem('editorContent', newContent);
    }

    // Trigger save to server (debounced)
    // debouncedSave(newContent);
  }, []);

  return (
    <div className="editor-container">
      <h1>📝 Advanced Document Editor</h1>

      <div className="editor-wrapper">
        <SimpleEditor
          content={content}
          onChange={handleContentChange}
          placeholder="Start writing your amazing content... Try @mention"
          className="advanced-editor"

          // Feature configuration
          isShowMention={true}
          isFileUpload={true}
          isBottomToolbar={false}
          mentions={mentions}
          acceptedFileTypes="image/*,.pdf,.doc,.docx,.txt,.md"

          // Upload handlers
          handleImageInsertion={handleImageUpload}
          handleFilesChange={handleFilesChange}
        />
      </div>

      <div className="editor-stats">
        <p>
          Characters: {content ? content.length : 0} |
          Words: {content ? content.split(/\s+/).filter(w => w.length > 0).length : 0}
        </p>
      </div>

      <style jsx>{\`
        .editor-container {
          max-width: 900px;
          margin: 20px auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .editor-wrapper {
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          background: white;
        }

        :global(.advanced-editor) {
          min-height: 400px;
        }

        .editor-stats {
          margin-top: 10px;
          text-align: right;
          color: #6b7280;
          font-size: 12px;
        }
      \`}</style>
    </div>
  );
}

export default AdvancedEditor;
```

### Integration with Forms

```jsx
import React, { useState } from 'react';
import { SimpleEditor } from '@akhlaqdigital/editor';

function FormWithEditor() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting form:', formData);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('✅ Post saved successfully!');
        // Reset form or redirect
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      alert(\`❌ Error: \${error.message}\`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter post title..."
          required
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <SimpleEditor
          content={formData.content}
          onChange={(content) => setFormData(prev => ({ ...prev, content: content || '' }))}
          placeholder="Write your post content..."
          isShowMention={false}
          isFileUpload={true}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={() => setFormData({ title: '', content: '', tags: [] })}>
          Clear
        </button>
        <button type="submit" disabled={!formData.title || !formData.content}>
          Publish Post
        </button>
      </div>

      <style jsx>{\`
        .post-form {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #374151;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 16px;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 20px;
        }

        button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        button[type="button"] {
          background: #6b7280;
          color: white;
        }

        button[type="submit"] {
          background: #059669;
          color: white;
        }

        button:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        button:hover:not(:disabled) {
          opacity: 0.9;
        }
      \`}</style>
    </form>
  );
}

export default FormWithEditor;
```

### Custom Hook for Editor State

```jsx
import { useState, useCallback, useEffect } from 'react';

// Custom hook for managing editor state
function useEditorState(initialContent = '', autosaveKey = null) {
  const [content, setContent] = useState(initialContent);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (autosaveKey) {
      const saved = localStorage.getItem(autosaveKey);
      if (saved && saved !== initialContent) {
        setContent(saved);
      }
    }
  }, [autosaveKey, initialContent]);

  // Auto-save to localStorage
  useEffect(() => {
    if (autosaveKey && content && isDirty) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(autosaveKey, content);
        setLastSaved(new Date());
        setIsDirty(false);
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [content, isDirty, autosaveKey]);

  const handleChange = useCallback((newContent) => {
    setContent(newContent || '');
    setIsDirty(true);
  }, []);

  const save = useCallback(async () => {
    if (autosaveKey) {
      localStorage.setItem(autosaveKey, content);
      setLastSaved(new Date());
      setIsDirty(false);
    }
  }, [content, autosaveKey]);

  const clear = useCallback(() => {
    setContent('');
    setIsDirty(false);
    if (autosaveKey) {
      localStorage.removeItem(autosaveKey);
    }
  }, [autosaveKey]);

  return {
    content,
    onChange: handleChange,
    isDirty,
    lastSaved,
    save,
    clear
  };
}

// Usage example
function EditorWithAutosave() {
  const editor = useEditorState('<p>Welcome!</p>', 'my-document');

  return (
    <div>
      <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
        {editor.isDirty ? '● Unsaved changes' : '✓ All changes saved'}
        {editor.lastSaved && \` (Last saved: \${editor.lastSaved.toLocaleTimeString()})\`}
      </div>

      <SimpleEditor
        content={editor.content}
        onChange={editor.onChange}
        placeholder="Your content will auto-save..."
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={editor.save} disabled={!editor.isDirty}>
          Save Now
        </button>
        <button onClick={editor.clear} style={{ marginLeft: '10px' }}>
          Clear All
        </button>
      </div>
    </div>
  );
}
```

## 🎨 Styling & Theming

### Default Styles

The editor comes with built-in styles, but you can customize them:

```css
/* Override editor container */
.simple-editor-wrapper {
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

/* Customize editor content area */
.simple-editor-content {
  min-height: 300px !important;
  padding: 20px !important;
  font-family: "Georgia", serif !important;
  line-height: 1.6 !important;
}

/* Style the toolbar */
.tiptap-toolbar {
  background: linear-gradient(to right, #f8f9fa, #e9ecef) !important;
  border-bottom: 2px solid #dee2e6 !important;
  padding: 12px !important;
}

/* Customize buttons */
.tiptap-button {
  border-radius: 6px !important;
  transition: all 0.2s ease !important;
}

.tiptap-button:hover {
  background: #e9ecef !important;
  transform: translateY(-1px) !important;
}

/* Style mentions */
.mention {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  padding: 2px 8px !important;
  border-radius: 12px !important;
  font-size: 13px !important;
  font-weight: 500 !important;
}

/* Customize tables */
.simple-editor-content table {
  border-collapse: collapse !important;
  width: 100% !important;
  margin: 16px 0 !important;
}

.simple-editor-content th,
.simple-editor-content td {
  border: 1px solid #dee2e6 !important;
  padding: 8px 12px !important;
}

.simple-editor-content th {
  background: #f8f9fa !important;
  font-weight: 600 !important;
}
```

### Dark Theme Example

```css
/* Dark theme variables */
:root {
  --editor-bg: #1a1a1a;
  --editor-text: #ffffff;
  --editor-border: #404040;
  --editor-toolbar: #2d2d2d;
}

.dark-theme .simple-editor-wrapper {
  background: var(--editor-bg) !important;
  border-color: var(--editor-border) !important;
}

.dark-theme .simple-editor-content {
  background: var(--editor-bg) !important;
  color: var(--editor-text) !important;
}

.dark-theme .tiptap-toolbar {
  background: var(--editor-toolbar) !important;
  border-color: var(--editor-border) !important;
}

.dark-theme .tiptap-button {
  color: var(--editor-text) !important;
}

.dark-theme .tiptap-button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}
```

## 🔧 TypeScript Support

The package includes full TypeScript definitions:

```typescript
import { SimpleEditor, type SimpleEditorProps } from "@akhlaqdigital/editor";

// All props are fully typed
const editorProps: SimpleEditorProps = {
  content: "<p>Hello TypeScript!</p>",
  onChange: (content: string | null) => {
    console.log("Content updated:", content);
  },
  placeholder: "Type here...",
  isShowMention: true,
  mentions: [
    { id: 1, label: "User 1" }, // ✅ Correctly typed
    { id: "invalid", label: "User 2" }, // ❌ TypeScript error
  ],
};

// Upload handler with full type safety
const handleImageUpload: HandleImageInsertion = async ({
  file,
  onProgress,
  abortSignal,
  removeFileItem,
  context,
}) => {
  // All parameters are properly typed
  console.log(file.file.name); // ✅ File is typed as File
  onProgress?.({ progress: 50 }); // ✅ Progress is typed as number
  return "https://example.com/image.jpg"; // ✅ Must return string | null
};
```

## ⚡ Performance Optimization

### Bundle Size

- **Development build**: ~270KB gzipped
- **Production build**: ~250KB gzipped
- **Tree shakeable**: Import only what you need

### Memory Management

```jsx
import { useEffect, useRef } from "react";
import { SimpleEditor } from "@akhlaqdigital/editor";

function OptimizedEditor({ content, onChange }) {
  const editorRef = useRef(null);

  // Debounce onChange for better performance
  const debouncedOnChange = useMemo(() => debounce(onChange, 300), [onChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Editor automatically cleans up, but you can do additional cleanup here
      console.log("Editor component unmounting");
    };
  }, []);

  return (
    <SimpleEditor
      ref={editorRef}
      content={content}
      onChange={debouncedOnChange}
      // Use memo to prevent unnecessary re-renders
      mentions={useMemo(() => mentions, [])}
    />
  );
}

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

### Code Splitting

```jsx
import { lazy, Suspense } from "react";

// Lazy load the editor for better initial page load
const SimpleEditor = lazy(() =>
  import("@akhlaqdigital/editor").then((module) => ({
    default: module.SimpleEditor,
  }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <SimpleEditor
        content="<p>Hello World!</p>"
        onChange={(content) => console.log(content)}
      />
    </Suspense>
  );
}
```

## 🏗️ Architecture & Dependencies

This package is built on a foundation of proven, industry-standard technologies:

### Core Framework

- **ProseMirror** - The powerful, modular rich text editing framework
- **Tiptap** - Modern React integration for ProseMirror with excellent extensibility
- **React** - Declarative UI library for building interactive interfaces
- **TypeScript** - Static type checking for enhanced developer experience

### Key Features & Extensions

- **Mentions**: Real-time @user suggestions with customizable data sources
- **Emoji Picker**: Comprehensive emoji selection with 9 categories (😊 🍎 🌸 ⚽ 🏠 💻 🎉 ❤️ 🇺🇸)
- **File Handling**: Drag & drop uploads with progress tracking and error handling
- **Tables**: Full-featured table editing with resizing and formatting
- **Rich Formatting**: Complete text formatting suite (bold, italic, headers, lists, etc.)
- **Code Blocks**: Syntax highlighting and code editing capabilities
- **Images**: Resizable images with context menus and accessibility features

### Build & Performance

- **Vite** - Fast development and optimized production builds
- **Rollup** - Advanced bundling with tree shaking
- **Bundle Size**: ~260KB gzipped (production) with React externalized
- **Tree Shakeable**: Import only the components you need

> **Acknowledgments**: This project builds upon the incredible work of the ProseMirror and Tiptap teams. Their thoughtful architecture and extensible design make rich text editing both powerful and approachable.

## 📄 License

MIT License

## 🔗 Links

- 🌐 **CDN Documentation**: [CDN Docs →](https://akhlaq-digital-editor.vercel.app/docs/cdn)
- 🎯 **Live Demo**: [NPM Demo →](https://akhlaq-digital-editor.vercel.app/example)
- 📦 **NPM Package**: [@akhlaqdigital/editor](https://npmjs.com/package/@akhlaqdigital/editor)
- 📚 **Full Documentation**: [Complete Docs →](https://akhlaq-digital-editor.vercel.app/docs)

## 🤝 Support

- 📧 Email: akhlaqdigital@gmail.com

---

Made with ❤️ by [Akhlaq Digital](https://akhlaq-digital-editor.vercel.app)
