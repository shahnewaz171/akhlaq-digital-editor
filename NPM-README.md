# 📦 Akhlaq Digital Editor - NPM Package

**A modern rich text editor for React applications with TypeScript support**

[📖 **Documentation**](https://akhlaq-digital-editor.vercel.app/docs/npm) · [🎯 **Demo**](https://akhlaq-digital-editor.vercel.app/example) · [📧 **Support**](mailto:akhlaqdigital@gmail.com)

## 🚀 Installation

```bash
npm install @akhlaqdigital/editor
# or
yarn add @akhlaqdigital/editor
# or
pnpm add @akhlaqdigital/editor
```

## ⚡ Quick Start

```jsx
import { SimpleEditor } from "@akhlaqdigital/editor";
import { useState } from "react";

function MyApp() {
  const [content, setContent] = useState("<p>Hello World!</p>");

  return (
    <SimpleEditor
      content={content}
      onChange={setContent}
      placeholder="Start writing..."
      height={400}
    />
  );
}
```

## 🔧 Props Reference

| Prop                   | Type       | Default                     | Description                                                       |
| ---------------------- | ---------- | --------------------------- | ----------------------------------------------------------------- |
| `content`              | `string`   | `null`                      | Initial HTML content                                              |
| `onChange`             | `function` | `() => {}`                  | Callback when content changes                                     |
| `placeholder`          | `string`   | `"Enter your content here"` | Placeholder text                                                  |
| `height`               | `number`   | `300`                       | Editor height in pixels                                           |
| `isEditable`           | `boolean`  | `true`                      | Enable/disable editing                                            |
| `isRefreshEditor`      | `boolean`  | `false`                     | Force remount when deps change                                    |
| `isAutoFocus`          | `boolean`  | `false`                     | Autofocus the editor on mount                                     |
| `isShowMention`        | `boolean`  | `true`                      | Enable @mentions                                                  |
| `isShowEmoji`          | `boolean`  | `true`                      | Enable emoji picker                                               |
| `isFileUpload`         | `boolean`  | `true`                      | Enable file uploads                                               |
| `isBottomToolbar`      | `boolean`  | `false`                     | Show toolbar at the bottom                                        |
| `acceptedFileTypes`    | `string`   | `-`                         | Accepted file types for upload (e.g. `"image/*,application/pdf"`) |
| `mentions`             | `array`    | `[]`                        | Mention suggestions (array of user objects)                       |
| `onInit`               | `function` | `-`                         | Callback when editor is initialized                               |
| `handleImageInsertion` | `function` | `-`                         | Custom handler for image insertion                                |
| `handleFilesChange`    | `function` | `async () => {}`            | Custom handler for file uploads                                   |
| `className`            | `string`   | `-`                         | Custom class for the editor container                             |

## 📝 Advanced Example

```jsx
import { SimpleEditor } from "@akhlaqdigital/editor";
import { useState } from "react";

function AdvancedEditor() {
  const [content, setContent] = useState("");

  const mentions = [
    { id: 1, label: "John Doe" },
    { id: 2, label: "Jane Smith" },
  ];

  const handleImageUpload = async ({ file, onProgress, abortSignal }) => {
    // Your upload logic here
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
      height={500}
      isAutoFocus={false}
      isShowMention={true}
      isShowEmoji={true}
      isFileUpload={true}
      mentions={mentions}
      acceptedFileTypes="image/*,.pdf,.doc,.docx"
      handleImageInsertion={handleImageUpload}
      onInit={(editor) => {
        console.log("Editor initialized:", editor);
      }}
    />
  );
}
```

## 🎨 Styling

Customize the editor appearance:

```css
/* Main wrapper */
.akd-editor-wrapper {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
}

/* Content area */
.akd-editor-content {
  min-height: 200px;
  padding: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
}

/* Toolbar */
.akd-toolbar {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 8px;
}
```

## 🔄 Event Handlers

```jsx
const [content, setContent] = useState("");

const handleContentChange = (newContent) => {
  console.log("Content changed:", newContent);
  setContent(newContent);
};

const handleEditorReady = (editor) => {
  console.log("Editor is ready:", editor);
  // Access editor instance for advanced operations
};

return (
  <SimpleEditor
    content={content}
    onChange={handleContentChange}
    onInit={handleEditorReady}
  />
);
```

## 📱 Mobile Optimization

The editor is fully responsive and touch-optimized:

- Touch-friendly toolbar buttons
- Mobile-specific context menus
- Optimized virtual keyboard handling
- Responsive image resizing

## ⚡ Performance Tips

1. **Debounce onChange** for frequent updates
2. **Use React.memo** for wrapper components
3. **Lazy load** the editor component when needed
4. **Optimize images** before uploading

## 🤝 Support

- 📖 **Full Documentation**: [akhlaq-digital-editor.vercel.app/docs/npm](https://akhlaq-digital-editor.vercel.app/docs/npm)
- 🎯 **Live Demo**: [akhlaq-digital-editor.vercel.app/example](https://akhlaq-digital-editor.vercel.app/example)
- 📧 **Email**: akhlaqdigital@gmail.com

## 📄 License

MIT License

---

Made with ❤️ by [Akhlaq Digital](https://akhlaq-digital-editor.vercel.app)
