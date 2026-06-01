import { Flyout } from './Flyout';

type ActionAreaProps = {
  onThrowError: () => void;
  onRefresh: () => void;
};

export const ActionArea = ({
  onThrowError,
  onRefresh,
}: ActionAreaProps): React.JSX.Element => {
  return (
    <div className="p-4 flex justify-end bg-mist-50 border-t-2 border-t-mist-300 gap-x-4">
      <Flyout />
      <button
        name="refresh-button"
        onClick={onRefresh}
        className="bg-mist-300 hover:bg-mauve-300 cursor-pointer rounded h-10 w-30 border border-mist-500"
      >
        Refresh
      </button>
      <button
        name="throw-error-button"
        onClick={onThrowError}
        className="bg-mist-300 hover:bg-mauve-300 cursor-pointer rounded h-10 w-30 border border-mist-500"
      >
        Throw Error
      </button>
    </div>
  );
};
