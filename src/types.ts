export const FORMS = ['controlled', 'uncontrolled', null] as const;

export type Form = (typeof FORMS)[number];

export type Card = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  picture: string;
};
