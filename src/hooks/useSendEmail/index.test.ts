/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';
import { url } from 'pages/api/email';
import useSendEmail from './index';
import { Values } from './types';

const server = setupServer(
  rest.post(url, (req, res, ctx) => res(ctx.status(204))),
);

const mockData: Values = {
  medium: 'Oil',
  type: 'Pet Portrait',
  size: 'A4',
  name: 'Marisa',
  email: 'marisa@clardy.eu',
  valueOptions: '',
  extraInfo: '',
  totalPrice: 200,
  imageData: null,
};

describe('useSendEmail()', () => {
  const { log } = console;
  beforeAll(() => {
    if (process.env.MAILER_SEND_KEY) {
      delete process.env.MAILER_SEND_KEY;
    }
    server.listen();
    console.log = jest.fn();
  });

  afterAll(() => {
    server.close();
    console.log = log;
  });

  it('fails if key not set', async () => {
    const { result } = renderHook(() => useSendEmail());
    const sendEmail = result.current;
    const res = await sendEmail(mockData);
    expect(res).toBe(false);
    expect(console.log).toHaveBeenCalledWith('No send key provided');
  });

  it('succeeds', async () => {
    process.env.MAILER_SEND_KEY = 'sadasd';
    const { result } = renderHook(() => useSendEmail());
    const sendEmail = result.current;
    const res = await sendEmail(mockData);
    expect(res).toBe(true);
    expect(console.log).not.toHaveBeenCalledWith('No send key provided');
  });
});
