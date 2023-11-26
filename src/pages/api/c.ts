import { getConfiguration } from "../../services/contents";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  category: string;
  description: string;
}[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const c = getConfiguration();

  res
    .status(200)
    .json(c.map((w) => ({ category: w.name, description: w.description })));
}
