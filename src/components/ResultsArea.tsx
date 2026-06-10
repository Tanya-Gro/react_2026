import { Detail } from 'components';
import { CharactersTable } from './CharactersTable';

export const ResultsArea = () => {
  return (
    <section className="flex flex-row gap-2 flex-1 overflow-hidden">
      <CharactersTable />
      <Detail />
    </section>
  );
};
