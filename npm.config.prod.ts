import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const config = () =>
  defineConfig({
    mode: "production",
    plugins: [react(), cssInjectedByJsPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "lib/npm/index.ts"),
        name: "AkhlaqDigitalEditor",
        fileName: () => "editor.production.js",
      },
      outDir: "npm/cjs/prod",
      minify: "terser", // Switch to terser for better compression
      target: ["es2015", "chrome79", "firefox72", "safari13"],
      sourcemap: false,
      reportCompressedSize: true,
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react-dom/client",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "ReactJsxRuntime",
            "react-dom/client": "ReactDOMClient",
          },
          exports: "named",
          compact: true,
          // Additional compression
          inlineDynamicImports: true,
        },
        treeshake: {
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false,
          // More aggressive tree shaking
          moduleSideEffects: false,
        },
        // Suppress non-critical warnings
        onwarn(warning, warn) {
          if (warning.code === "THIS_IS_UNDEFINED") return;
          warn(warning);
        },
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  });

export default config;
