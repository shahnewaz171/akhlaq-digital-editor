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
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, "lib/cdn/index.tsx"),
        name: "AkhlaqDigitalEditor",
        fileName: () => "ad-editor.js",
      },
      rollupOptions: {
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          exports: "named",
        },
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  });

export default config;
