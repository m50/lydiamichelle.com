import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { ImageInfo, isSeries, Series } from '../types/Series';
import { seriesDir, commissionsDir } from './constants';
import { optimizeImage } from './optimize';
import { promisify } from 'util';
import { Commission, isCommission } from 'types/Commission';

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
let seriesCache: Series[] = []
export const getSeriesSlugs = () => fs.readdirSync(seriesDir);
export async function getSeriesBySlug(slug: string): Promise<Series> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(seriesDir, `${realSlug}.md`);
  const fileContents = await readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

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
  if (seriesCache.length > 0) {
    return seriesCache;
  }
  const slugs = await getSeriesSlugs();
  const seriesPromises = slugs
    .map(async (slug) => await getSeriesBySlug(slug));

  const series = (await Promise.all(seriesPromises))
    .sort((series1, series2) => (new Date(series1.date_published) > new Date(series2.date_published) ? -1 : 1));

  seriesCache = series;

  return series;
}

/*
 * Commissions API
 */
let commissionCache: Commission[] = [];
export const getCommissionSlugs = async () => await readdir(commissionsDir);
export const getCommissionBySlug = async (slug: string): Promise<Commission> => {
  const realSlug = slug.replace(/\.json$/, '');
  const fullPath = join(commissionsDir, `${realSlug}.json`);
  const fileContents = await readFile(fullPath, 'utf8');
  const data = JSON.parse(fileContents);
  data.slug = realSlug;

  if (!isCommission(data)) {
    throw new Error('commission undetermined . ' + JSON.stringify(data));
  }

  return data;
}
export const getAllCommissions = async () => {
  if (commissionCache.length > 0) {
    return commissionCache;
  }
  const slugs = await getCommissionSlugs();
  commissionCache = await Promise.all(
    slugs.map(async (slug) => await getCommissionBySlug(slug))
  );

  return commissionCache;
}
