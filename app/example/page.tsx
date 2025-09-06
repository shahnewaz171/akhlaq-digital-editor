import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import AppEditor from "@/components/tiptap-templates";
import { DocsFooter } from "@/components/docs-footer";

export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "Experience the power of Akhlaq Digital Editor in action. Try all the features, formatting options, and see how it works in a real application.",
  keywords: [
    "live demo",
    "interactive editor",
    "try editor",
    "editor playground",
    "rich text demo",
    "online editor",
    "test editor",
    "editor preview",
  ],
  openGraph: {
    title: "Live Demo - Akhlaq Digital Editor",
    description:
      "Experience the power of Akhlaq Digital Editor in action. Try all the features, formatting options, and see how it works in a real application.",
    url: "https://akhlaq-digital-editor.vercel.app/example",
  },
};

export default function Demo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎯 Live Demo
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-6">
              Experience the power of Akhlaq Digital Editor in action. Try all
              the features, formatting options, and see how it works in a real
              application.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/docs"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
              >
                📖 Documentation
              </Link>
              <Link
                href="/docs/npm"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
              >
                📦 Installation Guide
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b bg-gray-50 px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Interactive Editor Demo
            </h2>
            <p className="text-gray-600">
              Start typing, format text, add images, create tables, and explore
              all the rich text editing features.
            </p>
          </div>

          <div className="p-6">
            <AppEditor />
          </div>
        </div>

        {/* Features Showcase */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              ✨ Rich Formatting
            </h3>
            <p className="text-gray-600 text-sm">
              Bold, italic, underline, strikethrough, code, and more formatting
              options at your fingertips.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              📊 Advanced Features
            </h3>
            <p className="text-gray-600 text-sm">
              Tables, lists, blockquotes, code blocks, links, and image support
              for comprehensive content creation.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              🎨 Customizable
            </h3>
            <p className="text-gray-600 text-sm">
              Highly customizable interface with themes, extensions, and
              configuration options for every use case.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to integrate?</h3>
          <p className="mb-6 opacity-90">
            Get started with Akhlaq Digital Editor in your project today. Choose
            your preferred installation method.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs/npm"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
            >
              NPM Installation →
            </Link>
            <Link
              href="/docs/cdn"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors cursor-pointer"
            >
              CDN Setup →
            </Link>
          </div>
        </div>
      </div>

      <DocsFooter />
    </div>
  );
}
