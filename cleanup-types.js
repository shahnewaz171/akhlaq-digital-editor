const { join } = require("path");
const {
  writeFileSync,
  readFileSync,
  readdirSync,
  statSync,
  existsSync,
} = require("fs");

// Function to recursively find all .d.ts files
function findTypeFiles(dir) {
  const files = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findTypeFiles(fullPath));
    } else if (item.endsWith(".d.ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to transform @/ paths to relative paths
function transformTypeFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  const npmDir = join(__dirname, "npm");

  // Replace @/ with relative paths based on the file location
  const transformed = content.replace(/@\//g, (match, offset) => {
    // Get the directory depth from npm root
    const relativePath = filePath.replace(npmDir, "");
    const depth =
      relativePath.split("/").filter((part) => part && part !== ".").length - 1;

    // Create relative path back to npm root
    const backPath = depth > 0 ? "../".repeat(depth) : "./";
    return backPath;
  });

  if (content !== transformed) {
    writeFileSync(filePath, transformed, "utf8");
  }
}

// Create the main type definition file with correct imports
const mainContent = `import AppEditor from "./components/tiptap-templates";
export type { SimpleEditorProps } from "./components/tiptap-node/types";
export { AppEditor as SimpleEditor };
export { AppEditor };
export default AppEditor;
`;

const npmDir = join(__dirname, "npm");
writeFileSync(join(npmDir, "ad-editor.d.ts"), mainContent, "utf8");

// Fix all type files in the npm directory
if (existsSync(npmDir)) {
  const typeFiles = findTypeFiles(npmDir);
  typeFiles.forEach(transformTypeFile);
}

console.log("✅ Type definitions fixed!");
