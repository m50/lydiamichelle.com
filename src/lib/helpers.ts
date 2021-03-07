/* eslint-disable import/prefer-default-export */
import slugify from 'slugify';

export const slug = (i: string) => slugify(i, { lower: true, strict: true, locale: 'en' });
export const isClientSide = (): boolean => typeof window !== 'undefined';
export const isProduction = (): boolean => process.env.NODE_ENV === 'production';
