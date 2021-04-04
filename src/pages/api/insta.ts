import type { NextApiRequest, NextApiResponse } from 'next';
import { getInstagramData } from 'lib/instagram';

export const cacheTime = 7 /** Days */
  * 24 /** Hours */
  * 60 /** minutes */
  * 60; /** seconds */

export const url = '/api/insta';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const series = await getInstagramData();

  res.setHeader('Cache-Control', `public, max-age=${cacheTime}, immutable`);
  res.status(200).end(JSON.stringify(series));
};
