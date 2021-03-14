/* eslint-disable camelcase */
import { Body, Values } from './types';
import { to, template_id, email } from './constants';

export const buildBody = (fromEmail: string, fromName: string, values: Values): Body => {
  const attachments = [];
  if (values.imageData) {
    attachments.push({
      content: values.imageData.base64,
      filename: values.imageData.name,
    });
  }
  return {
    to,
    reply_to: {
      email: fromEmail,
      name: fromName,
    },
    template_id,
    variables: [
      {
        email,
        substitutions: Object.entries(values)
          .map(([k, value]) => ({ var: k, value: `<span>${String(value)}</span>` })),
      },
    ],
    attachments,
  };
};
