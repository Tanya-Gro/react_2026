import { type JSX } from 'react';
import { SearchArea, ResultsArea, ActionArea } from 'components';

export const Home = (): JSX.Element => {
  return (
    <section className="flex flex-col flex-1 overflow-hidden">
      <h1 className="text-4xl font-bold text-center p-6 text-mist-700 bg-mist-50 border-b-2 border-b-mist-300">
        Star Wars Characters
      </h1>
      <SearchArea />
      <ResultsArea />
      <ActionArea />
    </section>
  );
};
