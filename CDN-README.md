# 📦 Akhlaq Digital Editor - CDN

A powerful, modern rich text editor for vanilla JavaScript and any web framework. Built with ProseMirror and Tiptap, optimized for ease of use and performance.

> **Inspired by**: This editor leverages the robust ProseMirror framework through Tiptap, providing a solid foundation for rich text editing with enhanced features and developer experience.

The `init()` method accepts a configuration object with the following options:

### Core Options

| Option        | Type             | Default             | Description                                                              |
| ------------- | ---------------- | ------------------- | ------------------------------------------------------------------------ |
| `container`   | `string`         | **required**        | CSS selector for the container element                                   |
| `content`     | `string \| null` | `null`              | Initial HTML content                                                     |
| `placeholder` | `string`         | `"Start typing..."` | Placeholder text when editor is empty                                    |
| `className`   | `string`         | `""`                | Additional CSS classes for the editor                                    |
| `onChange`    | `function`       | `undefined`         | Callback when content changes `(content: string \| null) => void`        |
| `onInit`      | `function`       | `undefined`         | Callback when editor is initialized `(instance: EditorInstance) => void` |

### Feature Configuration

| Option              | Type      | Default | Description                                                  |
| ------------------- | --------- | ------- | ------------------------------------------------------------ |
| `isAutoFocus`       | `boolean` | `false` | Enable auto focus feature                                    |
| `isEditable`        | `boolean` | `true`  | Enable editable feature                                      |
| `isShowMention`     | `boolean` | `true`  | Enable @mention functionality                                |
| `isShowEmoji`       | `boolean` | `true`  | Enable emoji picker with categorized emojis                  |
| `isFileUpload`      | `boolean` | `true`  | Enable file upload features                                  |
| `isBottomToolbar`   | `boolean` | `false` | Position toolbar at bottom instead of top                    |
| `height`            | `number`  | `300`   | Initial height of the editor in pixels                       |
| `mentions`          | `array`   | `[]`    | Array of mention suggestions `[{id: number, label: string}]` |
| `acceptedFileTypes` | `string`  | `""`    | Accepted file types for uploads (e.g., "image/\*,.pdf,.doc") |

### Upload Handlers

| Option                 | Type       | Default     | Description                 |
| ---------------------- | ---------- | ----------- | --------------------------- |
| `handleImageInsertion` | `function` | `undefined` | Custom image upload handler |
| `handleFilesChange`    | `function` | `undefined` | Custom file upload handler  |

### Complete Configuration Example

````javascript
const editor = window.AkhlaqDigitalEditor.init({
  // Core configuration
  container: '#my-editor',
  content: '<h1>Welcome!</h1><p>Start writing...</p>',
  placeholder: 'Type your content here...',
  className: 'my-custom-editor',

  // Feature toggles
  isAutoFocus: false,
  isEditable: true,
  isShowMention: true,
  isShowEmoji: true,
  isFileUpload: true,
  isBottomToolbar: false,

  // Mentions configuration
  mentions: [
    { id: 1, label: 'John Doe' },
    { id: 2, label: 'Jane Smith' },
    { id: 3, label: 'Team Alpha' }
  ],

  // File upload configuration
  acceptedFileTypes: 'image/*,.pdf,.doc,.docx,.txt',

  // Event handlers
  onChange: (content) => {
    console.log('Content updated:', content);
    // Save to localStorage
    localStorage.setItem('editorContent', content || '');
  },

  onInit: (instance) => {
    console.log('Editor initialized:', instance);
    // Load saved content
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      instance.setContent(savedContent);
    }
  },

  // Custom upload handlers
  handleImageInsertion: async ({ file, onProgress, abortSignal, removeFileItem, context }) => {
    try {
      const formData = new FormData();
      formData.append('image', file.file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
        signal: abortSignal
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { url } = await response.json();
      return url;
    } catch (error) {
      console.error('Image upload error:', error);
      if (removeFileItem) {
        removeFileItem(file.id);
      }
      throw error;
    }
  },

  handleFilesChange: async (files) => {
    console.log('Files selected:', files);
    // Handle file selection
    for (const file of files) {
      console.log(`File: ${file.name}, Size: ${file.size} bytes`);
    }
  }
});
```be easily integrated via CDN for quick setup and deployment.

## 🚀 Quick Start

### 1. Include the CDN Script

```html
<script src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"></script>
````

### 2. Create a Container

```html
<div id="my-editor"></div>
```

### 3. Initialize the Editor

```javascript
const editor = window.AkhlaqDigitalEditor.init({
  container: "#my-editor",
  placeholder: "Start writing...",
  content: "<p>Welcome to the editor!</p>",
  onChange: (content) => {
    console.log("Content updated:", content);
  },
});
```

