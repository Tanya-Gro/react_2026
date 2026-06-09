import { type JSX } from 'react';
import type { Card } from 'src/types';

type CardItemProps = {
  card: Card;
};

export const CardItem = ({
  card: { name, age, email, gender, country, picture },
}: CardItemProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-zinc-400/60 rounded-xl shadow-md border border-gray-100 max-w-sm w-full hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4">
        {picture ? (
          <img
            src={picture}
            alt={`${name}'s preview`}
            className="w-18 h-18 rounded-full object-cover border-2 border-neutral-500 shadow-sm"
          />
        ) : (
          <div className="w-18 h-18 rounded-full bg-neutral-600 flex items-center justify-center text-gray-200 font-bold text-xl uppercase">
            {name.slice(0, 2)}
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <h3 className="text-2xl font-bold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-700">
            {age} {age === 1 ? 'year' : 'years'} old
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 text-sm text-gray-600">
        <div className="flex justify-between items-center gap-2">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="truncate max-w-50" title={email}>
            {email}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Gender:</span>
          <span className="capitalize">{gender}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Country:</span>
          <span>{country}</span>
        </div>
      </div>
    </div>
  );
};
