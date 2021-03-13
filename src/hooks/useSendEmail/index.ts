import { useCallback } from 'react';
import { Body, Values } from './types';
import { endPoint, requestConstants } from './constants';
import { buildBody } from './util';

const useSendEmail = () => {
  const request = useCallback((body: Body): Promise<Response> => fetch(endPoint, {
    ...requestConstants,
    body: JSON.stringify(body),
  }), []);

  return useCallback(async (values: Values): Promise<boolean> => {
    try {
      const body = buildBody(values.email, values.name, values);
      console.log(body);

      if (!process.env.MAILER_SEND_KEY) {
        console.log('No send key provided');
        return false;
      }
      const response = await request(body);

      return response.status < 300;
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
      return false;
    }
  }, []);
};

export default useSendEmail;
