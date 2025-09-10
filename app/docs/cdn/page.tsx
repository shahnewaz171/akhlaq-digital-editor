import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { DocsFooter } from "@/components/docs-footer";

export const metadata: Metadata = {
  title: "CDN Documentation",
  description:
    "Get started with Akhlaq Digital Editor using our CDN for vanilla JavaScript projects. Perfect for quick prototyping or adding rich text editing to any website.",
  keywords: [
    "cdn integration",
    "vanilla javascript",
    "script tag",
    "browser editor",
    "html integration",
    "jsdelivr",
    "web components",
    "quick setup",
  ],
  openGraph: {
    title: "CDN Documentation - Akhlaq Digital Editor",
    description:
      "Get started with Akhlaq Digital Editor using our CDN for vanilla JavaScript projects. Perfect for quick prototyping or adding rich text editing to any website.",
    url: "https://akhlaq-digital-editor.vercel.app/docs/cdn",
  },
};

const CDNDocumentationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            📦 CDN Documentation
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Get started with Akhlaq Digital Editor using our CDN for vanilla
            JavaScript projects. Perfect for quick prototyping or adding rich
            text editing to any website.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🚀 Quick Start
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              1. Include CSS and Script
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`<!-- Include editor styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/styles.css">

<!-- Include editor script -->
<script src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"></script>`}</pre>
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-6">
              2. Create HTML Container
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`<div id="editor-container"></div>`}</pre>
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-6">
              3. Initialize the Editor
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`<script>
  // Wait for the CDN to load
  function onCDNLoaded() {
    const editor = window.AkhlaqDigitalEditor.init({
      container: '#editor-container',
      placeholder: 'Start typing...',
      onChange: (content) => {
        console.log('Content changed:', content);
      }
    });
  }
</script>`}</pre>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            ⚙️ Configuration Options
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 font-semibold">Option</th>
                    <th className="p-3 font-semibold">Type</th>
                    <th className="p-3 font-semibold">Default</th>
                    <th className="p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="p-3 font-mono">container</td>
                    <td className="p-3">string</td>
                    <td className="p-3 font-mono">required</td>
                    <td className="p-3">
                      CSS selector for the container element
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">content</td>
                    <td className="p-3">string | null</td>
                    <td className="p-3 font-mono">null</td>
                    <td className="p-3">Initial HTML content</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">placeholder</td>
                    <td className="p-3">string</td>
                    <td className="p-3 font-mono">
                      &quot;Start typing...&quot;
                    </td>
                    <td className="p-3">
                      Placeholder text when editor is empty
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">onChange</td>
                    <td className="p-3">function</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">Callback when content changes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">isAutoFocus</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 font-mono">false</td>
                    <td className="p-3">Enable auto focus on editor</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">isEditable</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 font-mono">true</td>
                    <td className="p-3">Enable editing capabilities</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">isRefreshEditor</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 font-mono">false</td>
                    <td className="p-3">
                      Force remount editor when dependencies change
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">isShowMention</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 font-mono">true</td>
                    <td className="p-3">Enable @mention functionality</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">isFileUpload</td>
                    <td className="p-3 font-mono">boolean</td>
                    <td className="p-3 font-mono">true</td>
                    <td className="p-3">Enable file upload features</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">isShowEmoji</td>
                    <td className="p-3 font-mono">boolean</td>
                    <td className="p-3 font-mono">true</td>
                    <td className="p-3">
                      Enable emoji picker with categorized emojis
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">isBottomToolbar</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 font-mono">false</td>
                    <td className="p-3">Position toolbar at the bottom</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">height</td>
                    <td className="p-3">number</td>
                    <td className="p-3 font-mono">300</td>
                    <td className="p-3">
                      Initial height of the editor in pixels
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">acceptedFileTypes</td>
                    <td className="p-3">string</td>
                    <td className="p-3 font-mono">&quot;*&quot;</td>
                    <td className="p-3">Accepted file types for upload</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">mentions</td>
                    <td className="p-3">Array&lt;{"{id, label}"}&gt;</td>
                    <td className="p-3 font-mono">[]</td>
                    <td className="p-3">List of mentionable users</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">className</td>
                    <td className="p-3">string</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">
                      CSS classes for the editor container
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">onInit</td>
                    <td className="p-3">function</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">Callback when editor is initialized</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">onDestroy</td>
                    <td className="p-3">function</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">Callback when editor is destroyed</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">handleImageInsertion</td>
                    <td className="p-3">function</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">Custom image upload handler</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">handleFilesChange</td>
                    <td className="p-3">function</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">Custom file upload handler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Advanced Example */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🔧 Advanced Example
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`<!DOCTYPE html>
<html>
<head>
  <title>My Editor App</title>
</head>
<body>
  <div id="my-editor"></div>

  <script src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"></script>
  <script>
    function onCDNLoaded() {
      const editor = window.AkhlaqDigitalEditor.init({
        container: '#my-editor',
        content: '<h1>Welcome!</h1><p>Start writing...</p>',
        placeholder: 'Type your content here...',
        isAutoFocus: false,
        isEditable: true,
        isShowMention: true,
        isShowEmoji: true,
        isFileUpload: true,
        mentions: [
          { id: 1, label: 'John Doe' },
          { id: 2, label: 'Jane Smith' }
        ],
        onChange: (content) => {
          // Save content to localStorage
          localStorage.setItem('editorContent', content);
        },
        onInit: (instance) => {
          console.log('Editor initialized:', instance);
        }
      });
    }
  </script>
</body>
</html>`}</pre>
            </div>
          </div>
        </section>

        {/* Styling Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🎨 Styling & CSS
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">CSS Classes</h3>
            <p className="text-gray-600 mb-4">
              The editor uses scoped CSS classes with the{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">akd-</code> prefix
              to avoid conflicts:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">.akd</code> -
                Main editor container with all core styles
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">
                  .dropdown-menu
                </code>{" "}
                - Dropdown menus for mentions and tools
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">
                  .tableWrapper
                </code>{" "}
                - Table container for responsive table handling
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Custom Styling</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`/* Custom editor container */
.akd {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
}

/* Focus state */
.akd:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Dark theme example */
.akd.dark-theme {
  background: #1a1a1a;
  color: #ffffff;
  border-color: #374151;
}

/* Custom mention styling */
.mention {
  background: #3b82f6;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}`}</pre>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            📚 API Reference
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Global Methods</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-mono text-lg">
                  window.AkhlaqDigitalEditor.init(options)
                </h4>
                <p className="text-gray-600">
                  Initializes a new editor instance with the given options.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-mono text-lg">editor.getContent()</h4>
                <p className="text-gray-600">
                  Returns the current HTML content of the editor.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-mono text-lg">editor.setContent(html)</h4>
                <p className="text-gray-600">
                  Sets the editor content to the provided HTML.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-mono text-lg">editor.destroy()</h4>
                <p className="text-gray-600">
                  Cleans up and destroys the editor instance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Demo Link */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🎯 Try It Live
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-lg mb-4">
              See the CDN version in action with our interactive demo.
            </p>
            <Link
              href="/example"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow cursor-pointer"
            >
              View Live Demo →
            </Link>
          </div>
        </section>
      </div>

      <DocsFooter />
    </div>
  );
};

export default CDNDocumentationPage;
