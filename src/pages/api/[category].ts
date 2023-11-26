// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCategoryItems } from "../../services/contents";

import type { NextApiRequest, NextApiResponse } from "next";
import type { Category } from "../../services/contents";

// /[category]?level=[level]
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { category, level } = req.query;

  if (!category || Array.isArray(category) || Array.isArray(level)) {
    res.status(404).send("Not found");
    return;
  }

  const contents: string[] = [];

  if (category === "all.txt") {
    contents.push(...getCategoryItems("all"));
  } else {
    contents.push(
      ...getCategoryItems(
        category.substring(0, category.length - ".txt".length) as Category
      )
    );
  }

  res.status(200).send(contents.join("\r\n"));
}
