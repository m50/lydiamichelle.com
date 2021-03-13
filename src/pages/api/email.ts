import type { NextApiRequest, NextApiResponse } from 'next';
import { requestConstants } from 'hooks/useSendEmail/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const endPoint = 'https://api.mailersend.com/v1/email';
  const response = await fetch(endPoint, {
    ...requestConstants,
    body: JSON.stringify(req.body),
  });

  res.status(response.status)
    .end(await response.text());
};
