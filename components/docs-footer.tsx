import React from "react";
import Link from "next/link";

export const DocsFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-2xl font-bold">📝 Akhlaq Digital Editor</div>
          <p className="text-gray-400 max-w-2xl">
            A powerful, modern rich text editor for React applications and
            vanilla JavaScript. Built with ProseMirror and Tiptap.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link
              href="mailto:akhlaqdigital@gmail.com"
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              📧 Support
            </Link>
            <Link
              href="https://npmjs.com/package/@akhlaqdigital/editor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              📦 NPM Package
            </Link>
            <Link
              href="/docs"
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              📚 Documentation
            </Link>
          </div>
          <div className="border-t border-gray-700 pt-4 w-full">
            <p className="text-gray-500 text-sm">
              © {currentYear} Akhlaq Digital. All rights reserved. Made with ❤️
              for developers worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
