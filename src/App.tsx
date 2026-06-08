import { useState, type JSX } from 'react';
import { Header, Footer } from 'layouts';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import type { Card, Form } from 'src/types';
import type { RootState } from './app/store';
import {
  CardItem,
  ControlledForm,
  ModalOverlay,
  UncontrolledForm,
} from 'components';

export const App = (): JSX.Element => {
  const [formType, setFormType] = useState<Form>(null);

  const cards: Card[] = useSelector((state: RootState) => state.cards.items);

  const handleClick = (type: Form): void => {
    setFormType(type);
  };

  const handleCloseForm = (): void => {
    setFormType(null);
  };

  return (
    <>
      <Header onButtonClick={handleClick} />
      <main className="flex-1 bg-gray-300">
        <div className="flex gap-3 p-4 justify-center">
          {cards.map((card) => (
            <CardItem key={card.name + card.email} card={card} />
          ))}
        </div>
      </main>

      {formType &&
        createPortal(
          <ModalOverlay onClose={handleCloseForm}>
            {formType === 'controlled' ? (
              <ControlledForm onSuccess={handleCloseForm} />
            ) : (
              <UncontrolledForm onSuccess={handleCloseForm} />
            )}
          </ModalOverlay>,
          document.body,
        )}

      <Footer />
    </>
  );
};
