import type { Card, RootState } from 'app';
import { getBlob } from 'helpers';
import { useDispatch, useSelector } from 'react-redux';
import { clearCards } from 'features';

export const Flyout = (): React.JSX.Element | null => {
  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.items,
  );

  const cards = Object.entries(selectedCards).filter(
    (entry): entry is [string, Card] => entry[1] !== undefined,
  );
  const countCards = cards.length;

  if (countCards === 0) {
    return null;
  }

  const handleUnselectAllButtonClick = () => {
    dispatch(clearCards());
  };

  const handleDownloadButtonClick = () => {
    const blob = getBlob(cards);
    const url = URL.createObjectURL(blob);

    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.download = `selected_cards_${countCards.toString()}_items.csv`;

    tempLink.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <details
      name="selected-cards"
      className="fixed bottom-19.5 left-4 z-50 min-w-60 rounded-xl border bg-mauve-200 shadow-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex cursor-pointer select-none items-center justify-between gap-3 py-2 px-4 font-medium text-mist-800 rounded-tl-xl rounded-tr-xl hover:bg-mauve-300 hover:rounded-bl-xl hover:rounded-br-xl">
        <span className="flex items-center justify-center text-lg">
          Selected items :
        </span>
        <span className="flex h-6 w-6 items-center justify-center text-xl">
          {countCards}
        </span>
        <span className="text-xl text-mist-500 transition-transform duration-200 parent-open:rotate-180">
          ▼
        </span>
      </summary>

      <div className="border-t border-mist-200 p-4 bg-mist-50 rounded-b-xl">
        <ul className="flex items-center gap-3 justify-end">
          <li>
            <button
              type="button"
              onClick={handleUnselectAllButtonClick}
              className="rounded-lg border border-mist-300 bg-white px-4 py-2 text-sm font-medium text-mist-700 shadow-sm transition hover:bg-mist-100 cursor-pointer"
            >
              Unselect all
            </button>
          </li>
          <li>
            <button
              type="button"
              className="inline-block rounded-lg bg-mauve-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-mauve-700 text-center cursor-pointer"
              onClick={handleDownloadButtonClick}
            >
              Download
            </button>
          </li>
        </ul>
      </div>
    </details>
  );
};
