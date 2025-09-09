import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { DocsFooter } from "@/components/docs-footer";

export const metadata: Metadata = {
  title: "NPM Documentation",
  description:
    "Complete guide for integrating Akhlaq Digital Editor into your React, Vue, Next.js, or any modern JavaScript project using NPM package manager.",
  keywords: [
    "npm package",
    "react integration",
    "vue integration",
    "nextjs editor",
    "javascript package",
    "typescript editor",
    "npm install",
    "package manager",
  ],
  openGraph: {
    title: "NPM Documentation - Akhlaq Digital Editor",
    description:
      "Complete guide for integrating Akhlaq Digital Editor into your React, Vue, Next.js, or any modern JavaScript project using NPM.",
    url: "https://akhlaq-digital-editor.vercel.app/docs/npm",
  },
};

const NPMDocumentationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            📦 NPM Documentation
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Complete guide for integrating Akhlaq Digital Editor into your
            React, Vue, Next.js, or any modern JavaScript project using NPM
            package manager.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🚀 Installation
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">NPM</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`npm install @akhlaqdigital/editor`}</pre>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Yarn</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`yarn add @akhlaqdigital/editor`}</pre>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">PNPM</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">{`pnpm install @akhlaqdigital/editor`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* React Usage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            ⚛️ React Usage
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Basic Implementation</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`import React, { useState } from 'react';
import { Editor } from '@akhlaqdigital/editor';

function MyEditor() {
  const [content, setContent] = useState('');

  return (
    <div>
      <Editor
        content={content}
        onChange={(html) => setContent(html)}
        placeholder="Start typing..."
        className="min-h-64"
      />
    </div>
  );
}

export default MyEditor;`}</pre>
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-6">
              Advanced Configuration
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`import React, { useState } from 'react';
import { SimpleEditor } from '@akhlaqdigital/editor';

function AdvancedEditor() {
  const [content, setContent] = useState('<h1>Welcome!</h1>');
  
  const mentions = [
    { id: 1, label: 'John Doe' },
    { id: 2, label: 'Jane Smith' }
  ];

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
    />
  );
}`}</pre>
            </div>
          </div>
        </section>

        {/* Next.js Usage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🔷 Next.js Usage
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              App Router (Recommended)
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`// app/editor/page.tsx
'use client';

import React, { useState } from 'react';
import { Editor } from '@akhlaqdigital/editor';

export default function EditorPage() {
  const [content, setContent] = useState('');

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Editor</h1>
      <Editor
        content={content}
        onChange={setContent}
        placeholder="Start writing..."
        className="min-h-96 border rounded-lg"
      />
    </main>
  );
}`}</pre>
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-6">Pages Router</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`// pages/editor.tsx
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Editor = dynamic(
  () => import('@akhlaqdigital/editor').then(mod => mod.Editor),
  { ssr: false }
);

export default function EditorPage() {
  const [content, setContent] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Editor</h1>
      <Editor
        content={content}
        onChange={setContent}
        placeholder="Start writing..."
      />
    </div>
  );
}`}</pre>
            </div>
          </div>
        </section>

        {/* Component Props */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🔧 Component Props
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 font-semibold">Prop</th>
                    <th className="p-3 font-semibold">Type</th>
                    <th className="p-3 font-semibold">Default</th>
                    <th className="p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="p-3 font-mono">content</td>
                    <td className="p-3">string</td>
                    <td className="p-3 font-mono">&quot;&quot;</td>
                    <td className="p-3">Initial HTML content</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">onChange</td>
                    <td className="p-3">(html: string) =&gt; void</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">Callback when content changes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">placeholder</td>
                    <td className="p-3">string</td>
                    <td className="p-3 font-mono">
                      &quot;Start typing...&quot;
                    </td>
                    <td className="p-3">Placeholder text</td>
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
                    <td className="p-3 font-mono">isShowMention</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 font-mono">true</td>
                    <td className="p-3">Enable @mention functionality</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">isFileUpload</td>
                    <td className="p-3">boolean</td>
                    <td className="p-3 font-mono">true</td>
                    <td className="p-3">Enable file upload features</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">isShowEmoji</td>
                    <td className="p-3">boolean</td>
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
                    <td className="p-3 font-mono">onInit</td>
                    <td className="p-3">(editor: any) =&gt; void</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">Callback when editor is initialized</td>
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
                  <tr className="border-b">
                    <td className="p-3 font-mono">editor</td>
                    <td className="p-3">Editor</td>
                    <td className="p-3 font-mono">-</td>
                    <td className="p-3">Custom editor instance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Event Handling */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            ⚡ Event Handling
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              Content Changes & Editor Ready
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`import { SimpleEditor } from '@akhlaqdigital/editor';

function MyComponent() {
  const [content, setContent] = useState('');

  const handleContentChange = (newContent) => {
    console.log('Content changed:', newContent);
    setContent(newContent);
    // Save to server or localStorage
    localStorage.setItem('editorContent', newContent);
  };

  const handleEditorReady = (editor) => {
    console.log('Editor is ready:', editor);
    // Load saved content
    const saved = localStorage.getItem('editorContent');
    if (saved) {
      editor.commands.setContent(saved);
    }
  };

  return (
    <SimpleEditor
      content={content}
      onChange={handleContentChange}
      onInit={handleEditorReady}
      placeholder="Start writing..."
    />
  );
}`}</pre>
            </div>
          </div>
        </section>

        {/* Styling */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🎨 Styling & Customization
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Custom CSS</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`/* Override editor styles */
.akhlaq-editor {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.akhlaq-editor:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Custom toolbar styling */
.akhlaq-toolbar {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 8px;
}

/* Mention styling */
.mention {
  background: #3b82f6;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}`}</pre>
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-6">
              Tailwind CSS Integration
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`<Editor
  className="
    min-h-64 
    border-2 border-gray-300 
    rounded-lg 
    focus-within:border-blue-500 
    focus-within:ring-2 
    focus-within:ring-blue-200
    p-4
  "
  content={content}
  onChange={setContent}
/>`}</pre>
            </div>
          </div>
        </section>

        {/* TypeScript */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            📘 TypeScript Support
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="mb-4">
              Akhlaq Digital Editor is built with TypeScript and provides full
              type definitions out of the box.
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>{`import React, { useState } from 'react';
import { Editor, EditorProps, MentionUser } from '@akhlaqdigital/editor';

interface MyEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
}

const MyEditor: React.FC<MyEditorProps> = ({ 
  initialContent = '', 
  onSave 
}) => {
  const [content, setContent] = useState<string>(initialContent);
  
  const mentions: MentionUser[] = [
    { id: 1, label: 'John Doe', email: 'john@example.com' },
    { id: 2, label: 'Jane Smith', email: 'jane@example.com' }
  ];

  const handleChange = (html: string) => {
    setContent(html);
    onSave?.(html);
  };

  return (
    <Editor
      content={content}
      onChange={handleChange}
      mentions={mentions}
      placeholder="Start typing..."
    />
  );
};

export default MyEditor;`}</pre>
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
              Experience the NPM version with our React demo application.
            </p>
            <Link
              href="/example"
              className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow cursor-pointer"
            >
              View React Demo →
            </Link>
          </div>
        </section>
      </div>

      <DocsFooter />
    </div>
  );
};

export default NPMDocumentationPage;
