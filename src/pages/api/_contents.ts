import fs from "fs";
import { join } from "path";
import YAML from "js-yaml";

import { Schema } from "../../../schema/schema";

const path = join(process.cwd(), "src", "data", "contents.yaml");
const contents = fs.readFileSync(path, "utf-8");
const { blockings: items } = YAML.load(contents) as Schema;

export { items };
