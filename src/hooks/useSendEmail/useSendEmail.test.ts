/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';
import { endPoint } from './constants';
import useSendEmail from './index';
import { Values } from './types';

const server = setupServer(
  rest.post(endPoint, (req, res, ctx) => res(ctx.status(204))),
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
  beforeAll(() => {
    if (process.env.MAILER_SEND_KEY) {
      delete process.env.MAILER_SEND_KEY;
    }
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('fails if key not set', async () => {
    console.log = jest.fn();
    const { result } = renderHook(() => useSendEmail());
    const sendEmail = result.current;
    const res = await sendEmail(mockData);
    expect(res).toBe(false);
    expect(console.log).toHaveBeenCalledWith('No send key provided');
  });

  it('succeeds', async () => {
    console.log = jest.fn();
    process.env.MAILER_SEND_KEY = 'sadasd';
    const { result } = renderHook(() => useSendEmail());
    const sendEmail = result.current;
    const res = await sendEmail(mockData);
    expect(res).toBe(true);
    expect(console.log).not.toHaveBeenCalledWith('No send key provided');
  });
});
