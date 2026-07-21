import {
  selectedCardsReducer,
  toggleCard,
  clearCards,
  type CardState,
} from 'features';
import { people } from 'mocks';

describe('selectedCardsSlice', () => {
  const mockCard = people.results[0];

  const initialState: CardState = {
    items: {},
  };

  it('should return the default state when an empty action is passed', () => {
    const result = selectedCardsReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it("should add a card to the state if it doesn't exist (toggleCard)", () => {
    const action = toggleCard({ id: '1', card: mockCard });
    const nextState = selectedCardsReducer(initialState, action);

    expect(nextState.items['1']).toEqual(mockCard);
    expect(Object.keys(nextState.items).length).toBe(1);
  });

  it('should mark removed card in state if it already exists (toggleCard) as undefined', () => {
    const stateWithCard: CardState = {
      items: {
        '1': mockCard,
      },
    };

    const action = toggleCard({ id: '1', card: mockCard });
    const nextState = selectedCardsReducer(stateWithCard, action);

    expect(nextState.items['1']).toBeUndefined();
    expect(Object.keys(nextState.items).length).toBe(1);
  });

  it('should completely clear all selected cards (clearCards)', () => {
    const dirtyState: CardState = {
      items: {
        '1': mockCard,
      },
    };

    const nextState = selectedCardsReducer(dirtyState, clearCards());

    expect(nextState.items).toEqual({});
    expect(Object.keys(nextState.items).length).toBe(0);
  });
});
