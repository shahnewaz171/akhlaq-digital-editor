# Akhlaq Digital Editor

It is a web application designed to provide a rich text editor experience. It integrates various Tiptap extensions for enhanced text editing capabilities, including support for mentions, images, lists, and more. The application is built using Next.js and leverages Radix UI components for dropdowns and popovers.

## 🚀 Features

- Simple JavaScript API for initializing the editor
- Auto-initialization via `data-*` attributes
- NPM support
- React-based rendering

---

## 📦 Installation (NPM)

```bash
npm install @akhlaqdigital/editor
```

### Usage

```jsx
import AppEditor from "@akhlaqdigital/editor";

<AppEditor />;
```

---

## 🌐 Usage via CDN

Add the following script to your HTML page:

```html
<script
  id="ad-editor"
  src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"
></script>
```

### Instructions:

- A `div` with the ID `ad-editor` will be created (if not already present).

---

### Component Props

Properties used to customise the rendering:

| Name                 | Type       | Default                     | Description                                                                                                                                                              |
| :------------------- | ---------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| envConfig            | object     | `-`                         | _optional_ Configuration for the CDN domain and secret keys used to generate mention images, if needed. _(**cdnDomain:** `string` = "-", **cdnSecret:** `string` = "-")_ |
| isShowMention        | bool       | `true`                      | _optional_ to enable/disable mentions feature.                                                                                                                           |
| isFileUpload         | bool       | `true`                      | _optional_ to enable or disable file upload support.                                                                                                                     |
| content              | string     | `-`                         | _optional_ Initial content for the editor.                                                                                                                               |
| className            | string     | `-`                         | _optional_ Custom CSS class for editor styling.                                                                                                                          |
| placeholder          | string     | `"Enter your content here"` | _optional_ Placeholder text inside the editor.                                                                                                                           |
| mentions             | array      | `-`                         | _optional_ List of mentionable users/items.                                                                                                                              |
| onChange             | func       | `-`                         | _optional_ Callback fired when content changes.                                                                                                                          |
| handleImageInsertion | async func | `-`                         | _optional_ Custom handler for inserting images and return image url as `string`.                                                                                         |
| handleFilesChange    | async func | `-`                         | _optional_ Async callback for handling file uploads.                                                                                                                     |

---

## 🛠 Development

Make sure you have React and ReactDOM available in your environment when developing locally.

## 📄 License

ISC
