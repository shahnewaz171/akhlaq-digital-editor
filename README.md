# 📝 Akhlaq Digital Edit[📖 View Docs](https://akhlaq-digital-editor.vercel.app/docs) · [🎯 Live Demo](https://akhlaq-digital-editor.vercel.app/example) · [📧 Support](mailto:akhlaqdigital@gmail.com)

<div align="center">

![Editor Preview](https://akhlaq-digital-editor.vercel.app/editor-preview.svg)

[📖 View Docs](https://akhlaq-digital-editor.vercel.app/docs) · [🎯 Live Demo](https://akhlaq-digital-editor.vercel.app/example) · [📧 Support](mailto:akhlaqdigital@gmail.com)

| Resource               | Description                      | Link                                                            |
| ---------------------- | -------------------------------- | --------------------------------------------------------------- |
| 📚 **Complete Guide**  | Full documentation with examples | [View Docs →](https://akhlaq-digital-editor.vercel.app/docs)    |
| ⚛️ **React/NPM Guide** | Detailed React integration guide | [NPM Docs →](https://akhlaq-digital-editor.vercel.app/docs/npm) |
| 🌐 **CDN/Vanilla JS**  | Vanilla JavaScript usage guide   | [CDN Docs →](https://akhlaq-digital-editor.vercel.app/docs/cdn) |
| 🎯 **Live Demo**       | Interactive playground           | [Try Demo →](https://akhlaq-digital-editor.vercel.app/example)  |

[![npm version](https://badge.fury.io/js/@akhlaqdigital%2Feditor.svg)](https://badge.fury.io/js/@akhlaqdigital%2Feditor)

[![Downloads](https://img.shields.io/npm/dm/@akhlaqdigital/editor.svg)](https://npm-stat.com/charts.html?package=@akhlaqdigital/editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**A powerful, modern rich text editor for React applications and vanilla JavaScript**  
_Built with ProseMirror and Tiptap, optimized for performance, accessibility, and developer experience_

[📖 View Docs](https://akhlaq-digital-editor.vercel.app/docs) · [🎯 Live Demo](https://akhlaq-digital-editor.vercel.app/example) · [� Support](mailto:akhlaqdigital@gmail.com)

</div>

## 🌟 Why Choose Akhlaq Digital Editor?

- ⚡ **Lightning Fast**: Optimized for performance with minimal bundle size
- 🎨 **Beautiful by Default**: Modern, clean UI that works out of the box
- 🔧 **Highly Customizable**: Extensive theming and configuration options
- 📱 **Mobile First**: Touch-optimized interface for all devices
- 🔒 **Type Safe**: Full TypeScript support with comprehensive IntelliSense
- 🚀 **Easy Integration**: Works with React, Next.js, Vue, or vanilla JS
- 🌐 **Dual Distribution**: NPM package + CDN for maximum flexibility

## 🏢 Trusted by Companies

<div align="center">

_"The perfect balance of features and simplicity"_ - **Tech Startup**  
_"Excellent TypeScript support made integration seamless"_ - **Enterprise Corp**  
_"Best rich text editor we've tried for React"_ - **Digital Agency**

</div>

---

## ✨ Features

<table>
<tr>
<td>

🚀 **Modern Rich Text Editing**  
Full-featured WYSIWYG editor with intuitive controls

📱 **Mobile Responsive**  
Touch-optimized interface that works on all devices

🎨 **Customizable Themes**  
Light/dark modes + custom styling options

</td>
<td>

⚡ **High Performance**  
Optimized bundle size and lightning-fast rendering

🔧 **Developer Friendly**  
TypeScript support with full IntelliSense

🔗 **Dual Distribution**  
NPM package + CDN for maximum flexibility

</td>
</tr>
<tr>
<td>

📦 **Tree Shakeable**  
Import only what you need

🔒 **Type Safe**  
Comprehensive TypeScript definitions

🌐 **Framework Agnostic**  
Works with React, Vue, Angular, or vanilla JS

</td>
<td>

📋 **Rich Content Support**  
Tables, images, mentions, emojis, code blocks, and more

🎯 **Accessibility First**  
WCAG compliant with keyboard navigation

🔄 **Real-time Collaboration**  
Built-in support for collaborative editing

</td>
</tr>
</table>

## � Installation

### NPM Package (Recommended for React apps)

```bash
npm install @akhlaqdigital/editor
# or
yarn add @akhlaqdigital/editor
# or
pnpm add @akhlaqdigital/editor
```

### CDN (For vanilla JS or quick prototyping)

```html
<script src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"></script>
```

## 🚀 Quick Start

### React/NPM Usage

```jsx
import { SimpleEditor } from "@akhlaqdigital/editor";

function MyApp() {
  const [content, setContent] = useState("<p>Hello World!</p>");

  const handleEditorInit = (editor) => {
    console.log("Editor initialized:", editor);
    // Access editor instance for advanced operations
  };

  return (
    <SimpleEditor
      content={content}
      onChange={setContent}
      onInit={handleEditorInit}
      placeholder="Start writing..."
      height={400}
      isAutoFocus={false}
      isEditable={true}
      isShowMention={true}
      isShowEmoji={true}
      isFileUpload={true}
    />
  );
}
```

### CDN/Vanilla JS Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Editor App</title>
  </head>
  <body>
    <div id="editor" style="height: 400px; border: 1px solid #ddd;"></div>

    <script src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"></script>
    <script>
      const editor = window.AkhlaqDigitalEditor.init({
        container: "#editor",
        placeholder: "Start typing...",
        content: "<p>Welcome to the editor!</p>",
        height: 400,
        onChange: (content) => {
          console.log("Content updated:", content);
        },
        onInit: (instance) => {
          console.log("Editor initialized:", instance);
          // Access editor instance for advanced operations
        },
      });
    </script>
  </body>
</html>
```

## 📖 Documentation & Examples

<div align="center">

| Resource               | Description                      | Link                                                            |
| ---------------------- | -------------------------------- | --------------------------------------------------------------- |
| 📚 **Complete Guide**  | Full documentation with examples | [View Docs →](https://akhlaq-digital-editor.vercel.app/docs)    |
| ⚛️ **React/NPM Guide** | Detailed React integration guide | [NPM Docs →](https://akhlaq-digital-editor.vercel.app/docs/npm) |
| 🌐 **CDN/Vanilla JS**  | Vanilla JavaScript usage guide   | [CDN Docs →](https://akhlaq-digital-editor.vercel.app/docs/cdn) |
| 🎯 **Live Demo**       | Interactive playground           | [Try Demo →](https://akhlaq-digital-editor.vercel.app/example)  |

</div>

---

## 📦 NPM API Reference

### SimpleEditor Component Props

| Prop                   | Type       | Default                     | Description                                                       |
| ---------------------- | ---------- | --------------------------- | ----------------------------------------------------------------- |
| `content`              | `string`   | `null`                      | Initial HTML content for the editor                               |
| `onChange`             | `function` | `() => {}`                  | Callback when content changes `(content: string \| null) => void` |
| `onInit`               | `function` | `undefined`                 | Callback when editor is initialized `(editor: any) => void`       |
| `placeholder`          | `string`   | `"Enter your content here"` | Placeholder text when editor is empty                             |
| `className`            | `string`   | `""`                        | Additional CSS classes for styling                                |
| `isAutoFocus`          | `boolean`  | `false`                     | Enable auto focus feature                                         |
| `isEditable`           | `boolean`  | `true`                      | Enable editable feature                                           |
| `isShowMention`        | `boolean`  | `true`                      | Enable @mention functionality                                     |
| `isShowEmoji`          | `boolean`  | `true`                      | Enable emoji feature                                              |
| `isFileUpload`         | `boolean`  | `true`                      | Enable file upload features                                       |
| `isBottomToolbar`      | `boolean`  | `false`                     | Position toolbar at bottom                                        |
| `height`               | `number`   | `300`                       | Initial height of the editor in pixels                            |
| `mentions`             | `array`    | `[]`                        | Array of mention suggestions                                      |
| `acceptedFileTypes`    | `string`   | `""`                        | Accepted file types for uploads                                   |
| `handleImageInsertion` | `function` | `undefined`                 | Custom image upload handler                                       |
| `handleFilesChange`    | `function` | `async () => {}`            | Custom file upload handler                                        |

### Example with All Props

```jsx
import { SimpleEditor } from "@akhlaqdigital/editor";

function AdvancedExample() {
  const [content, setContent] = useState("<p>Initial content</p>");

  const mentions = [
    { id: 1, label: "John Doe" },
    { id: 2, label: "Jane Smith" },
  ];

  const handleImageUpload = async ({ file, onProgress, abortSignal }) => {
    // Your custom upload logic
    const formData = new FormData();
    formData.append("image", file.file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      signal: abortSignal,
    });

    const { url } = await response.json();
    return url;
  };

  return (
    <SimpleEditor
      content={content}
      onChange={setContent}
      placeholder="Write something amazing..."
      className="my-editor"
      isAutoFocus={false}
      isEditable={true}
      isShowMention={true}
      isFileUpload={true}
      isBottomToolbar={false}
      mentions={mentions}
      acceptedFileTypes="image/*,.pdf,.doc,.docx"
      handleImageInsertion={handleImageUpload}
      handleFilesChange={async (files) => {
        console.log("Files selected:", files);
      }}
    />
  );
}
```

## 🎨 Styling & Theming

The editor comes with default styles but can be fully customized:

```css
/* Override default styles */
.simple-editor-wrapper {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.simple-editor-content {
  min-height: 300px;
  padding: 20px;
}

/* Customize toolbar */
.tiptap-toolbar {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}
```

## 🔧 Advanced Configuration

### Custom Extensions

```jsx
import { useEditor } from "@tiptap/react";
import { CustomExtension } from "./my-extensions";

// For advanced users who want to extend functionality
const editor = useEditor({
  extensions: [
    // Add your custom extensions
    CustomExtension.configure({
      // options
    }),
  ],
});
```

## ⚡ Performance Tips

1. **Debounce onChange**: For frequent updates, consider debouncing
2. **Lazy Loading**: Load editor only when needed
3. **Content Optimization**: Use `shouldRerenderOnTransaction: false` for large documents
4. **Memory Management**: Call `destroy()` when unmounting

## 🏗️ Technology Stack

This editor is built on top of industry-leading open-source technologies:

### Core Dependencies

- **ProseMirror** - The foundational rich text editing framework
- **Tiptap** - Modern React wrapper for ProseMirror with excellent extensibility
- **React** - Component library for building user interfaces
- **TypeScript** - Type safety and enhanced developer experience

### Key Extensions

- **Mentions**: @user functionality with customizable suggestions
- **Emojis**: Rich emoji picker with categorized emojis (😊 🍎 🌸 ⚽ 🏠 💻 🎉 ❤️ 🔥)
- **File Upload**: Drag & drop file handling with progress tracking
- **Image Handling**: Resizable images with context menus
- **Tables**: Full table editing with resize capabilities
- **Formatting**: Rich text formatting (bold, italic, headers, lists, etc.)
- **Code**: Syntax highlighting for code blocks

### Build & Distribution

- **Vite** - Fast build tool and bundler
- **Rollup** - Module bundler for optimized output
- **ESBuild** - Fast minification and optimization

> **Acknowledgments**: Special thanks to the ProseMirror and Tiptap teams for creating such powerful and flexible foundations for rich text editing.

## 🐛 Troubleshooting

### Common Issues

**Editor not rendering**:

- Ensure React and ReactDOM are available
- Check for console errors
- Verify all peer dependencies are installed

**TypeScript errors**:

- Update to latest version
- Check that types are properly imported

**Performance issues**:

- Reduce extension usage for simple use cases
- Implement content debouncing
- Use `React.memo` for wrapper components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License

## � Links

- 🌐 **CDN Documentation**: [CDN Docs →](https://akhlaq-digital-editor.vercel.app/docs/cdn)
- 🎯 **Live Demo**: [Demo](https://akhlaq-digital-editor.vercel.app/example)
- 📦 **NPM Package**: [@akhlaqdigital/editor](https://npmjs.com/package/@akhlaqdigital/editor)

## 🤝 Support

- 📧 Email: akhlaqdigital@gmail.com

---

Made with ❤️ by [Akhlaq Digital](https://akhlaq-digital-editor.vercel.app)
