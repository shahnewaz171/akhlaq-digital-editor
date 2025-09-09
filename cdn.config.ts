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
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "lib/cdn/index.tsx"),
      name: "AkhlaqDigitalEditor",
      fileName: () => "ad-editor.js",
      formats: ["iife"],
    },
    outDir: "dist",
    minify: "terser",
    target: ["es2015", "chrome79", "firefox72", "safari13"],
    sourcemap: false,
    reportCompressedSize: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        exports: "none",
        extend: true,
        banner: `/*! Akhlaq Digital Editor - CDN Bundle v${PACKAGE_VERSION} */`,
        format: "iife",
        compact: true,
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
      treeshake: {
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
      onwarn(warning, warn) {
        if (warning.code === "THIS_IS_UNDEFINED") return;
        warn(warning);
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    process: JSON.stringify({ env: { NODE_ENV: "production" } }),
    global: "globalThis",
    Buffer: "undefined",
    __PACKAGE_VERSION__: JSON.stringify(PACKAGE_VERSION),
  },
});
