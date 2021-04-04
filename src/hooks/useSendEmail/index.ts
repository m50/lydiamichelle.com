/* eslint-disable no-console */
import { useCallback } from 'react';
import { isProduction } from 'lib/helpers';
import { url } from 'pages/api/email';
import { Body, Values } from './types';
import { requestConstants } from './constants';
import { buildBody } from './util';

const useSendEmail = () => {
  const request = useCallback((body: Body): Promise<Response> => fetch(url, {
    ...requestConstants,
    body: JSON.stringify(body),
  }), []);

  return useCallback(async (values: Values): Promise<boolean> => {
    if (!process.env.MAILER_SEND_KEY) {
      console.log('No send key provided');
      return false;
    }

    try {
      const body = buildBody(values.email, values.name, values);

      const response = await request(body);

      if (response.status >= 300) {
        throw await response.json();
      }

      return true;
    } catch (err) {
      if (!isProduction()) {
        console.error('Error in request: ', err);
      }
      return false;
    }
  }, []);
};

export default useSendEmail;
