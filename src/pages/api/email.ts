import type { NextApiRequest, NextApiResponse } from 'next';
import { requestConstants } from 'hooks/useSendEmail/constants';
import { Body } from 'hooks/useSendEmail/types';

export const url = '/api/email';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body: Body = req.body as Body;
  const endPoint = 'https://api.mailersend.com/v1/email';
  const response = await fetch(endPoint, {
    ...requestConstants,
    body: JSON.stringify(body),
  });

  res.status(response.status)
    .end(await response.text());
};
