// We need to update paths in the translation imports.
const { resolve } = require("path");
const { readdir } = require("fs").promises;
const replace = require("replace-in-file");

(async function main() {
  const files = await collectHtmlFiles();
  try {
    // Replace script files.
    await replace(options = {
      "files": files,
      "from": /"index/g,
      "to": '"../index',
    });
    // Replace other static resources.
    await replace(options = {
      "files": files,
      "from": /"znalosti/g,
      "to": '"../znalosti',
    });
  }
  catch (error) {
    console.error("Can't replace in files:", error);
    throw error;
  }
})();

async function collectHtmlFiles() {
  const result = [];
  for (const entry of await getFiles("./dist")) {
    if (!entry.name.toLowerCase().endsWith(".html")) {
      continue;
    }
    if (entry.directory === "") {
      // Ignore the root file.
      continue;
    }
    result.push(entry.path);
  }
  return result;
}

async function getFiles(dir, relativeDirectory = "") {
  let result = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      result = [
        ...result,
        ...await getFiles(fullPath, relativeDirectory + "/" + entry.name)
      ];
    } else {
      result.push({
        "path": fullPath,
        "directory": relativeDirectory,
        "name": entry.name
      });
    }
  }
  return result;
}


