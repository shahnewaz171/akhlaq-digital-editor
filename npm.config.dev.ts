import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const config = () =>
  defineConfig({
    mode: "development",
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
        fileName: () => "editor.development.js",
      },
      outDir: "npm/cjs/dev",
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
        },
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("development"),
    },
  });

export default config;
