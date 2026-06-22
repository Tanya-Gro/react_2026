import { type JSX } from 'react';
import { useFormStatus } from 'react-dom';

type SearchButtonProps = {
  buttonText: string;
  pendingText: string;
};

export const SearchButton = ({
  buttonText,
  pendingText,
}: SearchButtonProps): JSX.Element => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-mist-300 hover:bg-mist-400 disabled:bg-mist-200 cursor-pointer disabled:cursor-not-allowed rounded h-8 w-30 border border-mist-500 transition-colors"
    >
      {pending ? pendingText : buttonText}
    </button>
  );
};
