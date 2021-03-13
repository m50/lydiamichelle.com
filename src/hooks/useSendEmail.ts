/* eslint-disable camelcase */
import { useCallback, useState } from 'react';

interface Values {
  medium: string;
  type: string;
  size: string;
  email: string;
  name: string;
  valueOptions: string;
  extraInfo: string;
  totalPrice: number;
}

const endPoint = 'https://api.mailersend.com/v1/email';
const email = process.env.NODE_ENV === 'production' ? 'lydiamb0925@gmail.com' : 'marisa@clardy.eu';

interface Substitution {
  var: string;
  value: string;
}

interface Body {
  reply_to: {
    name: string;
    email: string;
  };
  to: {
    name: string;
    email: string;
  };
  template_id: string;
  variables: {
    email: string;
    substitutions: Substitution[];
  }
}

const request = (body: Body): Promise<Response> => fetch(endPoint, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MAILER_SEND_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const useSendEmail = () => {
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const sendEmail = useCallback(async (values: Values): Promise<boolean> => {
    try {
      const body = {
        to: {
          email,
          name: 'Lydia Michelle Clardy',
        },
        reply_to: {
          email: fromEmail,
          name: fromName,
        },
        template_id: 'pr9084zdejgw63dn',
        variables: {
          email,
          substitutions: Object.entries(values)
            .map(([key, value]) => ({ var: key, value })),
        },
      };
      console.log(body);

      if (typeof process.env.MAILER_SEND_KEY === 'undefined') {
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
  }, [fromName, fromEmail]);

  return { sendEmail, setFromName, setFromEmail };
};

export default useSendEmail;
