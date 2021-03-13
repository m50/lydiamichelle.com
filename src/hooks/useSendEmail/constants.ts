/* eslint-disable camelcase */
export const endPoint = 'https://api.mailersend.com/v1/email';
export const email = process.env.NODE_ENV === 'production' ? 'lydiamb0925@gmail.com' : 'marisa@clardy.eu';
export const requestConstants = {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MAILER_SEND_KEY}`,
    'Content-Type': 'application/json',
  },
};

export const to = {
  email,
  name: 'Lydia Michelle Clardy',
};
export const template_id = 'pr9084zdejgw63dn';
