import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const content = `'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/prod/editor.production.js');
} else {
  module.exports = require('./cjs/dev/editor.development.js');
}
`;

writeFileSync(join(__dirname, "npm", "ad-editor.js"), content, "utf8");
