import { Component, type ReactNode } from 'react';
import type { Card } from '../app/';
import { getID } from '../helpers';

type DataProps = {
  cards: Card[];
};
export class ResultsArea extends Component<DataProps> {
  render(): ReactNode {
    const { cards } = this.props;
    return (
      <div className="flex flex-col gap-2 p-4 bg-mist-100 flex-1">
        {cards.map((card) => (
          <p key={getID(card.url)}>Card: {card.name}</p>
        ))}
      </div>
    );
  }
}
