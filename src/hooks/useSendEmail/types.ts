/* eslint-disable camelcase */
export interface Substitution {
  var: string;
  value: string;
}

interface Contact {
  name: string;
  email: string;
}

export interface Body {
  reply_to: Contact;
  to: Contact[];
  template_id: string;
  variables: {
    email: string;
    substitutions: Substitution[];
  }[];
}

export interface Values {
  medium: string;
  type: string;
  size: string;
  email: string;
  name: string;
  valueOptions: string;
  extraInfo: string;
  totalPrice: number;
}

