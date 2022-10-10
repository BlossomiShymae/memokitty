import glob from "glob-promise";
import { TemplateEngine } from "./template-engine.js";

const main = async () => {
  const suffix = ".js";
  const sourceFile = "./dist/memokitty.user.js";
  const files = await glob(`./gen/template/**/*${suffix}`);

  const engine = new TemplateEngine({
    suffix: suffix,
    filePaths: files,
    sourcePath: sourceFile,
  });
  await engine.process();
};

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
