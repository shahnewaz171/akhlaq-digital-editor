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
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log", "console.info", "console.warn"],
              passes: 2,
              unsafe_comps: true,
              unsafe_math: true,
              pure_getters: true,
              keep_fargs: false,
            },
            mangle: {
              safari10: true,
              properties: {
                regex: /^_/,
              },
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
            manualChunks: undefined, // Prevent code splitting
          }),
        },
        treeshake: isProd
          ? {
              moduleSideEffects: false,
              propertyReadSideEffects: false,
              unknownGlobalSideEffects: false,
              tryCatchDeoptimization: false,
            }
          : false,
        onwarn: isProd
          ? (warning: any, warn: any) => {
              const suppressedCodes = [
                "THIS_IS_UNDEFINED",
                "CIRCULAR_DEPENDENCY",
                "EVAL",
              ];
              if (suppressedCodes.includes(warning.code)) return;
              warn(warning);
            }
          : undefined,
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode || "development"),
      __DEV__: !isProd,
    },
    esbuild: {
      drop: isProd ? ["console", "debugger"] : [],
      legalComments: isProd ? "none" : "inline",
      ...(isProd && {
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
      }),
    },
    server: {
      open: true,
      port: 5173,
    },
  };
});
