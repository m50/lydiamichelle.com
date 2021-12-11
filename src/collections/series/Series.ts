export interface Paths {
  original: string;
  full?: string;
  half?: string;
}

export interface ImageInfo {
  title: string;
  medium: string;
  blurb?: string | null;
  wip: boolean;
  image: Paths;
  extLink?: string | null;
}

export interface Series {
  title: string;
  slug: string;
  excerpt: string;
  // eslint-disable-next-line camelcase
  date_published: string;
  published: boolean;
  body: string;
  images: ImageInfo[];
}

export const isSeries = (obj: any): obj is Series => typeof obj.title !== 'undefined'
    && typeof obj.excerpt !== 'undefined'
    && typeof obj.date_published !== 'undefined'
    && typeof obj.published !== 'undefined'
    && typeof obj.slug !== 'undefined'
    && typeof obj.body !== 'undefined';
