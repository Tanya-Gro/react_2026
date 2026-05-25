import type { Card } from 'app';

export const downloadCards = (selectedCards: [string, Card][]): string => {
  const csvHeader = 'id,name,imageURL\n';

  const csvRows = selectedCards
    .map(([id, card]) => `${id},"${card.name}","${card.url}"`)
    .join('\n');

  const csvContent = csvHeader + csvRows;

  const blob = new Blob([csvContent], { type: 'text/csv' });

  return URL.createObjectURL(blob);
};
