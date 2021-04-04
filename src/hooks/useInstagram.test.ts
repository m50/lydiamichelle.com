/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';
import { url } from 'pages/api/insta';
import { Series } from 'collections/series/Series';
import useInstagram from './useInstagram';

const initialData: Series = {
  title: 'Instagram Feed',
  slug: 'instagram',
  excerpt: 'Updates that I post.',
  date_published: new Date().toDateString(),
  published: true,
  body: '',
  images: [],
};

const mockData: Series = {
  ...initialData,
  images: [
    {
      title: '',
      medium: '',
      blurb: 'some information...',
      wip: false,
      image: {
        original: 'original-path',
      },
      extLink: 'https://instagram.com/p/123456',
    },
  ],
};

const server = setupServer(
  rest.get(url, (req, res, ctx) => res(
    ctx.json(mockData),
  )),
);

describe('useInstagram()', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('gets series on load', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useInstagram(initialData));
    await waitForNextUpdate();

    expect(result.current.images.length).toBe(1);
    expect(result.current.images[0].extLink).not.toBeUndefined();
    expect(result.current).toMatchObject(mockData);
  });
});
