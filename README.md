# 📝 Akhlaq Digital Editor

<div align="center">

![Editor Preview](https://akhlaq-digital-editor.vercel.app/editor-preview.svg)

**A modern, powerful rich text editor for React and vanilla JavaScript**

[![npm version](https://badge.fury.io/js/@akhlaqdigital%2Feditor.svg)](https://badge.fury.io/js/@akhlaqdigital%2Feditor)
[![Downloads](https://img.shields.io/npm/dm/@akhlaqdigital/editor.svg)](https://npm-stat.com/charts.html?package=@akhlaqdigital/editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[📖 **Documentation**](https://akhlaq-digital-editor.vercel.app/docs) · [🎯 **Live Demo**](https://akhlaq-digital-editor.vercel.app/example) · [📧 **Support**](mailto:akhlaqdigital@gmail.com)

</div>

## ✨ Why Choose This Editor?

- ⚡ **Lightning Fast** - Optimized performance with minimal bundle size
- 🎨 **Beautiful by Default** - Modern, clean UI that works out of the box
- 📱 **Mobile First** - Touch-optimized interface for all devices
- 🔧 **Easy Integration** - Works with React, Next.js, Vue, or vanilla JS
- 🔒 **Type Safe** - Full TypeScript support
- 🌐 **Dual Distribution** - NPM package + CDN for maximum flexibility

## 🚀 Quick Start

### NPM Installation (React)

```bash
npm install @akhlaqdigital/editor
```

```jsx
import { SimpleEditor } from "@akhlaqdigital/editor";

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

### CDN Usage (Vanilla JS)

```html
<div id="editor" style="height: 400px;"></div>

<script src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"></script>
<script>
  const editor = window.AkhlaqDigitalEditor.init({
    container: "#editor",
    placeholder: "Start typing...",
    content: "<p>Welcome!</p>",
    onChange: (content) => console.log(content),
  });
</script>
```

## 📖 Documentation

| Resource               | Description                      | Link                                                            |
| ---------------------- | -------------------------------- | --------------------------------------------------------------- |
| 📚 **Complete Guide**  | Full documentation with examples | [View Docs →](https://akhlaq-digital-editor.vercel.app/docs)    |
| ⚛️ **React/NPM Guide** | React integration guide          | [NPM Docs →](https://akhlaq-digital-editor.vercel.app/docs/npm) |
| 🌐 **CDN/Vanilla JS**  | Vanilla JavaScript guide         | [CDN Docs →](https://akhlaq-digital-editor.vercel.app/docs/cdn) |
| 🎯 **Live Demo**       | Interactive playground           | [Try Demo →](https://akhlaq-digital-editor.vercel.app/example)  |

## 📦 Core Features

- 📝 **Rich Text Editing** - Bold, italic, headers, lists, and more
- 📷 **Image Support** - Drag & drop images with resizing
- 😊 **Emoji Picker** - Categorized emoji selection
- 👥 **Mentions** - @user functionality with suggestions
- 📎 **File Upload** - Drag & drop file handling
- 📊 **Tables** - Full table editing capabilities
- 💻 **Code Blocks** - Syntax highlighted code
- 📱 **Mobile Responsive** - Touch-optimized interface

## ⚙️ Configuration Options

| Prop            | Type       | Default                     | Description             |
| --------------- | ---------- | --------------------------- | ----------------------- |
| `content`       | `string`   | `null`                      | Initial HTML content    |
| `onChange`      | `function` | `() => {}`                  | Content change callback |
| `placeholder`   | `string`   | `"Enter your content here"` | Placeholder text        |
| `height`        | `number`   | `300`                       | Editor height in pixels |
| `isEditable`    | `boolean`  | `true`                      | Enable/disable editing  |
| `isShowMention` | `boolean`  | `true`                      | Enable @mentions        |
| `isShowEmoji`   | `boolean`  | `true`                      | Enable emoji picker     |
| `isFileUpload`  | `boolean`  | `true`                      | Enable file uploads     |

## 🎨 Styling

Easily customize the editor appearance:

```css
.simple-editor-wrapper {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.simple-editor-content {
  min-height: 200px;
  padding: 16px;
}
```

## 🤝 Support

- 📧 **Email**: akhlaqdigital@gmail.com
- 📖 **Documentation**: [akhlaq-digital-editor.vercel.app/docs](https://akhlaq-digital-editor.vercel.app/docs)
- 🎯 **Demo**: [akhlaq-digital-editor.vercel.app/example](https://akhlaq-digital-editor.vercel.app/example)

## 📄 License

MIT License

---

Made with ❤️ by [Akhlaq Digital](https://akhlaq-digital-editor.vercel.app)

<div align="center">
  <small>Built on top of <a href="https://tiptap.dev">Tiptap</a></small>
</div>
