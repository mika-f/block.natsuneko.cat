// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { items } from "./_contents";

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { category } = req.query;
  if (!category || Array.isArray(category)) {
    res.status(404).send("Not found");
    return;
  }

  const domains = Object.keys(items);
  const contents: string[] = [];

  for (const domain of domains) {
    const { category: cat } = items[domain];
    if (category === "all.txt") {
      if (cat === "username") {
        contents.push(`*://*/${domain}`);
        contents.push(`*://*/${domain}/*`);
      } else {
        contents.push(`*://${domain}/*`);
      }
    } else if (`${cat}.txt` === category) {
      if (cat === "username") {
        contents.push(`*://*/${domain}`);
        contents.push(`*://*/${domain}/*`);
      } else {
        contents.push(`*://${domain}/*`);
      }
    }
  }

  res.status(200).send(contents.join("\r\n"));
}
