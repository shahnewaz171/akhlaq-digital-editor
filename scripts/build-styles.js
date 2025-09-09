#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const sass = require("sass");

const scssFiles = [
  path.join(
    __dirname,
    "../components/tiptap-ui/table-button/table-button.scss"
  ),
  path.join(__dirname, "../components/tiptap-ui/mention-list.scss"),
];

const cssOutput = path.join(__dirname, "../dist/styles.css");
const distDir = path.dirname(cssOutput);

// Ensure dist directory exists
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// Header comment for generated CSS
const headerComment = `/* Akhlaq Digital Editor - Styles CSS */
/* Import this file in your host application to get all editor styles */
/* Generated from SCSS files - DO NOT EDIT DIRECTLY */
`;

function compileScss() {
  try {
    let combinedCss = "";

    // compile each SCSS file and combine
    scssFiles.forEach((scssFile, index) => {
      if (fs.existsSync(scssFile)) {
        const result = sass.compile(scssFile, {
          style: "compressed",
          sourceMap: false,
        });

        combinedCss += `\n/* ${path.basename(scssFile)} */\n${result.css}`;
      } else {
        console.warn(`⚠️  SCSS file not found: ${scssFile}`);
      }
    });

    fs.writeFileSync(cssOutput, headerComment + combinedCss);

    const sizeKB = (fs.statSync(cssOutput).size / 1024).toFixed(1);
    console.log(`✅ Built styles.css (${sizeKB} KB) → ${cssOutput}`);
  } catch (err) {
    console.error("❌ Error compiling SCSS:", err.message);
    if (!process.argv.includes("--watch")) process.exit(1);
  }
}

function watchScss() {
  console.log("👀 Watching SCSS files for changes...");
  compileScss();

  scssFiles.forEach((watchPath) => {
    if (!fs.existsSync(watchPath)) return;

    fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
      if (filename?.endsWith(".scss")) {
        console.log(`📝 Changed: ${filename}`);
        compileScss();
      }
    });
  });
}

// Run
if (process.argv.includes("--watch")) {
  watchScss();
} else {
  compileScss();
}