## 📝 Complete Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Editor App</title>
    <style>
      .editor-container {
        max-width: 800px;
        margin: 50px auto;
        border: 1px solid #ddd;
        border-radius: 8px;
        min-height: 300px;
      }
    </style>
  </head>
  <body>
    <div id="editor" class="editor-container"></div>

    <script src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"></script>
    <script>
      const editor = window.AkhlaqDigitalEditor.init({
        container: "#editor",
        placeholder: "Start typing your content...",
        onChange: (content) => {
          localStorage.setItem("editorContent", content);
        },
      });
    </script>
  </body>
</html>
```

## 📝 Advanced Example with All Features

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Advanced Editor Example</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        max-width: 900px;
        margin: 20px auto;
        padding: 20px;
        background: #f8f9fa;
      }
      .editor-container {
        border: 2px solid #e1e5e9;
        border-radius: 12px;
        min-height: 400px;
        background: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .controls {
        margin: 20px 0;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      .btn {
        padding: 10px 16px;
        border: none;
        border-radius: 6px;
        background: #0969da;
        color: white;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.2s;
      }
      .btn:hover {
        background: #0860ca;
      }
      .status {
        background: #f6f8fa;
        border: 1px solid #d0d7de;
        padding: 12px;
        border-radius: 6px;
        margin: 10px 0;
        font-family: monospace;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <h1>🚀 Advanced Editor with Full Configuration</h1>

    <div id="editor" class="editor-container"></div>

    <div class="controls">
      <button class="btn" onclick="getContent()">📄 Get Content</button>
      <button class="btn" onclick="setContent()">📝 Set Sample</button>
      <button class="btn" onclick="clearContent()">🗑️ Clear</button>
      <button class="btn" onclick="saveContent()">💾 Save</button>
      <button class="btn" onclick="loadContent()">📂 Load</button>
      <button class="btn" onclick="focusEditor()">🎯 Focus</button>
    </div>

    <div id="status" class="status">Status: Initializing...</div>

    <!-- CDN Script -->
    <script src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"></script>

    <script>
      let editor;

      // Sample mentions data
      const mentions = [
        { id: 1, label: 'John Doe' },
        { id: 2, label: 'Jane Smith' },
        { id: 3, label: 'Alice Johnson' },
        { id: 4, label: 'Bob Wilson' },
        { id: 5, label: 'Team Alpha' },
        { id: 6, label: 'Team Beta' }
      ];

      // Initialize editor with full configuration
      function initEditor() {
        try {
          editor = window.AkhlaqDigitalEditor.init({
            // Core configuration
            container: '#editor',
            placeholder: 'Start writing... Try @mention or drag & drop images',
            content: \`
              <h2>🎉 Welcome to the Advanced Editor!</h2>
              <p>This editor supports <strong>rich formatting</strong>, <em>@mentions</em>, and much more!</p>
              <ul>
                <li>📝 Rich text editing with toolbar</li>
                <li>👥 @mentions - try typing @John</li>
                <li>📷 Image uploads (drag & drop or click button)</li>
                <li>📁 File uploads with progress tracking</li>
                <li>🎨 Colors and highlighting</li>
                <li>📊 Tables with full editing</li>
                <li>📱 Mobile responsive design</li>
              </ul>
              <blockquote>
                <p>"Start where you are. Use what you have. Do what you can." - Arthur Ashe</p>
              </blockquote>
              <p>Try mentioning: @Team or @Alice</p>
            \`,
            className: 'advanced-editor',

            // Feature configuration
            isAutoFocus: false,
            isEditable: true,
            isShowMention: true,
            isFileUpload: true,
            isBottomToolbar: false,
            mentions: mentions,
            acceptedFileTypes: 'image/*,.pdf,.doc,.docx,.txt,.md,.json',

            // Event handlers
            onChange: (content) => {
              const charCount = content ? content.length : 0;
              const wordCount = content ? content.split(/\\s+/).filter(w => w.length > 0).length : 0;
              updateStatus(\`📝 Content: \${charCount} chars, \${wordCount} words\`);
            },

            onInit: (instance) => {
              console.log('✅ Editor initialized:', instance);
              updateStatus('✅ Editor ready! Try typing or @mentions');

              // Auto-load saved content
              const saved = localStorage.getItem('advancedEditorContent');
              if (saved && saved !== instance.getContent()) {
                console.log('📂 Found saved content');
              }
            },

            // Custom image upload handler
            handleImageInsertion: async ({ file, onProgress, abortSignal, removeFileItem, context }) => {
              updateStatus(\`📷 Uploading: \${file.file.name}...\`);

              try {
                // Simulate upload with progress
                for (let i = 0; i <= 100; i += 20) {
                  if (abortSignal?.aborted) throw new Error('Upload cancelled');

                  if (onProgress) {
                    onProgress({ progress: i });
                    updateStatus(\`📷 Uploading: \${i}%\`);
                  }

                  await new Promise(resolve => setTimeout(resolve, 200));
                }

                // Convert to base64 for demo
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    updateStatus('✅ Image uploaded successfully');
                    resolve(reader.result);
                  };
                  reader.onerror = () => {
                    updateStatus('❌ Image upload failed');
                    reject(new Error('Failed to read file'));
                  };
                  reader.readAsDataURL(file.file);
                });

              } catch (error) {
                updateStatus(\`❌ Upload failed: \${error.message}\`);
                if (removeFileItem) removeFileItem(file.id);
                throw error;
              }
            },

            // File selection handler
            handleFilesChange: async (files) => {
              updateStatus(\`📁 Selected \${files.length} file(s)\`);
              console.log('📁 Files selected:', files.map(f => f.name));
            }
          });

        } catch (error) {
          console.error('❌ Editor initialization failed:', error);
          updateStatus(\`❌ Init failed: \${error.message}\`);
        }
      }

      // Utility function
      function updateStatus(message) {
        const statusEl = document.getElementById('status');
        if (statusEl) {
          statusEl.textContent = \`Status: \${message}\`;
        }
      }

      // Control functions
      function getContent() {
        if (!editor) return alert('Editor not initialized');
        const content = editor.getContent();
        const charCount = content ? content.length : 0;
        const preview = content && content.length > 300
          ? content.substring(0, 300) + '...'
          : content || '(Empty)';
        alert(\`Content (\${charCount} characters):\\n\\n\${preview}\`);
      }

      function setContent() {
        if (!editor) return alert('Editor not initialized');
        const sampleContent = \`
          <h1>📄 Sample Document</h1>
          <p>This is a <strong>comprehensive example</strong> with various formatting options:</p>

          <h2>📋 Task List</h2>
          <ul>
            <li>✅ <strong>Completed task</strong></li>
            <li>🔄 <em>In progress task</em></li>
            <li>📋 <code>Code review task</code></li>
            <li>🎯 Future enhancement</li>
          </ul>

          <h2>📊 Data Table</h2>
          <table>
            <thead>
              <tr><th>Feature</th><th>Status</th><th>Priority</th></tr>
            </thead>
            <tbody>
              <tr><td>Rich Text Editing</td><td>✅ Complete</td><td>High</td></tr>
              <tr><td>File Uploads</td><td>✅ Complete</td><td>Medium</td></tr>
              <tr><td>Mentions</td><td>✅ Complete</td><td>Low</td></tr>
            </tbody>
          </table>

          <h2>👥 Team Mentions</h2>
          <p>Please review @John and get feedback from @Team Alpha on the new features.</p>

          <blockquote>
            <p>"Quality is not an act, it is a habit." - Aristotle</p>
          </blockquote>

          <p><em>Last updated: \${new Date().toLocaleDateString()}</em></p>
        \`;

        editor.setContent(sampleContent);
        updateStatus('📝 Sample content loaded');
      }

      function clearContent() {
        if (!editor) return alert('Editor not initialized');
        if (confirm('🗑️ Clear all content? This cannot be undone.')) {
          editor.setContent('');
          updateStatus('🗑️ Content cleared');
        }
      }

      function saveContent() {
        if (!editor) return alert('Editor not initialized');
        const content = editor.getContent();
        localStorage.setItem('advancedEditorContent', content || '');
        const size = new Blob([content || '']).size;
        updateStatus(\`💾 Saved \${(size/1024).toFixed(1)}KB to localStorage\`);
      }

      function loadContent() {
        if (!editor) return alert('Editor not initialized');
        const saved = localStorage.getItem('advancedEditorContent');
        if (saved) {
          editor.setContent(saved);
          const size = new Blob([saved]).size;
          updateStatus(\`📂 Loaded \${(size/1024).toFixed(1)}KB from localStorage\`);
        } else {
          alert('💭 No saved content found in localStorage');
        }
      }

      function focusEditor() {
        if (!editor) return alert('Editor not initialized');
        editor.focus();
        updateStatus('🎯 Editor focused');
      }

      // Initialize when DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEditor);
      } else {
        setTimeout(initEditor, 100);
      }

      // Cleanup
      window.addEventListener('pagehide', () => {
        if (editor?.destroy) {
          editor.destroy();
          console.log('🧹 Editor cleaned up');
        }
      });

      // Developer console helpers
      console.log('%c🚀 Advanced Editor Demo Loaded', 'font-size: 16px; color: #0969da; font-weight: bold;');
      console.log('💡 Available functions: getContent(), setContent(), clearContent(), saveContent(), loadContent(), focusEditor()');
      console.log('🔍 Try: window.AkhlaqDigitalEditor.getInstance() for API access');
    </script>
  </body>
</html>
```

