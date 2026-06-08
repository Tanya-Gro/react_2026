import type { Form } from 'src/types';

type HeaderProps = {
  onButtonClick: (type: Form) => void;
};

export const Header = ({ onButtonClick }: HeaderProps): React.JSX.Element => {
  return (
    <header className="flex items-center justify-center p-4 border-b-2 border-b-mist-300 gap-x-4 bg-mist-200">
      <nav className="flex gap-x-8 text-xl text-mist-700">
        <button
          name="controlled-form-button"
          type="button"
          className="bg-gray-300 hover:bg-gray-400 cursor-pointer rounded h-10 w-40 border border-mist-500 text-lg"
          onClick={() => onButtonClick('controlled')}
        >
          Controlled Form
        </button>
        <button
          name="uncontrolled-form-button"
          className="bg-gray-300 hover:bg-gray-400 cursor-pointer rounded h-10 w-40 border border-mist-500 text-lg"
          onClick={() => onButtonClick('uncontrolled')}
        >
          Uncontrolled Form
        </button>
      </nav>
    </header>
  );
};
