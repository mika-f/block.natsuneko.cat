// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { items } from "./_contents";

import type { NextApiRequest, NextApiResponse } from "next";

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
    return;
  }

  res.status(404).json({
    domain: "unknown",
    category: "unknown",
    reasons: [],
  });
}
