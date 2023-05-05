import fs from "fs";
import { join } from "path";
import YAML from "js-yaml";

import type { Schema } from "../../data/schema";

const path = join(process.cwd(), "src", "data", "items.yaml");
const contents = fs.readFileSync(path, "utf-8");
const { blockings: items } = YAML.load(contents) as Schema;

export { items };