## 🔧 Configuration Options

| Option          | Type       | Default             | Description                            |
| --------------- | ---------- | ------------------- | -------------------------------------- |
| `container`     | `string`   | **required**        | CSS selector for the container element |
| `placeholder`   | `string`   | `"Start typing..."` | Placeholder text when editor is empty  |
| `content`       | `string`   | `null`              | Initial HTML content                   |
| `onChange`      | `function` | `undefined`         | Callback when content changes          |
| `onInit`        | `function` | `undefined`         | Callback when editor is initialized    |
| `isAutoFocus`   | `boolean`  | `false`             | Enable auto focus feature              |
| `isEditable`    | `boolean`  | `true`              | Enable editable feature                |
| `isShowMention` | `boolean`  | `true`              | Enable @mention functionality          |
| `isFileUpload`  | `boolean`  | `true`              | Enable file upload features            |
| `mentions`      | `array`    | `[]`                | Array of mention suggestions           |

## 📋 API Reference

### Editor Instance Methods

```javascript
// Get current content as HTML
const content = editor.getContent();

// Set content
editor.setContent("<p>New content</p>");

// Focus the editor
editor.focus();

// Destroy the editor instance
editor.destroy();
```

### Global API Methods

```javascript
// Get the current editor instance
const currentEditor = window.AkhlaqDigitalEditor.getInstance();

// Get version information
const version = window.AkhlaqDigitalEditor.version;

// Check if editor is available
const isAvailable = window.AkhlaqDigitalEditor.isAvailable();
```

