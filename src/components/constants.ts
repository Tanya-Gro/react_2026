import type { Card } from '@/app/types';

type TableHeader = {
  key: keyof Card;
  className: string;
};

export const TABLE_HEADERS: readonly TableHeader[] = [
  { key: 'name', className: 'p-3.5 w-2/6' },
  { key: 'gender', className: 'p-3.5 w-1/6' },
  { key: 'height', className: 'p-3.5 w-1/6' },
  { key: 'mass', className: 'p-3.5 w-1/6' },
  { key: 'hair_color', className: 'p-3.5 w-1/6' },
];
