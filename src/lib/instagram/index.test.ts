import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { isSeries } from 'collections/series/Series';
import { getInstagramData } from 'lib/instagram';
import mockData from './__mock.json';

const server = setupServer(
  rest.get('https://www.instagram.com/graphql/query/', (req, res, ctx) => res(
    ctx.json(mockData),
  )),
);

describe('instagram', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('returns Series', async () => {
    const ret = await getInstagramData();

    expect(isSeries(ret)).toBe(true);
    expect(ret.images.length).toBeGreaterThan(0);
  });
});
