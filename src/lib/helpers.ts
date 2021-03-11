export const isClientSide = (): boolean => typeof window !== 'undefined';
export const isProduction = (): boolean => process.env.NODE_ENV === 'production';
