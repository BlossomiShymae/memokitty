import fs from "fs/promises";

/**
 * Represents a template engine that processes templates into a single source file.
 */
export class TemplateEngine {
  constructor({ suffix, sourcePath, filePaths }) {
    this.suffix = suffix;
    this.sourceFile = sourcePath;
    this.files = filePaths;
  }

  /**
   * Process file templates into document source file.
   */
  process = async () => {
    let buffer = "";
    let endBuffer = "";

    for (const file of this.files) {
      let _buffer = "";
      // Ignore unneeded module templates
      if (file.includes("index")) continue;

      const data = await fs.readFile(file, { encoding: "utf8" });
      const lines = data.toString().split("\n");

      for (const line of lines) {
        // Skip import lines
        if (/\bimport\b.*\bfrom\b/g.exec(line)) continue;
        // Slice out export statements
        if (line.includes("export const") || line.includes("export class")) {
          _buffer += line.slice(7);
          _buffer += "\n";
          continue;
        }
        _buffer += line;
        _buffer += "\n";
      }

      // Prepend userscript metadata block to document
      if (file.includes("metadata")) buffer = _buffer + buffer;
      // Append IIFE to document
      else if (file.includes("main")) endBuffer = _buffer;
      else buffer += _buffer;
    }

    buffer += endBuffer;
    await fs.writeFile(this.sourceFile, buffer, { encoding: "utf8" });
  };
}
