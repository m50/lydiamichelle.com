import { ImageInfo, Series } from 'collections/series/Series';
import type { InstagramResponse } from './types';

export const cache = new Map<string, ImageInfo>();
export const lastReload = { time: 0, liveFor: 30 * 60 * 1000 };

const queryHash = '69cba40317214236af40e7efa697781d';
const variables = {
  id: '5975742076',
  first: 20,
};
const uri = 'https://www.instagram.com/graphql/query/';
const cookie = 'sessionid=1052275550%3A15UW8X70BXHgXK%3A4;';

const fetchData = async () => {
  const url = `${uri}?query_hash=${queryHash}&variables=${JSON.stringify(variables)}`;
  const { data } = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cookie,
    },
  }).then((res) => res.json() as Promise<InstagramResponse>);
  const { edges } = data.user.edge_owner_to_timeline_media;
  edges?.forEach(({ node }) => {
    if (cache.has(node.id)) {
      cache.delete(node.id);
    }
    const image = {
      title: '',
      medium: '',
      blurb: (node.edge_media_to_caption.edges?.[0]?.node.text
        .replace(/\n/g, '\n\n')
        .replace(/#/, '\n\n#')) ?? null,
      wip: false,
      image: {
        original: `/api/insta/proxy?img=${encodeURIComponent(node.display_url)}`,
        full: `/api/insta/proxy?img=${encodeURIComponent(node.display_url)}`,
        half: `/api/insta/proxy?img=${encodeURIComponent(node.thumbnail_src)}`,
      },
      extLink: `https://instagram.com/p/${node.shortcode}`,
    };
    cache.set(node.id, image);
  });
};

export const getInstagramData = async (): Promise<Series> => {
  if (Date.now() - lastReload.time > lastReload.liveFor) {
    try {
      await fetchData();
    } catch (e) {
      console.log(e);
    }
    lastReload.time = Date.now();
  }

  return {
    title: 'Instagram Feed',
    slug: 'instagram',
    excerpt: 'Updates that I post.',
    date_published: new Date().toDateString(),
    published: true,
    body: '',
    images: Array.from(cache, ([, value]) => value),
  };
};
