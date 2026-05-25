import type { Card } from 'app';

export const downloadCards = (selectedCards: [string, Card][]): string => {
  const SEPARATOR = '\n-----------------\n';
  const csvHeader =
    'ID, Name, Image URL, Height, Mass, Hair color, Skin, Eye color, Birth year, Gender:' +
    SEPARATOR;

  const csvRows = selectedCards
    .map(
      ([id, card]) =>
        `ID: ${id}, Name: ${card.name}, Image URL: ${card.url}, Height: ${card.height}, Mass: ${card.mass}, Hair color: ${card.hair_color}, Skin: ${card.skin_color}, Eye color: ${card.eye_color}, Birth year: ${card.birth_year}, Gender: ${card.gender}`
    )
    .join(SEPARATOR);

  const csvContent = csvHeader + csvRows;

  const blob = new Blob([csvContent], { type: 'text/csv' });

  return URL.createObjectURL(blob);
};
