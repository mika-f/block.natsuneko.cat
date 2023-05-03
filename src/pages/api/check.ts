// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

import type { NextApiRequest, NextApiResponse } from "next";
import type { Schema } from "../../../schema/schema";

const json = path.join(process.cwd(), "src", "data", "contents.json");

const { blockings: items } = JSON.parse(
  fs.readFileSync(json, "utf-8")
) as Schema;

type Data = {
  domain: string;
  category: string;
  reasons: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { domain } = req.query;
  if (!domain || Array.isArray(domain)) {
    res.status(404).json({
      domain: "unknown",
      category: "unknown",
      reasons: [],
    });
    return;
  }

  const item = items[domain];
  if (item) {
    res.status(200).json({
      domain,
      category: item.category,
      reasons: item.reasons,
    });
  }

  res.status(404).json({
    domain: "unknown",
    category: "unknown",
    reasons: [],
  });
}
