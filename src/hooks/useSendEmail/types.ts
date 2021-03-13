/* eslint-disable camelcase */
export interface Substitution {
  var: string;
  value: string;
}

export interface Body {
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