## 🎨 Features

- ✅ **Rich Text Formatting**: Bold, italic, underline, strikethrough
- ✅ **Headings**: H1-H6 with dropdown selector
- ✅ **Lists**: Bullet, numbered, and task lists
- ✅ **Tables**: Full table editing with resize
- ✅ **Links**: Easy link insertion and editing
- ✅ **Text Alignment**: Left, center, right, justify
- ✅ **Colors**: Text and highlight colors
- ✅ **Code**: Inline code and code blocks
- ✅ **Quotes**: Blockquotes for citations
- ✅ **Mentions**: @mention functionality
- ✅ **Images**: Image insertion and resizing
- ✅ **Undo/Redo**: Full history support
- ✅ **Mobile Responsive**: Touch-friendly interface

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🔒 TypeScript Support

The CDN version includes TypeScript definitions for full IntelliSense support:

```typescript
// TypeScript will provide autocomplete and type checking
const editor = window.AkhlaqDigitalEditor.init({
  container: "#editor",
  placeholder: "Type here...",
  onChange: (content: string | null) => {
    // Full type safety
    console.log(content);
  },
});

// Method signatures are fully typed
const content: string | null = editor.getContent();
```

## 🎯 Live Demo

Check out the live example at: [CDN Demo →](https://akhlaq-digital-editor.vercel.app/docs/cdn)

## ⚡ Performance

- **Bundle Size**: ~305KB gzipped
- **First Paint**: < 100ms
- **Interactive**: < 200ms
- **Memory Usage**: < 10MB typical

## 🛠️ Troubleshooting

### Editor Not Loading

1. Check browser console for errors
2. Verify the CDN URL is accessible
3. Ensure container element exists before initialization

### TypeScript IntelliSense Not Working

1. Make sure you're using a modern IDE with TypeScript support
2. The types are automatically included with the CDN bundle
3. Try restarting your IDE if autocomplete isn't appearing

### Performance Issues

1. Use `onChange` debouncing for frequent updates
2. Avoid initializing multiple editors on the same page
3. Call `editor.destroy()` when removing editors

## 🏗️ Built With

This editor stands on the shoulders of giants:

- **ProseMirror** - The robust foundation for rich text editing
- **Tiptap** - Modern React wrapper providing excellent extensibility
- **React** - Component-based architecture for maintainable UIs
- **Vite** - Lightning-fast build tool for optimized bundles

> **Special Thanks**: Huge appreciation to the ProseMirror and Tiptap communities for creating such powerful, flexible frameworks that make rich text editing accessible and enjoyable.

## 📄 License

MIT License

## 🤝 Support

- 📧 Email: akhlaqdigital@gmail.com
- 📚 Docs: [Full Documentation](https://akhlaq-digital-editor.vercel.app/docs)

---

Made with ❤️ by [Akhlaq Digital](https://akhlaq-digital-editor.vercel.app)
