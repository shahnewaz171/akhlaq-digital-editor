import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [react(), cssInjectedByJsPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
    build: {
      emptyOutDir: true,
      outDir: "npm",
      copyPublicDir: false,
      lib: {
        entry: path.resolve(__dirname, "lib/npm/index.ts"),
        name: "AkhlaqDigitalEditor",
        fileName: (format) => `ad-editor.${format}.js`,
        formats: ["es", "cjs"],
      },
      minify: isProd ? "terser" : false,
      target: ["es2020", "chrome80", "firefox78", "safari14"],
      reportCompressedSize: isProd,
      sourcemap: !isProd,
      terserOptions: isProd
        ? {
            compress: {
              drop_debugger: true,
              passes: 2,
              pure_getters: true,
              keep_fargs: false,
            },
            mangle: {
              safari10: true,
            },
            format: {
              comments: false,
            },
          }
        : undefined,
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react-dom/client",
        ],
        output: {
          exports: "named",
          compact: isProd,
          inlineDynamicImports: isProd,
          ...(isProd && {
            generatedCode: {
              arrowFunctions: true,
              constBindings: true,
              objectShorthand: true,
            },
            manualChunks: undefined,
          }),
        },
        treeshake: isProd
          ? {
              propertyReadSideEffects: false,
              unknownGlobalSideEffects: false,
            }
          : false,
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode || "development"),
    },
    esbuild: {
      legalComments: isProd ? "none" : "inline",
    },
  };
});
