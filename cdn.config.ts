import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import fs from "fs";

// Read version from package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8")
);
const PACKAGE_VERSION = packageJson.version;

export default defineConfig({
  mode: "production",
  plugins: [
    react({
      jsxImportSource: "react",
    }),
    cssInjectedByJsPlugin({
      topExecutionPriority: false,
      relativeCSSInjection: true,
    }),
    // Custom plugin to copy TypeScript definitions
    {
      name: "copy-types",
      writeBundle() {
        const srcPath = path.resolve(__dirname, "npm/ad-editor.d.ts");
        const destPath = path.resolve(__dirname, "dist/ad-editor.d.ts");
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log("✅ TypeScript definitions copied to dist/");
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/cdn/index.tsx"),
      name: "AkhlaqDigitalEditor",
      fileName: () => "ad-editor.js",
      formats: ["iife"],
    },
    outDir: "dist",
    minify: "esbuild",
    target: ["es2015", "chrome79", "firefox72", "safari13"],
    sourcemap: false,
    reportCompressedSize: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        exports: "default",
        extend: true,
        banner: `/*! Akhlaq Digital Editor - CDN Bundle v${PACKAGE_VERSION} */`,
        format: "iife",
        compact: true,
        manualChunks: undefined,
      },
      treeshake: {
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": JSON.stringify({ NODE_ENV: "production" }),
    process: JSON.stringify({ env: { NODE_ENV: "production" } }),
    global: "globalThis",
    Buffer: "undefined",
    __PACKAGE_VERSION__: JSON.stringify(PACKAGE_VERSION),
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
