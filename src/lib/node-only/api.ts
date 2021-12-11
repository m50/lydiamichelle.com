import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { ImageInfo, isSeries, Series } from 'collections/series/Series';
import { promisify } from 'util';
import { Commission, isCommission } from 'collections/commissions/Commission';
import { isDeployed } from 'lib/helpers';
import { seriesDir, commissionsDir } from '../constants';
import { optimizeImage } from './optimize';

interface UnsettledImageInfo {
  wip: boolean;
  title: string;
  medium: string;
  image: string;
}

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

/*
 * Series API
 */
let seriesCache: Series[] = [];
export const getSeriesSlugs = () => readdir(seriesDir)
  .then((files) => files.filter((fileName) => fileName.endsWith('.md')));
export async function getSeriesBySlug(slug: string): Promise<Series> {
  const cacheIndex = seriesCache.findIndex((s) => s.slug === slug);
  if (cacheIndex >= 0) {
    return seriesCache[cacheIndex];
  }

  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(seriesDir, `${realSlug}.md`);
  const fileContents = await readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  data.body = content;
  data.slug = realSlug;
  if (typeof data.date_published !== 'string') {
    data.date_published = data.date_published.toDateString();
  }

  data.images = await Promise.all(
    data.images.map(async (i: UnsettledImageInfo | ImageInfo): Promise<ImageInfo> => {
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
    }),
  );

  data.images = data.images.map((i: ImageInfo): ImageInfo => ({
    ...i,
    blurb: i.blurb ?? null,
    extLink: i.extLink ?? null,
  }));

  if (!isSeries(data)) {
    throw new Error(`series undetermined . ${JSON.stringify(data)}`);
  }

  seriesCache.push(data);

  return data;
}
export async function getAllSeries() {
  if (seriesCache.length >= (await getSeriesSlugs()).length) {
    return seriesCache;
  }
  const slugs = await getSeriesSlugs();
  const seriesPromises = slugs
    .map(async (slug) => getSeriesBySlug(slug));

  const series = (await Promise.all(seriesPromises))
    .filter((s) => s.published)
    .sort((series1, series2) => (new Date(series1.date_published) > new Date(series2.date_published) ? -1 : 1));

  seriesCache = series;

  return series;
}

/*
 * Commissions API
 */
let commissionCache: Commission[] = [];
export const getCommissionSlugs = async () => readdir(commissionsDir)
  .then((files) => files.filter((fileName) => fileName.endsWith('.json')));
export const getCommissionBySlug = async (slug: string): Promise<Commission | null> => {
  const cacheIndex = commissionCache.findIndex((s) => s.slug === slug);
  if (cacheIndex >= 0) {
    return commissionCache[cacheIndex];
  }

  const realSlug = slug.replace(/\.json$/, '');
  const fullPath = join(commissionsDir, `${realSlug}.json`);
  const fileContents = await readFile(fullPath, 'utf8');
  const data = JSON.parse(fileContents);
  data.slug = realSlug;

  if (!isCommission(data)) {
    throw new Error(`commission undetermined . ${JSON.stringify(data, null, 2)}`);
  }

  if (!data.open && isDeployed()) {
    return null;
  }

  commissionCache.push(data);

  return data;
};
export const getAllCommissions = async () => {
  if (commissionCache.length >= (await getCommissionSlugs()).length) {
    return commissionCache;
  }
  const slugs = await getCommissionSlugs();
  commissionCache = (await Promise.all(
    slugs.map(async (slug) => getCommissionBySlug(slug)),
  )).filter((c) => c !== null) as Commission[];

  return commissionCache;
};
