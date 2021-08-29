import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = decodeURIComponent((req.query as any).img as string);
  const img = await fetch(url);

  console.log(res);

  res
    .setHeader('content-type', img.headers.get('content-type') as string)
    .setHeader('cache-control', img.headers.get('cache-control') as string)
    .setHeader('last-modified', img.headers.get('last-modified') as string)
    .setHeader('cross-origin-resource-policy', img.headers.get('cross-origin-resource-policy') as string);

  res.status(img.status)
    .end(new Uint8Array(await img.arrayBuffer()));
};
