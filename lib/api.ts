
import * as fs from 'fs';
import { join } from 'path';
import * as matter from 'gray-matter';
import { isSeries, Series } from '../types/Series';

const seriesDirectory = join(process.cwd(), 'static', 'series');

export const getSeriesSlugs = () => fs.readdirSync(seriesDirectory);

export function getSeriesBySlug(slug: string): Series {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(seriesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  data.body = content;
  data.slug = realSlug;

  if (!isSeries(data)) {
    throw new Error('series undetermined . ' + JSON.stringify(data));
  }

  return data;
}

export function getAllseries() {
  const slugs = getSeriesSlugs();
  const series = slugs
    .map((slug) => getSeriesBySlug(slug))
    // sort series by date in descending order
    .sort((post1, post2) => (post1.date_published > post2.date_published ? -1 : 1));

  return series;
}
