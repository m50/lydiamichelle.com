import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { ImageInfo, isSeries, Series } from '../types/Series';
import { seriesDirectory } from './constants';
import { optimizeImage, mkDirs } from './optimize';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
export const getSeriesSlugs = () => fs.readdirSync(seriesDirectory);

let cache: Series[] = []

interface UnsettledImageInfo {
  wip: boolean;
  title: string;
  medium: string;
  image: string;
}

export async function getSeriesBySlug(slug: string): Promise<Series> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(seriesDirectory, `${realSlug}.md`);
  const fileContents = await readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  await mkDirs();

  data.body = content;
  data.slug = realSlug;
  if (typeof data.date_published !== 'string') {
    data.date_published = data.date_published.toDateString();
  }

  data.images = await Promise.all(data.images.map(async (i: UnsettledImageInfo|ImageInfo): Promise<ImageInfo> => {
    if (typeof i.image !== 'string') {
      return i as ImageInfo;
    }
    return {
      ...i,
      image: {
        original: i.image,
        full: await optimizeImage(i.image, 800),
        half: await optimizeImage(i.image, 400),
      },
    };
  }));


  if (!isSeries(data)) {
    throw new Error('series undetermined . ' + JSON.stringify(data));
  }

  return data;
}

export async function getAllSeries() {
  if (cache.length > 0) {
    return cache;
  }
  const slugs = await getSeriesSlugs();
  const seriesPromises = slugs
    .map(async (slug) => await getSeriesBySlug(slug));

  const series = (await Promise.all(seriesPromises))
    .sort((series1, series2) => (new Date(series1.date_published) > new Date(series2.date_published) ? -1 : 1));

  cache = series;

  return series;
}
