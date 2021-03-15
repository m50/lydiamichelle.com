import slugify from 'slugify';

export const slug = (i: string) => slugify(i, { lower: true, strict: true, locale: 'en' });
export const isClientSide = (): boolean => typeof window !== 'undefined';
export const isProduction = (): boolean => process.env.CONTEXT === 'production';
export const isDeployed = (): boolean => !!process.env.NETLIFY;
