# 🌐 Akhlaq Digital Editor - CDN

**A powerful rich text editor for vanilla JavaScript and any web framework**

[📖 **Documentation**](https://akhlaq-digital-editor.vercel.app/docs/cdn) · [🎯 **Demo**](https://akhlaq-digital-editor.vercel.app/example) · [📧 **Support**](mailto:akhlaqdigital@gmail.com)

## 🚀 Quick Start

### Basic Setup

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
        onChange: (content) => {
          console.log("Content updated:", content);
        },
      });
    </script>
  </body>
</html>
```

## ⚙️ Configuration Options

### Core Options

| Option        | Type             | Default             | Description                |
| ------------- | ---------------- | ------------------- | -------------------------- |
| `container`   | `string`         | **required**        | CSS selector for container |
| `content`     | `string \| null` | `null`              | Initial HTML content       |
| `placeholder` | `string`         | `"Start typing..."` | Placeholder text           |
| `onChange`    | `function`       | `undefined`         | Content change callback    |
| `onInit`      | `function`       | `undefined`         | Editor ready callback      |

### Feature Options

| Option            | Type      | Default | Description                |
| ----------------- | --------- | ------- | -------------------------- |
| `isEditable`      | `boolean` | `true`  | Enable/disable editing     |
| `isAutoFocus`     | `boolean` | `false` | Auto focus on init         |
| `isShowMention`   | `boolean` | `true`  | Enable @mentions           |
| `isShowEmoji`     | `boolean` | `true`  | Enable emoji picker        |
| `isFileUpload`    | `boolean` | `true`  | Enable file uploads        |
| `isBottomToolbar` | `boolean` | `false` | Position toolbar at bottom |
| `height`          | `number`  | `300`   | Editor height in pixels    |

### Advanced Options

| Option                 | Type       | Default     | Description                                         |
| ---------------------- | ---------- | ----------- | --------------------------------------------------- |
| `mentions`             | `array`    | `[]`        | Mention suggestions `[{id: number, label: string}]` |
| `acceptedFileTypes`    | `string`   | `""`        | File type restrictions                              |
| `handleImageInsertion` | `function` | `undefined` | Custom image upload                                 |
| `handleFilesChange`    | `function` | `undefined` | Custom file handler                                 |

## 📝 Complete Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Advanced Editor Example</title>
    <style>
      .editor-container {
        max-width: 800px;
        margin: 20px auto;
        border: 1px solid #e1e5e9;
        border-radius: 8px;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="editor-container">
      <div id="my-editor"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"></script>
    <script>
      const editor = window.AkhlaqDigitalEditor.init({
        container: "#my-editor",
        content: "<h1>Welcome!</h1><p>Start writing your content here...</p>",
        placeholder: "Type something amazing...",
        height: 500,
        isAutoFocus: false,
        isShowMention: true,
        isShowEmoji: true,
        isFileUpload: true,
        mentions: [
          { id: 1, label: "John Doe" },
          { id: 2, label: "Jane Smith" },
          { id: 3, label: "Mike Johnson" },
        ],
        acceptedFileTypes: "image/*,.pdf,.doc,.docx",

        // Event handlers
        onChange: (content) => {
          console.log("Content changed:", content);
          localStorage.setItem("editorContent", content);
        },

        onInit: (instance) => {
          console.log("Editor initialized:", instance);
          // Load saved content
          const saved = localStorage.getItem("editorContent");
          if (saved) {
            instance.setContent(saved);
          }
        },

        // Custom upload handler
        handleImageInsertion: async ({ file, onProgress, abortSignal }) => {
          console.log("Uploading image:", file);

          // Simulate upload progress
          onProgress(25);
          await new Promise((resolve) => setTimeout(resolve, 500));
          onProgress(50);
          await new Promise((resolve) => setTimeout(resolve, 500));
          onProgress(75);
          await new Promise((resolve) => setTimeout(resolve, 500));
          onProgress(100);

          // Return image URL (replace with your upload logic)
          return "https://via.placeholder.com/400x300";
        },
      });
    </script>
  </body>
</html>
```

## 🎨 Styling

Customize the editor appearance:

```css
/* Editor wrapper */
.akhlaq-editor-wrapper {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
}

/* Content area */
.akhlaq-editor-content {
  min-height: 200px;
  padding: 16px;
  outline: none;
}

/* Toolbar */
.akhlaq-editor-toolbar {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 8px;
}

/* Custom button styles */
.akhlaq-editor-toolbar button {
  margin: 0 2px;
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
}

.akhlaq-editor-toolbar button:hover {
  background: #e9ecef;
}

.akhlaq-editor-toolbar button.active {
  background: #007bff;
  color: white;
}
```

## 🔧 API Methods

```javascript
// Initialize editor
const editor = window.AkhlaqDigitalEditor.init(config);

// Get content
const content = editor.getContent();

// Set content
editor.setContent("<p>New content</p>");

// Focus editor
editor.focus();

// Destroy editor
editor.destroy();

// Check if editor is editable
const isEditable = editor.isEditable();

// Set editable state
editor.setEditable(false);
```

## 📱 Mobile Support

The editor is fully optimized for mobile devices:

- Touch-friendly interface
- Mobile-specific context menus
- Responsive toolbar
- Virtual keyboard optimization

## 🔗 Integration Examples

### With jQuery

```javascript
$(document).ready(function () {
  const editor = window.AkhlaqDigitalEditor.init({
    container: "#editor",
    onChange: (content) => {
      $("#hidden-input").val(content);
    },
  });
});
```

### With Vue.js

```javascript
new Vue({
  el: "#app",
  data: {
    editorContent: "",
  },
  mounted() {
    this.editor = window.AkhlaqDigitalEditor.init({
      container: "#editor",
      onChange: (content) => {
        this.editorContent = content;
      },
    });
  },
});
```

### With Angular

```typescript
export class EditorComponent implements OnInit {
  private editor: any;

  ngOnInit() {
    this.editor = (window as any).AkhlaqDigitalEditor.init({
      container: "#editor",
      onChange: (content: string) => {
        console.log("Content:", content);
      },
    });
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  }
}
```

## 🤝 Support

- 📖 **Full Documentation**: [akhlaq-digital-editor.vercel.app/docs/cdn](https://akhlaq-digital-editor.vercel.app/docs/cdn)
- 🎯 **Live Demo**: [akhlaq-digital-editor.vercel.app/example](https://akhlaq-digital-editor.vercel.app/example)
- 📧 **Email**: akhlaqdigital@gmail.com

## 📄 License

MIT License

---

Made with ❤️ by [Akhlaq Digital](https://akhlaq-digital-editor.vercel.app)
