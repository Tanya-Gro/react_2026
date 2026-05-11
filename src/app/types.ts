export type Url = {
  readonly characters: string;
};

export type FetchError = {
  hasError: boolean;
  message: string;
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
