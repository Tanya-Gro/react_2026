import type { Card } from 'app';

type TableHeader = {
  label: string;
  key: keyof Card;
  className: string;
};

export const TABLE_HEADERS: readonly TableHeader[] = [
  { label: 'Name', key: 'name', className: 'p-3.5 w-2/6' },
  { label: 'Gender', key: 'gender', className: 'p-3.5 w-1/6' },
  { label: 'Height', key: 'height', className: 'p-3.5 w-1/6' },
  { label: 'Mass', key: 'mass', className: 'p-3.5 w-1/6' },
  { label: 'Hair Color', key: 'hair_color', className: 'p-3.5 w-1/6' },
];
