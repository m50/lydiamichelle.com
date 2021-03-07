export interface Price {
  title: string;
  value: string;
}

export interface WorkSize {
  title: string;
  prices: Price[];
}

export interface AdditionalInfo {
  title: string;
  body: string;
}

export interface Commission {
  title: string;
  type: string;
  slug: string;
  additionalInfo: AdditionalInfo;
  workSizes: WorkSize[];
}

export const isCommission = (obj: any): obj is Commission => typeof obj.title === 'string'
    && typeof obj.slug === 'string'
    && typeof obj.additionalInfo === 'object'
    && typeof obj.additionalInfo?.title === 'string'
    && typeof obj.additionalInfo?.body === 'string'
    && Array.isArray(obj.workSizes);
