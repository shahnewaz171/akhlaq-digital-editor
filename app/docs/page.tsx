import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import { DocsNavigation } from "@/components/docs-navigation";
import { DocsFooter } from "@/components/docs-footer";
import { getBreadcrumbListSchema } from "@/utils/meta-data";

export const metadata: Metadata = {
  title: "Complete Documentation",
  description:
    "Comprehensive guide covering all features, extensions, APIs, and advanced usage patterns for Akhlaq Digital Editor. From basic setup to expert customization.",
  keywords: [
    "documentation",
    "rich text editor guide",
    "tiptap tutorial",
    "react editor documentation",
    "javascript editor guide",
    "editor features",
    "api reference",
    "customization guide",
  ],
  openGraph: {
    title: "Complete Documentation - Akhlaq Digital Editor",
    description:
      "Comprehensive guide covering all features, extensions, APIs, and advanced usage patterns for Akhlaq Digital Editor.",
    url: "https://akhlaq-digital-editor.vercel.app/docs",
  },
};

const FullDocumentationPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              📖 Complete Documentation
            </h1>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-3xl leading-relaxed">
              Comprehensive guide covering all features, extensions, APIs, and
              advanced usage patterns for Akhlaq Digital Editor. From basic
              setup to expert customization.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <DocsNavigation />

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Getting Started */}
          <section
            id="getting-started"
            className="mb-12 sm:mb-16 content-with-sticky-nav"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
              🚀 Getting Started
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold mr-3 flex-shrink-0">
                    1
                  </span>
                  Choose Your Installation
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm sm:text-base">
                      NPM Package
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      For React, Vue, Angular, or any JavaScript framework
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-2 sm:p-3 rounded text-xs sm:text-sm mt-2 overflow-x-auto">
                      npm install @akhlaqdigital/editor
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 text-sm sm:text-base">
                      CDN Script
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      For vanilla JavaScript or quick prototyping
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-2 sm:p-3 rounded text-xs sm:text-sm mt-2 overflow-x-auto">
                      <code className="break-all">
                        &lt;script
                        src=&quot;https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js&quot;&gt;&lt;/script&gt;
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-green-100 text-green-600 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold mr-3 flex-shrink-0">
                    2
                  </span>
                  Basic Implementation
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded text-xs sm:text-sm overflow-x-auto">
                  <pre className="text-xs sm:text-sm">
                    <code>{`// React
import { Editor } from '@akhlaqdigital/editor';

<Editor 
  content="<p>Hello World!</p>"
  onChange={(html) => console.log(html)}
  placeholder="Start typing..."
/>`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3 text-sm sm:text-base">
                Quick Links
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <Link
                  href="/docs/npm"
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer text-sm sm:text-base p-2 rounded hover:bg-blue-100 transition-colors"
                >
                  📦 NPM Guide →
                </Link>
                <Link
                  href="/docs/cdn"
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer text-sm sm:text-base p-2 rounded hover:bg-blue-100 transition-colors"
                >
                  🌐 CDN Guide →
                </Link>
                <Link
                  href="/example"
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer text-sm sm:text-base p-2 rounded hover:bg-blue-100 transition-colors"
                >
                  🎯 Live Demo →
                </Link>
              </div>
            </div>
          </section>

          {/* Features */}
          <section
            id="features"
            className="mb-12 sm:mb-16 content-with-sticky-nav"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
              ✨ Core Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">📝</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Rich Text Editing
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Complete WYSIWYG editor with formatting, lists, headings, and
                  more.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">📋</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Tables
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Insert and edit tables with resizable columns and responsive
                  design.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🖼️</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Image Upload
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Drag & drop image uploads with automatic resizing and
                  optimization.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">@</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Mentions
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  User mentions with autocomplete and customizable user lists.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">😊</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Emoji Picker
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Rich emoji selection with 9 categories: smileys, food, nature,
                  activities, travel, objects, celebrations, symbols, and flags.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🔗</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Link Management
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Easy link insertion with preview and validation.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">💾</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Auto-save
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Automatic content saving with customizable intervals.
                </p>
              </div>
            </div>
          </section>

          {/* Extensions */}
          <section
            id="extensions"
            className="mb-12 sm:mb-16 content-with-sticky-nav"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
              🔧 Extensions & Plugins
            </h2>

            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Built-in Extensions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      Text Formatting
                    </h4>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <li>• Bold, Italic, Underline, Strikethrough</li>
                      <li>• Text color and highlighting</li>
                      <li>• Font family and size</li>
                      <li>• Text alignment</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      Content Structure
                    </h4>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <li>• Headings (H1-H6)</li>
                      <li>• Paragraphs and line breaks</li>
                      <li>• Blockquotes</li>
                      <li>• Code blocks with syntax highlighting</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      Lists & Tables
                    </h4>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <li>• Bulleted and numbered lists</li>
                      <li>• Nested lists</li>
                      <li>• Responsive tables</li>
                      <li>• Table row/column operations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      Media & Links
                    </h4>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <li>• Image insertion and resizing</li>
                      <li>• File uploads</li>
                      <li>• Link creation and editing</li>
                      <li>• Embedded content</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Custom Extensions
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs sm:text-sm">
                    <code>{`import { Extension } from '@tiptap/core';

const CustomExtension = Extension.create({
  name: 'customExtension',
  
  addCommands() {
    return {
      customCommand: () => ({ commands }) => {
        // Custom command logic
        return commands.insertContent('<p>Custom content!</p>');
      },
    };
  },
  
  addKeyboardShortcuts() {
    return {
      'Mod-Shift-c': () => this.editor.commands.customCommand(),
    };
  },
});

// Use with the editor
const { editor } = useTiptapEditor({
  extensions: [CustomExtension],
  content: '<p>Hello</p>',
});`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section
            id="api-reference"
            className="mb-12 sm:mb-16 content-with-sticky-nav"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
              📚 API Reference
            </h2>

            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Editor Methods
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 sm:p-3 font-semibold text-sm sm:text-base min-w-[120px]">
                          Method
                        </th>
                        <th className="p-2 sm:p-3 font-semibold text-sm sm:text-base min-w-[100px]">
                          Parameters
                        </th>
                        <th className="p-2 sm:p-3 font-semibold text-sm sm:text-base min-w-[150px]">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm">
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          getContent()
                        </td>
                        <td className="p-2 sm:p-3">-</td>
                        <td className="p-2 sm:p-3">
                          Returns current HTML content
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          setContent(html)
                        </td>
                        <td className="p-2 sm:p-3">html: string</td>
                        <td className="p-2 sm:p-3">Sets editor content</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          focus()
                        </td>
                        <td className="p-2 sm:p-3">-</td>
                        <td className="p-2 sm:p-3">Focuses the editor</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          blur()
                        </td>
                        <td className="p-2 sm:p-3">-</td>
                        <td className="p-2 sm:p-3">
                          Removes focus from editor
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          destroy()
                        </td>
                        <td className="p-2 sm:p-3">-</td>
                        <td className="p-2 sm:p-3">Destroys editor instance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Component Props
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 sm:p-3 font-semibold text-sm sm:text-base min-w-[120px]">
                          Prop
                        </th>
                        <th className="p-2 sm:p-3 font-semibold text-sm sm:text-base min-w-[100px]">
                          Type
                        </th>
                        <th className="p-2 sm:p-3 font-semibold text-sm sm:text-base min-w-[80px]">
                          Default
                        </th>
                        <th className="p-2 sm:p-3 font-semibold text-sm sm:text-base min-w-[150px]">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm">
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          content
                        </td>
                        <td className="p-2 sm:p-3">string</td>
                        <td className="p-2 sm:p-3 font-mono">&quot;&quot;</td>
                        <td className="p-2 sm:p-3">Initial HTML content</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          onChange
                        </td>
                        <td className="p-2 sm:p-3">
                          (html: string) =&gt; void
                        </td>
                        <td className="p-2 sm:p-3 font-mono">undefined</td>
                        <td className="p-2 sm:p-3">
                          Callback when content changes
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          placeholder
                        </td>
                        <td className="p-2 sm:p-3">string</td>
                        <td className="p-2 sm:p-3 font-mono">
                          &quot;Start typing...&quot;
                        </td>
                        <td className="p-2 sm:p-3">Placeholder text</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          className
                        </td>
                        <td className="p-2 sm:p-3">string</td>
                        <td className="p-2 sm:p-3 font-mono">undefined</td>
                        <td className="p-2 sm:p-3">
                          CSS classes for the editor container
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          isAutoFocus
                        </td>
                        <td className="p-2 sm:p-3">boolean</td>
                        <td className="p-2 sm:p-3 font-mono">false</td>
                        <td className="p-2 sm:p-3">
                          Enable auto focus on editor
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          isEditable
                        </td>
                        <td className="p-2 sm:p-3">boolean</td>
                        <td className="p-2 sm:p-3 font-mono">true</td>
                        <td className="p-2 sm:p-3">
                          Enable editing capabilities
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          isShowMention
                        </td>
                        <td className="p-2 sm:p-3">boolean</td>
                        <td className="p-2 sm:p-3 font-mono">true</td>
                        <td className="p-2 sm:p-3">
                          Enable @mention functionality
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          isFileUpload
                        </td>
                        <td className="p-2 sm:p-3">boolean</td>
                        <td className="p-2 sm:p-3 font-mono">true</td>
                        <td className="p-2 sm:p-3">
                          Enable file upload features
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          isBottomToolbar
                        </td>
                        <td className="p-2 sm:p-3">boolean</td>
                        <td className="p-2 sm:p-3 font-mono">false</td>
                        <td className="p-2 sm:p-3">
                          Position toolbar at the bottom
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          acceptedFileTypes
                        </td>
                        <td className="p-2 sm:p-3">string</td>
                        <td className="p-2 sm:p-3 font-mono">&quot;*&quot;</td>
                        <td className="p-2 sm:p-3">
                          Accepted file types for upload
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          mentions
                        </td>
                        <td className="p-2 sm:p-3">
                          Array&lt;{"{id, label}"}&gt;
                        </td>
                        <td className="p-2 sm:p-3 font-mono">[]</td>
                        <td className="p-2 sm:p-3">
                          List of mentionable users
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          onInit
                        </td>
                        <td className="p-2 sm:p-3">(editor: any) =&gt; void</td>
                        <td className="p-2 sm:p-3 font-mono">undefined</td>
                        <td className="p-2 sm:p-3">
                          Callback when editor is initialized
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          handleImageInsertion
                        </td>
                        <td className="p-2 sm:p-3">function</td>
                        <td className="p-2 sm:p-3 font-mono">undefined</td>
                        <td className="p-2 sm:p-3">
                          Custom image upload handler
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          handleFilesChange
                        </td>
                        <td className="p-2 sm:p-3">function</td>
                        <td className="p-2 sm:p-3 font-mono">undefined</td>
                        <td className="p-2 sm:p-3">
                          Custom file upload handler
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 sm:p-3 font-mono text-xs sm:text-sm">
                          editor
                        </td>
                        <td className="p-2 sm:p-3">Editor</td>
                        <td className="p-2 sm:p-3 font-mono">undefined</td>
                        <td className="p-2 sm:p-3">
                          Custom Tiptap editor instance
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Formatting Commands
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      Text Style
                    </h4>
                    <div className="bg-gray-900 text-gray-100 p-2 sm:p-3 rounded text-xs sm:text-sm overflow-x-auto">
                      <pre>
                        <code>{`editor.chain().focus().toggleBold().run()
editor.chain().focus().toggleItalic().run()
editor.chain().focus().toggleUnderline().run()
editor.chain().focus().toggleStrike().run()`}</code>
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      Structure
                    </h4>
                    <div className="bg-gray-900 text-gray-100 p-2 sm:p-3 rounded text-xs sm:text-sm overflow-x-auto">
                      <pre>
                        <code>{`editor.chain().focus().toggleHeading({level: 1}).run()
editor.chain().focus().toggleBulletList().run()
editor.chain().focus().toggleOrderedList().run()
editor.chain().focus().toggleBlockquote().run()`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Customization */}
          <section
            id="customization"
            className="mb-12 sm:mb-16 content-with-sticky-nav"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
              🎨 Customization
            </h2>

            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Theme Customization
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs sm:text-sm">
                    <code>{`/* Custom CSS Variables */
:root {
  --editor-bg: #ffffff;
  --editor-text: #1a1a1a;
  --editor-border: #e2e8f0;
  --editor-focus: #3b82f6;
  --toolbar-bg: #f8fafc;
  --button-hover: #e2e8f0;
}

/* Dark theme */
[data-theme="dark"] {
  --editor-bg: #1a1a1a;
  --editor-text: #ffffff;
  --editor-border: #374151;
  --editor-focus: #60a5fa;
  --toolbar-bg: #111827;
  --button-hover: #374151;
}

.akhlaq-editor {
  background: var(--editor-bg);
  color: var(--editor-text);
  border: 1px solid var(--editor-border);
}

.akhlaq-editor:focus {
  border-color: var(--editor-focus);
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Custom Toolbar
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs sm:text-sm">
                    <code>{`import { Editor, ToolbarButton } from '@akhlaqdigital/editor';

function CustomEditor() {
  const { editor } = useTiptapEditor({...});

  return (
    <div>
      {/* Custom toolbar */}
      <div className="border-b p-2 flex gap-2">
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editor?.isActive('bold')}
        >
          Bold
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive('italic')}
        >
          Italic
        </ToolbarButton>
      </div>
      
      <Editor editor={editor} hideToolbar />
    </div>
  );
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Examples */}
          <section
            id="examples"
            className="mb-12 sm:mb-16 content-with-sticky-nav"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
              💡 Examples
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Blog Post Editor
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto">
                  <pre>
                    <code>{`function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <input
        type="text"
        placeholder="Post title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-3xl font-bold border-none outline-none mb-4"
      />
      
      <Editor
        content={content}
        onChange={setContent}
        placeholder="Write your blog post..."
        className="min-h-96"
        isFileUpload={true}
      />
      
      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
        Publish Post
      </button>
    </div>
  );
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Comment System
                </h3>
                <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto">
                  <pre>
                    <code>{`function CommentEditor({ onSubmit }) {
  const [comment, setComment] = useState('');

  return (
    <div className="border rounded-lg p-4">
      <Editor
        content={comment}
        onChange={setComment}
        placeholder="Write a comment..."
        className="min-h-24"
        isAutoFocus={false}
        isEditable={true}
        isShowMention={true}
        mentions={userList}
        isFileUpload={false}
      />
      
      <div className="flex justify-end mt-3 gap-2">
        <button 
          onClick={() => setComment('')}
          className="px-4 py-1 text-gray-600"
        >
          Cancel
        </button>
        <button 
          onClick={() => onSubmit(comment)}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section
            id="troubleshooting"
            className="mb-12 sm:mb-16 content-with-sticky-nav"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
              🔍 Troubleshooting
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-600">
                  Common Issues
                </h3>

                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-sm sm:text-base">
                      TypeScript errors
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Ensure you have the latest version which includes full
                      TypeScript definitions.
                    </p>
                    <div className="bg-gray-100 p-2 rounded text-xs sm:text-sm overflow-x-auto">
                      <code>npm update @akhlaqdigital/editor</code>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-sm sm:text-base">
                      SSR issues with Next.js
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Use dynamic imports to avoid SSR conflicts.
                    </p>
                    <div className="bg-gray-100 p-2 rounded text-xs sm:text-sm overflow-x-auto">
                      <code className="break-all">
                        const Editor = dynamic(() =&gt;
                        import(&apos;@akhlaqdigital/editor&apos;), {"{"} ssr:
                        false {"}"});
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">
                  Need Help?
                </h4>
                <p className="text-blue-700 text-xs sm:text-sm mb-3">
                  If you&apos;re still experiencing issues, check out these
                  resources:
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <Link
                    href="mailto:akhlaqdigital@gmail.com"
                    className="text-blue-600 hover:text-blue-800 block cursor-pointer"
                  >
                    📧 Email Support
                  </Link>
                  <Link
                    href="/example"
                    className="text-blue-600 hover:text-blue-800 block cursor-pointer"
                  >
                    🎯 Live Examples
                  </Link>
                  <Link
                    href="/docs/npm"
                    className="text-blue-600 hover:text-blue-800 block cursor-pointer"
                  >
                    📦 NPM Guide
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <DocsFooter />
      </div>

      {/* schema */}
      <Script id="breadcrumb-schema" type="application/ld+json">
        {getBreadcrumbListSchema()}
      </Script>
    </>
  );
};

export default FullDocumentationPage;
