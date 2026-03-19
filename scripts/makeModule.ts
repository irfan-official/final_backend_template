import fs from "fs";
import path from "path";

const fileNames = [
  "controller",
  "service",
  "route",
  "validations",
  "interface",
  "utils",
];

const moduleName = process.argv[2];
const moduleParameter = process.argv[3];

if (!moduleName) {
  console.log("❌ Please provide module name");
  process.exit(1);
}

// ✅ regex validation
const validNameRegex = /^[a-z][a-zA-Z0-9_-]*$/;

if (!validNameRegex.test(moduleName)) {
  console.log("❌ Invalid module name");
  console.log("👉 Use: lowercase start, no spaces, only letters/numbers/_/-");
  process.exit(1);
}

const modulesDir = path.join(__dirname, "../src/app/modules");

// 🔑 normalize function
const normalize = (str: string) => str.toLowerCase().replace(/[-_]/g, "");

// 🔑 levenshtein distance
const levenshteinDistance = (a: string, b: string): number => {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0),
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
};

// 🔑 similarity %
const getSimilarity = (a: string, b: string): number => {
  const normA = normalize(a);
  const normB = normalize(b);

  const distance = levenshteinDistance(normA, normB);
  const maxLen = Math.max(normA.length, normB.length);

  return (1 - distance / maxLen) * 100;
};

// ✅ check existing modules
const existingModules = fs.existsSync(modulesDir)
  ? fs.readdirSync(modulesDir)
  : [];

// ❌ exact match
if (existingModules.includes(moduleName)) {
  console.log("❌ Module already exists");
  process.exit(1);
}

if (moduleParameter !== "-f" && moduleParameter !== "-F") {
  // ❌ fuzzy match (60%)
  for (const existing of existingModules) {
    const similarity = getSimilarity(moduleName, existing);

    if (similarity >= 60) {
      console.log(
        `❌ Module name too similar to "${existing}" (${similarity.toFixed(2)}%)`,
      );
      process.exit(1);
    }
  }
}

// ✅ create folder
const basePath = path.join(modulesDir, moduleName);
fs.mkdirSync(basePath, { recursive: true });

// 🔤 capitalize
const capitalized = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

// 🔑 content generator
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
// import auth from "../../middlewares/auth";

const router = Router();

// router.use(auth());

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

// 🚀 create files
for (const type of fileNames) {
  const file = `${moduleName}.${type}.ts`;

  fs.writeFileSync(path.join(basePath, file), getFileContent(type));
}

const pluralizeWord = (word: string): string => {
  const lower = word.toLowerCase();

  // already plural (basic safe check)
  if (lower.endsWith("s")) return word;

  // irregulars
  const irregulars: Record<string, string> = {
    person: "people",
    man: "men",
    woman: "women",
    child: "children",
  };

  if (irregulars[lower]) return irregulars[lower];

  // category → categories
  if (lower.endsWith("y") && !/[aeiou]y$/.test(lower)) {
    return word.slice(0, -1) + "ies";
  }

  // box → boxes
  if (/(s|x|z|ch|sh)$/.test(lower)) {
    return word + "es";
  }

  return word + "s";
};

const toKebabCase = (str: string): string => {
  let newStr = str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();

    if(process.argv.includes("-np") || process.argv.includes("-e")){
      return newStr
    }

  return pluralizeWord(newStr);
};

const updateRoutesIndex = () => {
  const routesPath = path.join(__dirname, "../src/app/routes/index.ts");

  if (!fs.existsSync(routesPath)) {
    console.log("⚠️ routes/index.ts not found");
    return;
  }

  let fileContent = fs.readFileSync(routesPath, "utf-8");

  const capitalized = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

  const routePath = toKebabCase(moduleName);

  const importStatement = `import ${capitalized}Routes from "../modules/${moduleName}/${moduleName}.route";`;

  const routeObject = `  {
    path: "/${routePath}",
    route: ${capitalized}Routes,
  },`;

  // ✅ Prevent duplicate import
  if (fileContent.includes(importStatement)) {
    console.log("⚠️ Route already registered (import exists)");
    return;
  }

  // ✅ 1. Insert import after last import
  const importRegex = /import .* from .*;\n/g;
  const imports = fileContent.match(importRegex);

  if (imports && imports.length > 0) {
    const lastImport = imports[imports.length - 1];

    fileContent = fileContent.replace(
      lastImport,
      lastImport + importStatement + "\n",
    );
  } else {
    console.log("⚠️ No import section found");
    return;
  }

  // ✅ 2. Insert into moduleRoutes array
  const moduleRoutesRegex = /const moduleRoutes = \[[\s\S]*?\];/;
  const match = fileContent.match(moduleRoutesRegex);

  if (!match) {
    console.log("⚠️ moduleRoutes array not found");
    return;
  }

  const existingBlock = match[0];

  // ✅ Prevent duplicate route (use kebab-case!)
  if (existingBlock.includes(`path: "/${routePath}"`)) {
    console.log("⚠️ Route already exists in moduleRoutes");
    return;
  }

  // ✅ Insert before closing ]
  const updatedBlock = existingBlock.replace(/\]\s*;/, `${routeObject}\n];`);

  fileContent = fileContent.replace(existingBlock, updatedBlock);

  // ✅ Write back
  fs.writeFileSync(routesPath, fileContent);

  console.log(`✅ Route "/${routePath}" registered successfully`);
};

updateRoutesIndex();

console.log(`✅ ${moduleName} module created successfully`);
