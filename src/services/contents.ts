import fs from "fs";
import { join } from "path";
import YAML from "js-yaml";

import { CATEGORIES } from "../data/schema";

import type { Schema } from "../data/schema";

type Category = (typeof CATEGORIES)[number];
type Entry = Schema["items"][number] & { category: Category };

const ALL_ITEMS: Record<string, Entry> = {};

const getItem = (category: Category): Schema => {
  const path = join(process.cwd(), "src", "data", `${category}.yaml`);
  const contents = fs.readFileSync(path, "utf-8");
  const item = YAML.load(contents) as Schema;

  for (const [domain, content] of Object.entries(item.items)) {
    ALL_ITEMS[domain] = { ...content, category };
  }

  return item;
};

const ITEMS: Record<Category, Schema> = {
  affiliate: getItem("affiliate"),
  curation: getItem("curation"),
  "machine-translation": getItem("machine-translation"),
  meta: getItem("meta"),
  news: getItem("news"),
  spammer: getItem("spammer"),
  username: getItem("username"),
};

const toWildcardDomain = (domain: string, category: Category): string[] => {
  if (category === "username") {
    return [`*://*/${domain}`, `*//*/${domain}/*`];
  }

  return [`*://${domain}/*`];
};

const getCategoryItems = (category: Category | "all"): string[] => {
  if (category === "all") {
    return Object.entries(ITEMS).flatMap(([k, v]) =>
      Object.keys(v.items).flatMap((w) => toWildcardDomain(w, k as Category))
    );
  }

  const item = ITEMS[category];
  return Object.keys(item.items).flatMap((w) => toWildcardDomain(w, category));
};

const getDescriptionByCategory = (category: Category): string => {
  return ITEMS[category].description;
};

const findByDomain = (domain: string): Entry => {
  return ALL_ITEMS[domain];
};

const getConfiguration = (): Omit<Schema, "items">[] => {
  return Object.values(ITEMS);
};

export {
  getCategoryItems,
  getConfiguration,
  getDescriptionByCategory,
  findByDomain,
};
export type { Category };
