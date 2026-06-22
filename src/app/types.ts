export type Url = {
  readonly characters: string;
  readonly RSS: string;
  readonly GitHub: string;
  readonly details: string;
};

export type Card = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  url: string;
  created: string;
  edited: string;
};

export type DataType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Card[];
};

export type DataArgs = {
  search?: string;
  details?: string;
  page?: string | number;
};

export type Details = {
  id: number;
  name: string;
  height: number;
  mass: number;
  gender: string;
  homeworld: string;
  wiki: string;
  image: string;
  born: number;
  bornLocation?: string;
  died?: number;
  diedLocation?: string;
  dateCreated?: number;
  dateDestroyed?: number;
  destroyedLocation?: string;
  creator?: string;
  manufacturer?: string;
  model?: string;
  productLine?: string;
  class?: string;
  species: string;
  hairColor?: string;
  eyeColor?: string;
  skinColor: string;
  cybernetics?: string;
  sensorColor?: string;
  platingColor?: string;
  equipment?: string[] | string;
  affiliations: string[];
  formerAffiliations: string[];
  masters?: string[] | string;
  apprentices?: string[];
};
