import fs from "fs";
import path from "path";

/* =======================
   CONFIG
======================= */

const fileNames = [
  "controller",
  "service",
  "route",
  "validations",
  "interface",
  "utils",
];

const moduleName = process.argv[2];

/* =======================
   VALIDATION
======================= */

if (!moduleName) {
  console.log("❌ Please provide module name");
  process.exit(1);
}

const validNameRegex = /^[a-z][a-zA-Z0-9_-]*$/;

if (!validNameRegex.test(moduleName)) {
  console.log("❌ Invalid module name");
  console.log("👉 Use: lowercase start, no spaces, only letters/numbers/_/-");
  process.exit(1);
}

/* =======================
   HELPERS
======================= */

const pluralizeWord = (word: string): string => {
  const lower = word.toLowerCase();

  if (lower.endsWith("s")) return word;

  const irregulars: Record<string, string> = {
    person: "people",
    man: "men",
    woman: "women",
    child: "children",
  };

  if (irregulars[lower]) return irregulars[lower];

  if (lower.endsWith("y") && !/[aeiou]y$/.test(lower)) {
    return word.slice(0, -1) + "ies";
  }

  if (/(s|x|z|ch|sh)$/.test(lower)) {
    return word + "es";
  }

  return word + "s";
};

const toKebabCase = (str: string): string => {
  const base = str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();

  // flags: -np (no plural) OR -e (exact)
  if (process.argv.includes("-np") || process.argv.includes("-e")) {
    return base;
  }

  return pluralizeWord(base);
};

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/* =======================
   MODULE EXIST CHECK
======================= */

const modulesDir = path.join(__dirname, "../src/app/modules");

const existingModules = fs.existsSync(modulesDir)
  ? fs.readdirSync(modulesDir)
  : [];

if (existingModules.includes(moduleName)) {
  console.log("❌ Module already exists");
  process.exit(1);
}

/* =======================
   CREATE MODULE FILES
======================= */

const basePath = path.join(modulesDir, moduleName);
fs.mkdirSync(basePath, { recursive: true });

const capitalized = capitalize(moduleName);

const getFileContent = (type: string): string => {
  switch (type) {
    case "controller":
      return `
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import * as ${capitalized}Service from "./${moduleName}.service";

export const get${capitalized} = catchAsync(async (req: Request, res: Response) => {
  const result = await ${capitalized}Service.get${capitalized}(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "${moduleName} retrieved successfully",
    data: result,
  });
});
`.trim();

    case "service":
      return `
/* eslint-disable @typescript-eslint/no-explicit-any */

export const get${capitalized} = async (payload: any) => {
  return payload;
};
`.trim();

    case "route":
      return `
import { Router } from "express";
import * as ${capitalized}Controller from "./${moduleName}.controller";

const router = Router();

router.get("/", ${capitalized}Controller.get${capitalized});

export default router;
`.trim();

    case "validations":
      return `
import { z } from "zod";

export const get${capitalized}Schema = z.object({
  query: z.object({}).optional(),
});
`.trim();

    case "interface":
      return ``;

    case "utils":
      return `
export const ${moduleName}Utils = {};
`.trim();

    default:
      return "";
  }
};

// create files
for (const type of fileNames) {
  const file = `${moduleName}.${type}.ts`;
  fs.writeFileSync(path.join(basePath, file), getFileContent(type));
}

/* =======================
   UPDATE ROUTES INDEX
======================= */

const updateRoutesIndex = () => {
  const routesPath = path.join(__dirname, "../src/app/routes/index.ts");

  if (!fs.existsSync(routesPath)) {
    console.log("⚠️ routes/index.ts not found");
    return;
  }

  let fileContent = fs.readFileSync(routesPath, "utf-8");

  const routePath = toKebabCase(moduleName);

  const importStatement = `import ${capitalized}Routes from "../modules/${moduleName}/${moduleName}.route";`;

  const routeObject = `  {
    path: "/${routePath}",
    route: ${capitalized}Routes,
  },`;

  // ❌ duplicate import
  if (fileContent.includes(importStatement)) {
    console.log("⚠️ Route already registered (import exists)");
    return;
  }

  /* ===== INSERT IMPORT (robust) ===== */
  const lines = fileContent.split("\n");

  let lastImportIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("import")) {
      lastImportIndex = i;
    }
  }

  if (lastImportIndex === -1) {
    console.log("⚠️ No import section found");
    return;
  }

  lines.splice(lastImportIndex + 1, 0, importStatement);

  fileContent = lines.join("\n");

  /* ===== INSERT ROUTE ===== */
  const moduleRoutesRegex = /const moduleRoutes = \[[\s\S]*?\];/;
  const match = fileContent.match(moduleRoutesRegex);

  if (!match) {
    console.log("⚠️ moduleRoutes array not found");
    return;
  }

  const existingBlock = match[0];

  if (existingBlock.includes(`path: "/${routePath}"`)) {
    console.log("⚠️ Route already exists in moduleRoutes");
    return;
  }

  const updatedBlock = existingBlock.replace(
    /\]\s*;/,
    `${routeObject}\n];`
  );

  fileContent = fileContent.replace(existingBlock, updatedBlock);

  fs.writeFileSync(routesPath, fileContent);

  console.log(`✅ Route "/${routePath}" registered successfully`);
};

/* =======================
   RUN
======================= */

updateRoutesIndex();

console.log(`✅ ${moduleName} module created successfully`);