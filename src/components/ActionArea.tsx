type ActionAreaProps = {
  onThrowError: () => void;
};

export const ActionArea = ({
  onThrowError,
}: ActionAreaProps): React.JSX.Element => {
  return (
    <div className="p-4 flex justify-end bg-mist-50 border-t-2 border-t-mist-300">
      <button
        name="throw-error-button"
        onClick={onThrowError}
        className="bg-mauve-300 hover:bg-mauve-400 cursor-pointer rounded h-10 w-30 border border-mist-500"
      >
        Throw Error
      </button>
    </div>
  );
};
