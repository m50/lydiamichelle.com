export interface Paths {
  original: string;
  full: string;
  half: string;
}

export interface ImageInfo {
  title: string;
  medium: string;
  blurb?: string;
  wip: boolean;
  image: Paths;
}

export interface Series {
  title: string;
  slug: string;
  excerpt: string;
  date_published: string;
  published: boolean;
  body: string;
  images: ImageInfo[];
}

export const isSeries = (obj: any): obj is Series => {
  return typeof obj.title !== 'undefined' &&
    typeof obj.excerpt !== 'undefined' &&
    typeof obj.date_published !== 'undefined' &&
    typeof obj.published !== 'undefined' &&
    typeof obj.slug !== 'undefined' &&
    typeof obj.body !== 'undefined';
}
