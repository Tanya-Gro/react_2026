import type { Card } from 'app/types';

const escapeCSV = (value: string): string => `"${value.replaceAll('"', '""')}"`;

export const getBlob = (selectedCards: [string, Card][]): Blob => {
  const csvMap: Record<string, keyof Card> = {
    Name: 'name',
    'Image URL': 'url',
    Height: 'height',
    Mass: 'mass',
    'Hair Color': 'hair_color',
    'Skin Color': 'skin_color',
    'Eye Color': 'eye_color',
    'Birth Year': 'birth_year',
    Gender: 'gender',
  };

  const keys = Object.values(csvMap);

  const csvContent = [
    ['ID', ...Object.keys(csvMap)].join(','),
    ...selectedCards.map(([id, details]) =>
      [id, ...keys.map((key) => escapeCSV(String(details[key])))].join(','),
    ),
  ].join('\n');

  const blob = new Blob(['\uFEFF', csvContent], {
    type: 'text/csv;charset=utf-8',
  });

  return blob;
};
